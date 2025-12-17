"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Cinzel, Montserrat } from "next/font/google";
import PropTypes from "prop-types";
import ThreeStepModal from "../Modal";
import { useState,useEffect } from "react";
import axiosInstance from "@/config/axios";


export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-cinzel",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-montserrat",
});


export const HeroSection = ({
  topLabel,
  title,
  highlightedText,
  description,
  features = [],
  ctaButtons = [],
  imageSrc,
  imageAlt,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data , setData] = useState({});  

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/eventsdashboard' , {
        params: {
          title: 'birthday'
        }
      });
      setData(response.data.data);
    }
    catch (error) {
      console.error("Error fetching data:", error);
    }
  };
          
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="relative overflow-hidden mt-[100px] py-[50px]">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0B] via-[#111111] to-[#0B0B0B]" />

      {/* Ambient Glows */}
      <div className="absolute -top-36 -left-36 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-[#BE9545]/20 blur-[120px] md:blur-[180px] rounded-full" />
      <div className="absolute -bottom-36 -right-36 w-[250px] sm:w-[350px] md:w-[400px] lg:w-[500px] h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] bg-[#BE9545]/10 blur-[120px] md:blur-[180px] rounded-full" />

      {/* Content Wrapper */}
      <div className="relative container mx-auto px-4 max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

        {/* LEFT: Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-left"
        >
          <span
            className="uppercase tracking-[0.2em] text-[#BE9545] text-xs sm:text-sm font-semibold"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {topLabel}
          </span>

          <h2
            className="text-3xl sm:text-4xl md:text-[40px] lg:text-[48px] leading-tight text-white font-semibold mt-3 mb-4 md:mb-5"
            style={{ fontFamily: "var(--font-cinzel-regular)" }}
          >
            {title} {highlightedText && <span className="text-[#BE9545]">{highlightedText}</span>}
          </h2>

          <p
            className="text-gray-400 text-[14px] sm:text-[15px] md:text-[16px] lg:text-[17px] leading-[1.7] mb-6 md:mb-8 text-justify"
            style={{ fontFamily: "var(--font-montserrat)" }}
          >
            {description}
          </p>

          {/* Highlight Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-10">
            {features.map((item, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.02 }}
                className="border-l-4 border-[#BE9545] pl-3 sm:pl-4 py-2"
              >
                <h4
                  className="text-white text-sm sm:text-[16px] md:text-[17px] font-semibold mb-1"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {item.title}
                </h4>
                <p
                  className="text-gray-400 text-xs sm:text-[14px] md:text-[15px]"
                  style={{ fontFamily: "var(--font-montserrat)" }}
                >
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Buttons */}
          {/* Buttons */}
          <div className="flex flex-row flex-wrap gap-4 justify-start">
            {ctaButtons.map((btn, idx) => (
              <div key={idx} className="relative">
                <motion.button
                  onClick={() => setIsModalOpen(true)}
                  className={`px-6 sm:px-8 py-2 sm:py-3 rounded-full font-medium tracking-wide transition-all duration-300 cursor-pointer text-sm sm:text-base ${btn.type === "primary"
                      ? "bg-[#BE9545] text-black hover:bg-[#A67C33]"
                      : "border border-[#BE9545] text-[#BE9545] hover:bg-[#FFD700]/10"
                    }`}
                >
                  {btn.text}
                </motion.button>

                {/* Only one modal for all buttons */}
                <ThreeStepModal
                  isOpen={isModalOpen}
                  onClose={() => setIsModalOpen(false)}
                />
              </div>
            ))}
          </div>


        </motion.div>

        {/* RIGHT: Hero Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative flex justify-center w-full"
        >
          <div className="relative overflow-hidden rounded-[20px] sm:rounded-[25px] md:rounded-[30px] border border-[#FFD700]/30 shadow-2xl group w-full max-w-full md:max-w-[500px]">
            <Image
              src={imageSrc}
              alt={imageAlt}
              width={500}
              height={500}
              className="object-cover w-full h-[300px] sm:h-[400px] md:h-[450px] lg:h-[500px] transition-transform duration-700 group-hover:scale-105 rounded-[20px] sm:rounded-[25px] md:rounded-[30px]"
              quality={100}
            />

            {/* Overlay */}
            {/* {overlayTitle && (
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-start p-4 sm:p-6">
                <div>
                  <h4
                    className="text-white text-lg sm:text-xl md:text-2xl font-semibold"
                    style={{ fontFamily: "var(--font-cinzel-regular)" }}
                  >
                    {overlayTitle}
                  </h4>
                  {overlayDesc && (
                    <p
                      className="text-[#BE9545] text-xs sm:text-sm md:text-base"
                      style={{ fontFamily: "var(--font-montserrat)" }}
                    >
                      {overlayDesc}
                    </p>
                  )}
                </div>
              </div>
            )} */}
          </div>

          {/* Floating Glow Accent */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="absolute -bottom-6 -right-6 w-20 sm:w-24 md:w-28 lg:w-32 h-20 sm:h-24 md:h-28 lg:h-32 bg-[#FFD700]/40 blur-2xl rounded-full"
          />
        </motion.div>
      </div>
    </section>
  );
};

// PropTypes validation
HeroSection.propTypes = {
  topLabel: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  highlightedText: PropTypes.string,
  description: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      desc: PropTypes.string.isRequired,
    })
  ).isRequired,
  ctaButtons: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      type: PropTypes.oneOf(["primary", "secondary"]),
      onClick: PropTypes.func,
    })
  ),
  imageSrc: PropTypes.any.isRequired,
  imageAlt: PropTypes.string.isRequired,
  overlayTitle: PropTypes.string,
  overlayDesc: PropTypes.string,
};
