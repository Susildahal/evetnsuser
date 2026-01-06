"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Cormorant_Garamond, Cinzel, Montserrat, Raleway } from "next/font/google";
import { useState } from "react";
import ThreeStepModal from "./Modal";

const cormorant = Cormorant_Garamond({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
    variable: "--font-cormorant",
    display: "swap",
});

const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    variable: "--font-cinzel",
});

const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    variable: "--font-montserrat",
    display: "swap",
});

export const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    variable: "--font-raleway",
    display: "swap",
});

export default function HeroSection() {

    const [isModalOpen, setIsModalOpen] = useState(false);


    // Variants for text
    const textVariant = {
        hidden: { opacity: 0, y: 30 },
        visible: (custom = 0) => ({
            opacity: 1,
            y: 0,
            transition: { delay: custom * 0.3, duration: 0.8, ease: "easeOut" },
        }),
    };

    // Variants for buttons
    const buttonVariant = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { delay: 1, duration: 0.6, ease: "easeOut" } },
    };

    return (
        <div className="bg-black mt-[83px]">
            <div className="">
                <section className="relative w-full h-[45vh] sm:h-[85vh] overflow-hidden flex items-center justify-center">
                

               <video
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] sm:h-[260px] md:h-full object-cover rounded-t-none rounded-b-[20px]"
                        src="/assets/videos/latest_banner.mp4"
                        autoPlay
                        playsInline
                        preload="auto"
                        muted
                        loop
                    />

                    {/* Overlay for better text visibility */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black/30 rounded-t-none rounded-b-[20px]"></div>

                    {/* Hero Content */}
                    <div className="container mx-auto relative z-10 flex flex-col items-center justify-end h-full text-center px-4">
                        
                    </div>
                </section>
            </div>
        </div>
    );
}
