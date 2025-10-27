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
import WhereWePlay from "@/component/Where-we-play";
import WhatWeCreate from "@/component/What-we-create";
import BudgetsTimelines from "@/component/Budget-timeline";
import Banner from "@/component/Banner";
import ToolsMarquee from "@/component/Tools-Tech";
import { motion } from "framer-motion";
import ThreeStepModal from "../../component/Modal"
import { Leaf, Recycle, Lightbulb, Droplets, Globe2, Plant, Truck, HeartHandshake, Hammer, MessageCircle, Clock, Accessibility, Laptop, BarChart2, Users, Layout, Server, ClipboardCheck } from "lucide-react";

const tools = [
  { title: "Project Clarity", desc: "Detailed timelines, supplier matrices, and guest-flow maps for transparent execution.", icon: <BarChart2 className="w-7 h-7 text-[#BE9545]" /> },
  { title: "Collaborative Platforms", desc: "Slack, Notion, and Trello ensure our creative and logistics teams move in sync.", icon: <Users className="w-7 h-7 text-[#BE9545]" /> },
  { title: "Design Visualization", desc: "Figma & 3D floor mapping tools to preview spatial layouts and aesthetics.", icon: <Layout className="w-7 h-7 text-[#BE9545]" /> },
  { title: "On-Site Ops", desc: "RF comms, real-time dashboards, and checklists to keep live events smooth.", icon: <Server className="w-7 h-7 text-[#BE9545]" /> },
  { title: "Client Dashboards", desc: "Live status updates, file sharing, and transparent cost tracking.", icon: <Laptop className="w-7 h-7 text-[#BE9545]" /> },
  { title: "Feedback Analytics", desc: "Post-event reports, guest insights, and engagement metrics for refinement.", icon: <ClipboardCheck className="w-7 h-7 text-[#BE9545]" /> },
];


