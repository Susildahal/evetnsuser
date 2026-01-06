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
import axiosInstance from "@/config/axios";

import { FaSeedling, FaLeaf, FaCamera, FaGift, FaSun, FaRecycle, FaWater } from "react-icons/fa";

import {
    Building2,
    Sun,
    Home,
    GlassWater,
    Ship, Car, Hotel, ShieldCheck, MapPin, Users, UtensilsCrossed, Headphones, Sparkles, Flower2, Camera
} from "lucide-react";


// Replace with your actual asset
import VenueImg from "../../../../public/assets/img/Event of OC/Wedding/Wedding Venue.jpg";

const customVenues = [
    { name: "Fresh blooms", icon: FaLeaf },
    { name: "Natives and tropicals", icon: FaSun },
    { name: "Selected dried element", icon: FaSeedling },
    { name: "Sustainable mechanics", icon: FaRecycle },
    { name: "Re-use plan across ceremony", icon: FaWater },
];


const customAddons = [
    {
        icon: FaSeedling,
        label: "Flower bar for guests",
        desc: "Seamless guest arrivals with premium transfers.",
    },
    {
        icon: FaLeaf,
        label: "Wearable florals",
        desc: "Curated stays for comfort and convenience.",
    },
    {
        icon: FaCamera,
        label: " Photo-moment meadow",
        desc: "Discreet, professional, and perfectly coordinated.",
    },
    {
        icon: FaGift,
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
    const [data, setData] = React.useState({});
    
    const fetchData = async () => {
        try {
            const response = await axiosInstance.get('/servicedashboard', {
                params: {
                    servicename: 'floral'
                }
            });
            const responseData = response.data.data;
            setData(Array.isArray(responseData) ? responseData : [responseData]);
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    React.useEffect(() => {
        fetchData();
    }, []);

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
                            Sculptural florals that set the tone
                        </span>

                        <h2
                            className="text-[36px] md:text-[48px] leading-tight text-white font-semibold mt-3 mb-5"
                            style={{ fontFamily: "var(--font-cinzel-regular)" }}
                        >
                       Sculptural <span className="text-[#BE9545]"> Florals</span>
                        </h2>

                        <p
                            className="text-gray-400 text-[16px] md:text-[17px] leading-[1.8] mb-5 text-justify"
                            style={{ fontFamily: "var(--font-montserrat)" }}
                        >
                            { data?.[0]?.hero?.subtitle|| "From table meadows and pedestal moments to large-scale installs, we design florals that suit the climate, the space and your palette. Coastal-ready varieties keep their cool; dramatic after-dark tones bring depth when the lights go low."}
                        </p>

                        {/* Highlight Features */}
                        <div className="grid sm:grid-cols-2 gap-6 mb-10">
                            {(data?.[0]?.hero?.criteria || [
                                {
                                    label: "Design & palette",
                                    description: "seasonal guide, textures and forms to match your theme",
                                },
                                {
                                    label: "Arrangements",
                                    description: "table florals, bar features, entry pieces, plinths, arches, ceiling treatments",
                                },
                                {
                                    label: "Conditioning & care",
                                    description: "heat/salt-tolerant selections where needed; on-site maintenance",
                                },
                                {
                                    label: "Install & bump-out",
                                    description: "safe rigging, venue protection, next-day collection or same-night removal",
                                },
                            ]).map((item, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ scale: 1.02 }}
                                    className="border-l-4 border-[#BE9545] pl-4"
                                >
                                    <h4
                                        className="text-white text-[17px] font-semibold"
                                        style={{ fontFamily: "var(--font-montserrat)" }}
                                    >
                                        {item.label || item.title}
                                    </h4>
                                    <p
                                        className="text-gray-400 text-[15px]"
                                        style={{ fontFamily: "var(--font-montserrat)" }}
                                    >
                                        {item.description || item.desc}
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
                                Book Your Event Now
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
                                src={data?.[0]?.hero?.image || VenueImg}
                                alt="Floral Service"
                                className="object-cover w-full h-[500px] transition-transform duration-700 group-hover:scale-105"
                                quality={100}
                                width={600}
                                height={500}
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
                    title="Materials & approach"
                    subtitle="Discover spaces that define your celebration."
                    venues={customVenues}
                />

                {/* AddonsSection */}
                <AddonsSection
                    title="Premium Add-On Services"
                    subtitle="Tailored enhancements to elevate every moment."
                    addons={customAddons}
                />

                {/* TimelineSection */}
                {/* <TimelineSection /> */}

                {/* Banner */}
                <Banner />
            </section>
        </>
    );
};

export default VenueSourcingComponent;
