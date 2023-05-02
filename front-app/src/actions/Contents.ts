import { AxiosResponse } from "axios"
import Api from "../services/api"
import ApiAutenticator from "../services/api_ouath"

export type ReportsActionParams = {
  content_id: number,
  type_report: string,
}

export function ContentsActions() {
  
  const getAll = async (params = {}): Promise<AxiosResponse> => {
    return new Promise( async (resolve, reject) => {
      try{
        const response = await Api.get('/contents', params)
        
        if (response.status === 200) {
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
        
        if (response.status === 200) {
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

        if (response.status === 200) {
          resolve(response)
        }
      }catch (err) {
        const { response } = err
        
        reject(response)
      }
    })
  }

  const reports = async (params: ReportsActionParams): Promise<AxiosResponse> => {
    return new Promise( async (resolve, reject) => {
      try{
        const response = await ApiAutenticator.post('/contents/reports', params)

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
    getAll,
    getById,
    getShareLinks,
    reports
  }
}