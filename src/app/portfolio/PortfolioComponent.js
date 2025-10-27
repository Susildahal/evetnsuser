"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader, { raleway } from "@/component/Title";

import AOS from "aos";
import "aos/dist/aos.css";

// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Project images
import Project1a from "/public/assets/img/Event of OC/Anniversary/Champagne.jpg";
import Project1b from "/public/assets/img/Event of OC/Anniversary/Drink.jpg";
import Project1c from "/public/assets/img/Event of OC/Anniversary/Drinks.jpg";
import Project1d from "/public/assets/img/Event of OC/Anniversary/Pink-Wine.jpg";
import Project1e from "/public/assets/img/Event of OC/Anniversary/Red Wine.jpg";

import { Cinzel, Montserrat } from "next/font/google";

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

const projects = [
  {
    title: "Private Birthday at The Island Rooftop",
    short_description:
      "Events OC secured a private rooftop space at The Island for a client’s birthday, accommodating up to 20 guests.",
    description:
      "Events OC secured a private rooftop space at The Island for a client’s birthday, accommodating up to 20 guests. The booking was confirmed within a single day, even on a weekend, and included complimentary arrival shots for the group, negotiated as part of the package. The celebration was seamless, and guests left with an unforgettable experience.",
    images: [Project1d, Project1a, Project1b, Project1c, Project1e],
    reviews: [
      {
        name: "John Doe",
        rating: 5,
        comment: "Amazing experience! Everything was perfect."
      },
      {
        name: "Jane Smith",
        rating: 4.5,
        comment: "Very smooth booking and great venue."
      },
    ],
    date: "June 2025",
  },
  {
    title: "Private Birthday at The Island Rooftop",
    short_description:
      "Events OC secured a private rooftop space at The Island for a client’s birthday, accommodating up to 20 guests.",
    description:
      "Events OC secured a private rooftop space at The Island for a client’s birthday, accommodating up to 20 guests. The booking was confirmed within a single day, even on a weekend, and included complimentary arrival shots for the group, negotiated as part of the package. The celebration was seamless, and guests left with an unforgettable experience.",
    images: [Project1e, Project1c, Project1d],
    reviews: [
      { name: "John Doe", rating: 5, comment: "Amazing experience! Everything was perfect." },
      { name: "Jane Smith", rating: 4.5, comment: "Very smooth booking and great venue." },
    ],
    date: "June 2025",
  },
  // {
  //   title: "Private Birthday at The Island Rooftop",
  //   short_description:
  //     "Events OC secured a private rooftop space at The Island for a client’s birthday, accommodating up to 20 guests.",
  //   description:
  //     "Events OC secured a private rooftop space at The Island for a client’s birthday, accommodating up to 20 guests. The booking was confirmed within a single day, even on a weekend, and included complimentary arrival shots for the group, negotiated as part of the package. The celebration was seamless, and guests left with an unforgettable experience.",
  //   images: [Project1b, Project1d, Project1e],
  //   reviews: [
  //     { name: "John Doe", rating: 5, comment: "Amazing experience! Everything was perfect." },
  //     { name: "Jane Smith", rating: 4.5, comment: "Very smooth booking and great venue." },
  //   ],
  //   date: "June 2025",
  // },

];

