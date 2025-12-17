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

import {
  Building2,
  Sun,
  Home,
  GlassWater,
  Ship, Car, Hotel, ShieldCheck, MapPin, Users, UtensilsCrossed, Headphones, Sparkles, Flower2, Camera
} from "lucide-react";

import { FaBuilding, FaUmbrellaBeach, FaHome, FaCocktail, FaImage, FaWarehouse, FaHotel, FaTree, FaCar, FaShieldAlt, FaMapMarkerAlt, FaUser } from "react-icons/fa";

// Replace with your actual asset
import VenueImg from "../../../../public/assets/img/eventimages/v33333.jpg";

const customVenues = [
  { name: "Rooftops ", icon: FaBuilding },
  { name: "Beach clubs & lawn terraces", icon: FaUmbrellaBeach },
  { name: "Private homes/villas", icon: FaHome },
  { name: "Boutique bars", icon: FaCocktail },
  { name: "Galleries & studios", icon: FaImage },
  { name: "Warehouses ", icon: FaWarehouse },
  { name: "Hotel ballrooms", icon: FaHotel },
  { name: "Garden estates", icon: FaTree },
];

const customAddons = [
  {
    icon: FaCar,
    label: "Guest transfers & valet",
    desc: "Seamless guest arrivals with premium transfers.",
  },
  {
    icon: FaHotel,
    label: "Accommodation blocks",
    desc: "Curated stays for comfort and convenience.",
  },
  {
    icon: FaShieldAlt,
    label: "Security & crowd flow",
    desc: "Discreet, professional, and perfectly coordinated.",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Wayfinding signage",
    desc: "Elegant direction systems designed for clarity.",
  },
  {
    icon: FaUser,
    label: "Cloak & green rooms",
    desc: "Private zones crafted for comfort and calm.",
  },
];

const VenueSourcingComponent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = React.useState({});
  const fetchData = async () => {
    try { 
      const response = await axiosInstance.get('/servicedashboard' , { 
        params: {
          servicename: 'venue'
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
              Our Expertise
            </span>

            <h2
              className="text-[36px] md:text-[48px] leading-tight text-white font-semibold mt-3 mb-5"
              style={{ fontFamily: "var(--font-cinzel-regular)" }}
            >
             
              Venue <span className="text-[#BE9545]">Sourcing</span> Made Effortless

            </h2>

            <p
              className="text-gray-400 text-[16px] md:text-[17px] leading-[1.8] mb-5 text-justify"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              { data?.[0]?.hero?.subtitle||
              `From waterfront rooftops and private villas to galleries, warehouses, and resort
              ballrooms, we source venues that match your brief, budget, and vibe—then negotiate
              the best terms and line up logistics so bump-in to bump-out runs smooth.`}
            </p>

            {/* Highlight Features */}
            <div className="grid sm:grid-cols-2 gap-6 mb-10">
              {[
                {
                  title:  data?.[0]?.hero?.criteria?.[0]?.label || "Tailored brief",
                  desc:   data?.[0]?.hero?.criteria?.[0]?.description || "Guest count, format (cocktail/sit-down), accessibility, noise limits, curfew, styling requirements",
                },
                {
                  title:  data?.[0]?.hero?.criteria?.[1]?.label || "Curated shortlist",
                  desc:  data?.[0]?.hero?.criteria?.[1]?.description || "Location map, venue specs, capacities, floor plans, photos, indicative pricing",
                },
                {
                  title:  data?.[0]?.hero?.criteria?.[2]?.label || "Site visits & holds",
                  desc:  data?.[0]?.hero?.criteria?.[2]?.description || "Hosted walkthroughs, soft holds on preferred dates, availability checks",
                },
                {
                  title:  data?.[0]?.hero?.criteria?.[3]?.label || "Layout & flow",
                  desc:  data?.[0]?.hero?.criteria?.[3]?.description || "Draft floor plan, guest journey, bars, stage/DJ, accessible seating, green rooms",
                },
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
                src={data?.[0]?.hero?.image || VenueImg}
                alt="Venue Sourcing"
                className="object-cover w-full h-[500px] transition-transform duration-700 group-hover:scale-105"
                quality={100}
                width ={600}
                height={500}
                // placeholder="blur"
              />

             
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
          title="Beverage program"
          subtitle="Discover spaces that define your celebration."
          venues={customVenues}
        />

        {/* AddonsSection */}
        <AddonsSection
          title="Add-On"
          subtitle="Tailored enhancements to elevate every moment."
          addons={customAddons}
        />

        {/* TimelineSection */}
        <TimelineSection />

        {/* Banner */}
        <Banner />
      </section>
    </>
  );
};

export default VenueSourcingComponent;
