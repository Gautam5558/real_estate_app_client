import React from 'react'
import "./accordian.css"
import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
    AccordionItemState
} from 'react-accessible-accordion'
import 'react-accessible-accordion/dist/fancy-example.css'
import data from '../../utils/accordion'
import { MdArrowDropDown } from 'react-icons/md'
import { useState } from 'react'

const Accordian = () => {

    return (
        <div className='accordian'>
            <div className="aContainer">
                <div className="aLeft">
                    <img src="/value.png" className='aImg' />
                </div>
                <div className="aRight">
                    <span className="orangeText">Our Value</span>
                    <span className="primaryText">Value We Give to You</span>
                    <span className='secondaryText'>We always ready to help by providijng the best services for you.
                        We beleive a good blace to live can make your life better</span>
                    <Accordion allowMultipleExpanded={false} preExpanded={[0]} className='aParent'>
                        {data.map((item, index) => {
                            const [className, setClassName] = useState(null)
                            return (
                                <AccordionItem key={index} className={'aItem ' + className} uuid={index}>
                                    <AccordionItemHeading>
                                        <AccordionItemButton className='aButton'>
                                            <AccordionItemState>
                                                {({ expanded }) => { expanded ? setClassName("expanded") : setClassName("collapsed") }}
                                            </AccordionItemState>
                                            <div className='aIcon'>{item.icon}</div>
                                            <span className='aHeading'>{item.heading}</span>
                                            <div className='aIcon'><MdArrowDropDown /></div>
                                        </AccordionItemButton>
                                    </AccordionItemHeading>
                                    <AccordionItemPanel>
                                        <p className='aText'>
                                            {item.detail}
                                        </p>
                                    </AccordionItemPanel>
                                </AccordionItem>)
                        })}
                    </Accordion>
                </div>
            </div>
        </div>
    )
}

export default Accordian