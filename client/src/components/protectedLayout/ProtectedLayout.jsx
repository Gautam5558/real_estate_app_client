import React, { useContext } from 'react'
import "./protectedlayout.css"
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'

const ProtectedLayout = () => {

    const { state } = useContext(AuthContext)
    console.log(state.user)
    if (state.user === null) {
        return (<Navigate to="/login?message=You've to login first" />)

    }

    return (
        <div className='protectedLayout'>
            <Outlet />
        </div>
    )
}

export default ProtectedLayout