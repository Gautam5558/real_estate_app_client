import { createContext, useReducer } from "react";

const INTITIAL_STATE = {
    user: JSON.parse(localStorage.getItem("user")),
    loading: false,
    error: null
}


export const AuthContext = createContext(INTITIAL_STATE)

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                ...state,
                loading: true
            }
            break;
        case "LOGIN_FAILURE":
            return {
                ...state,
                loading: false,
                error: action.payload
            }
            break;
        case "LOGIN_SUCCESS":
            localStorage.setItem("user", JSON.stringify(action.payload))
            return {
                ...state,
                loading: false,
                user: action.payload
            }
            break;
        case "LOGOUT":
            localStorage.clear()
            return {
                ...state,
                user: null,
            }
            break;
        case "ADD_BOOKING":
            const data = JSON.parse(localStorage.getItem("user"))
            data.bookedVisits.some((visit) => { return visit.residencyId === action.payload.residencyId }) === false && data.bookedVisits.push(action.payload)
            localStorage.setItem("user", JSON.stringify(data))
            console.log(state.user)
            return {
                ...state,
                user: {
                    ...state.user,
                    bookedVisits: [...state.user.bookedVisits.filter((visit) => { return visit.residencyId != action.payload.residencyId }), action.payload]
                }
            }

            break;
        case "REMOVE_BOOKING":
            const userData = JSON.parse(localStorage.getItem("user"))
            userData.bookedVisits = userData.bookedVisits.filter((visit) => { return visit.residencyId != action.payload })
            localStorage.setItem("user", JSON.stringify(userData))
            return {
                ...state,
                user: {
                    ...state.user,
                    bookedVisits: state.user.bookedVisits.filter((visit) => { return visit.residencyId != action.payload })
                }
            }

        case "ADD_FAVORITE":
            const value = JSON.parse(localStorage.getItem("user"))
            value.favoriteResidencies.some((id) => { return id === action.payload }) === false && value.favoriteResidencies.push(action.payload)
            localStorage.setItem("user", JSON.stringify(value))

            return {
                ...state,
                user: {
                    ...state.user,
                    favoriteResidencies: [...state.user.favoriteResidencies, action.payload]
                }
            }
            break;
        case "REMOVE_FAVORITE":

            const value2 = JSON.parse(localStorage.getItem("user"))
            value2.favoriteResidencies = value2.favoriteResidencies.filter((id) => { return id !== action.payload })
            localStorage.setItem("user", JSON.stringify(value2))

            return {
                ...state,
                user: {
                    ...state.user,
                    favoriteResidencies: state.user.favoriteResidencies.filter((id) => { return id !== action.payload })
                }
            }
            break;
        case "UPDATE_USER":
            const userValue = JSON.parse(localStorage.getItem("user"))
            userValue.image = action.payload.image
            userValue.username = action.payload.username
            userValue.isAdmin = action.payload.isAdmin
            localStorage.setItem("user", JSON.stringify(userValue))
            return {
                ...state,
                user: {
                    ...state.user,
                    image: action.payload.image,
                    isAdmin: action.payload.isAdmin,
                    username: action.payload.username
                }
            }
        default: return {
            ...state
        }
    }
}

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, INTITIAL_STATE)

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )
}