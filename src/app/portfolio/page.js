"Use Client"
import React from 'react'
import Portfolio_Component from "./PortfolioComponent";
import Header from "../../component/Nav";
import Footer from "../../component/Footer";

const page = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />

            <main className="grow">
                <Portfolio_Component />
            </main>

            <Footer />
        </div>
    )
}

export default page
