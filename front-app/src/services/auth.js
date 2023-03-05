const KEY = 'token'

export const saveToken = (token) => {
    localStorage.setItem(KEY, token)
}

export const getToken = () =>{
    return localStorage.getItem(KEY)
}

export const removeToken = () => {
    localStorage.removeItem(KEY)
}