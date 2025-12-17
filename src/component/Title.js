"use client";
import React from "react";
import Image from "next/image";
import TopLogo from "../../public/assets/img/logo_page.png";
import { Cinzel, Montserrat, Raleway } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
});

export const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "700", "900"],
    variable: "--font-cinzel",
});

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "700", "900"],
    variable: "--font-montserrat",
});

const SectionHeader = ({ title, subtitle, logo = TopLogo }) => {
    return (
        <div className="flex flex-col items-center gap-4 mb-12 px-4 sm:px-6 md:px-8 lg:px-0">
            {/* Top Logo */}
            <div className="w-[150px] sm:w-[200px] md:w-[250px]">
                <Image src={logo} alt="Logo" className="w-full h-auto" />
            </div>

            {/* Title */}
            <span
                className={`text-[28px] sm:text-3xl md:text-4xl lg:text-[40px] font-light text-[#D7B26A] text-center`}
                style={{ fontFamily: "var(--font-cinzel-regular)", lineHeight: "1.2" }}
            >
                {title}
            </span>

            {/* Bottom Logo (flipped) */}
            <div className="w-[150px] sm:w-[200px] md:w-[250px] transform scale-y-[-1]">
                <Image src={logo} alt="Logo" className="w-full h-auto" />
            </div>

            {/* Subtitle */}
            {subtitle && (
                <p
                    className={`text-gray-400 text-sm sm:text-base md:text-lg text-center max-w-xs sm:max-w-md md:max-w-2xl mt-2 ${raleway.className}`}
                >
                    {subtitle}
                </p>
            )}
        </div>
    );
};

export default SectionHeader;