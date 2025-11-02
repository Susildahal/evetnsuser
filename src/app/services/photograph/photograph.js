"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import VenueStyles from "@/component/Venue/Venue-style";
import AddonsSection from "@/component/Venue/Addon";
import TimelineSection from "@/component/Venue/Timeline";
import Banner from "@/component/Banner";
import ThreeStepModal from "../../../component/Modal";
import { useState } from "react";


import {
    Building2,
    Sun,
    Home,
    GlassWater,
    Ship, Car, Hotel, ShieldCheck, MapPin, Users, UtensilsCrossed, Headphones, Sparkles, Flower2, Camera
} from "lucide-react";

import { FaImages, FaPhotoVideo, FaFileAlt, FaClock, FaRecycle } from "react-icons/fa";


// Replace with your actual asset
import VenueImg from "/public/assets/img/eventimages/gg4444.jpg";

const customVenues = [
    { name: "Edited images", icon: FaImages },
    { name: "Curated gallery", icon: FaPhotoVideo },
    { name: "Usage", icon: FaFileAlt },
    { name: "Turnaround", icon: FaClock },
    { name: "Re-use plan across ceremony", icon: FaRecycle },
];


const customAddons = [
    {
        icon: Car,
        label: "Flower bar for guests",
        desc: "Seamless guest arrivals with premium transfers.",
    },
    {
        icon: Hotel,
        label: "Wearable florals",
        desc: "Curated stays for comfort and convenience.",
    },
    {
        icon: ShieldCheck,
        label: " Photo-moment meadow",
        desc: "Discreet, professional, and perfectly coordinated.",
    },
    {
        icon: MapPin,
        label: "Keepsake dried arrangements",
        desc: "Elegant direction systems designed for clarity.",
    },
    // {
    //     icon: Users,
    //     label: "Scent design",
    //     desc: "Private zones crafted for comfort and calm.",
    // },
];


const VenueSourcingComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            {/* HERO SECTION */}
            <section className="relative overflow-hidden mt-[100px] py-10">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#111111] to-[#0B0B0B]" />

                {/* Ambient Glows */}
                <div className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-[#BE9545]/20 blur-[180px] rounded-full" />
                <div className="absolute -bottom-48 -right-48 w-[500px] h-[500px] bg-[#BE9545]/10 blur-[180px] rounded-full" />

                {/* Content Wrapper */}
                <div className="relative container mx-auto px-4 max-w-7xl grid md:grid-cols-2 gap-16 items-center">
                    {/* LEFT: Text Content (slide from left) */}
                    <motion.div
                        initial={{ opacity: 0, x: -80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                    >
                        <span
                            className="uppercase tracking-[0.3em] text-[#BE9545] text-sm font-semibold"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                            Moment lives long after the lights go out
                        </span>

                        <h2
                            className="text-[36px] md:text-[48px] leading-tight text-white font-semibold mt-3 mb-5"
                            style={{ fontFamily: "var(--font-cinzel-regular)" }}
                        >
                            Candid <span className="text-[#BE9545]">energy</span>with editorial polish
                        </h2>

                        <p
                            className="text-gray-400 text-[16px] md:text-[17px] leading-[1.8] mb-5 text-justify"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                            Our photographers work discreetly to capture real interactions, hero details and the big beats. Delivery is fast, curated and ready for social or press
                        </p>

                        {/* Highlight Features */}
                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            {[
                                {
                                    title: "Pre-production",
                                    desc: "shot list aligned to your run sheet and styling elements",
                                },
                                {
                                    title: "On the day",
                                    desc: "lead photographer (and second shooter if needed), event coverage from arrivals to last formal moment",
                                },
                                {
                                    title: "Lighting",
                                    desc: "natural-light priority with on-camera/off-camera flash where appropriate; coordination with our AV team for key cues",
                                },
                                // {
                                //     title: "Install & bump-out",
                                //     desc: "safe rigging, venue protection, next-day collection or same-night removal",
                                // },
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="border-l-4 border-[#BE9545] pl-4"
                                >
                                    <h4
                                        className="text-white text-[17px] font-semibold"
                                        style={{ fontFamily: "var(--font-montserrat)" }}
                                    >
                                        {item.title}
                                    </h4>
                                    <p
                                        className="text-gray-400 text-[15px]"
                                        style={{ fontFamily: "var(--font-montserrat)" }}
                                    >
                                        {item.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-wrap gap-4">
                            <motion.button
                                onClick={() => setIsModalOpen(true)}
                                className="px-8 py-3 bg-[#BE9545] text-white rounded-full font-medium tracking-wide hover:bg-[#a7843e] transition-all duration-300 cursor-pointer"
                            >
                                Book You Event Now
                            </motion.button>

                            <ThreeStepModal
                                isOpen={isModalOpen}
                                onClose={() => setIsModalOpen(false)}
                            />

                            {/* <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="px-8 py-3 border border-[#BE9545] text-[#BE9545] rounded-full font-medium tracking-wide hover:bg-[#BE9545]/10 transition-all duration-300 cursor-pointer"
                            >
                                Explore Venues
                            </motion.button> */}
                        </div>
                    </motion.div>

                    {/* RIGHT: Image Content (slide from right) */}
                    <motion.div
                        initial={{ opacity: 0, x: 80 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="relative"
                    >
                        <div className="relative overflow-hidden rounded-[30px] border border-[#BE9545]/30 shadow-2xl group">
                            <Image
                                src={VenueImg}
                                alt="Venue Sourcing"
                                className="object-cover w-full h-[500px] transition-transform duration-700 group-hover:scale-105"
                                quality={100}
                                placeholder="blur"
                            />

                            {/* Overlay */}
                            {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-6">
                                <div>
                                    <h4
                                        className="text-white text-xl font-semibold"
                                        style={{ fontFamily: "var(--font-cinzel-regular)" }}
                                    >
                                        Grand Royal Ballroom
                                    </h4>
                                    <p
                                        className="text-[#BE9545] text-sm"
                                        style={{ fontFamily: "var(--font-montserrat)" }}
                                    >
                                        Downtown · 800 Guests · 5-Star Rated
                                    </p>
                                </div>
                            </div> */}
                        </div>

                        {/* Floating Glow Accent */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="absolute -bottom-8 -right-8 w-28 h-28 bg-[#BE9545]/40 blur-2xl rounded-full"
                        />
                    </motion.div>
                </div>
            </section>

            {/* Additional Sections */}
            <section>
                {/* VenueStyles */}
                <VenueStyles
                    title="Deliverables"
                    subtitle="Discover spaces that define your celebration."
                    venues={customVenues}
                />

                {/* AddonsSection */}
                {/* <AddonsSection
                    title="Premium Add-On Services"
                    subtitle="Tailored enhancements to elevate every moment."
                    addons={customAddons}
                /> */}

                {/* TimelineSection */}
                {/* <TimelineSection /> */}

                {/* Banner */}
                <Banner />
            </section>
        </>
    );
};

export default VenueSourcingComponent;
