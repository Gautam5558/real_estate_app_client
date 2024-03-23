import React from 'react'
import "./contact.css"
import { data } from '../../utils/contact'
const Contact = () => {
    return (
        <div className='contact' id='contact'>
            <div className="cContainer">
                <div className="left">
                    <span className="orangeText">Our Contact Us</span>
                    <span className="primaryText">Easy to contact us</span>
                    <span>We always ready to help by providijng the best services for you. We beleive a good blace to live can make your life better</span>
                    <div className="bigBox">
                        {data.map((item, index) => {
                            return (
                                <div className="box" key={index}>
                                    <div className="top">
                                        <div className="icon">{item.icon}</div>
                                        <div className="texts">
                                            <span className='name'>{item.name}</span>
                                            <span className='number'>{item.number}</span>
                                        </div>
                                    </div>
                                    <div className="bottom">
                                        <button className='cButton'><a href="tel:982 275 278 82">{item.name} now</a></button>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className="right">
                    <img src='/contact.jpg' className='contactImg' />
                </div>
            </div>
        </div>
    )
}

export default Contact