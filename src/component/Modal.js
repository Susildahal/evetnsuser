"use client";

import Link from "next/link";
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import Image from "next/image";
import Event_OC_Logo from "../../public/assets/img/EventOC_Logo.png";
import Left_heading_line from "../../public/assets/img/Left.png";
import Right_heading_line from "../../public/assets/img/Right.png";
import axiosInstance from "@/config/axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  variable: "--font-raleway",
  display: "swap",
});

// Validation Schema
const validationSchema = Yup.object({
  name: Yup.string()
    .required("Full name is required")
    .min(2, "Full name must be at least 2 characters"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  phone: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9+\-\s()]+$/, "Invalid contact number"),
  eventtype: Yup.string().required("Event type is required"),
  numberofpeople: Yup.number()
    .required("Number of people is required")
    .min(1, "Minimum 1 person")
    .max(10000, "Maximum 10000 people allowed"),
  eventdate: Yup.date()
    .required("Event date is required")
    .min(new Date(), "Event date must be in the future"),
  budget: Yup.string().required("Budget is required"),
  budgetrange: Yup.string().required("Budget range is required"),
  message: Yup.string().max(500, "Message cannot exceed 500 characters"),
  needs: Yup.array().min(1, "Select at least one service needed"),
  contactMethod: Yup.array().min(1, "Select at least one contact method"),
  termsAccepted: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});

// Initial Values
const initialValues = {
  name: "",
  email: "",
  phone: "",
  eventtype: "",
  customeventtype: "",
  numberofpeople: 1,
  eventdate: "",
  budget: "",
  budgetrange: "",
  message: "",
  needs: [],
  contactMethod: [],
  termsAccepted: false,
};

