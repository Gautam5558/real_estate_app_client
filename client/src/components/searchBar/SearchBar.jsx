import React from 'react'
import "./searchbar.css"
import { HiLocationMarker } from "react-icons/hi"
import { useNavigate } from "react-router-dom"
const SearchBar = ({ search, setSearch }) => {
    const navigate = useNavigate()

    return (
        <div className="search">
            <HiLocationMarker className='sIcon' />
            <input type='text' className='input' onChange={(e) => { setSearch(e.target.value) }} value={search} />
            <button className='sButton' onClick={() => navigate("/residencies?value=" + search)}>Search</button>
        </div>
    )
}

export default SearchBar