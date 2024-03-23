import React, { useState } from 'react'
import "./addlocation.css"
import getAllCountries from "../../utils/data"
import { useForm } from '@mantine/form'
import { Select, TextInput } from '@mantine/core'
import Map from "../../components/map/Map"
const AddLocation = ({ nextStep, residencyData, setResidencyData }) => {
    const form = useForm({
        initialValues: {
            country: residencyData.country,
            city: residencyData.city,
            address: residencyData.address
        },
        validate: {
            country: (value) => { return value.length < 3 ? "Input must have more than 3 characters" : null },
            city: (value) => { return value.length < 3 ? "Input must have more than 3 characters" : null },
            address: (value) => { return value.length < 3 ? "Input must have more than 3 characters" : null }
        }
    })

    const { country, city, address } = form.values


    const handleClick = () => {
        const { hasErrors } = form.validate()
        if (!hasErrors) {
            setResidencyData((prev) => { return { ...prev, country, city, address } })
            nextStep()
        }
        else {
            setMessage("All inputs should have atleast 3 characters")
        }
    }

    return (
        <div className="locationWrapper">
            <form className='locationForm'>
                <div className='addLocation'>
                    <Select
                        w="100%"
                        label="Country"
                        placeholder='Choose the country'
                        searchable
                        clearable
                        withAsterisk
                        data={getAllCountries()}
                        {...form.getInputProps("country", { type: "input" })}
                    />

                    <TextInput
                        label="City"
                        withAsterisk
                        {...form.getInputProps("city", { type: "input" })}
                    />
                    <TextInput
                        label="Address"
                        withAsterisk
                        {...form.getInputProps("address", { type: "input" })}
                    />
                </div>
                <div className="map">
                    <Map address={address} country={country} city={city} />
                </div>
            </form>
            <button className="nextStep" onClick={() => { handleClick() }}>Next</button>

        </div>
    )
}

export default AddLocation