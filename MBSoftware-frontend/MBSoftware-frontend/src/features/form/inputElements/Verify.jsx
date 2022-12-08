import { useSelector, useDispatch } from "react-redux";
import { setField } from "../formSlice";
import { setError } from "../fieldsSlice";
import { useSendWhatsappOtpMutation, useSendEmailOtpMutation } from "../formApiSlice";
import { useState } from "react";

const Verify = ({question, name, regex, required, errorMsg, error, index}) => {
    const dispatch = useDispatch()
    const [sendWhatsappOtp] = useSendWhatsappOtpMutation();
    const [sendEmailOtp] = useSendEmailOtpMutation();
    const [sent, setSent] = useState(false)
    const [resend, setResend] = useState(true)
    const [sentMsg, setSentMsg] = useState('')
    const [otp, setOtp] = useState(null)
    const form = useSelector(state => state.form)
    const fields = useSelector(state => state.fields)
    const data = form[name]
    const type = name==='mobile_otp' ? 'verified_mobile' : 'verified_email'
    const verified = form[type]
    const generateOTP = () => {
      var digits = '0123456789';
      let OTP = '';
      for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
      }
      return OTP;
    }
    const timer = () => {
      setResend(false)
      setTimeout(() => {
        setResend(true)
        console.log('done')
      }, 60000);
    }
    const sendOTP = () => {
      dispatch(setError({name: index, error: false}))
      if(name==='mobile_otp') {
        if(fields[18].regex.test(form['Mobile'])) {
          try{
            const generatedOTP = generateOTP()
            setOtp(generatedOTP)
            console.log('sent')
            const res = sendWhatsappOtp({
              'number': form['Mobile'],
              'otp': generatedOTP
            }).unwrap()
            setSent(true)
            setSentMsg('OTP have been sent to your phone number. Resend OTP after 60 secs')
            if(resend) {
              setResend(false)
              timer()
            }
            console.log(res)
          } catch(e) {
            console.log(e)
            dispatch(setError({name: index, error: true}))
          }
        } else {
          alert('Enter phone number')
        }
      }
      if(name==='email_otp') {
        if(fields[19].regex.test(form['Email'])) {
          try{
            const generatedOTP = generateOTP()
            setOtp(generatedOTP)
            console.log('sent')
            const res = sendEmailOtp({
              'email': form['Email'],
              'otp': generatedOTP
            }).unwrap()
            setSent(true)
            setSentMsg('OTP have been sent to your email. Resend OTP after 60 secs')
            if(resend) {
              timer()
            }
            console.log(res)
          } catch(e) {
            console.log(e)
            dispatch(setError({name: index, error: true}))
          }
        } else {
          alert('Enter email')
        }
      } 
    }
    const submitChange = (e) => {
      let change = e.target.value
      if(required) {
        if(regex !=='' && regex.test(change)) {
          dispatch(setError({name: index, error: false}))
          dispatch(setField([name, change]))
        } else if(change==='') {
          dispatch(setField([name, change]))
          dispatch(setError({name: index, error: false}))
        } else if(regex === '') {
          dispatch(setError({name: index, error: false}))
        } else {
          dispatch(setError({name: index, error: true}))
        }
      }
    }
    const verify = () => {
      console.log(data, otp)
      if(data === otp) {
        setSent(false)
        setResend(false)
        dispatch(setField([type, true]))
        dispatch(setError({name: index, error: false}))
      } else dispatch(setError({name: index, error: true}))
    }
    return (
      <div className='flex flex-col pt-2'>
        <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
        <div className="w-full flex">
          <button disabled={!(resend && !verified)} className={`${(resend && !verified) ? "bg-purplegray-600" : 'bg-gray-300'} px-3 text-purple-50 rounded`} onClick={() => {resend && sendOTP()}}>{sent ? 'Resend' : 'Send'} OTP</button>
          <input 
            value={data ? data : ''} 
            onChange={e => dispatch(setField([name, e.target.value]))} 
            onBlur={e => submitChange(e)} 
            className='grow bg-blue-100 text-gray-700 appearance-none py-2 px-3 border rounded focus:border-gray-400 focus:shadow-outline focus:outline-none' 
          />
          {sent && <button className="bg-purplegray-600 px-3 text-purple-50 rounded" onClick={() => verify()}>Verify OTP</button>}
        </div>
        {(error || sent || verified) ? <p className={`${error ? 'text-red-500' : verified ? 'text-green-600' : 'text-gray-400'} text-sm mt-1`}>{error ? errorMsg : verified ? 'Verified' : sentMsg}</p> : '‎'}
      </div>
    )
}

export default Verify