import Api from "../services/api"
import { saveToken, getToken, removeToken } from "../services/auth" 
// import Navigator from '../utils/navigator'

// function AuthActions() {
//     const create = async (params) => {
//         return new Promise((resolve, reject) => {
//             Api.post('/users/create', params)
//                 .then((response) => {
//                     if (response.status == 200){
//                         resolve(response)
//                     }
//                     resolve(response)
//                 }).catch((err) => {
//                     resolve(err.response)
//                 })
//         })
//     }

//     const saveImage = async (params) => {
//         return new Promise((resolve, reject) => {
//             Api.post('/users/image', params)
//                 .then(res => {
//                     resolve(res)
//                 })
//                 .catch(err => {
//                     resolve(err.response)
//                     console.log(err);
//                 })
//         })
//     }

//     const update = async (params) => {
//         return new Promise((resolve, reject) => {
//             const { id } = params
//             const { user } = params
//             Api.put(`/users/${id}`, user)
//                 .then((response) => {
//                     if (response.status == 200){
//                         resolve(response)
//                     }
//                     resolve(response)
//                 }).catch((err) => {
//                     resolve(err.response)
//                 })

//         });
//     }

//     const auth = async (user) => {
//         return new Promise((resolve, reject) => {
//             Api.post('/users/authenticate', user)
//                 .then((response) => {
//                     if (response.status == 200){
//                         saveToken(response.data.token)
//                     }
//                     resolve(response)
//                 }).catch((err) => {
//                     const navigator = Navigator()
//                     const { response } = err 
                    
//                     navigator.validateRouter(response)
//                     resolve(response)
//                 })

//         })
//     }

//     const getUser = () => {
//         return new Promise((resolve, reject) => {
//             Api.get('/users/auth')
//                 .then((response) => {
//                     if (response.status == 200){
//                         resolve(response.data.user)
//                     }
//                     resolve({})
//                 }).catch((err) => {
//                     resolve(err.response.data)
//                 })

//         })
//     }

//     const getUserById = (params) => {
//         const {id} = params
//         return new Promise((resolve, reject) => {
//             Api.get('/users/'+id)
//                 .then((response) => {
//                     if (response.status == 200){
//                         resolve(response)
//                     }
//                     resolve({})
//                 }).catch((err) => {
//                     const navigator = Navigator()
                    
//                     const { response } = err 
//                     const { data, status } = response
//                     const { type } = data

//                     if (type === 'error' && status === 404)
//                         navigator.go('/not-found')
            
//                     if (type === 'error' && status === 403)
//                         navigator.go('/forbbiden')
            
//                     resolve( response )
//                 })

//         })
//     }

//     const isAuthenticated = () => {
//         if(getToken() != undefined && getToken() != null) {
//             return true
//         }else{
//             return false
//         }
        
//     }
    
//     const logout = () => {
//         removeToken()
//     }

//     return {
//         auth,
//         create,
//         saveImage,
//         update,
//         isAuthenticated,
//         logout,
//         getUser,
//         getUserById
//     }
// }

// export default AuthActions

export function OauthActions() {

  const OauthGoogle = async (params) => {
    return new Promise( async (resolve, reject) => {
      try{
        console.log('OauthGoogle', params)
        const oauthGoogleResponse = await Api.post('/oauth/google', params)
        
        console.log('oauthGoogleResponse', oauthGoogleResponse)
        if (oauthGoogleResponse.status == 200) {

          alert('Login com o Google realizado com sucesso!')
          saveToken(oauthGoogleResponse.data.token)
          resolve(oauthGoogleResponse)
        }
      }catch (err) {
        const { response } = err
        
        alert('Erro ao realizar login com o Google!'+ response.data.message)
        reject(response)
      }
    })
  }

  return {
    OauthGoogle
  }
}