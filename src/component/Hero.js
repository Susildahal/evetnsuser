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
                    {/* Video Background */}
                    {/* <video
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-[90%] object-cover rounded-t-none rounded-b-[20px]"
                        src="/assets/videos/20251203-112619.mp4"
                        autoPlay
                        muted
                        loop>
                    </video> */}

                    <video
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[90%] sm:w-[75%] md:w-[60%] h-[350px] sm:h-[260px] md:h-[90%] object-cover rounded-t-none rounded-b-[20px]"
                        src="/assets/videos/20251203-112619.mp4"
                        autoPlay
                        muted
                        loop
                    />


                    {/* Overlay for better text visibility */}
                    <div className="absolute top-0 left-0 w-full h-full bg-black/30 rounded-t-none rounded-b-[20px]"></div>

                    {/* Hero Content */}
                    <div className="container mx-auto relative z-10 flex flex-col items-center justify-end h-full text-center px-4">
                        {/* <motion.div className={`${cormorant.className} text-white text-4xl md:text-[78px] font-semibold mb-4`}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                            custom={0}>
                            Where events become <br /> experiences
                        </motion.div>
                        <motion.span className={`font-medium text-gray-300 text-lg md:text-[16px] mb-8 max-w-2xl ${raleway.className}`}
                            variants={textVariant}
                            initial="hidden"
                            animate="visible"
                            custom={1}>
                            Birthdays , beach & pool parties, brand launches, hens, live music-planned end-to-end.
                        </motion.span> */}
                        <div className="flex gap-4 pb-5">
                            {/* Book Now */}
                            <div>
                                <button
                                    onClick={() => setIsModalOpen(true)}
                                    className="relative inline-flex items-center justify-center text-white px-6 py-2 rounded-md font-normal transition-all duration-300 overflow-hidden"
                                    style={{
                                        background: "linear-gradient(to bottom, #BE9546, #7A5E39)",
                                    }}>
                                    <span className={`${raleway.className} font-medium relative z-10 cursor-pointer`}>Book Now</span>
                                    <span className={`${raleway.className} font-medium absolute inset-0 bg-linear-to-b from-[#7A5E39] to-[#BE9546] opacity-0 hover:opacity-20 rounded-lg transition-opacity duration-300`}></span>
                                </button>

                                <ThreeStepModal
                                    isOpen={isModalOpen}
                                    onClose={() => setIsModalOpen(false)}
                                />
                            </div>

                            {/* Contact Organiser */}
                            <a
                                href="tel:0426006760"
                                className="group relative inline-flex items-center justify-center text-white px-6 py-2 rounded-lg font-normal border border-white hover:border-transparent overflow-hidden transition-all duration-300"
                            >
                                <span className="relative z-10">Contact Organiser</span>

                                {/* Smooth Hover Gradient Overlay */}
                                <span
                                    className="absolute inset-0 rounded-lg bg-gradient-to-b from-[#BE9546] to-[#7A5E39] 
                                    opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                                ></span>

                                {/* Border disappears smoothly on hover */}
                                <span className="absolute inset-0 rounded-lg border border-transparent group-hover:border-transparent transition-all duration-300"></span>
                            </a>


                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
