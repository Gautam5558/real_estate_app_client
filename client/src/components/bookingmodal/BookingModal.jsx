import React, { useContext, useState } from 'react'
import "./bookingmodal.css"
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Calendar, utils } from '@hassanmojab/react-modern-calendar-datepicker';
import axios from "axios"
import { toast } from "react-toastify"
import { AuthContext } from '../../context/AuthContext';


const BookingModal = ({ setModalOpen, residencyId, unavailableDates }) => {
    const [date, setDate] = useState(utils().getToday())

    const { state, dispatch } = useContext(AuthContext)

    console.log(date)
    const day = String(date.day)
    const month = String(date.month)
    const year = String(date.year)
    const dateInStringFormat = day + "/" + month + "/" + year
    console.log(dateInStringFormat)
    console.log(state.user)

    const handleBooking = async () => {
        try {
            const { data } = await axios.post("http://localhost:3000/api/users/bookvisit/" + residencyId, { date: dateInStringFormat, unavailable: date }, { withCredentials: true })
            toast("Booking successful", {
                type: "success",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            setModalOpen(false)
            dispatch({ type: "ADD_BOOKING", payload: { date: dateInStringFormat, residencyId: residencyId } })
        } catch (err) {
            toast(err.response.data, {
                type: "error",
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
    }
    const newUnavailableDates = unavailableDates.map((date) => { return { year: Number(date.year), month: Number(date.month), day: Number(date.day) } })

    return (
        <div className="bookingModal">
            <div className='mContainer'>
                <span className="close" onClick={() => { setModalOpen(false) }}>x</span>
                <h2 className='mHeading'>Select your date of visit</h2>
                <Calendar onChange={setDate} value={date} minimumDate={utils().getToday()} disabledDays={newUnavailableDates} />
                <button className='modalButton' onClick={handleBooking}>Confirm Booking</button>
            </div>
        </div>
    )
}

export default BookingModal