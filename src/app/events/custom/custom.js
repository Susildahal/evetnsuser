"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGlassCheers, FaMusic, FaStar, FaMapMarkerAlt, FaBirthdayCake, FaPalette, FaGlobeAmericas, FaPlane, FaLaptop } from "react-icons/fa";
import axiosInstance from "@/config/axios";
import SignatureIdeas from "@/component/Birthday/Signature-ideas";
import { PackagesComponent } from "@/component/Birthday/Birthday-package";
import { RunSheetNew } from "@/component/Birthday/Run-sheet";
import { BirthdayHeroSection } from "@/component/Birthday/Hero";
import { HeroSection } from "@/component/Birthday/Hero";

import BirthdayImg from "../../../../public/assets/img/eventimages/gg4444.jpg";

import { Cinzel, Montserrat } from "next/font/google";

const beachIdeas = [
  {
    id: "golden",
    label: "Immersive themes",
    icon: "FaPalette",
    image: "/assets/img/Event of OC/Anniversary/Wine.jpg",
  },
  {
    id: "villa",
    label: "One-night “worlds”",
    icon: "FaGlobeAmericas",
    image: "/assets/img/Event of OC/Wedding/Rings.jpg",
  },
  {
    id: "lounge",
    label: "Destination-style",
    icon: "FaPlane",
    image: "/assets/img/Event of OC/Anniversary/Drink.jpg",
  },
  {
    id: "beach",
    label: "Hybrid brand",
    icon: "FaLaptop",
    image: "/assets/img/content_image/beach.jpg",
  },
];

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "700", "900"],
  variable: "--font-cinzel",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "700", "900"],
  variable: "--font-montserrat",
});

