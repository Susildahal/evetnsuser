"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaFacebookF, FaPhoneAlt, FaEnvelope, FaPaperPlane, FaTwitter, FaLinkedinIn, FaYoutube, FaGithub, FaGlobe, FaLink, FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import AOS from "aos";
import "aos/dist/aos.css";
import Logo from "../../public/assets/img/EventOC_Logo.png";
import { Cinzel, Montserrat, Raleway } from "next/font/google";
import { useDispatch, useSelector } from "react-redux";
import { fetchSettings } from "@/redux/slicer/settingslicer";



export const cinzel = Cinzel({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    variable: "--font-cinzel",
    display: "swap",
});

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    variable: "--font-montserrat",
    display: "swap",
});

export const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "500", "600", "700", "900"],
    variable: "--font-raleway",
    display: "swap",
});

const Footer = () => {
    const dispatch = useDispatch();
    const { settings, status, error } = useSelector((state) => state.settings);
    
    // Use settings data directly
    const data = settings || {};

    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
            easing: "ease-out",
            offset: 100,
        });
    }, []);

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchSettings());
        }
    }, [dispatch, status]);

    // Debug logging
    useEffect(() => {
        console.log('Redux State:', { settings, status, error });
    }, [settings, status, error]);
    
    // Icon mapping for social media
    const getSocialIcon = (iconName) => {
        const normalizedIcon = iconName?.toLowerCase().trim();
        
        switch (normalizedIcon) {
            case 'facebook':
                return <FaFacebookF size={20} />;
            case 'twitter':
            case 'x':
                return <FaXTwitter size={20} />;
            case 'instagram':
                return <FaInstagram size={20} />;
            case 'linkedin':
                return <FaLinkedinIn size={20} />;
            case 'youtube':
                return <FaYoutube size={20} />;
            case 'github':
                return <FaGithub size={20} />;
            case 'tiktok':
                return <FaTiktok size={20} />;
            case 'website':
            case 'globe':
                return <FaGlobe size={20} />;
            case 'link':
                return <FaLink size={20} />;
            default:
                return <FaLink size={20} />; // Default icon
        }
    };
            

    return (
        <footer className="bg-[#141414] text-gray-300 pt-10 pb-4">
            {/* Logo and Socials */}
            <div className="text-center mb-8 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40" data-aos="fade-up">
                <div className="flex justify-center mb-4">
                    <Image src={Logo} alt="EventsOC Logo" width={160} height={95} className="mx-auto" priority />
                </div>
                <p className={`text-[#D7B26A]/80 text-sm sm:text-base ${montserrat.className} sm:w-[65%] mx-auto`}>
                    {data.siteDescription || "We are more than an event planning service — we create worlds where luxury meets wild freedom. Every moment we craft is designed to be felt, remembered, and never replicated."}
                </p>
                
                {/* Dynamic Social Media Icons */}
                {data.socialMedia && data.socialMedia.length > 0 && (
                    <div className="flex justify-center gap-8 text-[#D7B26A]/80 text-lg my-6">
                        {data.socialMedia.map((social, index) => (
                            <Link 
                                key={social._id || index} 
                                href={social.url || "#"} 
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name || social.icon}
                                className="w-10 h-10 border border-[#D7B26A] flex items-center justify-center rounded-full hover:bg-[#D7B26A] hover:text-black hover:scale-110 transition-all duration-300 ease-in-out"
                            >
                                {getSocialIcon(social.icon)}
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            {/* Divider */}
            <div className="border-t border-[#FFF4DE]/30 max-w-6xl mx-auto mb-8 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40"></div>

            {/* Footer Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-6xl mx-auto px-4">
                {/* Quick Links */}
                <div>
                    <h3 className={`text-[#D7B26A]/80 font-serif text-lg sm:text-xl mb-4 tracking-wide ${cinzel.className}`}>
                        QUICK LINKS
                    </h3>
                    <ul className={`space-y-2 text-[#b9b9b9] ${raleway.className}`}>
                        {["Home", "About Us", "Gallery", "FAQs"].map((item, idx) => (
                            <li key={idx}>
                                <Link
                                    href={`/${item === "Home" ? "" : item.toLowerCase().replace(/\s+/g, "-")}`}
                                    className="text-[16px] relative hover:text-[#D7B26A] transition duration-300 
                  after:content-[''] after:absolute after:left-0 after:-bottom-[2px] 
                  after:w-0 after:h-[1px] after:bg-[#D7B26A] after:transition-all after:duration-300 
                  hover:after:w-full"
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Popular Services */}
                <div>
                    <h3 className={`text-[#D7B26A] font-serif text-lg sm:text-xl mb-4 tracking-wide ${cinzel.className}`}>
                        POPULAR SERVICES
                    </h3>
                    <ul className={`space-y-2 text-[#b9b9b9] ${raleway.className}`}>
                        {["Venue Sourcing", "Catering", "Styles & Designs", "Floral"].map((service, idx) => (
                            <li key={idx}>
                                <Link
                                    href={`/services/${service.toLowerCase().replace(/\s+/g, "")}`}
                                    className="text-[16px] relative hover:text-[#D7B26A] transition duration-300 
                  after:content-[''] after:absolute after:left-0 after:-bottom-[2px] 
                  after:w-0 after:h-[1px] after:bg-[#D7B26A] after:transition-all after:duration-300 
                  hover:after:w-full"
                                >
                                    {service}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Terms & Policies */}
                <div>
                    <h3 className={`text-[#D7B26A] font-serif text-lg sm:text-xl mb-4 tracking-wide ${cinzel.className}`}>
                        TERMS & POLICIES
                    </h3>
                    <ul className={`space-y-2 text-[#b9b9b9] ${raleway.className}`}>
                        {["Terms & Conditions", "Privacy Policy"].map((policy, idx) => (
                            <li key={idx}>
                                <Link
                                    href={`/terms-and-conditions`}
                                    className="text-[16px] relative hover:text-[#D7B26A] transition duration-300 
                  after:content-[''] after:absolute after:left-0 after:-bottom-[2px] 
                  after:w-0 after:h-[1px] after:bg-[#D7B26A] after:transition-all after:duration-300 
                  hover:after:w-full"
                                >
                                    {policy}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className={`text-[#D7B26A] text-lg sm:text-xl mb-4 tracking-wide ${cinzel.className}`}>
                        CONTACT
                    </h3>
                    <ul className={`space-y-2 text-[#b9b9b9] ${raleway.className}`}>
                        <li>
                            <a className="flex items-center gap-2 hover:text-[#D7B26A] transition duration-300">
                                <FaPhoneAlt className="text-[#D7B26A] w-4 h-4" />
                                <span className="text-[16px]">{data.phone || '0426006760'}</span>
                            </a>
                        </li>
                        <li>
                            <a
                                href={`mailto:${data.email || 'the.events.oc@gmail.com'}`}
                                className="flex items-center gap-2 hover:text-[#D7B26A] transition duration-300"
                                aria-label={`Send an email to ${data.email || 'the.events.oc@gmail.com'}`}
                            >
                                <FaEnvelope className="text-[#D7B26A] w-4 h-4" />
                                <span className="text-[16px]">{data.email ||  '  the.events.oc@gmail.com   '}</span>
                            </a>
                        </li>
                        <li className="flex items-center gap-2">
                            <FaPaperPlane className="text-[#D7B26A]" />
                            <span className="text-[16px]">{data.address || 'Gold Coast, Australia'}</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Divider */}
            <div className="border-t border-[#FFF4DE]/30 mt-8 mb-4 max-w-6xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40"></div>

            {/* Copyright */}
            <div className={`${raleway.className} text-center text-[#b9b9b9] text-[14px] sm:text-[16px] px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 2xl:px-40`}>
                2025 Copyright © <span className="text-[#D7B26A]">EventsOC</span> - Events of the Century. Crafted by{" "}
                <Link href="https://murphystechnology.com/" className="text-[#D7B26A]">Murphys Technology</Link>
            </div>
        </footer>
    );
};

export default Footer;
