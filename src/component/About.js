"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";

import AOS from "aos";
import "aos/dist/aos.css";

import Left_heading_line from "/public/assets/img/Left.png";
import Right_heading_line from "/public/assets/img/Right.png";
import Img1 from "/public/assets/img/eventimages/123.jpg";
import Img2 from "/public/assets/img/eventimages/2345234324.jpg";
import Img3 from "/public/assets/img/eventimages/33eeee.jpg";
import Img4 from "/public/assets/img/eventimages/345rtfefte.jpg";
import Img5 from "/public/assets/img/eventimages/3edfdfsdf.jpg";

export default function About() {
    const images = [Img1, Img2, Img3, Img4, Img5];
    const ref = useRef(null);
    const isInView = useInView(ref, { once: false, threshold: 0.3 });
    const [animateState, setAnimateState] = useState("hidden");


    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-out",
            offset: 100,
        });
    }, []);


    useEffect(() => {
        setAnimateState(isInView ? "visible" : "hidden");
    }, [isInView]);

    const heights = ["312px", "424px", "536px", "424px", "312px"];
    const radii = ["50% / 33%", "50% / 25%", "50% / 20%", "50% / 25%", "50% / 33%"];

    // Adjusted motion variants (closer spacing + natural depth)
    const variants = {
        hidden: (i) => ({
            opacity: 0,
            x: 0,
            scale: 0.6,
            z: 0,
            rotateY: 0,
        }),
        visible: (i) => {
            const center = Math.floor(images.length / 2);
            const offset = i - center;

            return {
                opacity: 1,
                x: offset * 10,
                scale: 1 - Math.abs(offset) * 0.08,
                rotateY: offset * 8,
                z: -Math.abs(offset) * 30,
                transition: {
                    duration: 0.8,
                    delay: Math.abs(offset) * 0.15,
                    ease: "easeOut",
                },
            };
        },
    };

    return (
        <section id="services" className="py-24 bg-black overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 text-center flex flex-col gap-8">
                {/* Title */}
                <div className="flex flex-row items-center gap-5 justify-center" data-aos="fade-up">
                    <Image src={Left_heading_line} alt="Left Line" />
                    <h2 className="text-3xl sm:text-4xl md:text-[36px] lg:text-[40px] font-light text-[#D7B26A]" style={{
                        fontFamily: "var(--font-cinzel-regular)",
                        lineHeight: "1.2",
                    }}>
                        Events OC
                    </h2>
                    <Image src={Right_heading_line} alt="Right Line" />
                </div>

                {/* Description */}
                <p className="tracking-normal text-white text-base sm:text-lg md:text-[21px] leading-[1.6] w-full sm:w-11/12 md:w-10/12 lg:w-9/12 mx-auto text-center px-4 sm:px-0"
                    style={{ fontFamily: "var(--font-raleway)" }}
                    data-aos="fade-up"
                    data-aos-delay="200" >
                    EventOC plans high-energy celebrations across the Byron Bays, Sunshine
                    Coast & Gold Coast — birthdays, brand openings, hens nights, beach &
                    pool parties, private and community events, and live music. We handle
                    venues, catering, entertainment, AV, styling, florals, and
                    photographers, or we will plug in your preferred vendors. One
                    organiser, one plan, zero stress.
                </p>

                {/* 3D Image Row Animation */}
                <div ref={ref} className="image-row-3d">
                    {images.map((src, index) => (
                        <motion.div
                            key={index}
                            className="image-card"
                            style={{
                                height: heights[index],
                                borderRadius: radii[index],
                                transformOrigin: "center center",
                            }}
                            variants={variants}
                            initial="hidden"
                            animate={animateState}
                            custom={index}
                        >
                            <Image
                                src={src}
                                alt={`Event ${index + 1}`}
                                fill
                                className="object-cover"
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
