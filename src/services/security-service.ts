export interface SecurityServiceOptions {
  maxRequestsPerWindow?: number;
  windowMs?: number;
  secretSalt?: string;
}

export interface KeyboardEventInput {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  metaKey?: boolean;
  altKey?: boolean;
}

const SCRAPER_UA_PATTERNS: RegExp[] = [
  /curl\b/i,
  /wget\b/i,
  /python-requests/i,
  /python-urllib/i,
  /aiohttp/i,
  /httpx/i,
  /scrapy/i,
  /httrack/i,
  /headlesschrome/i,
  /puppeteer/i,
  /playwright/i,
  /phantomjs/i,
  /selenium/i,
  /go-http-client/i,
  /axios\//i,
  /node-fetch/i,
  /undici/i,
  /libwww-perl/i,
  /java\//i,
  /sqlmap/i,
  /nikto/i,
  /nmap/i,
  /masscan/i,
  /zgrab/i,
  /colly/i,
  /Mechanize/i,
  /CyotekWebCopy/i,
  /Teleport\s*Pro/i,
  /WebCopier/i,
];

const PAYLOAD_MAGIC = "PS_SHIELD_V1:";

export class SecurityService {
  private readonly maxRequestsPerWindow: number;
  private readonly windowMs: number;
  private readonly secretSalt: string;
  private readonly ipBuckets: Map<string, number[]> = new Map();

  constructor(options: SecurityServiceOptions = {}) {
    this.maxRequestsPerWindow = options.maxRequestsPerWindow ?? 80;
    this.windowMs = options.windowMs ?? 60_000;
    this.secretSalt = options.secretSalt ?? "plataforma-sur-b2b-shield-key-2026";
  }

  public isBotUserAgent(userAgent?: string | null): boolean {
    if (!userAgent || userAgent.trim().length === 0) {
      return true;
    }
    return SCRAPER_UA_PATTERNS.some((regex) => regex.test(userAgent));
  }

  public checkRateLimit(ip: string, now: number = Date.now()): boolean {
    const key = ip || "unknown";
    const cutoff = now - this.windowMs;
    const timestamps = (this.ipBuckets.get(key) ?? []).filter((ts) => ts > cutoff);

    if (timestamps.length >= this.maxRequestsPerWindow) {
      this.ipBuckets.set(key, timestamps);
      return false;
    }

    timestamps.push(now);
    this.ipBuckets.set(key, timestamps);
    return true;
  }

  public buildSecurityHeaders(): Record<string, string> {
    return {
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "X-DNS-Prefetch-Control": "off",
      "X-Download-Options": "noopen",
      "X-Permitted-Cross-Domain-Policies": "none",
      "X-Robots-Tag": "noarchive, noimageindex, nosnippet",
      "Permissions-Policy":
        "camera=(), microphone=(), geolocation=(), browsing-topics=(), interest-cohort=()",
      "Content-Security-Policy":
        "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com data:; img-src 'self' data: blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self' mailto:;",
    };
  }

  public obfuscatePayload(data: unknown): string {
    const rawJson = PAYLOAD_MAGIC + JSON.stringify(data);
    const utf8Bytes = new TextEncoder().encode(rawJson);
    const keyBytes = new TextEncoder().encode(this.secretSalt);
    const xored = new Uint8Array(utf8Bytes.length);

    for (let i = 0; i < utf8Bytes.length; i++) {
      xored[i] = utf8Bytes[i] ^ keyBytes[i % keyBytes.length] ^ ((i * 31) & 0xff);
    }

    let binary = "";
    for (let i = 0; i < xored.length; i++) {
      binary += String.fromCharCode(xored[i]);
    }
    return btoa(binary);
  }

  public deobfuscatePayload<T>(encoded: string): T {
    if (!encoded || typeof encoded !== "string") {
      throw new Error("Invalid protected payload");
    }

    let binary: string;
    try {
      binary = atob(encoded);
    } catch {
      throw new Error("Malformed Base64 protected payload");
    }

    const xored = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      xored[i] = binary.charCodeAt(i);
    }

    const keyBytes = new TextEncoder().encode(this.secretSalt);
    const utf8Bytes = new Uint8Array(xored.length);
    for (let i = 0; i < xored.length; i++) {
      utf8Bytes[i] = xored[i] ^ keyBytes[i % keyBytes.length] ^ ((i * 31) & 0xff);
    }

    const decodedStr = new TextDecoder().decode(utf8Bytes);
    if (!decodedStr.startsWith(PAYLOAD_MAGIC)) {
      throw new Error("Tampered or invalid payload signature");
    }

    const jsonPart = decodedStr.slice(PAYLOAD_MAGIC.length);
    return JSON.parse(jsonPart) as T;
  }

  public isBlockedShortcut(event: KeyboardEventInput): boolean {
    const key = (event.key || "").toLowerCase();
    const ctrl = Boolean(event.ctrlKey);
    const shift = Boolean(event.shiftKey);
    const meta = Boolean(event.metaKey);
    const alt = Boolean(event.altKey);

    if (key === "f12") return true;
    // Ctrl+U (View Source), Ctrl+S (Save Page), Ctrl+P
    if ((ctrl || meta) && !shift && !alt && (key === "u" || key === "s")) {
      return true;
    }
    // Ctrl+Shift+I / J / C (DevTools Inspector / Console / Elements)
    if ((ctrl || meta) && shift && (key === "i" || key === "j" || key === "c")) {
      return true;
    }
    // Mac Cmd+Option+I / J / U / C
    if (meta && alt && (key === "i" || key === "j" || key === "u" || key === "c")) {
      return true;
    }
    return false;
  }
}

export const defaultSecurityService = new SecurityService();
