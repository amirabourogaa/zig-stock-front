import React from 'react';
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";

const Hero = () => {
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
                {/* Animated Title */}
                <h1
                    className="text-[35px] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize leading-[1.2] animate-fadeInUp"
                >
                    Best Collection for <br /> Home Decoration
                </h1>

                {/* Animated Paragraph */}
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba] animate-fadeIn delay-2">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Beatae,
                    assumenda? Quisquam itaque <br /> exercitationem labore vel, dolore
                    quidem asperiores, laudantium temporibus soluta optio consequatur{" "}
                    <br /> aliquam deserunt officia. Dolorum saepe nulla provident.
                </p>

                {/* Animated Button */}
                <Link to="/products" className="inline-block">
                    <div
                        className={`${styles.button} mt-5 animate-bounce`}
                        style={{
                            // backgroundColor: "#3C7169",
                            borderRadius: "25px",
                            padding: "10px 20px",
                            transition: "transform 0.3s ease-in-out",
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.transform = "scale(1.1)";
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                        }}
                    >
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>

          </div>
    );
};

export default Hero;
