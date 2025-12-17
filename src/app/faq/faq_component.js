"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import SectionHeader from "@/component/Title";
import axiosInstance from "@/config/axios";
import AOS from "aos";
import "aos/dist/aos.css";

import { Cinzel, Montserrat, Raleway } from "next/font/google";

/* =================== FONTS =================== */
export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
});

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-cinzel",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-montserrat",
});

/* =================== FALLBACK DATA =================== */
const FALLBACK_FAQS = {
  General: [
    {
      question: "How do I book an event with Events OC?",
      answer:
        "Share your event date, guest count and budget. Once confirmed and deposit is paid, your date is secured.",
    },
    {
      question: "What payment schedule do you use?",
      answer:
        "Payment timelines are listed in your invoice. Late payments may result in cancellation.",
    },
  ],
  Cancellation: [
    {
      question: "Can I change my booking?",
      answer:
        "Changes are allowed if requested early. Availability and extra costs may apply.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Cancellations within 48 hours are non-refundable. Earlier cancellations may qualify for partial refunds.",
    },
  ],
  Catering: [
    {
      question: "What catering styles do you offer?",
      answer:
        "We offer canapés, grazing tables, feasting menus, plated meals and late-night snacks.",
    },
  ],
};

/* =================== COMPONENT =================== */
const FAQComponent = () => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);
  const [loading, setLoading] = useState(false);
  const [useFallback, setUseFallback] = useState(false);

  /* ========== AOS INIT ========== */
  useEffect(() => {
    AOS.init({
      duration: 900,
      offset: 100,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  /* ========== FETCH UNIQUE CATEGORIES (NO DUPLICATES) ========== */
  const getCategories = async () => {
    try {
      const res = await axiosInstance.get("/faqs", {
        params: { status: true ,
          limit: 100
         },
      });

      if (!res.data?.data?.length) throw new Error("Empty");

      // ✅ remove duplicate titles
      const map = new Map();

      res.data.data.forEach((item) => {
        const title = item?.title;
        if (title && !map.has(title)) {
          map.set(title, { id: title, title });
        }
      });

      const uniqueCategories = Array.from(map.values());

      setCategories(uniqueCategories);
      setActiveCategory(uniqueCategories[0]);
    } catch (error) {
      console.warn("Using fallback categories");
      const fallback = Object.keys(FALLBACK_FAQS).map((title) => ({
        id: title,
        title,
      }));
      setCategories(fallback);
      setActiveCategory(fallback[0]);
    }
  };

  /* ========== FETCH FAQS BY CATEGORY (STATUS TRUE ONLY) ========== */
  const getFAQs = async (category) => {
    try {
      setLoading(true);
      setUseFallback(false);

      const res = await axiosInstance.get("/faqs", {
        params: {
          title: category.title,
          status: true,
          limit: 100,
        },
      });

      if (!res.data?.data?.length) {
        setFaqs(FALLBACK_FAQS[category.title] || []);
        setUseFallback(true);
      } else {
        setFaqs(res.data.data);
      }
    } catch (error) {
      setFaqs(FALLBACK_FAQS[category.title] || []);
      setUseFallback(true);
    } finally {
      setLoading(false);
    }
  };

  /* ========== INITIAL LOAD ========== */
  useEffect(() => {
    getCategories();
  }, []);

  /* ========== LOAD FAQS ON CATEGORY CHANGE ========== */
  useEffect(() => {
    if (activeCategory) {
      getFAQs(activeCategory);
      setOpenIndex(null);
    }
  }, [activeCategory]);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-20 container mx-auto px-6 py-[60px]">
      <div data-aos="fade-down">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="This page summarises key points. For full details, please read our Terms & Conditions. By paying your deposit, you accept those Terms"
        />
      </div>

      {/* =================== CATEGORY TABS =================== */}
      <div className="flex flex-wrap justify-center gap-6 mt-8 mb-10">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category)}
            className={`${montserrat.className} px-5 py-2 rounded-full text-sm font-medium transition-all
              ${
                activeCategory?.id === category.id
                  ? "text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-[#BE9545]/20"
              }`}
            style={{
              background:
                activeCategory?.id === category.id
                  ? "linear-gradient(to bottom, #BE9545, #7A5E39)"
                  : undefined,
            }}
          >
            {category.title}
          </button>
        ))}
      </div>

      {/* =================== FAQ LIST =================== */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory?.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="max-w-3xl mx-auto space-y-4"
        >
          {loading ? (
            <p className="text-center text-gray-400">Loading FAQs...</p>
          ) : (
            faqs.map((item, index) => (
              <div
                key={index}
                className="bg-linear-to-br from-black to-[#BE9545]/20 border border-gray-600 rounded-2xl overflow-hidden"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span
                    className={`${montserrat.className} text-gray-300 text-base`}
                  >
                    {item.question}
                  </span>
                  {openIndex === index ? (
                    <ChevronUp className="text-[#BE9545]" />
                  ) : (
                    <ChevronDown className="text-[#BE9545]" />
                  )}
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-4 text-gray-300 text-sm border-t border-gray-700">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))
          )}

          {useFallback && (
            <p className="text-center text-xs text-gray-400 mt-6">
              Showing standard FAQs. Live updates may be temporarily unavailable.
            </p>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FAQComponent;
