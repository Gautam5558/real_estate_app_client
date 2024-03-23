import React from 'react'
import "./residencycard.css"
import { AiFillHeart } from "react-icons/ai"
import { Link } from 'react-router-dom'
import Heart from '../heart/Heart'

const ResidencyCard = ({ item }) => {
    return (
        <Link to={"/residencies/" + item._id} >
            <div className="card">
                <Heart residencyId={item._id} card={true} />
                <img src={item.images[0]} className='cImg' />
                <span className='price'><span className='orangeText'>$</span>{item.price}</span>
                <h2 className='cHeading'>{item.title}</h2>
                <span className='detail'>{item.desc.substring(0, 60)}...</span>
            </div>
        </Link>
    )
}

export default ResidencyCard