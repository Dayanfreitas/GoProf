import { UserProps } from "../views/@props/UsersProps"

const KEY_TOKEN = 'token@goprof'
const KEY_USER = 'goprof@user'

export const saveToken = (token) => {
    localStorage.setItem(KEY_TOKEN, token)
}

export const getToken = () =>{
    return localStorage.getItem(KEY_TOKEN)
}

export const removeToken = () => {
    localStorage.removeItem(KEY_TOKEN)
}

export const getUser = (): UserProps => {
    return JSON.parse(localStorage.getItem(KEY_USER))
}

export const saveUser = (user: UserProps) => {
    localStorage.setItem(KEY_USER, JSON.stringify(user))
}

export const removeUser = () => {
    localStorage.removeItem(KEY_USER)
}