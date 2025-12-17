"use client"
import React from 'react'
import VenueSourcingComponent from './style'
import Header from "@/component/nav_second";
import Footer from "@/component/Footer";

const page = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="grow">
                <VenueSourcingComponent />
            </main>
            <Footer />
        </div>
    )
}

export default page;