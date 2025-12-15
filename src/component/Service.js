"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import Left_heading_line from "/public/assets/img/Left.png";
import Right_heading_line from "/public/assets/img/Right.png";

import { Cinzel, Montserrat, Cormorant_Garamond, Raleway } from "next/font/google";

export const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "700", "900"],
  variable: "--font-cinzel",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "700", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
});

import "swiper/css";

// Images (replace with your own)
import ServiceOne from "/public/assets/img/eventimages/v33333.jpg";
import ServiceTwo from "/public/assets/img/eventimages/vv33333.jpg";
import ServiceThree from "/public/assets/img/eventimages/w3ersdrfsdf.jpg";
import ServiceFour from "/public/assets/img/eventimages/dsadasdasd.jpg";
import ServiceFive from "/public/assets/img/eventimages/e2.jpg";

const venueImages = [
  { src: ServiceOne, title: "Gold Coast", link: "/services/venuesourcing" },
  { src: ServiceTwo, title: "Byron Bay", link: "/services/venuesourcing" },
  { src: ServiceThree, title: "Sunshine Coast", link: "/services/venuesourcing" },
  { src: ServiceFour, title: "Brisbane", link: "/services/venuesourcing" },
  { src: ServiceFive, title: "Sydney", link: "/services/venuesourcing" },
];

