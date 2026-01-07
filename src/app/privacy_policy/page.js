"use client";

import React, { useState, useEffect } from "react";
import Header from "@/component/Nav";
import Footer from "@/component/Footer";
import ThreeStepModal from "@/component/Modal";



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




const Page = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // // Open modal automatically when page loads
    // useEffect(() => {
    //     setIsModalOpen(true);
    // }, []);
    return (
        <div className="flex flex-col min-h-screen bg-black text-white mt-[100px]">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className="flex-grow px-6 md:px-16 lg:px-32 py-12">
                <h1 className={`text-3xl md:text-4xl font-bold text-[#D7B26A] mb-6 ${cinzel.className}`}>
                    Privacy Policy
                </h1>

                <div className={`space-y-6 text-sm md:text-base leading-relaxed text-gray-300 ${montserrat.className}`}>
                    <p>
                        This Privacy Policy  applies to all services provided
                        by <span className="text-[#D7B26A]">Events of The Century</span>
                        {" "} (we, us, or our). By booking our services, the client (you)
                        agrees to the following:
                    </p>

                    <section>
                        <h2 className="text-xl font-semibold text-[#D7B26A] mb-2">
                            Bookings & Payments
                        </h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                A non-refundable deposit of <strong>[X amount]</strong> is
                                required to secure your event date.
                            </li>
                            <li>
                                If payment is not received on time, we reserve the right to
                                cancel services.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#D7B26A] mb-2">
                            Changes & Amendments
                        </h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                Additional costs may apply for changes, rescheduling, or extra
                                services.
                            </li>
                            <li>
                                Any requests to change event details (e.g., date, time,
                                location, or services required) must be submitted ahead of time.
                            </li>
                            <li>
                                We will make reasonable efforts to accommodate changes, but
                                availability cannot be guaranteed.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#D7B26A] mb-2">
                            Cancellations & Refunds
                        </h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                Cancellations made within 48 hours of the event will not be
                                refunded.
                            </li>
                            <li>
                                Cancellations made more than 2 days before the event may be
                                eligible for a partial refund (excluding the deposit).
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#D7B26A] mb-2">
                            Liability
                        </h2>
                        <ul className="list-disc list-inside space-y-1">
                            <li>
                                We are not liable for loss, damage, injury, or expense arising
                                from your event except where caused by our proven negligence.
                            </li>
                            <li>
                                You are responsible for the safety and conduct of guests at the
                                event.
                            </li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-[#D7B26A] mb-2">
                            Acceptance of Privacy
                        </h2>
                        <p>
                            By confirming your booking and paying the deposit, you acknowledge
                            that you have read, understood, and agree to this Privacy
                            policy.
                        </p>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <Footer />

            {/* Your Modal */}
            <ThreeStepModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default Page;
