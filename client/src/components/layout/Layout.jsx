import React from 'react'
import "./layout.css"
import Header from '../header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../footer/Footer'

const Layout = () => {


    return (
        <div className='layout'>
            <Header />
            <Outlet />
            <Footer />
        </div>
    )
}

export default Layout