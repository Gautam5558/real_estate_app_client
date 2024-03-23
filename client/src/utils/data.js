import countries from "world-countries"

const getAllCountries = () => {
    const data = countries.map((country) => {
        return (
            {
                value: country.name.common,
                label: `${country.name.common} ${country.flag}`,
                latlng: country.latlng,
                region: country.region,
                diabled: false
            }
        )
    })
    return data
}


export default getAllCountries