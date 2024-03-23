import React from 'react'
import Hero from "../../components/hero/Hero"
import "./home.css"
import Companies from '../../components/companies/Companies'
import Slider from '../../components/slider/Slider'
import Accordian from '../../components/accordian/Accordian'
import Contact from '../../components/contact/Contact'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate()
    return (
        <div className='home'>
            <div className="background">
                <div className="inner">
                    <div className='whiteBlur' />
                    <Hero />
                </div>
                <Companies />
                <Slider />
                <Accordian />
                <Contact />
                <div className="getStarted">
                    <div className="startedContainer">
                        <h2>Get started with Homzys</h2>
                        <span>Subscribe and find super attractive price quotes from us.<br />
                            Find your residence soon</span>
                        <button onClick={() => { navigate("/residencies") }}>Explore</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home