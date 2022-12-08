import { useRef, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from './authSlice'
import { useLoginMutation } from './authApiSlice'
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { VscLoading } from "react-icons/vsc";
import background from '../../assets/background.png';
import Navbar from '../../components/Navbar'

export const Login = () => {
  const userRef = useRef()
  const errRef = useRef()
  const [user, setUser] = useState('')
  const [erruser, setErruser] = useState(false)
  const [pwd, setPwd] = useState('')
  const [errpwd, setErrpwd] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()
  const {token, isAgent, isAdmin} = useSelector(state => state.auth)

  const [login, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  useEffect(() => {
    userRef.current.focus()
    if(token) {
      if(isAdmin) {
        navigate('admin-dashboard')
      } else if(isAgent) {
        navigate('agent-dashboard')
      }
    }
  }, [])

  useEffect(() => {
    setErrMsg('')
    setErruser(false)
    setErrpwd(false)
  }, [user, pwd])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (user !== '' && pwd !== '') {
      try {
        const userData = await login({ "email": user, "password": pwd }).unwrap()
        const data = {
          email: user,
          token: userData.data.tokens.access,
          isAgent: userData.data.details.MBAgent,
          isAdmin: userData.data.details.MBAdmin,
        }
        dispatch(setCredentials(data))
        console.log(userData)
        setUser('')
        setPwd('')
        if(userData.data.details.MBAgent) navigate('/agent-dashboard')
        if(userData.data.details.MBAdmin) navigate('/admin-dashboard')
      } catch (err) {
        console.log(err)
        if (!err?.status) {
          setErrMsg('No Server Response');
        } else if (err.status === 400) {
          setErrMsg('Invalid Username or Password');
        } else if (err.status === 401) {
          setErrMsg('Invalid credentials');
        } else {
          setErrMsg('Login Failed');
        }
        errRef.current.focus();
      }
    } else {
      if (user === '' && pwd === '') {
        setErruser(true)
        setErrpwd(true)
      } else if (user === '') {
        setErruser(true)
      } else if (pwd === '') {
        setErrpwd(true)
      }
    }
  }
  // const handleLogin = (e) => {
  //   e.preventDefault();
  //   let myHeaders = new Headers();
  //   myHeaders.append("Content-Type", "application/json");

  //   let raw = JSON.stringify({
  //     "email": user,
  //     "password": pwd
  //   });

  //   let requestOptions = {
  //     method: 'POST',
  //     headers: myHeaders,
  //     body: raw,
  //     redirect: 'follow'
  //   };

  //   fetch("https://25b0-122-170-104-93.in.ngrok.io/auth/token/", requestOptions)
  //     .then(response => response.json())
  //     .then(result => console.log(result))
  //     .catch(error => console.log('error', error));
  // }

  return (
    <div className='flex h-screen'>
      <img className='w-screen h-screen' src={background} alt="" />
      <div className="absolute flex flex-col z-1 w-full h-screen top-0 left-0">
        <Navbar />
        <div className='flex flex-col items-center md:justify-center grow'>
          {/* <h1 className='font-bold text-5xl mt-12 text-gray-900'>Good to see you again</h1> */}
          <form
            className="bg-purplegray-100 flex flex-col md:min-h-content w-3/4 md:h-[60vh] md:w-2/5 lg:w-1/3 rounded shadow-lg px-8 py-8 my-36 md:my-12"
            onSubmit={(e)=>handleSubmit(e)}
          >
            <div>
              <h1 className="text-purplegray-400">Your username</h1>
              <div className="w-full mt-2 h-10 border border-purplegray-400 hover:shadow-md rounded-sm hover:border-purplezinc box-content flex">
                <div className="h-10 w-10 p-2 border-r-2">
                  <BsFillPersonFill className="h-6 w-6 text-purplezinc" />
                </div>
                <input
                  type="text"
                  className="w-full bg-purplegray-100 focus:outline-0 px-4"
                  placeholder="e.g. user123"
                  ref={userRef}
                  value={user}
                  onChange={e => setUser(e.target.value)}
                />
              </div>
              <h1 className="text-red-500 text-sm mt-1">{erruser ? 'Enter username' : '‎'}</h1>
            </div>
            <div className="mt-2">
              <h1 className="text-purplegray-400">Your password</h1>
              <div className="w-full mt-2 h-10 border border-purplegray-400 hover:shadow-md rounded-sm hover:border-purplezinc box-content flex">
                <div className="h-10 w-10 p-2 border-r-2">
                  <RiLockPasswordFill className="h-6 w-6 text-purplezinc" />
                </div>
                <input
                  type="password"
                  className="w-full bg-purplegray-100 focus:outline-0 px-4"
                  placeholder="e.g. user@123"
                  value={pwd}
                  onChange={e => setPwd(e.target.value)}
                />
              </div>
              <h1 className="text-red-500 text-sm mt-1">{errpwd ? 'Enter Password' : '‎'}</h1>
            </div>
            <h1 ref={errRef} className='text-red-500'>{errMsg ? errMsg : '‎'}</h1>
            <div className="w-full flex flex-col items-center mt-auto">
              <button
                type="submit"
                className="w-1/2 h-12 flex justify-center items-center rounded-full bg-purplegray-600 text-purplegray-100 text-lg hover:shadow-md"
              >
                {isLoading ? <VscLoading className='w-6 h-6 animate-spin' /> : <h1>Log In</h1>}
              </button>
              <div className='w-full relative my-6 mt-8'>
                <hr className='border-purplegray-300' />
                <h1 className='text-center absolute top-[-12px] right-[48%] bg-purplegray-100 px-1'>OR</h1>
              </div>
              {/* <h1 className='text-xl font-semibold'>Fill form as</h1> */}
              <div className="flex justify-around w-full mt-2">
                <Link className='text-purplegray-600 text-lg font-semibold' to='/form/new'>Become a member!</Link>
                <Link className='text-purplegray-600 text-lg font-semibold' to='/form/existing'>Already a member?</Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}