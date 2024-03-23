import React from 'react'
import "./footer.css"
import { Link } from 'react-router-dom'

const Footer = () => {
    return (
        <div className='footer'>
            <div className="fContainer">
                <div className="fLeft">
                    <img src='/logo2.png' className='fLogo' />
                    <span className='fText'>Our vision is to make all people<br />
                        the best place to live for them.</span>
                </div>
                <div className="fRight">
                    <h2 className='primaryText'>Information</h2>
                    <span className='fText'>145 New York, FL 5467, USA</span>
                    <div className="fLinks">
                        <Link to="/" className='fLink'>Property</Link>
                        <Link to="/" className='fLink'>Services</Link>
                        <Link to="/" className='fLink'>Products</Link>
                        <Link to="/" className='fLink'>About Us</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer