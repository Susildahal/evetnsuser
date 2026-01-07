"use client";

import { motion, AnimatePresence } from "framer-motion";
import React, { useState, useEffect } from "react";
import { FaGlassCheers, FaMusic, FaStar, FaMapMarkerAlt, FaBirthdayCake, FaCarSide  } from "react-icons/fa";
import SignatureIdeas from "@/component/Birthday/Signature-ideas";
import { PackagesComponent } from "@/component/Birthday/Birthday-package";
import { RunSheetNew } from "@/component/Birthday/Run-sheet";
import { HeroSection } from "@/component/Birthday/Hero";
import { Cinzel, Montserrat } from "next/font/google";
import AOS from "aos";
import "aos/dist/aos.css";
import axiosInstance from "@/config/axios";

import BirthdayImg from "../../../../public/assets/img/Event of OC/Birthday/Birthday Celebration 1.jpg";
import Skeleton from "@/UI/Skeleton";

const birthdayIdeas = [
  {
    id: "golden",
    label: "Golden Hour Rooftop",
    icon: "FaSun",
    image: "/assets/img/birthday/birthday.webp",
  },
  {
    id: "villa",
    label: "Private Villa Dinner",
    icon: "FaUtensils",
    image: "/assets/img/birthday/birthday1.jpg",
  },
  {
    id: "lounge",
    label: "After-Dark Lounge",
    icon: "FaGlassMartiniAlt",
    image: "/assets/img/Event of OC/Birthday/Cake.jpg",
  },
  // {
  //     id: "beach",
  //     label: "Beach Party",
  //     icon: "FaCocktail",
  //     image: "/assets/img/content_image/beach.jpg",
  // },
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


export default function BirthdayPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getdata = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get('/eventsdashboard', {
        params: {
          title: 'Birthday'
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


  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: "ease-out",
      offset: 100,
    });
  }, []);

  const faqs = data?.faqs?.map(faq => ({ q: faq.question, a: faq.answer })) || [
    { q: "What's included in your birthday packages?", a: "Full event management, premium styling, catering coordination, entertainment and photography." },
    { q: "Do you organise cakes and entertainment?", a: "Yes—custom cakes, performers, DJs, live sax/strings, magicians and more." },
    { q: "Can you work in my home or Airbnb?", a: "Absolutely. We’ll assess access, noise and styling logistics, and obtain permissions where needed." },
    { q: "What about noise and neighbours?", a: "We’ll plan levels with the venue and follow local guidelines, recommending finishing times where appropriate." },

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
     <Skeleton  />
        </div>
      ) : (
        <>
          {/* HERO */}
          <HeroSection
            topLabel="Celebrate in Style"   
            title="Magical"
            highlightedText={data?.hero?.title || "Birthday Events"}
            description={data?.hero?.description || "From sunset rooftop cocktails in Surfers to a candle-lit private dinner in Burleigh, we curate birthday celebrations that feel effortless, elevated and absolutely you. Think: statement styling, next-level catering, crisp audio for speeches, and photographs that look editorial."}
            features={data?.hero?.contents?.map(content => ({
              title: content.title,
              desc: content.description
            })) || [
              { title: "Curated Themes", desc: "Unique birthday themes tailored to your style and mood." },
              { title: "Premium Venues", desc: "Handpicked venues that match your vision and guest count." },
              { title: "Entertainment", desc: "Live DJs, performers, and interactive experiences." },
              { title: "Seamless Planning", desc: "End-to-end event coordination for stress-free celebrations." },
            ]}
            ctaButtons={[
              { text: "Book Your Event Now", type: "primary" },
            ]}
            imageSrc={data?.hero?.image || BirthdayImg}
            imageAlt="Birthday Celebration"
            overlayTitle="Sunset Rooftop Party"
            overlayDesc="Downtown · 100 Guests · Premium Experience"
          />

      {/* WHAT WE HANDLE */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-12 py-[60px] sm:py-[80px] text-white">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className={`text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-[400] text-center mb-10 text-[#BE9545] ${cinzel.className}`}
          data-aos="fade-up"
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
{
  icon: <FaCarSide />,
  title: "Transport",
  text: "Guest shuttles, private transfers, VIP arrivals, and seamless arrival & departure coordination."
}

          ].map((item, i) => (
            <motion.div
              key={item.title}
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
              data-aos="fade-up"
              data-aos-delay={i * 150}
              data-aos-duration="800"
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
      <SignatureIdeas ideas={birthdayIdeas} />

      {/* PACKAGES */}
      {/* <PackagesComponent /> */}

      {/* RunSheet */}
      <RunSheetNew />

      {/* FAQ SECTION */}
      <section className="py-20 bg-[#0B0B0B]">
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
                  <span className="text-gray-300 font-semibold text-lg">{faq.q}</span>
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