const PortfolioFlexGridOverlay = () => {
  useEffect(() => {
    AOS.init({ duration: 900, offset: 100, once: true, easing: "ease-out-cubic" });
  }, []);

  const [activeTabs, setActiveTabs] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);

  const handleTabClick = (index, tab) => setActiveTabs((prev) => ({ ...prev, [index]: tab }));

  const openLightbox = (images, index) => {
    setLightboxImages(images.map((img) => ({ src: img.src || img })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="mt-20 container mx-auto px-6 py-[60px]">
      <div data-aos="fade-down">
        <SectionHeader title="Portfolio" />
      </div>

      <Lightbox
        open={lightboxOpen}
        index={lightboxIndex}
        close={() => setLightboxOpen(false)}
        slides={lightboxImages}
      />

      {/* Flex Grid */}
      <div className="flex gap-4">
        {projects.map((project, index) => {
          const isHovered = hoveredCard === index;
          const activeTab = activeTabs[index] || "Description";

          return (
            <motion.div
              key={index}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              layout
              animate={{ flex: isHovered ? 3 : hoveredCard !== null ? 1 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative rounded-3xl overflow-hidden shadow-2xl cursor-pointer bg-[#111]"
            >
              <div className="relative w-full h-80 md:h-[360px] lg:h-[400px]">
                <Image
                  src={project.images[0]}
                  alt={project.title}
                  className="object-cover w-full h-full rounded-3xl"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent rounded-3xl" />

                {/* Hover Overlay */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      className="absolute inset-0 bg-black/90 flex flex-col justify-start p-6 z-20 rounded-3xl border border-[#7A5E39] backdrop-blur-sm"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.4 }}
                    >
                      {/* Tabs */}
                      <div className="flex flex-wrap gap-3 mb-4">
                        {["Description", "Images", "Reviews"].map((tab) => (
                          <motion.button
                            key={tab}
                            onClick={() => handleTabClick(index, tab)}
                            className={`${raleway.className} px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === tab ? "bg-[#D7B26A] text-black shadow-lg" : "bg-gray-700 text-gray-300"
                              }`}
                          >
                            {tab}
                          </motion.button>
                        ))}
                      </div>

                      {/* Tab Content */}
                      <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.4 }}
                        className="text-white mt-2 text-[15px] md:text-[16px] font-montserrat overflow-auto"
                      >
                        {/* Description */}
                        {activeTab === "Description" && <p className={`${raleway.className} text-justify`}>{project.description}</p>}

                        {/* Images */}
                        {activeTab === "Images" && (
                          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
                            {project.images.map((img, idx) => (
                              <div
                                key={idx}
                                className="w-full aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer"
                                onClick={() => openLightbox(project.images, idx)}
                              >
                                <Image src={img} alt={`${project.title} image ${idx + 1}`} className="object-cover w-full h-full" placeholder="blur" />
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Reviews */}
                        {activeTab === "Reviews" && (
                          <div className="flex flex-col gap-6 mt-2">
                            {/* Existing Reviews */}
                            {project.reviews.map((review, idx) => (
                              <motion.div
                                key={idx}
                                className="bg-gray-800/70 p-4 rounded-xl shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-gray-700/80 transition-colors duration-300"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                              >
                                {/* Avatar / Initials */}
                                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#D7B26A] text-black font-semibold text-lg">
                                  {review.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </div>

                                {/* Review Content */}
                                <div className="flex-1">
                                  <div className="flex items-center justify-between mb-1">
                                    <h4 className={`font-semibold text-white ${raleway.className}`}>{review.name}</h4>
                                    <div className="flex items-center gap-1">
                                      {Array.from({ length: 5 }).map((_, starIdx) => (
                                        <svg
                                          key={starIdx}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill={
                                            starIdx < Math.floor(review.rating)
                                              ? "#FFD700"
                                              : starIdx < review.rating
                                                ? "url(#halfStar)"
                                                : "#555"
                                          }
                                          className="w-4 h-4"
                                        >
                                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.18 3.625a1 1 0 00.95.69h3.862c.969 0 1.371 1.24.588 1.81l-3.124 2.27a1 1 0 00-.364 1.118l1.18 3.625c.3.921-.755 1.688-1.54 1.118l-3.124-2.27a1 1 0 00-1.176 0l-3.124 2.27c-.784.57-1.838-.197-1.539-1.118l1.18-3.625a1 1 0 00-.364-1.118L2.15 9.052c-.783-.57-.38-1.81.588-1.81h3.862a1 1 0 00.95-.69l1.18-3.625z" />
                                        </svg>
                                      ))}
                                    </div>
                                  </div>
                                  <p className={`text-gray-200 text-sm ${raleway.className}`}>{review.comment}</p>
                                </div>
                              </motion.div>
                            ))}

                            {/* Static Review Form */}
                            <div className="bg-gray-800/70 p-4 rounded-xl shadow-lg flex flex-col gap-4 mt-6">
                              <h3 className={`text-white font-semibold ${raleway.className}`}>Leave a Review</h3>

                              <input
                                type="text"
                                placeholder="Your Name"
                                className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#D7B26A]"
                              />

                              <select
                                className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#D7B26A]"
                              >
                                <option value="">Select Rating</option>
                                <option value="1">1 Star</option>
                                <option value="2">2 Stars</option>
                                <option value="3">3 Stars</option>
                                <option value="4">4 Stars</option>
                                <option value="5">5 Stars</option>
                              </select>

                              <textarea
                                placeholder="Write your review..."
                                rows={3}
                                className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#D7B26A]"
                              ></textarea>

                              <button
                                className="px-4 py-2 bg-[#D7B26A] text-black font-semibold rounded-md hover:bg-[#c4a240] transition-colors duration-300"
                              >
                                Submit Review
                              </button>
                            </div>
                          </div>
                        )}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Bottom text overlay */}
              <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10 bg-linear-to-t from-black/90 to-transparent rounded-b-3xl transition-all duration-500">
                <span className={`text-[#D7B26A] ${raleway.className}`}>{project.date}</span>
                <h3 className="text-[26px] md:text-[28px] font-medium mb-1 tracking-wide" style={{ fontFamily: "var(--font-cinzel-regular)" }}>
                  {project.title}
                </h3>
                <p className={`text-gray-300 text-[14px] md:text-[15px] ${raleway.className}`}>
                  {project.short_description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default PortfolioFlexGridOverlay;