export default function ServicesMarquee() {
  return (
    <section className="py-20 bg-linear-to-b from-[#0A0A0A] to-[#685736]">
      <div className="max-w-7xl mx-auto px-4">

        {/* TITLE */}
        <div className="flex flex-row items-center gap-5 justify-center" data-aos="fade-up">
          <div>
            <Image src={Left_heading_line} alt="Services" />
          </div>
          <p
            className={`text-3xl sm:text-4xl md:text-[36px] lg:text-[36px] font-light text-[#D7B26A] ${cinzel.className}`}
          >
            SERVICES
          </p>
          <div>
            <Image src={Right_heading_line} alt="Services" />
          </div>
        </div>

        {/* MARQUEE SWIPER */}
        <div
          className="relative mt-10"
          onMouseEnter={(e) =>
            e.currentTarget.querySelector(".swiper")?.swiper.autoplay.stop()
          }
          onMouseLeave={(e) =>
            e.currentTarget.querySelector(".swiper")?.swiper.autoplay.start()
          }
        >
          <Swiper
            modules={[Autoplay]}
            loop={true}
            speed={9000}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
            }}
            slidesPerView="auto"
            spaceBetween={24}
            freeMode={true}
            freeModeMomentum={false}
            loopAdditionalSlides={10}
            allowTouchMove={false}
            className="marquee-swiper"
          >
            {venueImages.map((item, index) => (
              <SwiperSlide
                key={index}
                className="w-[300px]!"
              >
                <Link
                  href={item.link}
                  className="block relative overflow-hidden rounded-xl shadow-lg group"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    width={400}
                    height={352}
                    className="w-full h-[352px] object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  <div className="absolute bottom-0 left-0 w-full h-[50%] bg-linear-to-t from-black/80 to-transparent p-4 flex items-end">
                    <h3 className={`text-white text-lg font-light ${cinzel.className}`}
                      style={{ fontFamily: "var(--font-raleway)", lineHeight: "1.2", letterSpacing: "-0.03em" }}>
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      {/* REQUIRED CSS */}
      <style jsx global>{`
        .marquee-swiper .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}</style>
    </section>
  );
}









// "use client";
// // 
// import React, { useState, useEffect } from "react";
// import AOS from "aos";
// import "aos/dist/aos.css";
// import Link from "next/link";
// import Image from "next/image";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Pagination, Navigation } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";

// import Left_heading_line from "/public/assets/img/Left.png";
// import Right_heading_line from "/public/assets/img/Right.png";

// import ServiceOne from "/public/assets/img/eventimages/v33333.jpg";
// import ServiceTwo from "/public/assets/img/eventimages/vv33333.jpg";
// import ServiceThree from "/public/assets/img/eventimages/w3ersdrfsdf.jpg";
// import ServiceFour from "/public/assets/img/eventimages/dsadasdasd.jpg";
// import ServiceFive from "/public/assets/img/eventimages/e2.jpg";

// import catering_one from "/public/assets/img/eventimages/123.jpg";
// import catering_two from "/public/assets/img/Event of OC/Wedding/Dinning 2.jpg";
// import catering_three from "/public/assets/img/Event of OC/Wedding/DINNING.jpg";

// import entertainment_one from "/public/assets/img/eventimages/3edfdfsdf.jpg";
// import entertainment_two from "/public/assets/img/eventimages/dfg333.jpg";
// import entertainment_three from "/public/assets/img/eventimages/4r4fr4.jpg";
// import entertainment_four from "/public/assets/img/eventimages/cvgnvbnvbnvb.jpg";
// import entertainment_five from "/public/assets/img/eventimages/e3.jpg";
// import entertainment_six from "/public/assets/img/eventimages/bvnbvnvbnvbn.jpg";
// import entertainment_seven from "/public/assets/img/Event of OC/Music/Music.jpg";

// import audio_one from "/public/assets/img/eventimages/345rtfefte.jpg";

// import photograph_one from "/public/assets/img/eventimages/bvcbcvb.jpg";
// import photograph_two from "/public/assets/img/eventimages/uyjkyujiyt.jpg";
// import photograph_three from "/public/assets/img/eventimages/345rtfefte.jpg";
// import photograph_four from "/public/assets/img/eventimages/dfg333.jpg";

// import { Cinzel, Montserrat, Cormorant_Garamond, Raleway } from "next/font/google";

// export const cinzel = Cinzel({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "700", "900"],
//   variable: "--font-cinzel",
//   display: "swap",
// });

// export const montserrat = Montserrat({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "700", "900"],
//   variable: "--font-montserrat",
//   display: "swap",
// });

// const cormorant = Cormorant_Garamond({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-cormorant",
//   display: "swap",
// });

// export const raleway = Raleway({
//   subsets: ["latin"],
//   weight: ["400", "500", "600", "700", "900"],
//   variable: "--font-raleway",
//   display: "swap",
// });

// const tabs = [
//   { name: "Venue" },
//   { name: "Catering" },
//   { name: "Entertainment" },
//   { name: "Audio & Visual" },
//   { name: "Style & Design" },
//   { name: "Photographs" },
//   { name: "Floral" },
// ];

// const venueImages = [
//   { src: ServiceOne, title: "Gold Coast", link: "/services/venuesourcing" },
//   { src: ServiceTwo, title: "Byron Bays", link: "/services/venuesourcing" },
//   { src: ServiceThree, title: "Sunshine Coast", link: "/services/venuesourcing" },
//   { src: ServiceFour, title: "Gold Coast", link: "/services/venuesourcing" },
//   { src: ServiceFive, title: "Brisbane", link: "/services/venuesourcing" },
// ];
// const cateringImages = [
//   { src: catering_one, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: catering_two, title: "Byron Bays", link: "/public/assets/img/Event of OC/Music/Concert.jpg" },
//   { src: catering_three, title: "Byron Bays", link: "/public/assets/img/Event of OC/Music/Concert.jpg" },
// ];

// const entertainmentImage = [
//   { src: entertainment_one, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: entertainment_two, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: entertainment_three, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: entertainment_four, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: entertainment_five, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: entertainment_six, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: entertainment_seven, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
// ]

// const audioImage = [
//   { src: audio_one, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
// ]

// const photographsImage = [
//   { src: photograph_one, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: photograph_two, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: photograph_three, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
//   { src: photograph_four, title: "Gold Coast", link: "/public/assets/img/Event of OC/Music/DJ.jpg" },
// ]

// export default function Service() {
//   const [activeTab, setActiveTab] = useState("Venue");

//   useEffect(() => {
//     AOS.init({
//       duration: 1000,
//       once: true,
//       offset: 50,
//     });
//   }, []);

//   return (
//     <section id="services" className="py-20 bg-gradient-to-b from-[#0A0A0A] to-[#685736]">
//       <div className="max-w-7xl mx-auto px-4 text-center flex flex-col gap-[25px] sm:gap-[50px]">

//         <div className="flex flex-row items-center gap-[20px] justify-center" data-aos="fade-up">
//           <div>
//             <Image src={Left_heading_line} alt="Services" />
//           </div>
//           <p
//             className={`text-3xl sm:text-4xl md:text-[36px] lg:text-[36px] font-light text-[#D7B26A] ${cinzel.className}`}
//           >
//             SERVICES
//           </p>
//           <div>
//             <Image src={Right_heading_line} alt="Services" />
//           </div>
//         </div>

//         <div className="flex flex-col gap-[15px] md:gap-[30px]">

//           <div className="flex flex-wrap justify-center gap-0 sm:gap-0" data-aos="fade-up" data-aos-delay="200">
//             {tabs.map((tab, index) => (
//               <button
//                 key={tab.name}
//                 onClick={() => setActiveTab(tab.name)}
//                 className={`
//                 relative py-2 px-3 sm:py-2 sm:px-4 text-base transition-all duration-300 cursor-pointer
//                 ${activeTab === tab.name ? "text-[#D7B26A] font-semibold" : "text-white hover:text-[#D7B26A] font-normal"}
//                 `}
//                 style={{ fontFamily: "var(--font-raleway)", lineHeight: "1.2", letterSpacing: "-0.03em" }}
//               >
//                 {tab.name}


//                 {index !== tabs.length - 1 && (
//                   <span className="absolute top-1/4 right-0 h-1/2 border-r border-white/50"></span>
//                 )}
//               </button>
//             ))}
//           </div>

//           <div>

//             {activeTab === "Venue" && (
//               <div className="relative">
//                 <Swiper
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={20}
//                   slidesPerView={1}
//                   loop={true}
//                   autoplay={{ delay: 3000, 
//                     disableOnInteraction: false,
//                    }}
//                   pagination={{
//                     el: ".custom-pagination",
//                     clickable: true,
//                     renderBullet: (index, className) => {
//                       return `<span class="${className} bg-[#D7B26A] w-3 h-3 rounded-full mx-1 inline-block"></span>`;
//                     },
//                   }}
//                   navigation={{
//                     nextEl: ".custom-next",
//                     prevEl: ".custom-prev",
//                   }}
//                   breakpoints={{
//                     640: { slidesPerView: 2 },
//                     1024: { slidesPerView: 4 },
//                   }}
//                 >
//                   {venueImages.map((image, index) => (
//                     <SwiperSlide key={index}>
//                       <Link
//                         href={image.link}
//                         className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
//                         data-aos="zoom-in"
//                         data-aos-delay={index * 100}
//                       >
//                         <Image
//                           src={image.src}
//                           alt={image.title}
//                           width={400}
//                           height={352}
//                           className="w-full h-[352px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
//                         />
//                         <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
//                           <h3
//                             className="text-white text-lg font-light"
//                             style={{ fontFamily: "var(--font-cinzel-regular)" }}
//                           >
//                             {image.title}
//                           </h3>
//                         </div>
//                       </Link>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8592;
//                 </button>
//                 <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8594;
//                 </button>

//                 <div className="custom-pagination flex justify-center mt-4"></div>
//               </div>
//             )}

//             {activeTab === "Catering" && (
//               <div className="relative">
//                 <Swiper
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={20}
//                   slidesPerView={1}
//                   loop={true}
//                   autoplay={{ delay: 3000, disableOnInteraction: false }}
//                   pagination={{
//                     el: ".custom-pagination",
//                     clickable: true,
//                     renderBullet: (index, className) => {
//                       return `<span class="${className} bg-[#D7B26A] w-3 h-3 rounded-full mx-1 inline-block"></span>`;
//                     },
//                   }}
//                   navigation={{
//                     nextEl: ".custom-next",
//                     prevEl: ".custom-prev",
//                   }}
//                   breakpoints={{
//                     640: { slidesPerView: 2 },
//                     1024: { slidesPerView: 4 },
//                   }}
//                 >
//                   {cateringImages.map((image, index) => (
//                     <SwiperSlide key={index}>
//                       <Link
//                         href={image.link}
//                         className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
//                         data-aos="zoom-in"
//                         data-aos-delay={index * 100}
//                       >
//                         <Image
//                           src={image.src}
//                           alt={image.title}
//                           width={400}
//                           height={352}
//                           className="w-full h-[352px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
//                         />
//                         <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
//                           <h3
//                             className="text-white text-lg font-light"
//                             style={{ fontFamily: "var(--font-cinzel-regular)" }}
//                           >
//                             {image.title}
//                           </h3>
//                         </div>
//                       </Link>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 {/* Custom navigation */}
//                 <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8592;
//                 </button>
//                 <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8594;
//                 </button>

//                 {/* Custom pagination */}
//                 <div className="custom-pagination flex justify-center mt-4"></div>
//               </div>
//             )}

//             {activeTab === "Entertainment" && (
//               <div className="relative">
//                 <Swiper
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={20}
//                   slidesPerView={1}
//                   loop={true}
//                   autoplay={{ delay: 3000, disableOnInteraction: false }}
//                   pagination={{
//                     el: ".custom-pagination",
//                     clickable: true,
//                     renderBullet: (index, className) => {
//                       return `<span class="${className} bg-[#D7B26A] w-3 h-3 rounded-full mx-1 inline-block"></span>`;
//                     },
//                   }}
//                   navigation={{
//                     nextEl: ".custom-next",
//                     prevEl: ".custom-prev",
//                   }}
//                   breakpoints={{
//                     640: { slidesPerView: 2 },
//                     1024: { slidesPerView: 4 },
//                   }}
//                 >
//                   {entertainmentImage.map((image, index) => (
//                     <SwiperSlide key={index}>
//                       <Link
//                         href={image.link}
//                         className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
//                         data-aos="zoom-in"
//                         data-aos-delay={index * 100}
//                       >
//                         <Image
//                           src={image.src}
//                           alt={image.title}
//                           width={400}
//                           height={352}
//                           className="w-full h-[352px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
//                         />
//                         <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
//                           <h3
//                             className="text-white text-lg font-light"
//                             style={{ fontFamily: "var(--font-cinzel-regular)" }}
//                           >
//                             {image.title}
//                           </h3>
//                         </div>
//                       </Link>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 {/* Custom navigation */}
//                 <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8592;
//                 </button>
//                 <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8594;
//                 </button>

//                 {/* Custom pagination */}
//                 <div className="custom-pagination flex justify-center mt-4"></div>
//               </div>
//             )}

//             {activeTab === "Audio & Visual" && (
//               <div className="relative">
//                 <Swiper
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={20}
//                   slidesPerView={1}
//                   loop={true}
//                   autoplay={{ delay: 3000, disableOnInteraction: false }}
//                   pagination={{
//                     el: ".custom-pagination",
//                     clickable: true,
//                     renderBullet: (index, className) => {
//                       return `<span class="${className} bg-[#D7B26A] w-3 h-3 rounded-full mx-1 inline-block"></span>`;
//                     },
//                   }}
//                   navigation={{
//                     nextEl: ".custom-next",
//                     prevEl: ".custom-prev",
//                   }}
//                   breakpoints={{
//                     640: { slidesPerView: 2 },
//                     1024: { slidesPerView: 4 },
//                   }}
//                 >
//                   {audioImage.map((image, index) => (
//                     <SwiperSlide key={index}>
//                       <Link
//                         href={image.link}
//                         className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
//                         data-aos="zoom-in"
//                         data-aos-delay={index * 100}
//                       >
//                         <Image
//                           src={image.src}
//                           alt={image.title}
//                           width={400}
//                           height={352}
//                           className="w-full h-[352px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
//                         />
//                         <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
//                           <h3
//                             className="text-white text-lg font-light"
//                             style={{ fontFamily: "var(--font-cinzel-regular)" }}
//                           >
//                             {image.title}
//                           </h3>
//                         </div>
//                       </Link>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 {/* Custom navigation */}
//                 <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8592;
//                 </button>
//                 <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8594;
//                 </button>

//                 {/* Custom pagination */}
//                 <div className="custom-pagination flex justify-center mt-4"></div>
//               </div>
//             )}

//             {activeTab === "Style & Design" && (
//               <div className="relative">
//                 <Swiper
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={20}
//                   slidesPerView={1}
//                   loop={true}
//                   autoplay={{ delay: 3000, disableOnInteraction: false }}
//                   pagination={{
//                     el: ".custom-pagination",
//                     clickable: true,
//                     renderBullet: (index, className) => {
//                       return `<span class="${className} bg-[#D7B26A] w-3 h-3 rounded-full mx-1 inline-block"></span>`;
//                     },
//                   }}
//                   navigation={{
//                     nextEl: ".custom-next",
//                     prevEl: ".custom-prev",
//                   }}
//                   breakpoints={{
//                     640: { slidesPerView: 2 },
//                     1024: { slidesPerView: 4 },
//                   }}
//                 >
//                   {cateringImages.map((image, index) => (
//                     <SwiperSlide key={index}>
//                       <Link
//                         href={image.link}
//                         className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
//                         data-aos="zoom-in"
//                         data-aos-delay={index * 100}
//                       >
//                         <Image
//                           src={image.src}
//                           alt={image.title}
//                           width={400}
//                           height={352}
//                           className="w-full h-[352px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
//                         />
//                         <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
//                           <h3
//                             className="text-white text-lg font-light"
//                             style={{ fontFamily: "var(--font-cinzel-regular)" }}
//                           >
//                             {image.title}
//                           </h3>
//                         </div>
//                       </Link>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 {/* Custom navigation */}
//                 <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8592;
//                 </button>
//                 <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8594;
//                 </button>

//                 {/* Custom pagination */}
//                 <div className="custom-pagination flex justify-center mt-4"></div>
//               </div>)}

//             {activeTab === "Photographs" && (
//               <div className="relative">
//                 <Swiper
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={20}
//                   slidesPerView={1}
//                   loop={true}
//                   autoplay={{ delay: 3000, disableOnInteraction: false }}
//                   pagination={{
//                     el: ".custom-pagination",
//                     clickable: true,
//                     renderBullet: (index, className) => {
//                       return `<span class="${className} bg-[#D7B26A] w-3 h-3 rounded-full mx-1 inline-block"></span>`;
//                     },
//                   }}
//                   navigation={{
//                     nextEl: ".custom-next",
//                     prevEl: ".custom-prev",
//                   }}
//                   breakpoints={{
//                     640: { slidesPerView: 2 },
//                     1024: { slidesPerView: 4 },
//                   }}
//                 >
//                   {photographsImage.map((image, index) => (
//                     <SwiperSlide key={index}>
//                       <Link
//                         href={image.link}
//                         className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
//                         data-aos="zoom-in"
//                         data-aos-delay={index * 100}
//                       >
//                         <Image
//                           src={image.src}
//                           alt={image.title}
//                           width={400}
//                           height={352}
//                           className="w-full h-[352px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
//                         />
//                         <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
//                           <h3
//                             className="text-white text-lg font-light"
//                             style={{ fontFamily: "var(--font-cinzel-regular)" }}
//                           >
//                             {image.title}
//                           </h3>
//                         </div>
//                       </Link>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 {/* Custom navigation */}
//                 <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8592;
//                 </button>
//                 <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8594;
//                 </button>

//                 {/* Custom pagination */}
//                 <div className="custom-pagination flex justify-center mt-4"></div>
//               </div>
//             )}

//             {activeTab === "Floral" && (
//               <div className="relative">
//                 <Swiper
//                   modules={[Autoplay, Navigation]}
//                   spaceBetween={20}
//                   slidesPerView={1}
//                   loop={true}
//                   autoplay={{ delay: 3000, disableOnInteraction: false }}
//                   pagination={{
//                     el: ".custom-pagination",
//                     clickable: true,
//                     renderBullet: (index, className) => {
//                       return `<span class="${className} bg-[#D7B26A] w-3 h-3 rounded-full mx-1 inline-block"></span>`;
//                     },
//                   }}
//                   navigation={{
//                     nextEl: ".custom-next",
//                     prevEl: ".custom-prev",
//                   }}
//                   breakpoints={{
//                     640: { slidesPerView: 2 },
//                     1024: { slidesPerView: 4 },
//                   }}
//                 >
//                   {cateringImages.map((image, index) => (
//                     <SwiperSlide key={index}>
//                       <Link
//                         href={image.link}
//                         className="block relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 group"
//                         data-aos="zoom-in"
//                         data-aos-delay={index * 100}
//                       >
//                         <Image
//                           src={image.src}
//                           alt={image.title}
//                           width={400}
//                           height={352}
//                           className="w-full h-[352px] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
//                         />
//                         <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-black/80 to-transparent p-4 flex items-end">
//                           <h3
//                             className="text-white text-lg font-light"
//                             style={{ fontFamily: "var(--font-cinzel-regular)" }}
//                           >
//                             {image.title}
//                           </h3>
//                         </div>
//                       </Link>
//                     </SwiperSlide>
//                   ))}
//                 </Swiper>

//                 <button className="custom-prev absolute top-1/2 left-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8592;
//                 </button>
//                 <button className="custom-next absolute top-1/2 right-0 -translate-y-1/2 z-10 p-3 bg-[#D7B26A] rounded-full shadow-lg hover:bg-yellow-600 transition-all">
//                   &#8594;
//                 </button>

//                 <div className="custom-pagination flex justify-center mt-4"></div>
//               </div>)}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