export default function FourStepModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverResponse, setServerResponse] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const steps = [
    { step: 1, label: "Basic Info" },
    { step: 2, label: "Event Details" },
    { step: 3, label: "Preferences" },
    { step: 4, label: "Verification" },
  ];

  // Predefined ranges for each budget level
  const budgetOptions = {
    low: ["AUD 1,000 - AUD 5,000", "AUD 5,001 - AUD 10,000"],
    medium: ["AUD 10,001 - AUD 25,000", "AUD 25,001 - AUD 50,000"],
    high: ["AUD 50,001 - AUD 100,000+", "AUD 100,001 - Above"],
  };

  // Service options
  const serviceOptions = [
    "Venue",
    "Catering",
    "Entertainment",
    "AV",
    "Style/Design",
    "Floral",
    "Photographer",
    "Transport",
  ];

  // Contact method options
  const contactMethodOptions = ["Email", "Call", "SMS"];

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setIsSubmitting(true);
    try {
      // Prepare data for submission
      const formData = {
        ...values,
        // If custom event type is entered, use it instead of the dropdown value
        finaleventtype: values.eventtype === "other" ? values.customeventtype : values.eventtype,
        submissionDate: new Date().toISOString(),
      };

      // Remove unnecessary fields
      delete formData.customeventtype;

      // Send to API
      const response = await axiosInstance.post("/bookings", formData);
      
      if (response.status === 200 || response.status === 201) {
        setIsSuccess(true);
        setServerResponse({
          type: 'success',
          message: response.data?.message || 'Your booking has been successfully submitted! We will contact you soon.',
          data: response.data
        });
        resetForm();
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      setServerResponse({
        type: 'error',
        message: error.response?.data?.message || 'There was an error submitting your form. Please try again.',
        error: error.message
      });
      // Auto-hide error message after 5 seconds
      setTimeout(() => setServerResponse(null), 5000);
    } finally {
      setIsSubmitting(false);
      setSubmitting(false);
    }
  };

  // Validate current step
  const validateCurrentStep = (values) => {
    const errors = {};
    
    switch (step) {
      case 1:
        if (!values.name) errors.name = "Required";
        if (!values.email) errors.email = "Required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = "Invalid email address";
        }
        if (!values.phone) errors.phone = "Required";
        break;
      case 2:
        if (!values.eventtype) errors.eventtype = "Required";
        if (values.eventtype === "other" && !values.customeventtype) {
          errors.customeventtype = "Please specify event type";
        }
        if (!values.numberofpeople || values.numberofpeople < 1) {
          errors.numberofpeople = "Required (min 1)";
        }
        if (!values.eventdate) errors.eventdate = "Required";
        else if (new Date(values.eventdate) < new Date()) {
          errors.eventdate = "Date must be in the future";
        }
        break;
      case 3:
        if (!values.budget) errors.budget = "Required";
        if (!values.budgetrange) errors.budgetrange = "Required";
        if (values.needs.length === 0) errors.needs = "Select at least one";
        break;
      case 4:
        if (values.contactMethod.length === 0) errors.contactMethod = "Required";
        if (!values.termsAccepted) errors.termsAccepted = "You must accept the terms";
        break;
    }
    
    return errors;
  };

  const handleStepChange = (nextStep, values, setErrors, setTouched) => {
    const errors = validateCurrentStep(values);
    
    if (Object.keys(errors).length === 0) {
      setStep(nextStep);
      setErrors({});
    } else {
      // Set touched for all fields in current step
      const touchedFields = {};
      Object.keys(errors).forEach(key => {
        touchedFields[key] = true;
      });
      setTouched(touchedFields);
      setErrors(errors);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
    >
      <Dialog.Panel className="bg-black rounded-lg w-full max-w-md sm:max-w-2xl p-4 sm:p-6 relative border border-[#D7B26A]/50 shadow-lg max-h-[90vh] overflow-y-auto transition-all duration-300 hover:border-[#F5D98A] hover:shadow-[0_0_20px_rgba(215,178,106,0.35)]">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={true}
          validateOnChange={false}
        >
          {({ values, errors, touched, setFieldValue, setErrors, setTouched }) => (
            <Form>
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
                  <div className="relative mb-6 mt-6">
                    <div className="absolute top-4 left-0 right-0 h-0.5 bg-[#D7B26A]/30" />
                    <div className="flex justify-between items-center relative">
                      {steps.map((item) => (
                        <div key={item.step} className="flex flex-col items-center text-center w-full">
                          <div
                            className={`z-10 flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full text-sm font-semibold transition-all duration-300
                              ${step === item.step
                                ? "bg-[#D7B26A] text-black shadow-[0_0_12px_rgba(215,178,106,0.7)]"
                                : step > item.step
                                  ? "bg-[#D7B26A]/80 text-black"
                                  : "border border-[#D7B26A]/40 text-[#D7B26A]/60 bg-black"
                              }`}
                          >
                            {item.step}
                          </div>
                          <span
                            className={`${raleway.className} mt-2 text-xs sm:text-sm font-medium
                              ${step === item.step ? "text-[#D7B26A]" : "text-[#D7B26A]/60"}`}
                          >
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step Content */}
                  <div className="text-center text-black dark:text-white text-base sm:text-lg mb-6 space-y-4">
                    {/* Step 1: Basic Info */}
                    {step === 1 && (
                      <div className="space-y-2 flex flex-col gap-3">
                        {/* Full Name */}
                        <div>
                          <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                            Full Name <span className="text-red-600 text-2xl align-top">*</span>
                          </label>
                          <Field
                            type="text"
                            name="name"
                            className={`${raleway.className} text-sm w-full border ${errors.name && touched.name ? 'border-red-500' : 'border-[#D7B26A]'} px-2 sm:px-3 py-2 rounded-md bg-transparent text-white focus:outline-none`}
                          />
                          <ErrorMessage name="name" component="div" className="text-red-500 text-xs mt-1 text-left" />
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          <div className="flex-1">
                            <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                              Email <span className="text-red-600 text-2xl align-top">*</span>
                            </label>
                            <Field
                              type="email"
                              name="email"
                              className={`${raleway.className} w-full border ${errors.email && touched.email ? 'border-red-500' : 'border-[#D7B26A]'} px-2 sm:px-3 py-2 rounded-md bg-transparent text-white text-sm focus:outline-none`}
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 text-left" />
                          </div>

                          <div className="flex-1">
                            <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                              Contact Number <span className="text-red-600 text-2xl align-top">*</span>
                            </label>
                            <Field
                              type="tel"
                              name="phone"
                              className={`w-full border ${errors.phone && touched.phone ? 'border-red-500' : 'border-[#D7B26A]'} px-2 sm:px-3 py-2 rounded-md bg-transparent text-white text-sm focus:outline-none`}
                            />
                            <ErrorMessage name="phone" component="div" className="text-red-500 text-xs mt-1 text-left" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 2: Event Details */}
                    {step === 2 && (
                      <div className="space-y-2 flex flex-col gap-3">
                        {/* Event Type */}
                        <div className="flex-1 relative">
                          <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                            Event Type <span className="text-red-600 text-2xl align-top">*</span>
                          </label>

                          {values.eventtype === "other" ? (
                            <>
                              <Field
                                type="text"
                                name="customeventtype"
                                placeholder="Enter your event type"
                                className={`${raleway.className} w-full border ${errors.customeventtype && touched.customeventtype ? 'border-red-500' : 'border-[#D7B26A]'} px-3 py-2 rounded-md bg-black text-[#D7B26A] text-sm focus:outline-none mt-1`}
                              />
                              <ErrorMessage name="customeventtype" component="div" className="text-red-500 text-xs mt-1 text-left" />
                            </>
                          ) : (
                            <div className="relative ">
                              <Field
                                as="select"
                                name="eventtype"
                                className={`${raleway.className} w-full border ${errors.eventtype && touched.eventtype ? 'border-red-500' : 'border-[#D7B26A]'} px-3 py-2 rounded-md bg-black text-[#D7B26A] text-sm appearance-none pr-10 focus:outline-none cursor-pointer`}
                              >
                                <option value="">Select Event Type</option>
                                <option value="birthday">Birthday</option>
                                <option value="beach_pool">Beach & Pool</option>
                                <option value="brand_launch">Brand Launch</option>
                                <option value="music_night">Music Night</option>
                                <option value="other">Other</option>
                              </Field>
                              <div className="absolute inset-y-0 top-0 right-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#D7B26A" className="w-5 h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                </svg>
                              </div>
                              <ErrorMessage name="eventtype" component="div" className="text-red-500 text-xs mt-1 text-left" />
                            </div>
                          )}
                        </div>

                        {/* Number of People Expected */}
                        <div className="flex-1 relative">
                          <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start mb-1`}>
                            Number of People <span className="text-red-600 text-2xl align-top">*</span>
                          </label>
                          <div className="relative w-full">
                            <Field
                              type="number"
                              name="numberofpeople"
                              min="1"
                              placeholder="Enter number of people"
                              className={`${raleway.className} w-full border ${errors.numberofpeople && touched.numberofpeople ? 'border-red-500' : 'border-[#D7B26A]'} px-3 py-2 pr-12 rounded-md bg-black text-[#D7B26A] text-sm focus:outline-none appearance-none`}
                            />
                            <ErrorMessage name="numberofpeople" component="div" className="text-red-500 text-xs mt-1 text-left" />
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          {/* Event Date */}
                          <div className="flex-1 relative">
                            <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                              Event Date <span className="text-red-600 text-2xl align-top">*</span>
                            </label>
                            <Field
                              type="date"
                              name="eventdate"
                              className={`${raleway.className} text-sm w-full border ${errors.eventdate && touched.eventdate ? 'border-red-500' : 'border-[#D7B26A]'} px-3 py-2 rounded-md bg-transparent text-[#D7B26A] pr-10 focus:outline-none focus:ring-1 focus:ring-[#D7B26A] appearance-none`}
                              min={new Date().toISOString().split('T')[0]}
                            />
                            <svg
                              onClick={() => document.querySelector('input[name="eventdate"]')?.showPicker?.()}
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="#D7B26A"
                              strokeWidth={2}
                              className="w-5 h-5 absolute right-3 top-[70%] -translate-y-1/2 cursor-pointer"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <ErrorMessage name="eventdate" component="div" className="text-red-500 text-xs mt-1 text-left" />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 3: Preferences */}
                    {step === 3 && (
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                          {/* Select Budget */}
                          <div className="flex-1 relative">
                            <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                              Select Budget <span className="text-red-600 text-2xl align-top">*</span>
                            </label>
                            <Field
                              as="select"
                              name="budget"
                              onChange={(e) => {
                                setFieldValue("budget", e.target.value);
                                setFieldValue("budgetrange", "");
                              }}
                              className={`${raleway.className} w-full border ${errors.budget && touched.budget ? 'border-red-500' : 'border-[#D7B26A]'} px-3 py-2 rounded-md bg-black text-[#D7B26A] text-sm focus:outline-none `}
                            >
                              <option value="">Select Budget</option>
                              <option value="low">Low</option>
                              <option value="medium">Medium</option>
                              <option value="high">High</option>
                            </Field>
                            <ErrorMessage name="budget" component="div" className="text-red-500 text-xs mt-1 text-left" />
                          </div>

                          {/* Budget Range */}
                          <div className="flex-1 relative">
                            <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] text-start`}>
                              Budget Range <span className="text-red-600 text-2xl align-top">*</span>
                            </label>
                            <Field
                              as="select"
                              name="budgetrange"
                              disabled={!values.budget}
                              className={`${raleway.className} w-full border ${errors.budgetrange && touched.budgetrange ? 'border-red-500' : 'border-[#D7B26A]'} px-2 sm:px-3 py-2 rounded-md bg-black text-[#D7B26A] text-sm focus:outline-none ${!values.budget ? "opacity-60 cursor-not-allowed" : ""}`}
                            >
                              <option value="">{values.budget ? "Select Range" : "Select Budget First"}</option>
                              {budgetOptions[values.budget]?.map((range, index) => (
                                <option key={index} value={range}>{range}</option>
                              ))}
                            </Field>
                            <ErrorMessage name="budgetrange" component="div" className="text-red-500 text-xs mt-1 text-left" />
                          </div>
                        </div>

                        {/* Your Message */}
                        <div className="space-y-2">
                          <label className={`${raleway.className} block text-sm font-medium text-[#D7B26A] mb-2 text-start`}>
                            Your Message
                          </label>
                          <Field
                            as="textarea"
                            name="message"
                            placeholder="Special Requests..."
                            rows={3}
                            className={`${raleway.className} w-full border border-[#D7B26A] px-2 sm:px-3 py-2 rounded-md bg-transparent text-[#D7B26A] text-sm focus:outline-none`}
                          />
                          <ErrorMessage name="message" component="div" className="text-red-500 text-xs mt-1 text-left" />
                        </div>

                        {/* I need a */}
                        <div>
                          <p className={`${raleway.className}block text-sm font-medium text-[#D7B26A] mb-2 text-start`}>
                            I need a: <span className="text-red-600 text-md align-bottom">*</span>
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-[#D7B26A]">
                            {serviceOptions.map((service) => (
                              <label key={service} className="flex items-center gap-2 cursor-pointer select-none">
                                <Field
                                  type="checkbox"
                                  name="needs"
                                  value={service}
                                  className="hidden peer"
                                />
                                <div className="w-4 h-4 border border-[#D7B26A] rounded-md flex items-center justify-center peer-checked:bg-[#D7B26A] peer-checked:border-[#D7B26A] transition-all duration-300">
                                  <svg className="w-4 h-4 text-[#D7B26A] opacity-0 peer-checked:opacity-100 transition-opacity duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 12l6 6L20 6" />
                                  </svg>
                                </div>
                                <span>{service}</span>
                              </label>
                            ))}
                          </div>
                          {errors.needs && touched.needs && (
                            <div className="text-red-500 text-xs mt-1 text-left">{errors.needs}</div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Step 4: Verification */}
                    {step === 4 && (
                      <div className="space-y-4">
                        {/* Form Preview Toggle */}
                        <div className="mb-4">
                          <button
                            type="button"
                            onClick={() => setShowPreview(!showPreview)}
                            className={`${raleway.className} w-full px-4 py-2 rounded-md bg-[#D7B26A]/10 border border-[#D7B26A] text-[#D7B26A] hover:bg-[#D7B26A]/20 transition-all cursor-pointer flex items-center justify-between`}
                          >
                            <span className="font-semibold">Review Your Information</span>
                            <svg className={`w-5 h-5 transition-transform ${showPreview ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          </button>
                        </div>

                        {/* Preview Section */}
                        {showPreview && (
                          <div className={`${raleway.className} bg-gradient-to-br from-[#D7B26A]/10 to-[#D7B26A]/5 border border-[#D7B26A]/40 rounded-lg p-5 space-y-4 text-sm mb-4 max-h-[500px] overflow-y-auto`}>
                            <div className="flex items-center justify-between mb-4 border-b border-[#D7B26A]/30 pb-3">
                              <h3 className="text-[#D7B26A] font-bold text-lg">Complete Form Review</h3>
                              <span className="text-xs text-gray-400 italic">Please verify all details</span>
                            </div>
                            
                            {/* Step 1: Basic Information */}
                            <div className="bg-black/30 rounded-lg p-4 space-y-3 border border-[#D7B26A]/20">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[#D7B26A] font-semibold text-base flex items-center gap-2">
                                  <span className="w-6 h-6 bg-[#D7B26A] text-black rounded-full flex items-center justify-center text-xs font-bold">1</span>
                                  Basic Information
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setStep(1);
                                    setShowPreview(false);
                                  }}
                                  className="text-[#D7B26A] hover:text-[#e7c880] text-xs underline cursor-pointer flex items-center gap-1"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-xs">Full Name:</span>
                                  <span className="text-white font-medium text-right max-w-[60%]">{values.name || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-xs">Email:</span>
                                  <span className="text-white font-medium text-right max-w-[60%] break-all">{values.email || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-xs">Phone:</span>
                                  <span className="text-white font-medium text-right">{values.phone || 'N/A'}</span>
                                </div>
                              </div>
                            </div>

                            {/* Step 2: Event Details */}
                            <div className="bg-black/30 rounded-lg p-4 space-y-3 border border-[#D7B26A]/20">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[#D7B26A] font-semibold text-base flex items-center gap-2">
                                  <span className="w-6 h-6 bg-[#D7B26A] text-black rounded-full flex items-center justify-center text-xs font-bold">2</span>
                                  Event Details
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setStep(2);
                                    setShowPreview(false);
                                  }}
                                  className="text-[#D7B26A] hover:text-[#e7c880] text-xs underline cursor-pointer flex items-center gap-1"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-xs">Event Type:</span>
                                  <span className="text-white font-medium text-right max-w-[60%] capitalize">
                                    {values.eventtype === 'other' ? values.customeventtype || 'N/A' : values.eventtype || 'N/A'}
                                  </span>
                                </div>
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-xs">Number of People:</span>
                                  <span className="text-white font-medium">{values.numberofpeople || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-xs">Event Date:</span>
                                  <span className="text-white font-medium">
                                    {values.eventdate ? new Date(values.eventdate).toLocaleDateString('en-US', { 
                                      weekday: 'short', 
                                      year: 'numeric', 
                                      month: 'short', 
                                      day: 'numeric' 
                                    }) : 'N/A'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Step 3: Preferences */}
                            <div className="bg-black/30 rounded-lg p-4 space-y-3 border border-[#D7B26A]/20">
                              <div className="flex items-center justify-between mb-2">
                                <h4 className="text-[#D7B26A] font-semibold text-base flex items-center gap-2">
                                  <span className="w-6 h-6 bg-[#D7B26A] text-black rounded-full flex items-center justify-center text-xs font-bold">3</span>
                                  Preferences
                                </h4>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setStep(3);
                                    setShowPreview(false);
                                  }}
                                  className="text-[#D7B26A] hover:text-[#e7c880] text-xs underline cursor-pointer flex items-center gap-1"
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                  Edit
                                </button>
                              </div>
                              <div className="grid grid-cols-1 gap-2">
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-xs">Budget Level:</span>
                                  <span className="text-white font-medium capitalize">{values.budget || 'N/A'}</span>
                                </div>
                                <div className="flex justify-between items-start">
                                  <span className="text-gray-400 text-xs">Budget Range:</span>
                                  <span className="text-white font-medium text-right">{values.budgetrange || 'N/A'}</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                  <span className="text-gray-400 text-xs">Services Needed:</span>
                                  <div className="flex flex-wrap gap-1">
                                    {values.needs.length > 0 ? values.needs.map((service, idx) => (
                                      <span key={idx} className="bg-[#D7B26A]/20 text-[#D7B26A] px-2 py-0.5 rounded-full text-xs">
                                        {service}
                                      </span>
                                    )) : <span className="text-white text-xs">None selected</span>}
                                  </div>
                                </div>
                                {values.message && (
                                  <div className="flex flex-col gap-1 mt-2">
                                    <span className="text-gray-400 text-xs">Additional Message:</span>
                                    <div className="bg-black/50 border border-[#D7B26A]/20 rounded p-2">
                                      <span className="text-white text-xs leading-relaxed">{values.message}</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Contact Method Preview */}
                            <div className="bg-black/30 rounded-lg p-4 space-y-3 border border-[#D7B26A]/20">
                              <h4 className="text-[#D7B26A] font-semibold text-base flex items-center gap-2">
                                <span className="w-6 h-6 bg-[#D7B26A] text-black rounded-full flex items-center justify-center text-xs font-bold">4</span>
                                Contact Preferences
                              </h4>
                              <div className="flex flex-col gap-1">
                                <span className="text-gray-400 text-xs">Preferred Contact Method:</span>
                                <div className="flex flex-wrap gap-1">
                                  {values.contactMethod.length > 0 ? values.contactMethod.map((method, idx) => (
                                    <span key={idx} className="bg-[#D7B26A]/20 text-[#D7B26A] px-2 py-0.5 rounded-full text-xs">
                                      {method}
                                    </span>
                                  )) : <span className="text-white text-xs">None selected</span>}
                                </div>
                              </div>
                            </div>

                            {/* Summary Note */}
                            <div className="bg-[#D7B26A]/10 border border-[#D7B26A]/30 rounded-lg p-3 mt-4">
                              <p className="text-[#D7B26A] text-xs text-center">
                                <strong>Note:</strong> Click &quot;Edit&quot; next to any section to make changes. 
                                Review all information carefully before submitting.
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Server Response Display */}
                        {serverResponse && (
                          <div className={`p-4 rounded-lg border ${
                            serverResponse.type === 'success' 
                              ? 'bg-green-900/20 border-green-500/50 text-green-400' 
                              : 'bg-red-900/20 border-red-500/50 text-red-400'
                          } mb-4`}>
                            <div className="flex items-start gap-3">
                              {serverResponse.type === 'success' ? (
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              ) : (
                                <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                              )}
                              <div className="flex-1">
                                <p className={`${raleway.className} font-medium text-sm`}>{serverResponse.message}</p>
                                {serverResponse.data?.bookingId && (
                                  <p className={`${raleway.className} text-xs mt-1 opacity-80`}>Booking ID: {serverResponse.data.bookingId}</p>
                                )}
                              </div>
                              <button
                                type="button"
                                onClick={() => setServerResponse(null)}
                                className="text-current hover:opacity-70 cursor-pointer"
                              >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </div>
                        )}

                        <div>
                          <p className={`${raleway.className} block text-sm font-medium text-[#D7B26A] mb-1 text-start`}>
                            Preferred Contact Method: <span className="text-red-600 text-xl align-middle">*</span>
                          </p>
                          <div className={`${raleway.className} flex flex-col sm:flex-row gap-2 sm:gap-4 text-sm text-[#D7B26A]`}>
                            {contactMethodOptions.map((method) => (
                              <label key={method} className="flex items-center gap-2 cursor-pointer select-none">
                                <Field
                                  type="checkbox"
                                  name="contactMethod"
                                  value={method}
                                  className="sr-only peer"
                                />
                                <div className="w-4 h-4 border border-[#D7B26A] rounded-md flex items-center justify-center transition-all duration-300 peer-checked:bg-[#D7B26A] peer-checked:text-black">
                                  <svg className="w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity duration-300" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M4 10l4 4 8-8" />
                                  </svg>
                                </div>
                                <span>{method}</span>
                              </label>
                            ))}
                          </div>
                          {errors.contactMethod && touched.contactMethod && (
                            <div className="text-red-500 text-xs mt-1 text-left">{errors.contactMethod}</div>
                          )}
                        </div>

                        {/* Terms */}
                        <div className="space-y-2">
                          <label className={`${raleway.className} flex items-center text-sm font-medium text-[#D7B26A] gap-2 cursor-pointer select-none`}>
                            <Field
                              type="checkbox"
                              name="termsAccepted"
                              className="sr-only peer"
                            />
                            <div className="w-4 h-4 border border-[#D7B26A] rounded-md flex items-center justify-center transition-all duration-300 peer-checked:bg-[#D7B26A] peer-checked:text-black">
                              <svg className="w-4 h-4 text-black opacity-0 peer-checked:opacity-100 transition-opacity duration-300" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                                <path d="M4 10l4 4 8-8" />
                              </svg>
                            </div>
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
                          {errors.termsAccepted && touched.termsAccepted && (
                            <div className="text-red-500 text-xs mt-1 text-left">{errors.termsAccepted}</div>
                          )}

                          {/* Collapsible Terms Box */}
                          <div
                            className={`
                              ${raleway.className} 
                              overflow-hidden transition-all duration-500 ease-in-out
                              ${isExpanded ? "max-h-[700px] p-4 mt-2 border border-[#D7B26A]/40 rounded-lg opacity-100" : "max-h-0 p-0 mt-0 border-0 opacity-0"}
                              bg-black/40 text-[#D7B26A] text-sm space-y-3
                            `}
                          >
                            {isExpanded && (
                              <>
                                <h3 className="text-base font-semibold text-[#e7c880]">
                                  Terms & Conditions
                                </h3>
                                <ul className="list-disc list-outside pl-5 space-y-1 text-justify">
                                  <li>A non-refundable deposit of [X amount] is required to secure your event date.</li>
                                  <li>If payment is not received on time, we reserve the right to cancel services.</li>
                                  <li>Additional costs may apply for changes, rescheduling, or extra services.</li>
                                  <li>Any requests to change event details must be submitted ahead of time.</li>
                                  <li>We will make reasonable efforts to accommodate changes, but availability cannot be guaranteed.</li>
                                  <li>Cancellations made more than 2 days before the event may be eligible for a partial refund.</li>
                                  <li>We are not liable for loss, damage, or expense except where caused by proven negligence.</li>
                                  <li>You are responsible for the safety and conduct of guests at the event.</li>
                                  <li>By confirming your booking, you agree to these Terms & Conditions.</li>
                                  <li>
                                    All data collected will be handled per our{" "}
                                    <Link href="/privacy-policy" className="underline text-[#e7c880] hover:text-[#D7B26A]">
                                      Privacy Policy
                                    </Link>.
                                  </li>
                                </ul>
                                <p className="text-xs text-[#e7c880]/70 italic">
                                  Please review these terms carefully before proceeding.
                                </p>
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
                      type="button"
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
                        type="button"
                        onClick={() => handleStepChange(step + 1, values, setErrors, setTouched)}
                        className={`${raleway.className} px-4 py-2 rounded bg-[#D7B26A] text-black font-medium hover:bg-[#b89652] transition-colors cursor-pointer`}
                      >
                        Next
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`${raleway.className} px-4 py-2 rounded bg-[#D7B26A] text-black font-medium hover:bg-[#b89652] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed`}
                      >
                        {isSubmitting ? "Submitting..." : "Finish"}
                      </button>
                    )}
                  </div>
                </>
              ) : (
                // Success Message
                <div className="flex flex-col items-center justify-center gap-4 p-6">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-2">
                    <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <h2 className={`${raleway.className} text-[#D7B26A] text-2xl sm:text-3xl font-semibold`}>Thank You!</h2>
                  <p className={`${raleway.className} text-white text-base sm:text-lg text-center`}>
                    {serverResponse?.message || 'Your information has been successfully submitted.'} <br />
                    Our team will contact you shortly.
                  </p>
                  {serverResponse?.data?.bookingId && (
                    <div className={`${raleway.className} bg-[#D7B26A]/10 border border-[#D7B26A]/30 rounded-lg px-4 py-2 mt-2`}>
                      <p className="text-[#D7B26A] text-sm">Booking Reference: <span className="font-bold">{serverResponse.data.bookingId}</span></p>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      setServerResponse(null);
                      setShowPreview(false);
                      setStep(1);
                      onClose();
                    }}
                    className="mt-4 px-6 py-2 bg-[#D7B26A] text-black rounded-md hover:bg-[#b89652] transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}
            </Form>
          )}
        </Formik>

        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-6 text-[20px] sm:text-[22px] text-[#D7B26A] hover:text-[#ffda8f] cursor-pointer"
        >
          ✕
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}