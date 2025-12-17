"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import SectionHeader from "@/component/Title";
import PolaroidGallery from "@/component/PolaroidGallery";
import Service from "@/component/Service";
import OurTeamSection from "@/component/Team";
import Methods from "@/component/Methods";
import WhatWeBelievePage from "@/component/What-we-believe";
import BudgetsTimelines from "@/component/Budget-timeline";
import Banner from "@/component/Banner";
import ToolsMarquee from "@/component/Tools-Tech";
import { motion } from "framer-motion";
import ThreeStepModal from "../../component/Modal"
import { Leaf, Recycle, Lightbulb, Droplets, Globe2, Plant, Truck, HeartHandshake, Hammer, MessageCircle, Clock, Accessibility, Laptop, BarChart2, Users, Layout, Server, ClipboardCheck } from "lucide-react";
import axiosInstance from "@/config/axios";

const tools = [
  { title: "Project Clarity", desc: "Detailed timelines, supplier matrices, and guest-flow maps for transparent execution.", icon: <BarChart2 className="w-7 h-7 text-[#BE9545]" /> },
  { title: "Collaborative Platforms", desc: "Slack, Notion, and Trello ensure our creative and logistics teams move in sync.", icon: <Users className="w-7 h-7 text-[#BE9545]" /> },
  { title: "Design Visualization", desc: "Figma & 3D floor mapping tools to preview spatial layouts and aesthetics.", icon: <Layout className="w-7 h-7 text-[#BE9545]" /> },
  { title: "On-Site Ops", desc: "RF comms, real-time dashboards, and checklists to keep live events smooth.", icon: <Server className="w-7 h-7 text-[#BE9545]" /> },
  { title: "Client Dashboards", desc: "Live status updates, file sharing, and transparent cost tracking.", icon: <Laptop className="w-7 h-7 text-[#BE9545]" /> },
  { title: "Feedback Analytics", desc: "Post-event reports, guest insights, and engagement metrics for refinement.", icon: <ClipboardCheck className="w-7 h-7 text-[#BE9545]" /> },
];


