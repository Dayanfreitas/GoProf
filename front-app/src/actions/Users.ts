import { AxiosResponse } from "axios"
import ApiAutenticator from "../services/api_ouath"

export function UsersActions() {
  
  const updateTermsAccepted = async (): Promise<AxiosResponse> => {
    return new Promise( async (resolve, reject) => {
      try{
        const response = await ApiAutenticator.post('/users/terms-accepet')
  
        if (response.status === 200) {
          resolve(response)
        }
      }catch (err) {
        const { response } = err
        
        reject(response)
      }
    })
  }
  
  return {
    updateTermsAccepted
  }
}
