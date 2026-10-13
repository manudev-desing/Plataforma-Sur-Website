export interface UploadResult {
  url: string;
  secureUrl: string;
  publicId: string;
  format: string;
  resourceType: string;
  bytes: number;
}

export interface StorageService {
  uploadFile(file: File | Blob, customFilename?: string): Promise<UploadResult>;
}

export class CloudinaryStorageService implements StorageService {
  private readonly cloudName: string;
  private readonly uploadPreset: string;

  constructor(
    cloudName: string = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "hba2shqn",
    uploadPreset: string = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "plataformasur"
  ) {
    this.cloudName = cloudName;
    this.uploadPreset = uploadPreset;
  }

  public async uploadFile(
    file: File | Blob,
    customFilename?: string
  ): Promise<UploadResult> {
    const isPdf =
      (file instanceof File && file.name.endsWith(".pdf")) ||
      file.type === "application/pdf";
    const resourceType = isPdf ? "raw" : "auto";

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", this.uploadPreset);
    if (customFilename) {
      formData.append("public_id", customFilename);
    }

    const endpoint = `https://api.cloudinary.com/v1_1/${this.cloudName}/${resourceType}/upload`;

    const response = await fetch(endpoint, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorText = await response.text();
      let parsedError = errorText;
      try {
        const json = JSON.parse(errorText);
        parsedError = json.error?.message || errorText;
      } catch {
        // fallback to raw text
      }
      throw new Error(`Error al subir a Cloudinary: ${parsedError}`);
    }

    const data = await response.json();

    return {
      url: data.url,
      secureUrl: data.secure_url,
      publicId: data.public_id,
      format: data.format || (isPdf ? "pdf" : "img"),
      resourceType: data.resource_type,
      bytes: data.bytes,
    };
  }
}

export const defaultStorageService = new CloudinaryStorageService();
