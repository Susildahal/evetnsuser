"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeader from "@/component/Title";
import AOS from "aos";
import "aos/dist/aos.css";
import axiosInstance from "@/config/axios";
import Skeleton from "@/UI/Skeleton";
// Lightbox
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { useQuery } from "@tanstack/react-query";

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

const GalleryComponent = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  // Fetch categories with React Query
  const { data: categories = ["All"], isLoading: categoriesLoading } = useQuery({
    queryKey: ["gallery-categories"],
    queryFn: async () => {
      const res = await axiosInstance.get("/gallery", { params: { status: true } });
      const data = res.data.data || [];
      const uniqueCategories = [...new Set(data.map(item => item.title || item.category).filter(Boolean))];
      return ["All", ...uniqueCategories];
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // Fetch gallery items with React Query
  const { data: galleryItems = [], isLoading: loading } = useQuery({
    queryKey: ["gallery-items", activeTab],
    queryFn: async () => {
      const params = { status: true };
      if (activeTab && activeTab !== "All") {
        params.title = activeTab;
      }
      const res = await axiosInstance.get("/gallery", { params: { ...params, limit: 100 } });
      return res.data.data || [];
    },
    staleTime: 5 * 60 * 1000,
    cacheTime: 10 * 60 * 1000,
  });

  // Convert API images to lightbox format
  const gallerySrc = galleryItems?.map((item) => item.image || item.url || item.src) || [];


  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="mt-[100px] container mx-auto px-6 py-[60px]">
      <div data-aos="fade-up" data-aos-delay="100">
        <SectionHeader title="Gallery" />
      </div>

      {/* Tabs */}
      <div className="flex justify-center flex-wrap gap-4 mb-14"
        data-aos="fade-up"
        data-aos-delay="200">
        {categoriesLoading ? (
          <div className="text-center text-gray-400 py-4"><Skeleton /></div>
        ) : (
          categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm md:text-base font-medium transition-all duration-300 cursor-pointer
                ${activeTab === tab
                  ? "text-black"
                  : "bg-gray-800 text-gray-300 hover:bg-[#BE9545]/20"
                }`}
              style={{
                fontFamily: "var(--font-montserrat)",
                background: activeTab === tab
                  ? "linear-gradient(to bottom, #BE9545, #7A5E39)"
                  : undefined
              }}
            >
              {tab}
            </button>
          ))
        )}
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center text-gray-400 py-20">
          <Skeleton />
        </div>
      ) : galleryItems.length === 0 ? (
        <div className="text-center text-gray-400 py-20">
          <p className={montserrat.className}>No images found in this category.</p>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-5 auto-rows-[220px]"
          >
            {galleryItems.map((item, idx) => {
              const imgSrc = item.image || item.url || item.src;
              return (
                <motion.div
                  key={item._id || item.id || idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: idx * 0.05 }}
                  className={`relative overflow-hidden rounded-2xl shadow-md group cursor-pointer ${idx === 0
                    ? "md:col-span-2 md:row-span-2"
                    : "md:col-span-1 md:row-span-1"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  onClick={() => openLightbox(idx)}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={imgSrc}
                      alt={item.title || item.alt || `Gallery ${idx}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = '/assets/img/eventimages/e1.jpg'; // Fallback image
                      }}
                    />
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
                    <div className="flex items-center justify-center w-20 h-20 rounded-full border-2 border-white bg-black/40 backdrop-blur-sm text-white font-semibold text-lg transition-transform duration-300 group-hover:scale-110">
                      View
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      )}


      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          index={currentIndex}
          slides={gallerySrc.map((src) => ({ src }))}
          on={{ view: ({ index }) => setCurrentIndex(index) }}
        />
      )}
    </div>
  );
};

export default GalleryComponent;
