import Api from '../services/api'
import { saveToken, removeToken, getToken } from '../services/auth'

export function OauthActions() {
  const OauthGoogle = async (params) => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('OauthGoogle', params)
        const oauthGoogleResponse = await Api.post('/oauth/google', params)

        console.log('oauthGoogleResponse', oauthGoogleResponse)
        if (oauthGoogleResponse.status === 200) {
          alert('Login com o Google realizado com sucesso!')
          saveToken(oauthGoogleResponse.data.token)
          resolve(oauthGoogleResponse)
        }
      } catch (err) {
        const { response } = err
        removeToken()

        alert('Erro ao realizar login com o Google!' + response.data.message)
        reject(response)
      }
    })
  }

  const OauthToken = async (params = { email: '', token_sub_google: '' }) => {
    return new Promise(async (resolve, reject) => {
      try {
        const oauthGentokenResponse = await Api.post('/oauth/token', {
          email: params.email,
          sub: params.token_sub_google,
        })

        if (oauthGentokenResponse.status === 200) {
          console.log('OauthGentoken', oauthGentokenResponse.data.token)
          saveToken(oauthGentokenResponse.data.token)
          resolve(oauthGentokenResponse.data.token)
        }
      } catch (err) {
        const { response } = err
        console.log('erro', err)
        removeToken()
        reject(response)
      }
    })
  }

  const isAuthenticated = (): boolean => {
    if (getToken() != undefined && getToken() != null) {
      return true
    }

    return false
  }

  return {
    OauthGoogle,
    OauthToken,
    isAuthenticated,
  }
}
