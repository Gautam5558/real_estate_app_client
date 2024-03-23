import axios from "axios"

export const upload = async (file) => {
    const formData = new FormData()
    formData.append("file", file)
    formData.append("upload_preset", "realestate")
    try {
        const { data } = await axios.post("https://api.cloudinary.com/v1_1/ddwtk5msf/image/upload", formData)
        const url = data.url
        console.log(data)
        return url
    } catch (err) {
        console.log(err)
    }

}