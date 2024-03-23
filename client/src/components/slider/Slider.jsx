import React, { useRef } from 'react'
import "./slider.css"
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'

import ResidencyCard from '../residencycard/ResidencyCard'
import { useFetch } from '../../hooks/useFetch'
import { InfinitySpin } from 'react-loader-spinner'
import { toast } from "react-toastify"

const Slider = () => {

    const { data, isLoading, error } = useFetch("http://localhost:3000/api/residencies")

    if (isLoading) {
        return (
            <div className="spinner" style={{ display: "flex", justifyContent: 'center', alignItems: "center" }}>
                <InfinitySpin
                    visible={true}
                    width="200"
                    color="#4fa94d"
                    ariaLabel="infinity-spin-loading"

                />
            </div>
        )
    }

    if (error) {
        toast("Something went wrong", {
            type: "error",
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        })
        return
    }

    return (
        <div className='slider'>
            <div className="sContainer">
                <div className="headings">
                    <span className='orangeText'>Best Choices</span>
                    <h2 className='sliderHeading'>Popular Residencies</h2>
                </div>
                <Swiper
                    className='mySwiper'
                    spaceBetween={50}
                    breakpoints={{ 480: { slidesPerView: 1 }, 600: { slidesPerView: 2 }, 750: { slidesPerView: 3 }, 1100: { slidesPerView: 4 } }}>

                    <SwiperButtons />
                    {data.map((item, index) => {
                        return (
                            <SwiperSlide key={index} className='slide'>
                                <ResidencyCard item={item} />
                            </SwiperSlide>
                        )
                    })}

                </Swiper>



            </div>
        </div >
    )
}

function SwiperButtons() {
    const swiper = useSwiper()
    return (

        <div className="buttons">

            <button className='swiperButtonCustom prev' onClick={(e) => { swiper.slidePrev() }}>&lt;</button>
            <button className='swiperButtonCustom next' onClick={(e) => { swiper.slideNext() }}>&gt;</button>

        </div>

    )
}

export default Slider

