"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import SectionHeader from "@/component/Title";

import { Cinzel, Montserrat, Raleway } from "next/font/google";

import AOS from "aos";
import "aos/dist/aos.css";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
});

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

const faqCategories = {
  General: [
    {
      question: "How do I book an event with Events OC?",
      answer:
        "Start by sharing your date, guest count, vibe and budget guide. We will send a tailored proposal. Your date is secured once the non-refundable deposit is paid (see your invoice for the amount).",
    },
    {
      question: "What payment schedule do you use?",
      answer:
        "Your invoice confirms due dates. If a payment is not received on time, we may cancel services per our Terms.",
    },
    {
      question: "What is included in your proposals?",
      answer:
        "Clear scope, inclusions, and an itemised price. Typical inclusions are producer time, venue sourcing (if requested), supplier bookings, run sheet, and on-day coordination. Optional extras (e.g., live streaming, custom fabrication) are listed separately.",
    },
    {
      question: "Do you work outside the Gold Coast?",
      answer:
        "Yes—Gold Coast & surrounds. Travel and logistics fees may apply and will be listed in your quote.",
    },
  ],
  Cancellations: [
    {
      question: "Can I change my date, time, location or services?",
      answer:
        "We will make reasonable efforts to accommodate advance requests. Availability is not guaranteed and additional costs may apply.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "Within 48 hours of the event: no refund. More than 2 days out: you may be eligible for a partial refund (the deposit is non-refundable). All third-party supplier policies flow through to you and will be clarified at time of booking.",
    },
    {
      question: "Who is responsible for guest behaviour and safety?",
      answer:
        "You are responsible for the safety and conduct of your guests. We’re not liable for loss, damage, injury or expense except where caused by our proven negligence.",
    },
  ],
  Permits: [
    {
      question: "Do you find and book the venue?",
      answer:
        "Yes—our Venue Sourcing service shortlists 3 to 6 options with specs, floor plans and indicative pricing. We arrange site visits, date holds and handle contracting once you approve.",
    },
    {
      question: "Do beach or public-space events need permits?",
      answer:
        "Some locations require council or foreshore permits. We will advise and apply where relevant, and we will build a Plan B for weather.",
    },
    {
      question: "Can you work in private homes or Airbnbs?",
      answer:
        "Absolutely. We will assess access, noise, power and any owner/host rules before confirming.",
    },
  ],
  Catering: [
    {
      question: "What catering styles do you offer?",
      answer:
        "Canapés, chef stations, grazing tables, feasting or plated menus, plus late-night bites. Dietaries are planned in advance and clearly labelled.",
    },
    {
      question: "Do you do BYO bars?",
      answer:
        "Yes—where the venue permits. We can manage glassware (including premium, safe polycarbonate for pool/beach), ice, bar kit and RSA-certified staff.",
    },
    {
      question: "Are tastings available?",
      answer:
        "Where our partner caterers offer tastings, we will let you know availability and any fees.",
    },
  ],
};

const FAQComponent = () => {

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      offset: 100,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);

  const [activeCategory, setActiveCategory] = useState("General");
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const currentFAQs = faqCategories[activeCategory];

  return (
    <div className="mt-20 container mx-auto px-6 py-[60px]">
      <div data-aos="fade-down">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="This page summarises key points. For full details, please read our Terms & Conditions. By paying your deposit, you accept those Terms"
        />
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mt-8 mb-10">
        {Object.keys(faqCategories).map((category) => (
          <button
            key={category}
            onClick={() => {
              setActiveCategory(category);
              setOpenIndex(null);
            }}
            className={`${raleway.className} px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer
              ${activeCategory === category
                ? "text-black"
                : "bg-gray-800 text-gray-300 hover:bg-[#BE9545]/20"
              }`}
            style={{
              fontFamily: "var(--font-raleway)",
              background: activeCategory === category
                ? "linear-gradient(to bottom, #BE9545, #7A5E39)"
                : undefined
            }}
          >
            {category}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4 }}
          className="max-w-full sm:max-w-2xl md:max-w-3xl mx-auto space-y-4"
        >
          {currentFAQs.map((item, index) => (
            <div
              key={index}
              className={`bg-linear-to-br from-black to-[#BE9545]/20 border border-gray-600 rounded-2xl shadow-lg overflow-hidden`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 text-left cursor-pointer"
              >
                <span className={`text-sm sm:text-base md:text-lg lg:text-xl font-medium text-white tracking-wide ${raleway.className}`}>
                  {item.question}
                </span>
                <span className="text-[#BE9545] transition-transform duration-300">
                  {openIndex === index ? (
                    <ChevronUp className="w-4 sm:w-5 h-4 sm:h-5" />
                  ) : (
                    <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5" />
                  )}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    key="content"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                  >
                    <div className={`${raleway.className} px-4 sm:px-6 md:px-8 pb-4 pt-2 text-gray-300 text-[13px] sm:text-sm md:text-[15px] leading-relaxed text-justify border-t border-gray-700`}>
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FAQComponent;
