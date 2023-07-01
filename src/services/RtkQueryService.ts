import { createApi } from '@reduxjs/toolkit/query/react'
import BaseService from './BaseService'
import type { BaseQueryFn } from '@reduxjs/toolkit/query'
import type { AxiosRequestConfig, AxiosError } from 'axios'

const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string
            method: AxiosRequestConfig['method']
            data?: AxiosRequestConfig['data']
            params?: AxiosRequestConfig['params']
        },
        unknown,
        unknown
    > =>
    async (request) => {
        try {
            const response = BaseService(request)
            return response
        } catch (axiosError) {
            const err = axiosError as AxiosError
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            }
        }
    }

const RtkQueryService = createApi({
    reducerPath: 'rtkApi',
    baseQuery: axiosBaseQuery(),
    endpoints: () => ({}),
})

export default RtkQueryService
