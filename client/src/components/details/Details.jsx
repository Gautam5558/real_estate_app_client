import React, { useState } from 'react'
import "./details.css"
import getAllCountries from "../../utils/data"
import { useForm } from '@mantine/form'
import { NumberInput, Select, TextInput } from '@mantine/core'
import Map from "../../components/map/Map"
const Details = ({ nextStep, prevStep, residencyData, setResidencyData }) => {
    const form = useForm({
        initialValues: {
            title: residencyData.title,
            desc: residencyData.desc,
            price: residencyData.price
        },
        validate: {
            title: (value) => { return value.length < 3 ? "Input must have more than 3 characters" : null },
            desc: (value) => { return value.length < 3 ? "Input must have more than 3 characters" : null },
            price: (value) => { return value < 100 ? "Price must be more than 100" : null }
        }
    })

    const { title, desc, price } = form.values


    const handleClick = () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
            setResidencyData((prev) => { return { ...prev, title, desc, price } })
            nextStep()
        }
        else {
            console.log("some error")
        }
    }

    return (
        <div className="locationWrapper">
            <form className='locationForm'>
                <div className='addLocation'>
                    <TextInput
                        label="Title"
                        withAsterisk
                        {...form.getInputProps("title", { type: "input" })}
                    />

                    <TextInput
                        label="Description"
                        withAsterisk
                        {...form.getInputProps("desc", { type: "input" })}
                    />
                    <NumberInput
                        label="Price"
                        withAsterisk
                        {...form.getInputProps("price", { type: "input" })}
                    />
                </div>
            </form>
            <div className="buttonContainer">
                <button className="nextStep" onClick={() => { prevStep() }}>Prev</button>
                <button className="nextStep" onClick={() => { handleClick() }}>Next</button>
            </div>

        </div>
    )
}

export default Details