"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../public/assets/img/EventOC_Logo.png";

export default function Preloader({ duration = 2500 }) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(timer);
    }, [duration]);

    return (
        <AnimatePresence mode="wait" initial={true}>
            {visible && (
                <motion.div
                    key="preloader"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
                >
                    {/* Logo pop-up animation */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{
                            duration: 0.9,
                            ease: [0.25, 0.1, 0.25, 1],
                        }}
                    >
                        <Image
                            src={Logo}
                            alt="EventOC Logo"
                            width={160}
                            height={160}
                            priority
                            className="drop-shadow-2xl"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
