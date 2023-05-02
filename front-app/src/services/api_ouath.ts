import { getUser } from "./auth"
import { OauthActions } from "../actions"

import config from "../config";
import axios from "axios";

const baseURL = `${config.SERVER_HOST}:${config.SERVER_PORT}` 
const timeout = config.TIMEOUT

const ApiOauth = axios.create({
    baseURL,
    timeout
})

const ApiAutenticator = () => {
    ApiOauth.interceptors.request.use(async config => {
        const user = getUser()
        const token = await OauthActions().OauthToken({
            email: user.email,
            token_sub_google: user.token_sub_google
        })
    
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    })
    

    // ApiOauth.interceptors.response.use(
    //     response => {
    //         console.log('interceptors- response', response)
    //         return response

    //     },
    //     error => {
    //         console.log('interceptors response[error]', error)
          
    //         if (error.response.status === 401) {
    //             console.log('interceptors token_not_provided[error]', error.response.data.token_not_provided)
    //         }
    //     })

    return ApiOauth
}

export default ApiAutenticator()
