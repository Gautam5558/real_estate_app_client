import React, { useContext, useState } from 'react'
import "./settings.css"
import { AuthContext } from '../../context/AuthContext'
import { upload } from '../../utils/uploadImage'
import axios from 'axios'
import { toast } from 'react-toastify'




const Settings = ({ setSettingsModal }) => {


    const { state, dispatch } = useContext(AuthContext)
    const [file, setFile] = useState(null)

    const [imageLoading, setImageLoading] = useState(false)

    const [updateLoading, setUpdateLoading] = useState(false)

    const [updateData, setUpdateData] = useState({
        image: state.user.image ? state.user.image : "/avatar.png",
        username: state.user.username,
        isAdmin: state.user.isAdmin
    })

    const handleClick = async (e) => {
        setImageLoading(true)
        const url = await upload(file)
        setUpdateData((prev) => {
            return {
                ...prev,
                image: url
            }
        })
        setImageLoading(false)
    }

    const handleSubmit = async () => {
        setUpdateLoading(true)
        try {
            const { data } = await axios.put("http://localhost:3000/api/users", updateData, { withCredentials: true })
            toast("Updated Successfully", {
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
            setUpdateLoading(false)
            dispatch({ type: "UPDATE_USER", payload: updateData })
            setSettingsModal(false)
        } catch (err) {
            toast("Couldn't Update", {
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
            setUpdateLoading(false)
        }
    }

    return (
        <div className='settings'>
            <div className="sWrapper">
                <div className="closeSettings" onClick={() => { setSettingsModal(false) }}>x</div>
                <div className="sDetails">

                    <div className="imageDetails">
                        <label htmlFor='updatePicture'>
                            <img src={updateData.image} className='sImage' />
                            <input type='file' id='updatePicture' onChange={(e) => { setFile(e.target.files[0]) }} style={{ display: "none" }} /></label>
                        <span className='iText'>(You can select image by clicking on it)</span>
                        <button disabled={imageLoading} className="sUploading" onClick={(e) => handleClick(e)}>{imageLoading === true ? "Uploading..." : "Upload Image"}</button>
                    </div>
                    <div className="nameDetails">
                        <label className='sLabel'>Username</label>
                        <input type='text' className='sUsername' value={updateData.username} name='username' onChange={(e) => { setUpdateData((prev) => { return { ...prev, [e.target.name]: e.target.value } }) }} />

                        {state.user.isAdmin === false && <div className="adminOrNot" style={{ gap: "1rem" }}>
                            <label className='rLabel'>Become an Agent</label>
                            <input type='checkbox' id='isAdmin' className='checkInput' name='isAdmin' onClick={(e) => { setUpdateData((prev) => { return { ...prev, [e.target.name]: e.target.checked } }) }} style={{ display: "none" }} />
                            <label htmlFor='isAdmin' className='toggleBtn'></label>
                        </div>}
                    </div>
                </div>
                <button disabled={updateLoading} className="saveChanges" onClick={() => { handleSubmit() }}>{updateLoading === true ? "Updating..." : "Save Changes"}</button>
            </div>
        </div>
    )
}

export default Settings