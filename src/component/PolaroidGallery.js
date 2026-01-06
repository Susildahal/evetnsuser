"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const PolaroidGallery = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            easing: "ease-out-cubic",
            once: true,
        });
    }, []);

    const photos = [
        {
            src: "/assets/img/Event of OC/Birthday/Cake.jpg",
            caption: "BIRTHDAYS ARE SPECIAL",
            rotate: "-rotate-6",
        },
        {
            src: "/assets/img/Event of OC/Conference/Conference.jpg",
            caption: "CONFERENCES THAT INSPIRE",
            rotate: "-rotate-3",
        },
        {
            src: "/assets/img/Event of OC/Music/Concert.jpg",
            caption: "MUSIC IS THE UNIVERSAL LANGUAGE",
            rotate: "rotate-1",
        },
        {
            src: "/assets/img/Event of OC/Places/Opera-House.jpg",
            caption: "PLACES THAT TAKE YOUR BREATH",
            rotate: "rotate-3",
        },
        {
            src: "/assets/img/Event of OC/Wedding/Champagne.jpg",
            caption: "WEDDINGS TO REMEMBER",
            rotate: "rotate-6",
        },
    ];

    return (
        <section className="relative flex flex-wrap justify-center items-center gap-[-40px] py-20 overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-center items-center gap-[-40px]">
                {photos.map((photo, index) => (
                    <div
                        key={index}
                        className={`relative bg-white rounded-lg shadow-xl p-3 mx-[-25px] transform ${photo.rotate} hover:scale-105 transition-all duration-500`}
                        style={{ width: 300, height: 400 }}
                        data-aos={photo.aos}
                        data-aos-delay={index * 200}
                    >
                        <div className="relative w-full h-[340px] rounded-md overflow-hidden">
                            <Image
                                src={photo.src}
                                alt={photo.caption}
                                fill
                                className="object-cover rounded-md"
                            />
                        </div>
                        <p className="text-center text-gray-700 font-medium mt-3 tracking-wide text-sm">
                            {photo.caption}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PolaroidGallery;
