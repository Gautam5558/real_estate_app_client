import React, { useContext, useState } from 'react'
import "./header.css"
import { Link, useNavigate } from 'react-router-dom'
import { BiMenuAltRight } from "react-icons/bi"
import { OutsideClickHandler } from "react-outside-click-handler"
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'
import { toast } from "react-toastify"
import AddModal from '../addModal/AddModal'
import Settings from '../settings/Settings'


const Header = () => {
    const [open, setOpen] = useState(false)

    const [settingsModal, setSettingsModal] = useState(false)


    const { state, dispatch } = useContext(AuthContext)
    const getMenuStyles = (open) => {
        if (document.documentElement.clientWidth <= 768) {
            return { right: !open && "-100%" }
        }
    }

    const [dropdown, setDropdown] = useState(false)
    const [add, setAdd] = useState(false)

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" })
        async function logout() {
            try {
                await axios.post("http://localhost:3000/api/auth/logout", {}, { withCredentials: true })
            } catch (err) {
                console.log(err)
            }
        }
        logout()
    }

    const openModal = () => {

        setOpen(false)

        if (state.user === null) {
            return toast("You're not logged in", {
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
        } else {
            if (state.user.isAdmin) {
                setAdd((prev) => { return !prev })
            } else {
                return toast("You're not a real estate agent", {
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
            }
        }

    }
    const navigate = useNavigate()

    return (
        <div className='header'>
            <div className="container">
                <img src='/logo.png' className='mLogo' onClick={() => { navigate("/") }} />

                <div className="links" style={getMenuStyles(open)}>
                    <Link to="/residencies" onClick={() => setOpen(false)}>Residencies</Link>
                    <a href="#contact" onClick={() => { setOpen(false) }}>Contact</a>
                    {state.user && <>
                        <div className="dItem hidden" onClick={() => { navigate("/protected/favorites"); setOpen(false) }} >Favorites</div>
                        <div className="dItem hidden" onClick={() => { navigate("/protected/bookings"); setOpen(false) }}>Bookings</div>
                        <span className='addLink' onClick={openModal}>Add Property</span>
                        <div className="dItem hidden" onClick={() => { setSettingsModal(true); setOpen(false) }}>Settings</div>
                        <button className='hButton hidden dItem' onClick={() => { handleLogout() }}>Logout</button></>}
                    {state.user ?
                        <>
                            <div className="loginDetails" onClick={() => (setDropdown((prev) => { return !prev }))}>
                                <img src={state.user.image ? state.user.image : "/noavatar.jpg"} className='avatar' />
                            </div>
                            {dropdown &&
                                <div className="dropdown">
                                    <div className="dItem" onClick={() => { setDropdown(false); navigate("/protected/favorites") }} >Favorites</div>
                                    <div className="dItem" onClick={() => { setDropdown(false); navigate("/protected/bookings") }}>Bookings</div>
                                    <div className="dItem" onClick={() => { setDropdown(false); setSettingsModal(true) }}>Settings</div>
                                    <div className="dItem" onClick={() => { handleLogout() }}>Logout</div>
                                </div>}
                        </> :
                        <>
                            <button className='hButton' onClick={() => { setOpen(false) }}><Link to="/login">Login</Link></button>
                            <button className='signup' onClick={() => { setOpen(false); navigate("/register") }}>Signup</button>
                        </>
                    }
                </div>

                <BiMenuAltRight className='menuIcon' onClick={(e) => { setOpen((previous) => { return !previous }) }} />

            </div>
            {add && <AddModal setAdd={setAdd} />}
            {settingsModal && <Settings setSettingsModal={setSettingsModal} />}
        </div>
    )
}

export default Header