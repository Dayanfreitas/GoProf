import { AxiosResponse } from 'axios'
import Api from '../services/api'
import ApiAutenticator from '../services/api_ouath'
import { ContentsProps } from './../views/@props/ContentsProps'

export type GetAllActionParams = {
  complete_select?: boolean
}

export type ReportsActionParams = {
  content_id: number
  type_report: string
}

export type FiledActionParams = {
  content_id: string
  filed: boolean
}

export function ContentsActions() {
  const getAll = async (
    params?: GetAllActionParams
  ): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        let response = {} as AxiosResponse

        if (params && params.complete_select) {
          response = await ApiAutenticator.get('/contents/all')
        } else {
          response = await Api.get('/contents')
        }

        if (response.status === 200) {
          resolve(response)
        }
      } catch (err) {
        const { response } = err

        reject(response)
      }
    })
  }

  const getById = async (id: number): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Api.get('/contents/' + id)

        if (response.status === 200) {
          resolve(response)
        }
      } catch (err) {
        const { response } = err

        reject(response)
      }
    })
  }

  const getShareLinks = async (id: number): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await Api.get('/contents/link-shared/' + id)

        if (response.status === 200) {
          resolve(response)
        }
      } catch (err) {
        const { response } = err

        reject(response)
      }
    })
  }

  const reports = async (
    params: ReportsActionParams
  ): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ApiAutenticator.post('/contents/reports', params)

        if (response.status === 200) {
          resolve(response)
        }
      } catch (err) {
        const { response } = err

        reject(response)
      }
    })
  }

  const filed = async (params: FiledActionParams): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await ApiAutenticator.post('/contents/filed', params)

        if (response.status === 200) {
          resolve(response)
        }
      } catch (err) {
        const { response } = err

        reject(response)
      }
    })
  }

  const createContents = async (
    params: ContentsProps
  ): Promise<AxiosResponse> => {
    return new Promise(async (resolve, reject) => {
      try {
        // const response = await ApiAutenticator.post('/contents/create', params)
        let response = { status: 200 }

        if (response.status === 200) {
          resolve(response)
        }
      } catch (err) {
        debugger
        const { response } = err

        reject(response)
      }
    })
  }

  return {
    getAll,
    getById,
    getShareLinks,
    reports,
    filed,
    createContents,
  }
}
