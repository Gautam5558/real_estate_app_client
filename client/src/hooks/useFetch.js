import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export const useFetch = (api) => {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: ["residencies"],
        queryFn: () => axios.get(api).then((response) => { return response.data })
    })

    return { data, isLoading, error, refetch }
}

