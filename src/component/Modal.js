"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Event_OC_Logo from "/public/assets/img/EventOC_Logo.png";
import Left_heading_line from "/public/assets/img/Left.png";
import Right_heading_line from "/public/assets/img/Right.png";
import { Check } from "lucide-react";

import { Cormorant_Garamond, Cinzel, Montserrat, Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
});

export default function FourStepModal({ isOpen, onClose }) {

  const [selectedBudget, setSelectedBudget] = useState("");
  const [budgetRanges, setBudgetRanges] = useState([]);

  // Predefined ranges for each budget level
  const budgetOptions = {
    low: ["AUD 1,000 - AUD 5,000", "AUD 5,001 - AUD 10,000"],
    medium: ["AUD 10,001 - AUD 25,000", "AUD 25,001 - AUD 50,000"],
    high: ["AUD 50,001 - AUD 100,000+", "AUD 100,001 - Above"],
  };

  // Handle budget change
  const handleBudgetChange = (e) => {
    const value = e.target.value;
    setSelectedBudget(value);
    setBudgetRanges(budgetOptions[value] || []);
  };


  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const steps = [
    { step: 1, label: "Basic Info" },
    { step: 2, label: "Event Details" },
    { step: 3, label: "Preferences" },
    { step: 4, label: "Verification" },
  ];

  const handleFinish = () => {
    setIsSuccess(true);
  };

  // Event Type
  const [selectedEvent, setSelectedEvent] = useState("");
  const [customEvent, setCustomEvent] = useState("");

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setSelectedEvent(value);
    if (value !== "other") setCustomEvent(""); // Clear custom if not "other"
  };


  // Terms and Conditions
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <Dialog.Panel className="bg-black rounded-lg w-full max-w-md sm:max-w-2xl p-4 sm:p-6 relative border border-[#D7B26A]/50 shadow-lg max-h-[90vh] overflow-y-auto">
        {!isSuccess ? (
          <>
            {/* Logo & Title */}
            <div className="flex flex-col items-center justify-center">
              <Image src={Event_OC_Logo} alt="Logo" className="w-24 h-auto sm:w-32 mb-2" />
              <div className="flex items-center gap-2 sm:gap-4 mt-4 flex-wrap justify-center">
                <Image src={Left_heading_line} alt="Left line" className="w-6 sm:w-10 h-auto" />
                <span
                  className="text-[#D7B26A] text-[20px] sm:text-[26px] text-center uppercase"
                  style={{ fontFamily: "var(--font-cinzel-regular)", lineHeight: "1.2" }}
                >
                  Excited to Engage <br /> with our Team?
                </span>
                <Image src={Right_heading_line} alt="Right line" className="w-6 sm:w-10 h-auto" />
              </div>
            </div>

            {/* Step Progress Indicator */}
            <div className="flex items-center justify-center mb-6 mt-6 flex-wrap gap-2 sm:gap-4">
              {steps.map((item, index) => (
                <div key={item.step} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-sm font-semibold transition-all duration-300 ${step === item.step
                      ? "bg-[#D7B26A] text-black shadow-[0_0_10px_#D7B26A]"
                      : step > item.step
                        ? "bg-[#D7B26A]/80 text-black"
                        : "border border-[#D7B26A]/40 text-[#D7B26A]/60"
                      }`}
                  >
                    {item.step}
                  </div>
                  <span
                    className={`${raleway.className} ml-1 sm:ml-2 text-xs sm:text-sm font-medium ${step === item.step ? "text-[#D7B26A]" : "text-[#D7B26A]/60"
                      }`}
                  >
                    {item.label}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-10 sm:w-16 h-[2px] mx-1 sm:mx-2 transition-all duration-300 ${step > item.step ? "bg-[#D7B26A]" : "bg-[#D7B26A]/30"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="text-center text-black dark:text-white text-base sm:text-lg mb-6 space-y-4">
              {/* Step content same as your current steps */}
              {step === 1 && (
                <div className="space-y-2 flex flex-col gap-3">
                  {/* Full Name */}
                  <div>
                    <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                      Full Name <span className="text-red-600 text-2xl align-top">*</span>
                    </label>

                    <input
                      type="text"
                      name="firstName"
                      required
                      className={`${raleway.className} text-sm w-full border border-[#D7B26A] px-2 sm:px-3 py-2 rounded-md bg-transparent text-white focus:outline-none`}
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <div className="flex-1">
                      <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                        Email <span className="text-red-600 text-2xl align-top">*</span>
                      </label>
                      <input
                        type="text"
                        name="email"
                        required
                        className={`${raleway.className} w-full border border-[#D7B26A] px-2 sm:px-3 py-2 rounded-md bg-transparent text-white text-sm focus:outline-none`}
                      />
                    </div>

                    <div className="flex-1">
                      <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                        Contact Number <span className="text-red-600 text-2xl align-top">*</span>
                      </label>
                      <input
                        type="text"
                        name="contact"
                        required
                        className={`w-full border border-[#D7B26A] px-2 sm:px-3 py-2 rounded-md bg-transparent text-white text-sm focus:outline-none`}
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2 */}
              {step === 2 && (
                <div className="space-y-2 flex flex-col gap-3">
                  {/* Event Type */}
                  <div className="flex-1 relative">
                    <label
                      className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}
                    >
                      Event Type <span className="text-red-600 text-2xl align-top">*</span>
                    </label>

                    {/* When "Other" is selected, show input */}
                    {selectedEvent === "other" ? (
                      <input
                        type="text"
                        name="customEvent"
                        value={customEvent}
                        onChange={(e) => setCustomEvent(e.target.value)}
                        placeholder="Enter your event type"
                        required
                        className={`${raleway.className} w-full border border-[#D7B26A] px-3 py-2 rounded-md bg-black text-[#D7B26A] text-sm focus:outline-none mt-1`}
                      />
                    ) : (
                      <div className="relative mt-1">
                        <select
                          name="eventType"
                          required
                          value={selectedEvent}
                          onChange={handleSelectChange}
                          className={`${raleway.className} w-full border border-[#D7B26A] px-3 py-2 rounded-md bg-black text-[#D7B26A] text-sm appearance-none pr-10 focus:outline-none cursor-pointer`}
                        >
                          <option value="">Select Event Type</option>
                          <option value="birthday">Birthday</option>
                          <option value="beach_pool">Beach & Pool</option>
                          <option value="brand_launch">Brand Launch</option>
                          <option value="music_night">Music Night</option>
                          <option value="other">Other</option>
                        </select>

                        {/* Dropdown Arrow */}
                        <div className="absolute inset-y-0 top-0 right-3 flex items-center pointer-events-none">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="#D7B26A"
                            className="w-5 h-5"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Number of People Expected */}
                  <div className="flex-1 relative">
                    <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start mb-1`}>
                      Number of People <span className="text-red-600 text-2xl align-top">*</span>
                    </label>

                    <div className="relative w-full">
                      <input
                        type=""
                        name="expectedPeople"
                        required
                        min={1}
                        defaultValue={1}
                        placeholder="Enter number of people"
                        aria-label="Number of People Expected"
                        className={`${raleway.className} w-full border border-[#D7B26A] px-3 py-2 pr-12 rounded-md bg-black text-[#D7B26A] text-sm focus:outline-none appearance-none`}
                      />

                      {/* Custom Inline Buttons */}
                      {/* <div className="absolute top-0 right-0 h-full flex flex-col justify-center border-l border-[#D7B26A] rounded-r-md bg-black">
                        <button
                          type="button"
                          className="px-3 py-0.5 hover:bg-[#D7B26A] hover:text-black transition-colors"
                          onClick={() => {
                            const input = document.querySelector('input[name="expectedPeople"]');
                            input.value = Number(input.value || 0) + 1;
                            input.dispatchEvent(new Event('input', { bubbles: true })); // triggers any React events
                          }}
                        >
                          ▲
                        </button>
                        <button
                          type="button"
                          className="px-3 py-0.5 hover:bg-[#D7B26A] hover:text-black transition-colors"
                          onClick={() => {
                            const input = document.querySelector('input[name="expectedPeople"]');
                            input.value = Math.max(Number(input.value || 1) - 1, 1);
                            input.dispatchEvent(new Event('input', { bubbles: true }));
                          }}
                        >
                          ▼
                        </button>
                      </div> */}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Event Date */}
                    <div className="flex-1 relative">
                      <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                        Event Date <span className="text-red-600 text-2xl align-top">*</span>
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        required
                        className={`${raleway.className} text-sm w-full border border-[#D7B26A] px-3 py-2 rounded-md bg-transparent text-[#D7B26A] pr-10
               focus:outline-none focus:ring-1 focus:ring-[#D7B26A] appearance-none`}
                      />

                      {/* Custom calendar icon */}
                      <svg
                        onClick={() => document.querySelector('input[name="eventDate"]').showPicker?.()}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="#D7B26A"
                        strokeWidth={2}
                        className="w-5 h-5 absolute right-3 top-[70%] -translate-y-1/2 cursor-pointer"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>

                    {/* Event Venue */}
                    {/* <div className="flex-1 relative">
                      <label className={`block text-sm font-medium text-[#D7B26A] text-start`}>
                        Event Venue <span className="text-red-600 text-2xl align-top">*</span>
                      </label>

                      <select
                        name="eventVenue"
                        required
                        aria-label="Select Event Venue"
                        className={`${raleway.className} w-full border border-[#D7B26A] px-3 py-2 rounded-md bg-black text-[#D7B26A] text-sm appearance-none pr-10 focus:outline-none focus:ring-2 focus:ring-[#D7B26A] focus:border-[#D7B26A]`}
                      >
                        <option value="">Select Venue</option>
                        <option value="grand_ballroom">Grand Ballroom</option>
                        <option value="skyline_atrium">Skyline Atrium</option>
                        <option value="marble_courtyard">Marble Courtyard</option>
                        <option value="emerald_garden">Emerald Garden</option>
                      </select>

                      <div className="absolute inset-y-0 top-7 right-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2}
                          stroke="#D7B26A"
                          className="w-5 h-5"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div> */}

                  </div>
                </div>
              )}

              {/* Step 3 */}
              {step === 3 && (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    {/* Select Budget */}
                    <div className="flex-1 relative">
                      <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                        Select Budget <span className="text-red-600 text-2xl align-top">*</span>
                      </label>

                      <select
                        value={selectedBudget}
                        onChange={handleBudgetChange}
                        className={`${raleway.className} w-full border border-[#D7B26A] px-3 py-2 rounded-md bg-black text-[#D7B26A] text-sm focus:outline-none mt-1`}
                      >
                        <option value="">Select Budget</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>

                    {/* Budget Range */}
                    <div className="flex-1 relative">
                      <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                        Budget Range <span className="text-red-600 text-2xl align-top">*</span>
                      </label>
                      <select
                        disabled={!selectedBudget}
                        className={`${raleway.className} w-full border border-[#D7B26A] px-2 sm:px-3 py-2 rounded-md  bg-black text-[#D7B26A] text-sm focus:outline-none focus:ring-1 focus:ring-[#D7B26A] 
                      ${!selectedBudget ? "opacity-60 cursor-not-allowed" : ""}`}
                      >
                        <option value="">
                          {selectedBudget ? "Select Range" : "Select Budget First"}
                        </option>
                        {budgetRanges.map((range, index) => (
                          <option key={index} value={range}>
                            {range}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Your Message */}
                  <div className="space-y-2">
                    <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] mb-2 text-start`}>
                      Your Message
                    </label>
                    <textarea
                      placeholder="Special Requests..."
                      rows={3}
                      className={`${raleway.className} w-full border border-[#D7B26A] px-2 sm:px-3 py-2 rounded-md bg-transparent text-[#D7B26A] text-sm focus:outline-none`}
                    />
                  </div>

                  {/* I need a */}
                  <div>
                    <p className={`${raleway.className}block text-sm font-medium text-[#D7B26A] mb-2 text-start`}>
                      I need a: <span className="text-red-600 text-md align-bottom">*</span>
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#D7B26A]">
                      {[
                        "Venue",
                        "Catering",
                        "Entertainment",
                        "AV",
                        "Style/Design",
                        "Floral",
                        "Photographer",
                        "Transport",
                      ].map((service) => (
                        <label
                          key={service}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          {/* Hidden checkbox */}
                          <input type="checkbox" className="hidden peer" />

                          {/* Custom checkbox */}
                          <div
                            className="w-4 h-4 border border-[#D7B26A] rounded-md flex items-center justify-center
          peer-checked:bg-[#D7B26A] peer-checked:border-[#D7B26A] transition-all duration-300"
                          >
                            {/* Rough tick SVG */}
                            <svg
                              className="w-4 h-4 text-[#D7B26A] opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={3}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 12l6 6L20 6" />
                            </svg>
                          </div>

                          {/* Service name */}
                          <span>{service}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4 */}
              {step === 4 && (
                <div className="space-y-4">
                  <div>
                    <p className={`${raleway.className} block text-sm font-medium text-[#D7B26A] mb-1 text-start`}>
                      Preferred Contact Method: <span className="text-red-600 text-xl align-middle">*</span>
                    </p>
                    <div
                      className={`${raleway.className} flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-[#D7B26A]`}
                    >
                      {["Email", "Call", "SMS"].map((method) => (
                        <label
                          key={method}
                          className="flex items-center gap-2 cursor-pointer select-none"
                        >
                          {/* Visually hidden checkbox */}
                          <input type="checkbox" className="sr-only peer" />

                          {/* Custom checkbox */}
                          <div className="w-4 h-4 border border-[#D7B26A] rounded-md flex items-center justify-center transition-all duration-300 peer-checked:bg-[#D7B26A] peer-checked:text-black">
                            {/* Tick icon (visible only when checked) */}
                            <svg
                              className="w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                              viewBox="0 0 20 20"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M4 10l4 4 8-8" />
                            </svg>
                          </div>

                          {/* Label text */}
                          <span>{method}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="space-y-2">
                    {/* Checkbox and Label */}
                    <label
                      className={`${raleway.className} flex items-center text-sm font-medium text-[#D7B26A] gap-2 cursor-pointer select-none`}
                    >
                      <input type="checkbox" className="sr-only peer" required />

                      {/* Custom Checkbox */}
                      <div className="w-4 h-4 border border-[#D7B26A] rounded-md flex items-center justify-center transition-all duration-300 peer-checked:bg-[#D7B26A] peer-checked:text-black">
                        <svg
                          className="w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity duration-300"
                          viewBox="0 0 20 20"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M4 10l4 4 8-8" />
                        </svg>
                      </div>

                      {/* Text + Toggle */}
                      <span>
                        I agree to the{" "}
                        <button
                          type="button"
                          onClick={() => setIsExpanded(!isExpanded)}
                          className="underline text-[#D7B26A] hover:text-[#e7c880] transition-colors cursor-pointer"
                        >
                          Terms and Conditions
                        </button>
                        <span className="text-red-500 ml-1">*</span>
                      </span>
                    </label>

                    {/* Collapsible Box */}
                    <div
                      className={`
          ${raleway.className} 
          overflow-hidden transition-all duration-500 ease-in-out
          ${isExpanded ? "max-h-[700px] p-4 mt-2 border border-[#D7B26A]/40 rounded-lg opacity-100" : "max-h-0 p-0 mt-0 border-0 opacity-0"}
          bg-black/40 text-[#D7B26A] text-sm space-y-3
        `}
                    >
                      {/* Only render content when expanded to avoid flicker */}
                      {isExpanded && (
                        <>
                          <h3 className="text-base font-semibold text-[#e7c880]">
                            Terms & Conditions
                          </h3>

                          <ul className="list-disc list-outside pl-5 space-y-1 text-justify">
                            <li>
                              A non-refundable deposit of [X amount] is required to secure your event date.
                            </li>
                            <li>
                              If payment is not received on time, we reserve the right to cancel services.
                            </li>
                            <li>
                              Additional costs may apply for changes, rescheduling, or extra services.
                            </li>
                            <li>
                              Any requests to change event details (e.g., date, time, location, or services)
                              must be submitted ahead of time.
                            </li>
                            <li>
                              We will make reasonable efforts to accommodate changes, but availability cannot
                              be guaranteed.
                            </li>
                            <li>
                              Cancellations made more than 2 days before the event may be eligible for a
                              partial refund (excluding the deposit).
                            </li>
                            <li>
                              We are not liable for loss, damage, or expense arising from your event except
                              where caused by proven negligence.
                            </li>
                            <li>You are responsible for the safety and conduct of guests at the event.</li>
                            <li>
                              By confirming your booking and paying the deposit, you acknowledge that you have
                              read, understood, and agree to these Terms & Conditions.
                            </li>
                            <li>
                              All data collected will be handled per our{" "}
                              <Link
                                href="/privacy-policy"
                                className="underline text-[#e7c880] hover:text-[#D7B26A]"
                              >
                                Privacy Policy
                              </Link>
                              .
                            </li>
                          </ul>

                          <p className="text-xs text-[#e7c880]/70 italic">
                            Please review these terms carefully before proceeding.
                          </p>

                          {/* Read Less Button */}
                          {/* <button
                            type="button"
                            onClick={() => setIsExpanded(false)}
                            className="text-[#e7c880] text-sm underline hover:text-[#D7B26A] transition-colors"
                          >
                            Read Less ▲
                          </button> */}
                        </>
                      )}
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row justify-between gap-3 sm:gap-0">
              <button
                onClick={prevStep}
                disabled={step === 1}
                className={`${raleway.className} px-4 py-2 rounded border border-[#D7B26A] cursor-pointer font-medium ${step === 1
                  ? "bg-gray-300 text-black cursor-not-allowed"
                  : "bg-transparent text-[#D7B26A] hover:bg-[#D7B26A] hover:text-black transition-colors"
                  }`}
              >
                Back
              </button>

              {step < 4 ? (
                <button
                  onClick={nextStep}
                  className={`${raleway.className} px-4 py-2 rounded bg-[#D7B26A] text-black font-medium hover:bg-[#b89652] transition-colors cursor-pointer`}
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleFinish}
                  className={`${raleway.className} px-4 py-2 rounded bg-[#D7B26A] text-black font-medium hover:bg-[#b89652] transition-colors cursor-pointer`}
                >
                  Finish
                </button>
              )}
            </div>
          </>
        ) : (
          // Success Message
          <div className="flex flex-col items-center justify-center gap-4 p-6">
            <h2 className={`${raleway.className} text-[#D7B26A] text-2xl sm:text-3xl font-semibold`}>Thank You!</h2>
            <p className={`${raleway.className} text-white text-base sm:text-lg text-center`}>
              Your information has been successfully submitted. <br />
              Our team will contact you shortly.
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-6 py-2 bg-[#D7B26A] text-black rounded-md hover:bg-[#b89652] transition-colors cursor"
            >
              Close
            </button>
          </div>
        )}

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-6 text-[20px] sm:text-[22px] text-[#D7B26A] hover:text-[#ffda8f] cursor-pointer"
        >
          ✕
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}
