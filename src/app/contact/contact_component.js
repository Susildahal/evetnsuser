"use client";
import React, { use, useEffect } from "react";
import Image from "next/image";
import SectionHeader from "@/component/Title";
import { Phone, Mail, MapPin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Cormorant_Garamond, Cinzel, Montserrat, Raleway } from "next/font/google";
import axiosInstance from "@/config/axios";
import { Formik } from "formik";

export const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "700", "900"],
  variable: "--font-montserrat",
});

// Dynamic Data

const ContactComponent = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 900,
      offset: 100,
      once: true,
      easing: "ease-out-cubic",
      disable: 'mobile' // Disable AOS on mobile for smoother performance
    });
  }, []);

  const inationalvalue = {
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  };
  const [data , setData] = React.useState(inationalvalue);
  const getdata = async () => {
    const res = await axiosInstance.get('/settings');
    setData(res.data);
  }
  useEffect(() => { 
    getdata();
  }, []);
 
  const [loading, setLoading] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/contactus', values);
      console.log('Form submitted successfully:', response.data);
      setSuccessMessage("Message sent successfully!");
      resetForm();
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };
   
  const contactData = {
    title: "Contact Us",
    subtitle: "Let's Talk",
    heading: "Get In Touch",
    description:
      "Our doors are never closed. Let's start a dialogue and go on an adventure together.",
    image: "/assets/img/Event of OC/Music/DJ2.jpg",
    contacts: [
      {
        icon: Phone,
        label: "Phone",
        value: data.phone || "+0426006760",
      },
      {
        icon: Mail,
        label: "Email",
        value: data.email || "the.events.oc@gmail.com",
      },
      {
        icon: MapPin,
        label: "Address",
        value: data.address || "Gold Coast, Australia"
      },
    ],
  };

  return (
    <div className="mt-[100px] container mx-auto px-4 py-10 overflow-hidden">
      {/* Header */}
      <div data-aos="fade-down">
        <SectionHeader title={contactData.title} />
      </div>

      {/* Contact Page Content */}
      <div className="flex flex-col gap-[30px]">
        <div className="flex flex-col lg:flex-row items-center justify-center relative">
          {/* Left Image */}
          <div className="lg:w-[45%] w-full h-[400px] lg:h-[600px] relative rounded-xl overflow-hidden shadow-2xl"
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
          <div className="w-full lg:w-[40%] bg-[rgba(216,216,216,0.9)] rounded-xl p-6 lg:p-10 shadow-2xl flex flex-col gap-[12px] lg:-ml-28 mt-6 lg:mt-0 z-10 backdrop-blur-sm"
            data-aos="fade-left"
            data-aos-delay="300"
            data-aos-anchor-placement="top-bottom">
            <span className={`${montserrat.className} font-medium text-sm text-gray-500 tracking-widest uppercase`}>
              {contactData.subtitle}
            </span>

            <div className="flex flex-col gap-1">
              <h2 className={`${montserrat.className} text-3xl lg:text-4xl font-bold bg-gradient-to-r from-[#9a7120] to-[#e3c979] bg-clip-text text-transparent`}>
                {contactData.heading}
              </h2>

              <p className={`${montserrat.className} font-medium text-gray-600 text-sm lg:text-base leading-relaxed`}>
                {contactData.description}
              </p>
            </div>

            {/* Dynamic Contact Info */}
            <div className="flex flex-col gap-4 mt-3">
              {contactData.contacts.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="p-3 bg-gray-200 rounded-full flex-shrink-0">
                      <Icon className="w-4 h-4 text-[#9a7120]" />
                    </div>
                    <span className={`${montserrat.className} text-gray-800 font-medium text-sm lg:text-base`}>
                      {item.value}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Form */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          }}
          onSubmit={handleSubmit}
        >
          {({ values, handleChange, handleSubmit }) => (
            <form
              onSubmit={handleSubmit}
              className="w-full md:w-[75%] mx-auto mt-10 flex flex-col items-center"
              data-aos="fade-up"
              data-aos-delay="200">
              {/* Two-column layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full">
                {/* Name */}
                <div className="flex flex-col w-full">
                  <label className={`${montserrat.className} text-gray-300 mb-1 text-sm`}>
                    Name
                  </label>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your Name"
                    className={`${montserrat.className} border-b border-[#D7B26A] bg-transparent py-2 text-gray-300 focus:outline-none text-sm`}
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col w-full">
                  <label className={`${montserrat.className} text-gray-300 mb-1 text-sm`}>
                    Email
                  </label>
                  <input
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    type="email"
                    placeholder="Your Email"
                    className={`${montserrat.className} border-b border-[#D7B26A] bg-transparent py-2 text-gray-300 focus:outline-none text-sm`}
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col w-full">
                  <label className={`${montserrat.className} text-gray-300 mb-1 text-sm`}>
                    Phone
                  </label>
                  <input
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    type="text"
                    placeholder="Your Phone"
                    className={`${montserrat.className} border-b border-[#D7B26A] bg-transparent py-2 text-gray-300 focus:outline-none text-sm`}
                  />
                </div>

                {/* Subject */}
                <div className="flex flex-col w-full">
                  <label className={`${montserrat.className} text-gray-300 mb-1 text-sm`}>
                    Subject
                  </label>
                  <input
                    name="subject"
                    value={values.subject}
                    onChange={handleChange}
                    type="text"
                    placeholder="Subject"
                    className={`${montserrat.className} border-b border-[#D7B26A] bg-transparent py-2 text-gray-300 focus:outline-none text-sm`}
                  />
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col mt-6 w-full">
                <label className={`${montserrat.className} text-gray-300 mb-1 text-sm`}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={values.message}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Write your message..."
                  className={`${montserrat.className} border-b border-[#D7B26A] bg-transparent py-2 text-gray-300 focus:outline-none text-sm`}
                />
              </div>

              {/* Submit */}
              <div className="mt-8 w-full flex flex-col items-center">
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-b from-[#BE9545] to-[#7A5E39] text-white rounded-md text-sm lg:text-base hover:opacity-90 transition-opacity"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
                {successMessage && (
                  <p className="mt-4 text-green-500 text-sm">{successMessage}</p>
                )}
              </div>
            </form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default ContactComponent;