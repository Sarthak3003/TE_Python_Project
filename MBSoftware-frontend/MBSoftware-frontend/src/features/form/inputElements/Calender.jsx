import { useSelector, useDispatch } from "react-redux";
import { setField } from "../formSlice";
import { setError } from "../fieldsSlice";
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import { useEffect } from "react";

export const Calender = ({question, name, type, regex, required, errorMsg, error, index}) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.form)
  let data = form[name]
  useEffect(() => {
    if (data) {
      dispatch(setError({name: index, error: false}))
    }
  }, [data])
  return (
    <div className='flex flex-col pt-2'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label=""
          value={data ? new Date(data.split('/')[1]+'/'+data.split('/')[0]+'/'+data.split('/')[2]) : new Date()}
          onChange={e => {
            dispatch(setField([name, String(e.getDate()).padStart(2, '0') + '/' + String(e.getMonth() + 1).padStart(2, '0') + '/' + e.getFullYear()]))
          }}
          inputFormat="dd/MM/yyyy"
          renderInput={(params) => <TextField {...params} size='small' className='bg-blue-100' />}
        />
      </LocalizationProvider>
      {error ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}