export default function CustomPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/eventsdashboard', {
        params: {
          title: 'Custom'
        }
      });
      const responseData = res.data.data;
      setData(responseData && responseData.length > 0 ? responseData[0] : null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const faqs = data?.faqs?.map(faq => ({ q: faq.question, a: faq.answer })) || [
    { q: "Can you align with our brand guidelines?", a: "Yes—fonts, colours, tone and styling are matched precisely; we’ll integrate assets you supply" },
    { q: "Do you manage media and influencers?", a: "We can coordinate RSVPs, briefing notes and content flow; or work with your PR team" },
    { q: "What about staging the ‘reveal’?", a: "We design the moment—lighting cues, audio sting, drape drop or LED content sync" },
    // { q: "Is glass allowed poolside or on the sand?", a: "We offer premium polycarbonate options that look like glass and keep areas safe" },
    // { q: "Noise restrictions?", a: "We design audio to suit venue rules and nearby residents, with agreed cut-off times." },
    // { q: "Do you provide bar service?", a: "Yes—RSA-certified staff with cocktail packages or BYO management." },
    // { q: "What happens if it rains?", a: "We build a weather-safe Plan B (marquee/indoor switch) into every outdoor brief." },
    // { q: "Accessibility considerations?", a: "We’ll ensure access, seating and amenities suit your guests’ needs." },
  ];

  const packages = [
    { name: "Essential", desc: "Venue shortlist, core styling, DJ, basic lighting, photographer (2–3 hrs)", color: "#86489B" },
    { name: "Signature", desc: "Full concept, premium styling/florals, chef menu, DJ + sax, photographer (4–5 hrs)", color: "#F9A825" },
    { name: "Luxe", desc: "Private venue/villa, immersive lighting, feature install, live entertainment, full media team", color: "#A7F3D0" },
  ];

  return (
    <main className="bg-black text-white overflow-hidden">
      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-400 text-xl">Loading...</p>
        </div>
      ) : (
        <>
          {/* HERO */}
          <HeroSection
            topLabel={data?.hero?.subtitle || "Celebrate in Style"}
            title="Custom"
            highlightedText={data?.hero?.title || "Events"}
            description={data?.hero?.description || "Private brand experiences on an island deck? A secret supper in a warehouse with a single, glowing long table? A sunrise wellness event that ends in a champagne brunch? We craft one-off experiences built entirely around your story"}
            features={data?.hero?.contents?.map(content => ({
              title: content.title,
              desc: content.description
            })) || [
          { title: "Discovery ", desc: "We learn your purpose, guests and dream scenario." },
          { title: "Concept & Mood", desc: "You’ll receive a narrative, style board and preliminary budget." },
          { title: "Build & Book", desc: "Venue, suppliers and schedules locked; designs signed off." },
          { title: "Showtime", desc: "Our producers run the floor; you enjoy the moment." },
        ]}
        ctaButtons={[
          { text: "Book Your Event Now", type: "primary" },
        ]}
        imageSrc={data?.hero?.image || BirthdayImg}
        imageAlt="Custom Event"
        overlayTitle="Sunset Rooftop Party"
        overlayDesc="Downtown · 100 Guests · Premium Experience" />

      {/* WHAT WE HANDLE */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-[60px] sm:py-[80px]">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-[400] text-center mb-10 text-[#BE9545] ${cinzel.className}`}
        >
          What We Handle
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
          {[
            { icon: <FaMapMarkerAlt />, title: "Venue Sourcing", text: "Rooftops, waterfront spaces, private villas, boutique bars (Gold Coast & surrounds)." },
            { icon: <FaBirthdayCake />, title: "Catering", text: "Grazing islands, chef-led stations, sit-down courses, late-night snacks." },
            { icon: <FaMusic />, title: "Audio & Visuals", text: "DJ/MC, speech mics, ambient lighting, LED moments, live performers." },
            { icon: <FaStar />, title: "Style & Design", text: "Concepting, mood boards, tablescapes, signage, balloons/installs." },
            { icon: <FaGlassCheers />, title: "Floral & Decor", text: "Coastal luxe arrangements, sculptural pieces, photo-worthy backdrops." },
            { icon: <FaStar />, title: "Photography", text: "Documentary-style coverage, portrait set-ups, highlight reels." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{
                scale: 1.03,
                rotate: 2,
              }}
              transition={{
                scale: { duration: 0.5, ease: "easeInOut" },
                rotate: { duration: 0 },
              }}
              className="relative p-6 sm:p-8 rounded-2xl flex flex-col items-center justify-center text-center
              bg-gradient-to-br from-[#0B0B0B] via-[#1A1A1A] to-[#0B0B0B] shadow-lg transform-gpu
              hover:shadow-[0_0_30px_rgba(255,209,125,0.2)] transition-all duration-500 ease-in-out border border-[#BE9545]/20"
            >
              {/* Ambient light effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#BE9545]/10 via-[#FFD700]/10 to-[#BE9545]/5 blur-2xl pointer-events-none"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="text-3xl sm:text-4xl mb-4 text-[#BE9545] flex justify-center">{item.icon}</div>
                <h3 className={`text-lg sm:text-xl font-semibold mb-2 text-white ${montserrat.className}`}>{item.title}</h3>
                <p className={`text-sm sm:text-gray-200 leading-relaxed ${montserrat.className}`}>{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* SIGNATURE IDEAS */}
      <SignatureIdeas title="Signature Beach Concepts" ideas={beachIdeas} />

      {/* PACKAGES */}
      {/* <PackagesComponent /> */}

      {/* RunSheet */}
      {/* <RunSheetNew /> */}

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#0B0B0B] text-white">
        <div className="max-w-6xl mx-auto px-6">
          {/* Title */}
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-normal text-center mb-14 text-[#D7B26A]"
            style={{ fontFamily: "var(--font-cinzel-regular)" }}
          >
            FAQs
          </motion.h2>

          {/* Two per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-800 rounded-xl p-6 hover:border-[#D7B26A] transition-all duration-300 cursor-pointer"
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                {/* Question Button */}
                <div className="w-full text-left flex justify-between items-center">
                  <span className="font-semibold text-lg">{faq.q}</span>
                  <span className="text-xl">{openFaq === index ? "−" : "+"}</span>
                </div>

                {/* Smooth Expandable Answer */}
                <AnimatePresence initial={false}>
                  {openFaq === index && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeInOut",
                      }}
                      className="overflow-hidden mt-3"
                    >
                      <motion.p
                        initial={{ y: -6 }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-400 text-sm leading-relaxed"
                      >
                        {faq.a}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
        </>
      )}
    </main>
  );
}
