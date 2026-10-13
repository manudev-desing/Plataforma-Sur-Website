import {
  SecurityService,
  defaultSecurityService,
  KeyboardEventInput,
} from "../services/security-service";

export interface IncomingRequestContext {
  ip: string;
  userAgent?: string | null;
  path: string;
  headers: Record<string, string | undefined>;
}

export interface RequestInspectionVerdict {
  allowed: boolean;
  statusCode: number;
  reason?: string;
  headers: Record<string, string>;
}

export class SecurityFacade {
  private readonly securityService: SecurityService;

  constructor(securityService: SecurityService = defaultSecurityService) {
    this.securityService = securityService;
  }

  public inspectIncomingRequest(ctx: IncomingRequestContext): RequestInspectionVerdict {
    const headers = this.securityService.buildSecurityHeaders();

    if (this.securityService.isBotUserAgent(ctx.userAgent)) {
      return {
        allowed: false,
        statusCode: 403,
        reason: "Automated scraping and bot user-agents are strictly prohibited.",
        headers,
      };
    }

    if (!this.securityService.checkRateLimit(ctx.ip)) {
      return {
        allowed: false,
        statusCode: 429,
        reason: "Rate limit exceeded. Too many requests from this IP.",
        headers,
      };
    }

    return {
      allowed: true,
      statusCode: 200,
      headers,
    };
  }

  public getHardenedHeaders(): Record<string, string> {
    return this.securityService.buildSecurityHeaders();
  }

  public encodeProtectedPayload(data: unknown): string {
    return this.securityService.obfuscatePayload(data);
  }

  public decodeProtectedPayload<T>(encoded: string): T {
    return this.securityService.deobfuscatePayload<T>(encoded);
  }

  public shouldBlockKeyboardShortcut(event: KeyboardEventInput): boolean {
    return this.securityService.isBlockedShortcut(event);
  }
}

export const securityFacade = new SecurityFacade();
