import { apiSlice } from "../../app/api/apiSlice";

export const formApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        postNewForm: builder.mutation({
            query: (credentials) => ({
                url: '/form/',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        postExistingForm: builder.mutation({
            query: (credentials) => ({
                url: '/form/agentbucket',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendWhatsappOtp: builder.mutation({
            query: (credentials) => ({
                url: '/form/whatsapp',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        sendEmailOtp: builder.mutation({
            query: (credentials) => ({
                url: '/form/email',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        updateExistingForm: builder.mutation({
            query: (credentials) => ({
                url: '/form/',
                method: 'PUT',
                body: { ...credentials }
            })
        }),
    })
})

export const {
    usePostNewFormMutation,
    usePostExistingFormMutation,
    useSendWhatsappOtpMutation,
    useSendEmailOtpMutation,
    useUpdateExistingFormMutation,
} = formApiSlice