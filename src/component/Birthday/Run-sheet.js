"use client";

import { motion } from "framer-motion";
import { Cinzel, Montserrat } from "next/font/google";

const cinzel = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "500", "700"] });

const runSheet = [
    { time: "Arrival & Drinks", desc: "Guests arrive, welcome drinks served." },
    { time: "Welcome Toast", desc: "Host gives a welcome toast." },
    { time: "Service 1", desc: "First course of dinner served." },
    { time: "Speeches", desc: "Special speeches by guests." },
    { time: "Cake & Reveal", desc: "Cake cutting and reveal moment." },
    { time: "Dance Floor", desc: "Music and dance for guests." },
];

export const RunSheetNew = () => {
    const brandGold = "#c9a72b";

    return (
        <section className="container mx-auto relative py-16 sm:py-20 lg:py-24 text-white overflow-hidden px-4 sm:px-6 lg:px-12">
            {/* Section title */}
            <h2
                className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-[400] mb-8 sm:mb-10 md:mb-12 tracking-wide text-[#BE9545] ${cinzel.className} text-center`}
            >
                Event Timeline
            </h2>

            {/* Timeline Container */}
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full">
                {runSheet.map((item, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="flex flex-col items-center text-center group w-full sm:w-3/5 md:w-1/3 lg:w-[16%]"
                    >
                        {/* Step Circle */}
                        <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-9 md:h-9 lg:w-10 lg:h-10 rounded-full bg-gradient-to-br from-[#BE9545] to-[#BE9545] border border-black shadow-xl flex items-center justify-center text-black font-bold text-[10px] sm:text-xs md:text-sm lg:text-base z-10">
                            {idx + 1}
                        </div>

                        {/* Card */}
                        <motion.div
                            whileHover={{ scale: 1.05, y: -3 }}
                            className="mt-2 sm:mt-3 md:mt-4 lg:mt-5 bg-[#111] border border-gray-700 rounded-3xl p-2 sm:p-2.5 md:p-3 lg:p-3.5 shadow-xl group-hover:shadow-[0_0_25px_rgba(201,167,43,0.7)] transition-all duration-300 w-full"
                        >
                            <h3
                                className={`text-[10px] sm:text-xs md:text-sm lg:text-[16px] font-semibold mb-1 ${montserrat.className} text-[#BE9545]`}
                            >
                                {item.time}
                            </h3>
                            <p
                                className={`${montserrat.className} text-[9px] sm:text-[10px] md:text-sm lg:text-sm text-gray-300 leading-snug`}
                            >
                                {item.desc}
                            </p>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Decorative Horizontal Line */}
            <div className="absolute inset-0 flex justify-center pointer-events-none">
                <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-[#c9a72b40] to-transparent hidden md:block"></div>
            </div>
        </section>
    );
};
