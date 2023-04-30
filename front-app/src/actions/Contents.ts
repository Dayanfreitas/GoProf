import { AxiosResponse } from "axios"
import Api from "../services/api"

export function ContentsActions() {
  
  const getAll = async (params = {}): Promise<AxiosResponse> => {
    return new Promise( async (resolve, reject) => {
      try{
        const response = await Api.get('/contents', params)
        
        console.log('response', response)
        if (response.status == 200) {
          resolve(response)
        }
      }catch (err) {
        const { response } = err
        
        reject(response)
      }
    })
  }

  const getById = async (id: number): Promise<AxiosResponse> => {
    return new Promise( async (resolve, reject) => {
      try{
        const response = await Api.get('/contents/'+ id)
        
        console.log('response', response)
        if (response.status == 200) {
          resolve(response)
        }
      }catch (err) {
        const { response } = err
        
        reject(response)
      }
    })
  }

  const getShareLinks = async (id: number): Promise<AxiosResponse> => {
    return new Promise( async (resolve, reject) => {
      try{
        const response = await Api.get('/contents/link-shared/'+ id)

        if (response.status == 200) {
          resolve(response)
        }
      }catch (err) {
        const { response } = err
        
        reject(response)
      }
    })
  }
  


  return {
    getAll,
    getById,
    getShareLinks
  }
}