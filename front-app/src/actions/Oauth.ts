import Api from "../services/api"
import { saveToken, removeToken } from "../services/auth" 

export function OauthActions() {

  const OauthGoogle = async (params) => {
    return new Promise( async (resolve, reject) => {
      try{
        console.log('OauthGoogle', params)
        const oauthGoogleResponse = await Api.post('/oauth/google', params)
        
        console.log('oauthGoogleResponse', oauthGoogleResponse)
        if (oauthGoogleResponse.status === 200) {

          alert('Login com o Google realizado com sucesso!')
          saveToken(oauthGoogleResponse.data.token)
          resolve(oauthGoogleResponse)
        }
      }catch (err) {
        const { response } = err
        removeToken()
        
        alert('Erro ao realizar login com o Google!'+ response.data.message)
        reject(response)
      }
    })
  }

  return {
    OauthGoogle
  }
}