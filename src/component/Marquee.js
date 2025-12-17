"use client";

import React from "react";
import Marquee from "react-fast-marquee";
import Image from "next/image";
import DiamondConnector from "../../public/assets/img/Diamond.png";

export default function ElegantMarquee() {
    const texts = [
        "Beach Parties",
        "Corporate Events",
        "Hens Nights",
        "Brand Openings",
        "Private Celebrations",
        "Live Music",
        "Community Events",
    ];

    return (
        <section className="py-4 sm:py-6 md:py-6 overflow-hidden bg-gradient-to-r from-[#7B5F3A] to-[#D7B26A]">
            <Marquee gradient={false} speed={40} pauseOnHover={true}>
                {texts.map((text, i) => (
                    <div
                        key={i}
                        className="flex items-center mx-3 sm:mx-5 md:mx-8"
                    >
                        <span className="text-[#0A0A0A] text-base sm:text-lg md:text-xl lg:text-[24px] font-light tracking-wider uppercase whitespace-nowrap"
                            style={{ fontFamily: "var(--font-cinzel-regular)" }}>
                            {text}
                        </span>

                        {/* Connector after each text */}
                        <div className="mx-3 sm:mx-5 md:mx-8 flex-shrink-0">
                            <Image
                                src={DiamondConnector}
                                alt="Connector"
                                width={100}
                                height={15}
                                className="opacity-90 sm:w-[120px] md:w-[140px] lg:w-[160px] h-auto"
                            />
                        </div>
                    </div>
                ))}
            </Marquee>
        </section>
    );
}
