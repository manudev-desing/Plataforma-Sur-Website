import { NextRequest, NextResponse } from "next/server";
import { catalogFacade } from "@/facades/catalog-facade";
import { securityFacade } from "@/facades/security-facade";
import { Locale } from "@/data/translations";

export async function GET(request: NextRequest) {
  const shieldHeader = request.headers.get("x-ps-shield");
  if (shieldHeader !== "1") {
    return NextResponse.json(
      { error: "Forbidden" },
      { status: 403, headers: securityFacade.getHardenedHeaders() }
    );
  }

  const { searchParams } = new URL(request.url);
  const country = searchParams.get("country") || "Todos";
  const category = searchParams.get("category") || "Todas";
  const langParam = searchParams.get("lang");
  const lang: Locale = langParam === "EN" ? "EN" : "ES";

  const payload = catalogFacade.getEncryptedCatalog({
    country,
    category,
    lang,
  });

  return NextResponse.json(
    { payload },
    {
      status: 200,
      headers: {
        ...securityFacade.getHardenedHeaders(),
        "Cache-Control": "no-store, max-age=0",
      },
    }
  );
}
