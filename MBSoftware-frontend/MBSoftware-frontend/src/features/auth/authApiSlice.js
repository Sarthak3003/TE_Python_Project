import { apiSlice } from "../../app/api/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: '/auth/token/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: '/auth/register/',
                method: 'POST',
                body: { ...credentials, "MBAdmin": false, "MBAgent": true }
            })
        }),
    })
})

export const {
    useLoginMutation,
    useRegisterMutation,
} = authApiSlice