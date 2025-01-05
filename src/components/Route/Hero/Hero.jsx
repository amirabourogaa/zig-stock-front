import React, { useState, useRef} from 'react';
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import emailjs from "emailjs-com";

const Hero = () => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => setShowModal(!showModal);
    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm(
                "service_l1ugwlg", // Replace with your Service ID
                "template_qz38jgw", // Replace with your Template ID
                form.current,
                "BuA-LK8ScKl4rZUEH" // Replace with your User ID
            )
            .then(
                (result) => {
                    console.log(result.text);
                    alert("Message sent successfully!");
                },
                (error) => {
                    console.log(error.text);
                    alert("Failed to send message. Please try again.");
                }
            );
    };
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
            style={{
                backgroundImage:
                    "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className={`${styles.section} w-[90%] 800px:w-[60%] text-center`}>
                {/* Title */}
                <h1 className="text-[35px] 800px:text-[50px] text-slate-700 font-semibold capitalize leading-[1.2]">
                    Best Collection for <br /> Home Decoration
                </h1>

                {/* Paragraph */}
                <p className="pt-4 text-[16px] font-[Poppins] font-normal text-slate-600">
                    Discover unique pieces to elevate your home. Shop now and enjoy the best
                    collection for every style and taste.
                </p>

                {/* Button */}
                <Link to="/products">
                    <button
                        className="mt-5 px-6 py-2 bg-cyan-500 text-white text-[16px] font-medium rounded hover:bg-cyan-600 transition-all"
                    >
                        Shop Now
                    </button>
                </Link>
            </div>

            {/* Simple Banner */}
            <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 w-[90%] bg-slate-200 text-cyan-500 text-center py-3 rounded-md shadow-md">
                <h2 className="text-[16px] font-medium">
                Showcase your products with our exclusive promotions! 
                </h2>
                <button
                    className="mt-2 text-sm underline hover:text-cyan-700"
                    onClick={toggleModal}
                >
                    Learn More
                </button>
            </div>

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg w-[90%] 800px:w-[40%]">
                        <h2 className="text-[18px] text-cyan-500 font-semibold mb-4 text-center">
                            Advertise With Us
                        </h2>
                        <form ref={form} onSubmit={sendEmail}>
                            <div className="mb-4">
                                <label className="block text-slate-700 text-sm font-medium mb-2">
                                    Your Name
                                </label>
                                <input
                                 name="user_name"
                                    type="text"
                                    className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-slate-700 text-sm font-medium mb-2">
                                    Email Address
                                </label>
                                <input
                                 name="user_email"
                                    type="email"
                                    className="w-full p-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-cyan-500 text-white font-medium py-2 rounded hover:bg-cyan-600 transition-all"
                            >
                                Submit
                            </button>
                        </form>
                        <button
                            className="mt-4 w-full text-sm text-slate-500 hover:text-slate-700"
                            onClick={toggleModal}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hero;
