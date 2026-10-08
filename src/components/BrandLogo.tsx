"use client";

import React from "react";
import Image from "next/image";
import { getAssetPath } from "@/utils/assets";

interface BrandLogoProps {
  /**
   * "light" for white/light surfaces (default: Midnight Green text + Emerald accent)
   * "dark" for Midnight Green/dark surfaces (White text + Emerald accent)
   */
  theme?: "light" | "dark";
  /**
   * If true (default), renders the full imagotipo:
   * Line 1: "Plataforma"
   * Line 2: "Sur · Global Business"
   * If false, renders the reduced version:
   * Line 1: "Plataforma"
   * Line 2: "Sur"
   */
  showTagline?: boolean;
  /**
   * Size scale for different viewports and components
   */
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  theme = "light",
  showTagline = true,
  size = "md",
  className = "",
}) => {
  const isDark = theme === "dark";
  const primaryTextColor = isDark ? "text-white" : "text-midnight-green";

  // Size configurations maintaining clear space and proportions
  const sizeClasses = {
    sm: {
      img: "h-8 w-auto",
      width: 48,
      height: 70,
      line1: "text-base leading-tight",
      line2: "text-xs leading-none",
      gap: "gap-2",
    },
    md: {
      img: "h-10 md:h-11 w-auto",
      width: 60,
      height: 88,
      line1: "text-lg md:text-xl leading-tight",
      line2: "text-xs md:text-sm leading-none",
      gap: "gap-3",
    },
    lg: {
      img: "h-14 md:h-16 w-auto",
      width: 90,
      height: 132,
      line1: "text-2xl md:text-3xl leading-tight",
      line2: "text-sm md:text-base leading-none",
      gap: "gap-4",
    },
  }[size];

  return (
    <div className={`inline-flex items-center ${sizeClasses.gap} select-none ${className}`}>
      {/* Isotipo Mark */}
      <Image
        src={getAssetPath("/images/logos/isotipo.png")}
        alt="Plataforma Sur"
        width={sizeClasses.width}
        height={sizeClasses.height}
        className={`${sizeClasses.img} shrink-0 object-contain`}
        priority
      />

      {/* Official Logotype Construction (Modular grid: Row 1 = Plataforma, Row 2 = Sur · Global Business) */}
      <span className="flex flex-col justify-center">
        {/* Row 1: Plataforma (Outfit Bold) */}
        <span className={`font-outfit font-bold tracking-tight ${primaryTextColor} ${sizeClasses.line1}`}>
          Plataforma
        </span>

        {/* Row 2: Sur · Global Business */}
        <span className={`font-outfit ${sizeClasses.line2} mt-0.5 flex items-center gap-1.5`}>
          <span className={`font-bold tracking-tight ${primaryTextColor}`}>
            Sur
          </span>
          {showTagline && (
            <>
              <span className="font-bold text-emerald" aria-hidden="true">
                ·
              </span>
              <span className="font-semibold text-emerald tracking-normal">
                Global Business
              </span>
            </>
          )}
        </span>
      </span>
    </div>
  );
};

export default BrandLogo;
