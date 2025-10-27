"use client";

import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Raleway } from "next/font/google";


import AOS from "aos";
import "aos/dist/aos.css";


import Left_heading_line from "/public/assets/img/Left.png";
import Right_heading_line from "/public/assets/img/Right.png";
import BannerBg from "/public/assets/img/Banner.png";
import ThreeStepModal from "./Modal";


export const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    variable: "--font-raleway",
    display: "swap",
});

export default function Banner() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-out",
            offset: 100,
        });
    }, []);


    return (
        <section className="relative w-full flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <Image src={BannerBg} alt="Luxury Event Banner" fill className="object-cover brightness-[0.7]" priority />

            {/* Content */}
            <div className="relative z-10 flex flex-col gap-[10px] items-center justify-center text-center px-4 py-[95px]">
                {/* Title with Diamond Lines */}
                <div className="flex gap-[20px] items-center justify-center" data-aos="fade-down">
                    <Image src={Left_heading_line} alt="left connector" />
                    <h2 className="text-3xl sm:text-4xl md:text-[36px] lg:text-[40px] font-light text-[#D7B26A]" style={{ fontFamily: "var(--font-cinzel-regular)", lineHeight: "1.2" }}>
                        Events of the century
                    </h2>
                    <Image src={Right_heading_line} alt="right connector" />
                </div>

                {/* Subtitle */}
                <p className="tracking-normal text-white text-base sm:text-lg md:text-[21px] leading-[1.6] w-full sm:w-11/12 md:w-10/12 lg:w-9/12 mx-auto text-center px-4 sm:px-0"
                    style={{ fontFamily: "var(--font-raleway)" }}
                    data-aos="fade-up"
                    data-aos-delay="200">
                    Luxe details, seamless logistics, unforgettable moments.
                </p>
                <div>
                    {/* CTA Button */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`${raleway.className} inline-block px-6 py-2 border border-white text-white text-lg font-light rounded-md
                        transition-colors duration-700 ease-in-out
                        hover:bg-white hover:text-black hover:shadow-xl mt-[20px] cursor-pointer will-change-auto"
                        data-aos="zoom-in`}
                        data-aos-delay="400">
                        Book Now
                    </button>

                    <ThreeStepModal
                        isOpen={isModalOpen}
                        onClose={() => setIsModalOpen(false)}
                    />
                </div>
            </div>
        </section >
    );
}
