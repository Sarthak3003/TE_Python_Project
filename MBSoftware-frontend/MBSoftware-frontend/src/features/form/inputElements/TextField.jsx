import { useSelector, useDispatch } from "react-redux";
import { setField } from "../formSlice";
import { setError } from "../fieldsSlice";

export const TextField = ({question, name, type, regex, required, errorMsg, error, index}) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.form)
  const data = form[name]
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
  return (
    <div className='flex flex-col pt-2'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <input value={data ? data : ''} onChange={e => dispatch(setField([name, e.target.value]))} onBlur={e => submitChange(e)} type={type} className='text-gray-700 appearance-none py-2 px-3 border rounded bg-blue-100 focus:border-gray-400 focus:shadow-outline focus:outline-none' />
      {error ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}