const About_component = () => {
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
                We don’t just plan parties,
                <br className="hidden sm:block" /> We craft moments that live forever.
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
                style={{ fontFamily: "var(--font-raleway)" }}
              >
                Think luxury meets wild freedom, wrapped in a Gen Z edge andfinished with a touch of coastal elegance. Whether you crave something secretive and mysterious or radiant and unforgettable, we design experiences that feel like stepping into another world — one where every detail is curated to perfection, from the catering to the lighting, from the music to the photographs that capture it all.
                <br />
                {/* Our clients are dreamers, travellers, and nightlife seekers who want more than the ordinary. We don’t do cookie-cutter. We don’t do basic. We createthe best you can possibly get — an event that reflects you, stuns your guests, and sets the standard others can’t touch. */}
                There are no limits here. Only experiences worth remembering. Because at Events OC, we believe every event should feel like the event of the century
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
              style={{ fontFamily: "var(--font-raleway)" }}
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
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  To craft extraordinary, immersive experiences that go far beyond
                  the ordinary — blending luxury, creativity, and emotion into
                  moments that live forever.
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
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  To redefine what an event can be — transforming gatherings into art
                  forms that inspire, connect, and set the new global standard for
                  celebration.
                </p>
              </div>
            </motion.div>
          </div>
        </section>
      </div>


      {/* --- What We Believe --- */}
      <WhatWeBelievePage />

      {/* --- What We Do --- */}
      {/* <section className="mt-24 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-[#111]/60 to-[#0a0a0a]/80 rounded-3xl blur-[1px]"></div>

            <div className="relative z-10">
              <div className="text-center mb-12">
                <h2
                  className="text-[36px] md:text-[42px] text-[#BE9545] tracking-[0.02em] mb-3"
                  style={{ fontFamily: "var(--font-cinzel-regular)" }}
                >
                  What We Do
                </h2>
                <p
                  className="text-gray-400 text-[17px] max-w-[700px] mx-auto"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  From concept to celebration — we design, produce, and deliver events
                  that inspire and captivate every sense.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-[1100px] mx-auto">
                {[
                  {
                    icon: "🏛️",
                    title: "Venue Sourcing",
                    desc: "Rooftops, villas, galleries, warehouses, and beach clubs — permits and contracts handled.",
                  },
                  {
                    icon: "🍸",
                    title: "Catering",
                    desc: "From canapés to feasting; chef-led stations; signature cocktails and premium zero-alc options.",
                  },
                  {
                    icon: "🎧",
                    title: "Audio & Visuals",
                    desc: "Engineered PA, wireless mics, show lighting, LED/projection, and live streaming setups.",
                  },
                  {
                    icon: "🎨",
                    title: "Style & Design",
                    desc: "Concepts, floor plans, furniture, linens, signage, and custom fabrication — all in sync.",
                  },
                  {
                    icon: "🌸",
                    title: "Floral",
                    desc: "Coastal-ready palettes, sculptural installs, and repurpose strategies for sustainable elegance.",
                  },
                  {
                    icon: "📸",
                    title: "Photography",
                    desc: "Candid energy meets editorial polish — highlight reels, fast previews, and timeless captures.",
                  },
                ].map((service, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-b from-[#1a1a1a] to-[#0c0c0c] border border-[#BE9545]/10 hover:border-[#BE9545]/40 rounded-2xl p-8 shadow-[0_0_30px_-10px_rgba(190,149,69,0.25)] hover:shadow-[0_0_35px_-5px_rgba(190,149,69,0.3)] transition-all duration-500 hover:-translate-y-1"
                  >
                    <div className="text-4xl mb-4">{service.icon}</div>

                    <h3
                      className="text-[20px] text-[#BE9545] mb-3 tracking-[0.02em]"
                      style={{ fontFamily: "var(--font-cinzel-regular)" }}
                    >
                      {service.title}
                    </h3>

                    <p
                      className="text-gray-400 text-[15px] leading-[1.8]"
                      style={{ fontFamily: "var(--font-raleway)" }}
                    >
                      {service.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section> */}

      {/* --- The OC Method --- */}
      <Methods />

      {/* --- Our Team --- */}
      {/* <OurTeamSection /> */}

      {/* --- Where We Play --- */}
      {/* <section className="mt-32 relative overflow-hidden bg-gradient-to-b from-[#0b0b0b] via-[#090909] to-[#000]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(190,149,69,0.08)_0%,transparent_70%)] blur-2xl opacity-70"></div>

            <div className="relative z-10 grid md:grid-cols-2 gap-14 items-start max-w-[1250px] mx-auto px-6">
              <div className="space-y-8">
                <h2
                  className="text-[38px] md:text-[46px] text-[#BE9545] leading-tight drop-shadow-[0_0_10px_rgba(190,149,69,0.3)]"
                  style={{ fontFamily: "var(--font-cinzel-regular)" }}
                >
                  Where We Play
                </h2>

                <p
                  className="text-gray-400 text-[17.5px] leading-[1.85]"
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  Based on the <span className="text-white font-semibold">Gold Coast</span>;
                  working across Surfers, Burleigh, Broadbeach and surrounds — including{" "}
                  <span className="text-white font-semibold">Brisbane</span>,{" "}
                  <span className="text-white font-semibold">Byron</span>, and the{" "}
                  <span className="text-white font-semibold">Sunshine Coast</span> on request.
                  <br /><br />
                  We handle council and venue permissions where required and always build a
                  weather-safe <span className="text-[#BE9545] font-semibold">Plan B</span>.
                </p>

                <div className="relative mt-6 before:content-[''] before:absolute before:left-0 before:top-0 before:w-[2px] before:h-full before:bg-gradient-to-b before:from-[#BE9545]/70 before:to-transparent pl-6">
                  <ul className="space-y-3 text-gray-300 text-[16px]" style={{ fontFamily: "var(--font-raleway)" }}>
                    <li className="relative"><span className="text-[#BE9545] mr-2">•</span> Rooftops & coastal villas</li>
                    <li className="relative"><span className="text-[#BE9545] mr-2">•</span> Luxury beach clubs & boutique resorts</li>
                    <li className="relative"><span className="text-[#BE9545] mr-2">•</span> Urban warehouses & open-air festivals</li>
                  </ul>
                </div>

                <div className="mt-10 space-y-4">
                  <h3
                    className="text-[28px] text-[#BE9545] mb-2"
                    style={{ fontFamily: "var(--font-cinzel-regular)" }}
                  >
                    Signature Styles
                  </h3>
                  <ul className="space-y-2 text-gray-400 text-[16px]" style={{ fontFamily: "var(--font-raleway)" }}>
                    <li>• Coastal Luxe: stone, linen, candlelight, sculptural florals.</li>
                    <li>• After-Dark Chrome: mirror accents, neon moments, deep tones, dramatic light.</li>
                    <li>• Editorial Minimal: clean lines, tonal palette, one strong statement.</li>
                  </ul>
                  <p className="text-gray-400 mt-2" style={{ fontFamily: "var(--font-raleway)" }}>
                    Or we’ll design a custom world that’s entirely yours.
                  </p>
                </div>
              </div>

              <div className="relative h-[460px] md:h-[540px] rounded-3xl overflow-hidden shadow-[0_0_40px_-10px_rgba(190,149,69,0.35)] group">
                <img
                  src="/assets/img/map-goldcoast.jpg"
                  alt="Gold Coast Map"
                  className="w-full h-full object-cover brightness-[0.65] group-hover:brightness-[0.9] transition-all duration-[1200ms] ease-[cubic-bezier(0.19,1,0.22,1)] scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/85 via-[#0a0a0a]/40 to-transparent"></div>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-[radial-gradient(circle_at_center,rgba(190,149,69,0.25)_0%,transparent_60%)] transition-opacity duration-700"></div>

                <div className="absolute bottom-8 left-8 right-8 md:right-auto">
                  <h3
                    className="text-[#BE9545] text-[24px] md:text-[26px] mb-1"
                    style={{ fontFamily: "var(--font-cinzel-regular)" }}
                  >
                    Gold Coast & Beyond
                  </h3>
                  <p
                    className="text-gray-300 text-[15.5px]"
                    style={{ fontFamily: "var(--font-raleway)" }}
                  >
                    Surfers • Burleigh • Broadbeach • Brisbane • Byron • Sunshine Coast
                  </p>
                </div>
              </div>
            </div>
          </section> */}
      {/* <WhereWePlay/> */}

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
            style={{ fontFamily: "var(--font-raleway)" }}
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
                  style={{ fontFamily: "var(--font-raleway)" }}
                >
                  {item.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- Technology & Tools --- */}
      {/* <section className="relative mt-32 px-6 py-32 overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-[-150px] left-[-100px] w-[400px] h-[400px] rounded-full bg-[#BE9545]/10 blur-3xl"></div>
            <div className="absolute bottom-[-120px] right-[-80px] w-[350px] h-[350px] rounded-full bg-[#BE9545]/5 blur-2xl"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-[#111] to-[#0a0a0a]"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold text-[#BE9545] mb-4"
              style={{ fontFamily: "var(--font-cinzel-regular)" }}
            >
              Technology & Tools
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="text-gray-400 text-[17px] leading-relaxed"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              Cutting-edge tools power our workflow — keeping every project precise, efficient, and innovative.
            </motion.p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {tools.map((tool, index) => {
              const isLeft = index % 2 === 0;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isLeft ? -100 : 100, y: 0 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.7, delay: index * 0.2 }}
                  className={`relative mb-20 w-full flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  <div className="max-w-[45%] bg-[#1a1a1a]/70 backdrop-blur-md rounded-3xl p-8 shadow-[0_0_25px_-5px_rgba(190,149,69,0.2)] hover:shadow-[0_0_35px_-5px_rgba(190,149,69,0.35)] transition-all">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 flex items-center justify-center bg-[#BE9545]/10 rounded-full mr-4">
                        {tool.icon}
                      </div>
                      <h3 className="text-[#BE9545] font-semibold text-lg" style={{ fontFamily: "var(--font-cinzel-regular)" }}>{tool.title}</h3>
                    </div>
                    <p className="text-gray-300 text-[15px] leading-[1.7]" style={{ fontFamily: "var(--font-raleway)" }}>{tool.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section> */}
      <ToolsMarquee />

      {/* Video Section */}
      {/* <div className="relative w-full h-[600px] overflow-hidden rounded-2xl shadow-lg mt-20">
          <video
            className="absolute top-0 left-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/assets/videos/hero.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="absolute bottom-10 left-10 text-left px-4 max-w-[600px]">
            <span
              className="text-white text-[38px] tracking-[0.03em] leading-[1.3]"
              style={{ fontFamily: "var(--font-cinzel-regular)" }}
            >
              Beyond Ordinary Experiences
            </span>
            <p
              className="text-white mt-3 text-[16px] leading-[1.8]"
              style={{ fontFamily: "var(--font-raleway)" }}
            >
              We create the best you can possibly get — an event that reflects
              you, stuns your guests, and sets the standard others can’t touch.
            </p>
          </div>
        </div> */}

      {/* WhatWeCreate */}
      {/* <WhatWeCreate /> */}

      {/* BudgetsTimelines */}
      <BudgetsTimelines />

      {/* Banner */}
      <Banner />

    </>
  );
};

export default About_component;
