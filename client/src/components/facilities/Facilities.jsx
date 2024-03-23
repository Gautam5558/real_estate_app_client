import React, { useState } from 'react'
import "./facilities.css"
import getAllCountries from "../../utils/data"
import { useForm } from '@mantine/form'
import { Checkbox, NumberInput, Select, TextInput } from '@mantine/core'
import Map from "../../components/map/Map"
const Facilities = ({ nextStep, prevStep, residencyData, setResidencyData }) => {
    const form = useForm({
        initialValues: {
            bathrooms: residencyData.bathrooms,
            rooms: residencyData.rooms,
            parking: residencyData.parking
        },
        validate: {
            bathrooms: (value) => { return value <= 1 ? "Input must have more than 3 characters" : null },
            rooms: (value) => { return value <= 1 ? "Input must have more than 3 characters" : null },
            parking: (value) => { return value === true || value === false ? null : "parking must be more than 100" }
        }
    })

    const { bathrooms, rooms, parking } = form.values


    const handleClick = () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
            setResidencyData((prev) => { return { ...prev, bathrooms, rooms, parking } })
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
                    <NumberInput
                        label="bathrooms"
                        withAsterisk
                        {...form.getInputProps("bathrooms", { type: "input" })}
                        style={{ marginTop: "20px" }}
                    />

                    <NumberInput
                        label="rooms"
                        withAsterisk
                        {...form.getInputProps("rooms", { type: "input" })}
                        style={{ marginTop: "20px" }}
                    />
                    <Checkbox
                        label="Parking available"
                        {...form.getInputProps("parking", { type: "checkbox" })}
                        style={{ marginTop: "40px" }}
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

export default Facilities