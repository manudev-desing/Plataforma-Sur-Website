"use client";

import React from "react";

export type CountryName = "Argentina" | "Bolivia" | "Perú";

interface CountryFlagProps {
  country: CountryName;
  className?: string;
  title?: boolean;
}

export const CountryFlag: React.FC<CountryFlagProps> = ({
  country,
  className = "h-4 w-6",
  title = false,
}) => {
  const commonProps = {
    className: `inline-block overflow-hidden rounded-[2px] ring-1 ring-black/10 ${className}`,
    viewBox: "0 0 9 6",
    xmlns: "http://www.w3.org/2000/svg",
    "aria-label": country,
    role: "img",
  };

  if (country === "Argentina") {
    return (
      <svg {...commonProps}>
        {title && <title>Argentina</title>}
        <rect width="9" height="6" fill="#74ACDF" />
        <rect y="2" width="9" height="2" fill="#FFFFFF" />
        <circle cx="4.5" cy="3" r="0.55" fill="#F6B40E" stroke="#85340A" strokeWidth="0.05" />
      </svg>
    );
  }

  if (country === "Bolivia") {
    return (
      <svg {...commonProps}>
        {title && <title>Bolivia</title>}
        <rect width="9" height="2" fill="#D52B1E" />
        <rect y="2" width="9" height="2" fill="#F9E300" />
        <rect y="4" width="9" height="2" fill="#007A33" />
      </svg>
    );
  }

  return (
    <svg {...commonProps}>
      {title && <title>Perú</title>}
      <rect width="3" height="6" fill="#D91023" />
      <rect x="3" width="3" height="6" fill="#FFFFFF" />
      <rect x="6" width="3" height="6" fill="#D91023" />
    </svg>
  );
};

export default CountryFlag;
