import React, { useState } from 'react'
import "./uploadimage.css"
import { AiOutlineCloudUpload } from "react-icons/ai";
import { upload } from '../../utils/uploadImage';

const UploadImage = ({ residencyData, setResidencyData, nextStep, prevStep }) => {

    const [imageUploaded, setImageUploaded] = useState(false)
    const [images, setImages] = useState(null)

    const [message, setMessage] = useState(null)

    const handleUpload = async () => {
        const urls = await Promise.all([...images].map(async (img) => {
            const url = await upload(img)
            return url
        }))

        setResidencyData((prev) => { return { ...prev, images: urls } })
        setImageUploaded(true)
    }

    const handleNext = () => {
        if (residencyData.images.length > 0) {
            nextStep()
        }
        else {
            setMessage("Upload atleast 1 Image")
        }
    }


    return (
        <div className='uploadImage'>
            {imageUploaded === false ? <div className='iconContainer'>
                <label htmlFor='img' className='imgLabel'><AiOutlineCloudUpload className='cloudIcon' /> </label>
                <input type='file' multiple id='img' style={{ display: "none" }} onChange={(e) => { setImages(e.target.files) }} />
                <button className='upload ' onClick={() => { handleUpload() }}>Upload Images</button>
            </div> : <div className='imgContainer'>{residencyData.images.map((img) => { return (<img src={img} className='uploadedImages' />) })}</div>}
            <div className="steeperButtons">
                <button className="prevStep" onClick={() => prevStep()}>Prev</button>
                <button className="nextStep" onClick={() => handleNext()}>Next</button>
            </div>
            {message && <span className='imgError'>{message}</span>}
        </div>
    )
}

export default UploadImage