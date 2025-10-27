"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import SectionHeader from "@/component/Title";
import { Phone, Mail, MapPin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Cormorant_Garamond, Cinzel, Montserrat, Raleway } from "next/font/google";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
});

// Dynamic Data
const contactData = {
  title: "Contact Us",
  subtitle: "Let’s Talk",
  heading: "Get In Touch",
  description:
    "Our doors are never closed. Let’s start a dialogue and go on an adventure together.",
  image: "/assets/img/Event of OC/Music/Music.jpg",
  contacts: [
    {
      icon: Phone,
      label: "Phone",
      value: "+0426006760",
    },
    {
      icon: Mail,
      label: "Email",
      value: "the.events.oc@gmail.com",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "Gold Coast, Australia",
    },
  ],
};

const ContactComponent = () => {

  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      offset: 100,
      once: true,
      easing: "ease-out-cubic",
    });
  }, []);


  return (
    <div className="mt-[100px] container mx-auto px-4 py-10">
      {/* Header */}
      <div data-aos="fade-down">
        <SectionHeader title={contactData.title} />
      </div>

      {/* Contact Page Content */}
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col lg:flex-row items-center justify-center relative">
          {/* Left Image */}
          <div className="lg:w-[45%] w-full h-[600px] relative rounded-xl overflow-hidden shadow-2xl"
            data-aos="fade-right"
            data-aos-delay="150">
            <Image
              src={contactData.image}
              alt="Contact"
              className="w-full h-full object-cover"
              width={800}
              height={600}
              quality={100}
              priority
            />
          </div>

          {/* Right Info Card */}
          <div className="lg:w-[40%] w-full bg-[rgba(216,216,216,0.9)] rounded-xl p-10 shadow-2xl flex flex-col gap-[12px] lg:-ml-28 mt-[-60px] lg:mt-0 z-10 backdrop-blur-sm"
            data-aos="fade-left"
            data-aos-delay="300">
            <span className={`${raleway.className} font-medium text-sm text-gray-500 tracking-widest uppercase`}>
              {contactData.subtitle}
            </span>

            <div className="flex flex-col gap-1">
              <h2 className={`${raleway.className} text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#9a7120] to-[#e3c979] bg-clip-text text-transparent`}>
                {contactData.heading}
              </h2>

              <p className={`${raleway.className} font-medium text-gray-600 text-base leading-relaxed`}>
                {contactData.description}
              </p>
            </div>

            {/* Dynamic Contact Info */}
            <div className="flex flex-col gap-4 mt-3">
              {contactData.contacts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-3 bg-gray-200 rounded-full">
                      <Icon className="w-4 h-4 text-[#9a7120]" />
                    </div>
                    <span className={`${raleway.className} text-gray-800 font-medium`}>
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form */}
        <form className="w-full md:w-[75%] mx-auto mt-10 flex flex-col items-center"
          data-aos="fade-up"
          data-aos-delay="200">
          {/* Two-column layout for top fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Name */}
            <div className="flex flex-col w-full">
              <label htmlFor="name" className={`${raleway.className} text-gray-300 font-medium mb-1`}>
                Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Your Name"
                className={`${raleway.className} border-b border-[#D7B26A] focus:border-b-2 focus:outline-none py-2 bg-transparent text-gray-300 w-full`}
              />
            </div>

            {/* Email */}
            <div className="flex flex-col w-full">
              <label htmlFor="email" className={`${raleway.className} text-gray-300 font-medium mb-1`}>
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Your Email"
                className={`${raleway.className} border-b border-[#D7B26A] focus:border-b-2 focus:outline-none py-2 bg-transparent text-gray-300 w-full`}
              />
            </div>

            {/* Phone */}
            <div className="flex flex-col w-full">
              <label htmlFor="phone" className={`${raleway.className} text-gray-300 font-medium mb-1`}>
                Phone
              </label>
              <input
                id="phone"
                type="text"
                placeholder="Your Phone"
                className={`${raleway.className} border-b border-[#D7B26A] focus:border-b-2 focus:outline-none py-2 bg-transparent text-gray-300 w-full`}
              />
            </div>

            {/* Subject */}
            <div className="flex flex-col w-full">
              <label htmlFor="subject" className={`${raleway.className} text-gray-300 font-medium mb-1`}>
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Subject"
                className={`${raleway.className} border-b border-[#D7B26A] focus:border-b-2 focus:outline-none py-2 bg-transparent text-gray-200 w-full`}
              />
            </div>
          </div>

          {/* Message Field */}
          <div className="flex flex-col mt-6 w-full">
            <label htmlFor="message" className={`${raleway.className} text-gray-300 font-medium mb-1`}>
              Message
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Write your message..."
              className={`${raleway.className} border-b border-[#D7B26A] focus:border-b-2 focus:outline-none py-2 bg-transparent text-gray-300 w-full`}
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="mt-8">
            <button
              type="submit"
              className={`${raleway.className} inline-block px-6 py-2 rounded-md font-medium transition-shadow shadow-sm bg-gradient-to-b from-[#BE9545] to-[#7A5E39] text-white cursor-pointer`}
            >
              Send Message
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

export default ContactComponent;
