import React, { useContext, useState } from 'react'
import "./singleresidency.css"
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { AiTwotoneCar } from 'react-icons/ai'
import { FaShower } from "react-icons/fa"
import { MdLocationPin, MdMeetingRoom } from 'react-icons/md'
import Map from '../../components/map/Map'
import { AuthContext } from '../../context/AuthContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import BookingModal from '../../components/bookingmodal/BookingModal'
import Heart from '../../components/heart/Heart'
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdOutlineNavigateBefore } from "react-icons/md";
import { InfinitySpin } from "react-loader-spinner"

const SingleResidency = () => {
    const { residencyId } = useParams()
    const { state, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const [modalOpen, setModalOpen] = useState(false)

    const [imageIndex, setImageIndex] = useState(0)

    const { data, isLoading, error } = useQuery({
        queryKey: [residencyId],
        queryFn: () => axios.get("http://localhost:3000/api/residencies/" + residencyId).then((res) => { return res.data })
    })

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
        return "There was some error"
    }

    const handleBooking = () => {
        if (state.user) {
            setModalOpen(true)
        }
        else {
            toast("You are not logged in", {
                type: "error",
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setTimeout(() => { navigate("/login?message=you have to login first") }, 3000)

        }
    }

    const cancelBooking = async () => {
        try {
            const { data } = axios.put("http://localhost:3000/api/users/" + residencyId, {}, { withCredentials: true })
            toast("Booking Cancelled", {
                type: "error",
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            dispatch({ type: "REMOVE_BOOKING", payload: residencyId })
        } catch (err) {
            console.log(err)
        }
    }





    return (
        <div className='singleResidency'>
            <div className="wrapper">
                <div className="rTop">
                    <div className="imgContainer">
                        <Heart residencyId={residencyId} card={false} />
                        <MdOutlineNavigateBefore className='sliderBtnPrev' onClick={() => { setImageIndex((prev) => { return prev === 0 ? prev : prev - 1 }) }} />
                        <MdOutlineNavigateNext className='sliderBtnNext' onClick={() => setImageIndex((prev) => { return prev === data.images.length - 1 ? prev : prev + 1 })} />

                        <img src={data.images[imageIndex]} className='mainImg' />

                    </div>
                </div>
                <div className="rBottom">
                    <div className="bLeft">
                        <div className="dataContainer">
                            <span className="primaryText">{data.title}</span>
                            <div className="orangeText">${data.price}</div>
                        </div>
                        <div className="facilities">
                            <div className="facility">
                                <FaShower className='fIcon' />
                                <span className="fText">{data.bathrooms} bathrooms</span>
                            </div>
                            <div className="facility">
                                <AiTwotoneCar className='fIcon' />
                                <span className="fText">{data.parking && "available"}</span>
                            </div>
                            <div className="facility">
                                <MdMeetingRoom className='fIcon' />
                                <span className="fText">{data.rooms} room/s</span>
                            </div>
                        </div>
                        <span className='rDesc'>{data.desc}</span>
                        <div className="location">
                            <MdLocationPin className='fIcon' />
                            <span className="address">{data.address}</span>
                        </div>
                        {state?.user?.bookedVisits?.some((visit) => { return visit.residencyId === residencyId })
                            ? <><button className='rButton booked' onClick={cancelBooking}>Cancel Booking</button>
                                <span className="bookingDate">You've already booked this residency for {state?.user?.bookedVisits?.filter
                                    ((visit) => { return visit.residencyId === residencyId })[0].date}</span></>
                            :
                            <button className="rButton" onClick={() => { handleBooking() }}>Book Your Visit</button>}

                    </div>
                    <div className="bRight">
                        <Map address={data.address} country={data.country} city={data.city} />
                    </div>
                </div>
                {modalOpen && <BookingModal setModalOpen={setModalOpen} residencyId={residencyId} unavailableDates={data.unavailableDates} />}
            </div>
        </div>

    )
}

export default SingleResidency