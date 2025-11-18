"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import SectionHeader from "@/component/Title";
import AOS from "aos";
import "aos/dist/aos.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import ThreeStepModal from "../../component/Modal";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Project images
import Project1a from "/public/assets/img/Event of OC/Anniversary/Champagne.jpg";
import Project1b from "/public/assets/img/Event of OC/Anniversary/Drink.jpg";
import Project1c from "/public/assets/img/Event of OC/Anniversary/Drinks.jpg";
import Project1d from "/public/assets/img/eventimages/e3.jpg";
import Project1e from "/public/assets/img/Event of OC/Anniversary/Red Wine.jpg";

import { Cinzel, Montserrat, Raleway } from "next/font/google";

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

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
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
      { name: "John Doe", rating: 5, comment: "Amazing experience! Everything was perfect." },
      { name: "Jane Smith", rating: 4.5, comment: "Very smooth booking and great venue." },
    ],
    date: "June 2025",
  },
];

const PortfolioFlipGrid = () => {
  const [activeTabs, setActiveTabs] = useState({});
  const [flippedCards, setFlippedCards] = useState({});
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [lightboxImages, setLightboxImages] = useState([]);
  const cardRefs = useRef([]);

  const router = useRouter();

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, offset: 100, once: true, easing: "ease-out-cubic" });
  }, []);

  // Handle click outside to reset flipped cards (mobile/tablet only)
  useEffect(() => {
    if (typeof window === "undefined") return;

    const isTouchDevice =
      window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    if (!isTouchDevice) return; // Run only on touch devices (mobile/tablet)

    const handleClickOutside = (event) => {
      let clickedInsideAny = false;
      cardRefs.current.forEach((card) => {
        if (card && card.contains(event.target)) clickedInsideAny = true;
      });

      if (!clickedInsideAny) {
        setFlippedCards({});
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleTabClick = (index, tab) =>
    setActiveTabs((prev) => ({ ...prev, [index]: tab }));

  const openLightbox = (images, index) => {
    setLightboxImages(images.map((img) => ({ src: img.src || img })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const toggleFlip = (index) =>
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));

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

      <div
        className="grid gap-6"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {projects.map((project, index) => {
          const activeTab = activeTabs[index] || "Description";
          const isFlipped = flippedCards[index] || false;

          return (
            <div
              key={index}
              className="perspective h-[400px] w-full cursor-pointer"
              ref={(el) => (cardRefs.current[index] = el)}
              onClick={() => toggleFlip(index)}
            >
              <div
                className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d rounded-3xl shadow-2xl
                  ${isFlipped ? "rotate-x-180" : ""}`}
              >
                {/* Front Side */}
                <div className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden bg-[#111]">
                  <Image
                    src={project.images[0]}
                    alt={project.title}
                    className="object-cover w-full h-full rounded-3xl"
                  />
                  <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent rounded-b-3xl text-white">
                    <span className={`text-[#D7B26A] ${montserrat.className}`}>
                      {project.date}
                    </span>
                    <h3
                      className="text-[26px] md:text-[28px] font-medium mb-1 tracking-wide"
                      style={{ fontFamily: "var(--font-cinzel-regular)" }}
                    >
                      {project.title}
                    </h3>
                    <p
                      className={`text-gray-300 text-[14px] md:text-[15px] ${montserrat.className}`}
                    >
                      {project.short_description}
                    </p>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute w-full h-full rotate-x-180 backface-hidden bg-[#111] rounded-3xl overflow-auto p-4 text-white border border-[#D7B26A]">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {["Description", "Images", "Reviews"].map((tab) => (
                      <button
                        key={tab}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTabClick(index, tab);
                        }}
                        className={`${montserrat.className} px-4 py-1 rounded-full text-sm font-semibold transition-all duration-300 cursor-pointer ${activeTab === tab
                          ? "bg-[#D7B26A] text-black shadow-lg"
                          : "bg-gray-700 text-gray-300"
                          }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="text-white mt-2 text-[15px] md:text-[16px] font-montserrat overflow-auto">
                    {/* Description */}
                    {activeTab === "Description" && (
                      <div className="space-y-3 pt-5">
                        <div
                          className={`${montserrat.className} text-[20px] sm:text-[22px] md:text-[24px] lg:text-[26px] xl:text-[28px] font-semibold text-[#D7B26A]`}
                        >
                          {project.title}
                        </div>

                        <p
                          className={`${montserrat.className} text-justify leading-relaxed`}
                        >
                          {project.description}
                        </p>

                        {/* Buttons */}

                        <div className="flex items-center gap-6 pt-8">
                          <button
                            // onClick={() => router.push("/about")}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card flip
                              router.push("/about");
                            }}
                            className={`${raleway.className} inline-block px-6 py-2 rounded-md transition-shadow shadow-sm bg-linear-to-b from-[#BE9545] to-[#7A5E39] text-white cursor-pointer`}
                          >
                            Know More
                          </button>

                          <button
                            // onClick={() => setIsModalOpen(true)}
                            onClick={(e) => {
                              e.stopPropagation(); // Prevent card flip
                              setIsModalOpen(true);
                            }}
                            className={`${raleway.className} inline-block px-6 py-2 rounded-md transition-shadow shadow-sm bg-linear-to-b from-[#BE9545] to-[#7A5E39] text-white cursor-pointer`}
                          >
                            Plan Events Now
                          </button>

                          <ThreeStepModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                          />
                        </div>

                      </div>
                    )}

                    {/* Images */}
                    {activeTab === "Images" && (
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-2">
                        {project.images.map((img, idx) => (
                          <div
                            key={idx}
                            className="w-full aspect-square rounded-lg overflow-hidden shadow-md cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              openLightbox(project.images, idx);
                            }}
                          >
                            <Image
                              src={img}
                              alt={`${project.title} image ${idx + 1}`}
                              className="object-cover w-full h-full"
                              placeholder="blur"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Reviews */}
                    {activeTab === "Reviews" && (
                      <div className="flex flex-col gap-6 mt-2">
                        {project.reviews.map((review, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-800/70 p-4 rounded-xl shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-gray-700/80 transition-colors duration-300"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex items-center justify-center rounded-full bg-[#D7B26A] text-black font-semibold text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
                              {review.name.split(" ").map((n) => n[0]).join("")}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h4
                                  className={`font-semibold text-white ${montserrat.className}`}
                                >
                                  {review.name}
                                </h4>
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
                              <p
                                className={`text-gray-200 text-sm ${montserrat.className}`}
                              >
                                {review.comment}
                              </p>
                            </div>
                          </div>
                        ))}

                        {/* Static Review Form */}
                        <div className="bg-gray-800/70 p-4 rounded-xl shadow-lg flex flex-col gap-4 mt-6">
                          <h3
                            className={`text-white font-semibold ${montserrat.className}`}
                          >
                            Leave a Review
                          </h3>

                          <input
                            type="text"
                            placeholder="Your Name"
                            className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#D7B26A]"
                          />

                          <select className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#D7B26A]">
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

                          <button className="px-4 py-2 bg-[#D7B26A] text-black font-semibold rounded-md hover:bg-[#c4a240] transition-colors duration-300">
                            Submit Review
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .perspective {
          perspective: 1200px;
        }
        .transform-style {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-x-180 {
          transform: rotateX(180deg);
        }

        @media (hover: hover) and (pointer: fine) {
          .perspective > div {
            transition: transform 0.8s ease-in-out;
          }
          .perspective:hover > div {
            transform: rotateX(180deg);
          }
        }
      `}</style>
    </div>
  );
};

export default PortfolioFlipGrid;
