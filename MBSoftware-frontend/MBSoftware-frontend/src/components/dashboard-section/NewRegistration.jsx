import React, { useRef, useState } from 'react'
import { VscLoading } from 'react-icons/vsc'
import { useRegisterMutation } from '../../features/auth/authApiSlice'

const formField = [
    {
        "name": "Name",
        "state": "name",
        "type": "text",
    },
    {
        "name": "Email",
        "state": "email",
        "type": "text",
    },
    {
        "name": "User Name",
        "state": "username",
        "type": "text",
    },
    {
        "name": "Password",
        "state": "password",
        "type": "password",
    },
]
const NewRegistration = () => {
    const [register, {isLoading, error}] = useRegisterMutation()
    const [errMsg, setErrMsg] = useState('')
    const errRef = useRef()
    const [form, setForm] = useState({
        name: '',
        email: '',
        username: '',
        password: '',
    })
    const handleSubmit = async () => {
        if (form.email !== '' && form.username !== '' && form.password !== '' && form.name !== '') {
          try {
            const userData = await register(form).unwrap()
            // const data = {
            //   email: user,
            //   token: userData.data.tokens.access,
            //   isAgent: userData.data.details.MBAgent,
            //   isAdmin: userData.data.details.MBAdmin,
            // }
            // dispatch(setCredentials(data))
            console.log(userData)
            setErrMsg('')
            alert(userData.data.detail)
            // setUser('')
            // setPwd('')
            // if(userData.data.details.MBAgent) navigate('/agent-dashboard')
            // if(userData.data.details.MBAdmin) navigate('/admin-dashboard')
          } catch (err) {
            console.log(Object.entries(err.data.data.detail))
            console.log(Object.entries(err.data.data.detail)[0] + Object.entries(err.data.data.detail)[1])
            setErrMsg(Object.entries(err.data.data.detail)[0][0] + ' : ' + Object.entries(err.data.data.detail)[0][1][0])
            errRef.current.focus();
          }
        } else {
        //   if (user === '' && pwd === '') {
        //     setErruser(true)
        //     setErrpwd(true)
        //   } else if (user === '') {
        //     setErruser(true)
        //   } else if (pwd === '') {
        //     setErrpwd(true)
        //   }
            setErrMsg('Please fill all the fields')
        }
      }
    return (
        <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Agent Registration
                </h1>
            </div>


            <div className='flex flex-col flex-wrap items-center '>
                {formField.map((data, key) => (
                    <div key={key} className='flex flex-col p-2 border border-gray-600 rounded  m-2 w-1/2 '>
                        <h1 className='text-purplegray-900 mb-2'>{data.name}</h1>
                        <input
                            value={form[data.state]}
                            onChange={(e) => setForm({ ...form, [data.state]: e.target.value })}
                            className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                            type={data.type}
                        />
                    </div>
                ))}
                {error ? <h1 ref={errRef} className='text-red-500'>{errMsg ? errMsg : '‎'}</h1> : <h1 ref={errRef} className='text-red-500'>{errMsg ? errMsg : '‎'}</h1>}
                <button onClick={() => handleSubmit()} className='bg-purple-600 px-7 basis-1/2  m-3 py-2 text-white rounded-lg w-1/2 text-center uppercase'>{isLoading ? <VscLoading className='w-6 h-6 mx-auto animate-spin' /> : <h1>submit</h1>}</button>
            </div>

        </>
    )
}
export default NewRegistration