const About_component = () => {
  const [about, setAbout] = useState([]);
  const aboutdata = () => {
    axiosInstance.get('/about').then((response) => {
      setAbout(response.data.data);
    }).catch((error) => {
      console.error('There was an error fetching the about data!', error);
    });
  };
  useEffect(() => {
    aboutdata();
  }, []);
  
  const features = [
    { icon: <Leaf size={28} className="text-[#BE9545]" />, text: "Eco-conscious materials" },
    { icon: <Recycle size={28} className="text-[#BE9545]" />, text: "Zero-waste planning" },
    { icon: <Lightbulb size={28} className="text-[#BE9545]" />, text: "Energy-efficient lighting" },
    { icon: <Droplets size={28} className="text-[#BE9545]" />, text: "Minimal water usage" },
    { icon: <Globe2 size={28} className="text-[#BE9545]" />, text: "Local sourcing & rentals" },
    { icon: <HeartHandshake size={28} className="text-[#BE9545]" />, text: "Reusable décor & props" },
    { icon: <Truck size={28} className="text-[#BE9545]" />, text: "Low-impact logistics" },
    { icon: <HeartHandshake size={28} className="text-[#BE9545]" />, text: "Respect for venue & neighbours" },
    { icon: <Hammer size={28} className="text-[#BE9545]" />, text: "Sustainable construction" },
    { icon: <MessageCircle size={28} className="text-[#BE9545]" />, text: "Transparent communication" },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
      offset: 100,
    });
  }, []);


  return (
    <>
      <div className="mt-[100px] container mx-auto px-4 py-10">
        {/* Header */}
        <div data-aos="fade-up">
          <SectionHeader title="About Us" />
        </div>

        {/* About Page Content */}
        {/* Hero Section */}
        <div className="flex flex-col gap-6 items-center w-full max-w-4xl mx-auto text-center px-4 sm:px-6 md:px-8">
          <div className="flex flex-col gap-4">
            {/* Title */}
            <div
              data-aos="fade-up"
              data-aos-delay="100"
              data-aos-duration="800"
              data-aos-easing="ease-out-cubic">
              <span
                className="block text-white text-2xl sm:text-3xl md:text-[38px] leading-snug md:leading-[1.2]"
                style={{ fontFamily: "var(--font-cinzel-regular)" }}
              >
                {about && about[0]?.hero?.mainTitle}
              </span>
            </div>

            {/* Description */}
            <div
              data-aos="fade-up"
              data-aos-delay="200"
              data-aos-duration="1000"
              data-aos-easing="ease-out-cubic">
              <span
                className="text-gray-400 text-sm sm:text-base md:text-[16px] leading-relaxed md:leading-[1.8]"
                style={{ fontFamily: "var(--font-montserrat)" }}
              >
                {about && about[0]?.hero?.description}
              </span>
            </div>
          </div>

          {/* Book Now Button */}
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-block px-5 sm:px-6 py-2.5 sm:py-3 rounded-md font-medium transition-all duration-300 
                 shadow-md hover:shadow-[0_0_15px_rgba(190,149,69,0.5)]
                 bg-gradient-to-b from-[#BE9545] to-[#7A5E39] text-white text-sm sm:text-base cursor-pointer"
            >
              Book Now
            </button>

            <ThreeStepModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
            />
          </div>
        </div>

        {/* Polaroid Gallery */}
        <PolaroidGallery />

        {/* Mission & Vision */}
        <section className="mt-16 px-6 pb-20">
          {/* Section Header */}
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-[36px] font-medium text-[#BE9545] mb-2 tracking-wide"
              style={{ fontFamily: "var(--font-cinzel-regular)" }}
            >
              Mission & Vision
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="text-gray-400 text-[16px] leading-snug max-w-xl mx-auto"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              The core beliefs that drive our purpose — defining how we create, connect,
              and elevate experiences that last a lifetime.
            </motion.p>
          </div>

          {/* Mission & Vision Cards */}
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 text-gray-200">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="group flex flex-col items-start gap-5 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] 
                     p-10 rounded-2xl border border-[#BE9545]/20 
                     shadow-[0_0_25px_-8px_rgba(190,149,69,0.2)] 
                     hover:shadow-[0_0_35px_-6px_rgba(190,149,69,0.35)] 
                     hover:border-[#BE9545]/50 transition-all duration-500 hover:-translate-y-1"

              data-aos="fade-up-right"
              data-aos-delay="100"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#BE9545]/10 border border-[#BE9545]/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-[#BE9545]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6l4 2m-4-8a9 9 0 11-9 9 9 9 0 019-9z"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-[28px] text-[#BE9545] mb-2 tracking-[0.02em]"
                  style={{ fontFamily: "var(--font-cinzel-regular)" }}
                >
                  Our Mission
                </h3>
                <p
                  className="text-gray-400 leading-relaxed text-[16.5px] text-justify"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {about && about[0]?.missionDescription}
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="group flex flex-col items-start gap-5 bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] 
                     p-10 rounded-2xl border border-[#BE9545]/20 
                     shadow-[0_0_25px_-8px_rgba(190,149,69,0.2)] 
                     hover:shadow-[0_0_35px_-6px_rgba(190,149,69,0.35)] 
                     hover:border-[#BE9545]/50 transition-all duration-500 hover:-translate-y-1"
              data-aos="fade-up-left"
              data-aos-delay="250"
            >
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-[#BE9545]/10 border border-[#BE9545]/30">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-7 h-7 text-[#BE9545]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </div>
              <div>
                <h3
                  className="text-[28px] text-[#BE9545] mb-2 tracking-[0.02em]"
                  style={{ fontFamily: "var(--font-cinzel-regular)" }}
                >
                  Our Vision
                </h3>
                <p
                  className="text-gray-400 leading-relaxed text-[16.5px] text-justify"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {about && about[0]?.visionDescription}
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>


      {/* --- What We Believe --- */}
      <WhatWeBelievePage />

      {/* --- The OC Method --- */}
      <Methods />

      {/* --- Sustainability & Respect --- */}
      <section className="relative text-gray-200 px-6 py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A1A1A] via-[#101010] to-[#0D0D0D]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(190,149,69,0.08),transparent_60%)]"></div>

        <div className="relative container mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-[36px] font-[400] text-[#BE9545] mb-2 tracking-wide"
            style={{ fontFamily: "var(--font-cinzel-regular)" }}
          >
            Sustainability & Respect
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-gray-400 text-[16px] mb-10 sm:w-[60%] mx-auto leading-relaxed"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            We integrate mindful practices at every level — from the décor to the dining —
            ensuring your event looks exquisite while staying kind to the planet.
          </motion.p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 mt-10 justify-center"
            initial="hidden"
            whileInView="visible"
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                },
              },
            }}
          >
            {features.map((item, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                className="flex flex-col items-center justify-center gap-3 
              bg-gradient-to-b from-[#1a1a1a]/80 to-[#0c0c0c]/90 
              backdrop-blur-md border border-[#BE9545]/10 hover:border-[#BE9545]/40 
              hover:shadow-[0_0_20px_-5px_rgba(190,149,69,0.25)] 
              transition-all duration-500 p-5 rounded-2xl"
              >
                {item.icon}
                <span
                  className="text-gray-300 text-sm md:text-base leading-tight text-center"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>


      <ToolsMarquee />

      {/* BudgetsTimelines */}
      <BudgetsTimelines />

      {/* Banner */}
      <Banner />

    </>
  );
};

export default About_component;
