import React from 'react'
import "./heart.css"
import { AiFillHeart } from 'react-icons/ai'
import { useState } from 'react'
import { toast } from "react-toastify"
import axios from 'axios'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


const Heart = ({ residencyId, card }) => {

    const { state, dispatch } = useContext(AuthContext)
    const navigate = useNavigate()

    const handleLike = async () => {

        if (state.user === null) {
            toast("You must be logged in to add a property to favorites", {
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
            navigate("/login?message=You must be logged in to add a property to favorites")
            return
        }

        try {
            const { data } = await axios.put("http://localhost:3000/api/users/favorites/" + residencyId, {}, { withCredentials: true })
            console.log(data)
            toast(data, {
                type: data === "Added to favorites" ? "success" : "error",
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
            if (data === "Added to favorites") {
                dispatch({ type: "ADD_FAVORITE", payload: residencyId })
            } else {
                dispatch({ type: "REMOVE_FAVORITE", payload: residencyId })
            }
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='heart'>
            <AiFillHeart className={card ? 'cardLikeIcon' : 'likeIcon'} onClick={handleLike} style={{ color: state?.user?.favoriteResidencies.some((id) => { return id === residencyId }) ? "red" : "white" }} />
        </div>
    )
}

export default Heart