import React, { useState } from 'react'
import "./hero.css"

import CountUp from 'react-countup'
import { easeIn, motion } from "framer-motion"
import SearchBar from '../searchBar/SearchBar'

const Hero = () => {

    const [search, setSearch] = useState("")

    return (
        <div className='hero'>
            <div className="hcontainer">
                <div className="hLeft">
                    <div className="titleContainer">
                        <motion.h1
                            initial={{ y: "2rem", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 2, type: "easeIn" }}

                            className='title'>Discover<br />Most Suitable<br />Property</motion.h1>
                        <div className="orangeCircle" />
                    </div>
                    <span className='desc'>Find a variety of properties that suit you very easilty<br />
                        Forget all difficulties in finding a residence for you</span>
                    <SearchBar search={search} setSearch={setSearch} />
                    <div className="stats">
                        <div className="stat">
                            <div className="count">
                                <CountUp start={8800} end={9000} duration={3} className='countUp' /><span className='plus'> +</span></div>
                            <span className='text'>Premium Product</span>
                        </div>
                        <div className="stat">
                            <div className="count">
                                <CountUp start={1950} end={2000} duration={3} className='countUp' /><span className='plus'> +</span></div>
                            <span className='text'>Happy Customer</span>
                        </div>
                        <div className="stat">
                            <div className="count">
                                <CountUp start={16} end={28} duration={3} className='countUp' /><span className='plus'> +</span></div>
                            <span className='text'>Award Winning</span>
                        </div>
                    </div>
                </div>
                <div className="hRight">
                    <div className="imgContainer">
                        <motion.img
                            initial={{ x: "8rem", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 2, type: "easeIn" }}

                            src='/hero-image.png' className='heroImg' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero