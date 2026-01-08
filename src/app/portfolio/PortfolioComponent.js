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
import axiosInstance from "@/config/axios";
import Skeleton from "@/UI/Skeleton";



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

  // Portfolio state and fetch must be inside the component (hooks must be called in component bodies)
  const [Portfolioitems, setPortfolioitems] = useState([]);
  const [portfolioImages, setPortfolioImages] = useState({});
  const [portfolioPreviews, setPortfolioPreviews] = useState({});
  const [loadingImages, setLoadingImages] = useState({});
  const [loadingPreviews, setLoadingPreviews] = useState({});
  const [loadingPortfolio, setLoadingPortfolio] = useState(true);
  const [reviewForm, setReviewForm] = useState({});
  const [submittingReview, setSubmittingReview] = useState({});
  const [response, setResponse] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0 });
  const [portfolioHasImages, setPortfolioHasImages] = useState({});
  const fetchPortfolioitems = async (page = 1) => {
    try {
      setLoadingPortfolio(true);
      const res = await axiosInstance.get("/portfolio", {
        params: {
          status: true,
          page: page,
          limit: 10
        }
      });
      setPortfolioitems(res.data.data);
      if (res.data.pagination) {
        setPagination(res.data.pagination);
      }
      setCurrentPage(page);
    } catch (error) {
      console.error("Error fetching portfolio items:", error);
    } finally {
      setLoadingPortfolio(false);
    }
  };


  // Check image availability for each portfolio item
  useEffect(() => {
    const checkImagesForAllPortfolios = async () => {
      for (const item of Portfolioitems) {
        const pid = item._id || item.id;
        try {
          const res = await axiosInstance.get(`/portfolio/image/${pid}`);
          const hasImages = res.data?.data && Array.isArray(res.data.data) && res.data.data.length > 0;
          setPortfolioHasImages(prev => ({ ...prev, [pid]: hasImages }));
        } catch (error) {
          console.error(`Error checking images for portfolio ${pid}:`, error);
          setPortfolioHasImages(prev => ({ ...prev, [pid]: false }));
        }
      }
    };
    
    if (Portfolioitems.length > 0) {
      checkImagesForAllPortfolios();
    }
  }, [Portfolioitems]);
  const fetchPortfolioImages = async (portfolioId) => {
    if (portfolioImages[portfolioId]) return; // Already fetched

    try {
      setLoadingImages(prev => ({ ...prev, [portfolioId]: true }));
      const res = await axiosInstance.get(`/portfolio/image/${portfolioId}`);
      setPortfolioImages(prev => ({ ...prev, [portfolioId]: res.data.data || res.data }));
    } catch (error) {
      console.error("Error fetching portfolio images:", error);
    } finally {
      setLoadingImages(prev => ({ ...prev, [portfolioId]: false }));
    }
  };

  const fetchPortfolioPreviews = async (portfolioId) => {
    if (portfolioPreviews[portfolioId]) return; // Already fetched

    try {
      setLoadingPreviews(prev => ({ ...prev, [portfolioId]: true }));
      const res = await axiosInstance.get(`/preview/${portfolioId}`);
      setPortfolioPreviews(prev => ({ ...prev, [portfolioId]: res.data.data || res.data }));
    } catch (error) {
      console.error("Error fetching portfolio previews:", error);
    } finally {
      setLoadingPreviews(prev => ({ ...prev, [portfolioId]: false }));
    }
  };

  const submitReview = async (portfolioId) => {
    const formData = reviewForm[portfolioId];

    if (!formData?.name || !formData?.star || !formData?.description) {
      return;
    }

    try {
      setSubmittingReview(prev => ({ ...prev, [portfolioId]: true }));
      const response = await axiosInstance.post(`/preview/${portfolioId}`, {
        name: formData.name,
        star: formData.star,
        description: formData.description,
      }).then(() => {

        setResponse("Review submitted successfully!");
        setTimeout(() => {
          setResponse(null);
        }, 3000);

      });


      // Clear form
      setReviewForm(prev => ({ ...prev, [portfolioId]: { name: '', star: '', description: '' } }));

      // Refresh reviews
      setPortfolioPreviews(prev => ({ ...prev, [portfolioId]: null }));
      fetchPortfolioPreviews(portfolioId);

    } catch (error) {
      console.error("Error submitting review:", error);
    } finally {
      setSubmittingReview(prev => ({ ...prev, [portfolioId]: false }));
    }
  };

  useEffect(() => {
    fetchPortfolioitems(currentPage);
  }, [currentPage]);

  useEffect(() => {
    AOS.init({ duration: 900, offset: 100, once: true, easing: "ease-out-cubic" });
  }, []);

  // Add custom scrollbar styles matching theme
  useEffect(() => {
    const styleId = 'portfolio-scrollbar-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
     

    
      document.head.appendChild(style);
    }
    return () => {
      const style = document.getElementById(styleId);
      if (style) style.remove();
    };
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

  const handleTabClick = (index, tab, portfolioId) => {
    setActiveTabs((prev) => ({ ...prev, [index]: tab }));

    // Fetch data when switching to Images or Reviews tabs
    if (tab === "Images" && portfolioId) {
      fetchPortfolioImages(portfolioId);
    } else if (tab === "Reviews" && portfolioId) {
      fetchPortfolioPreviews(portfolioId);
    }
  };

  const openLightbox = (images, index) => {
    setLightboxImages(images.map((img) => ({
      src: img?.src || img?.image || img
    })));
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const toggleFlip = (index) =>
    setFlippedCards((prev) => ({ ...prev, [index]: !prev[index] }));

  if (loadingPortfolio) {
    return <Skeleton />;
  }

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
      <div className="">
        <div
          className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-1 gap-6 max-w-7xl mx-auto"
        >
          {Portfolioitems.map((project, index) => {
            const activeTab = activeTabs[index] || "Description";
            const isFlipped = flippedCards[index] || false;

            return (
              <div
                key={index}
                className="perspective h-[500px] sm:h-[450px] md:h-[500px] w-full cursor-pointer"
                ref={(el) => (cardRefs.current[index] = el)}
                onClick={() => toggleFlip(index)}
              >
                <div
                  className={`relative w-full h-full transition-transform duration-700 transform-style preserve-3d rounded-3xl shadow-2xl
                  ${isFlipped ? "rotate-x-180" : ""}`}
                >
                  {/* Front Side */}
                  <div className="absolute w-full h-full backface-hidden rounded-3xl overflow-hidden bg-[#111]">
                    <img
                      src={project.image?.src || project.image}
                      alt={project.title}
                      loading="lazy"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      className="object-cover w-full h-full rounded-3xl hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black/90 to-transparent rounded-b-3xl text-white">
                      <span className={`text-[#D7B26A] ${montserrat.className}`}>
                        {new Date(project.date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}  
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
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Back Side */}
                  <div className="absolute w-full h-full rotate-x-180 backface-hidden bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-3xl overflow-auto portfolio-scrollable p-4 sm:p-6 text-white shadow-2xl">
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-4">
                      {["Description", "Images", "Reviews"].map((tab) => {
                        const pid = project._id || project.id;
                        const hasImages = portfolioHasImages[pid];

                        if (tab === "Images" && !hasImages) return null;

                        return (
                          <button
                            key={tab}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleTabClick(index, tab, pid);
                            }}
                            className={`${montserrat.className} px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer transform hover:scale-105 ${activeTab === tab
                              ? "bg-gradient-to-r from-[#BE9545] to-[#D7B26A] text-black shadow-lg"
                              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                              }`}
                          >
                            {tab}
                          </button>
                        );
                      })}
                    </div>

                    <div className="text-white mt-2 text-[15px] md:text-[16px] font-montserrat overflow-auto portfolio-scrollable">
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

                          <div className="hidden sm:flex items-center gap-6 pt-8">
                            <button
                              // onClick={() => router.push("/about")}
                              onClick={(e) => {
                                e.stopPropagation();
                                router.push("/about");
                              }}
                              className={`${raleway.className} inline-block px-6 py-2 rounded-md transition-shadow shadow-sm bg-linear-to-b from-[#BE9545] to-[#7A5E39] text-white cursor-pointer`}
                            >
                              Know More
                            </button>

                            <button
                              // onClick={() => setIsModalOpen(true)}
                              onClick={(e) => {
                                e.stopPropagation();
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
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-2">
                          {loadingImages[project._id || project.id] ? (
                            <div className="col-span-full text-center text-gray-400 py-8">
                              <p>Loading images...</p>
                            </div>
                          ) : (
                            (portfolioImages[project._id || project.id] || project.images || []).map((img, idx) => (
                              <div
                                key={idx}
                                className="w-full aspect-square object-cover rounded-lg h-[120px] sm:h-[160px] md:h-[230px] md:w-[230px] overflow-hidden cursor-pointer"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  const imagesToShow = portfolioImages[project._id || project.id] || project.images || [];
                                  openLightbox(imagesToShow, idx);
                                }}
                              >
                                <img
                                  src={img?.src || img?.image || img}
                                  alt={`${project.title} image ${idx + 1}`}
                                  className="object-cover w-full h-full"
                                />
                              </div>
                            ))
                          )}
                        </div>
                      )}

                      {/* Reviews */}
                      {activeTab === "Reviews" && (
                        <div className="flex flex-col gap-6 mt-2 max-h-[350px] overflow-y-auto reviews-scroll pr-2">
                          {loadingPreviews[project._id || project.id] ? (
                            <div className="text-center text-gray-400 py-8">
                              <p>Loading reviews...</p>
                            </div>
                          ) : (
                            (portfolioPreviews[project._id || project.id] || project.reviews || []).map((review, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-800/70 p-4 rounded-xl shadow-lg flex flex-col md:flex-row items-start md:items-center gap-4 hover:bg-gray-700/80 transition-colors duration-300"
                              >
                                <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-12 lg:h-12 xl:w-14 xl:h-14 flex items-center justify-center rounded-full bg-[#D7B26A] text-black font-semibold text-base sm:text-lg md:text-xl lg:text-lg xl:text-xl">
                                  {review.name.split(" ").map((n) => n[0]).join("")}
                                </div>
                                <div className="flex-1">
                                  <div className="flex   flex-col justify-between mb-1">
                                    <div className=" flex flex-col">
                                      <p>{review.name}</p>


                                      <div className="flex items-center gap-1">
                                      {Array.from({ length: (review.star) }).map((_, starIdx) => (
                                        <svg
                                          key={starIdx}
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                          fill={
                                            starIdx < Math.floor(review.star)
                                              ? "#FFD700"
                                              : starIdx < review.star
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
                                    
                                    
                                  </div>
                                    <h4
                                        className={`font-semibold text-white ${montserrat.className}`}
                                      >
                                        {review.description}
                                      </h4>
                                  <p
                                    className={`text-gray-200 text-sm ${montserrat.className}`}
                                  >
                                    {review.comment}
                                  </p>
                                </div>
                              </div>
                            ))
                          )}

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
                              value={reviewForm[project._id || project.id]?.name || ''}
                              onChange={(e) => {
                                const portfolioId = project._id || project.id;
                                setReviewForm(prev => ({
                                  ...prev,
                                  [portfolioId]: { ...prev[portfolioId], name: e.target.value }
                                }));
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#D7B26A]"
                            />

                            <select
                              value={reviewForm[project._id || project.id]?.star || ''}
                              onChange={(e) => {
                                const portfolioId = project._id || project.id;
                                setReviewForm(prev => ({
                                  ...prev,
                                  [portfolioId]: { ...prev[portfolioId], star: e.target.value }
                                }));
                              }}
                              onClick={(e) => e.stopPropagation()}
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
                              value={reviewForm[project._id || project.id]?.description || ''}
                              onChange={(e) => {
                                const portfolioId = project._id || project.id;
                                setReviewForm(prev => ({
                                  ...prev,
                                  [portfolioId]: { ...prev[portfolioId], description: e.target.value }
                                }));
                              }}
                              onClick={(e) => e.stopPropagation()}
                              className="p-2 rounded-md bg-gray-900 text-white border border-gray-700 focus:outline-none focus:border-[#D7B26A]"
                            ></textarea>

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                submitReview(project._id || project.id);
                              }}
                              disabled={submittingReview[project._id || project.id]}
                              className="px-4 py-2 bg-[#D7B26A] text-black font-semibold rounded-md hover:bg-[#c4a240] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                              {submittingReview[project._id || project.id] ? 'Submitting...' : 'Submit Review'}

                            </button>

                            {response && <span className="ml-2 mt-3 text-green-600 font-normal">{response}</span>}
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

        {/* Pagination Controls */}
        {pagination.total > pagination.limit && (
          <div className="flex justify-between  gap-6 mt-12 mb-8 max-w-7xl mx-auto">
            <button
              onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="px-6 py-3 bg-gradient-to-r from-[#BE9545] to-[#7A5E39] text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(190,149,69,0.5)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Previous
            </button>

            <button
              onClick={() => setCurrentPage(prev => prev + 1)}
              disabled={currentPage >= Math.ceil(pagination.total / pagination.limit)}
              className="px-6 py-3 bg-gradient-to-r from-[#BE9545] to-[#7A5E39] text-white font-semibold rounded-lg hover:shadow-[0_0_20px_rgba(190,149,69,0.5)] transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              style={{ fontFamily: "var(--font-montserrat)" }}
            >
              Next
            </button>
          </div>
        )}
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
