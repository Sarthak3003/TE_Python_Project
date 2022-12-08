import { useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { setField } from "../formSlice";
import { setError } from "../fieldsSlice";
import { MdKeyboardArrowDown } from 'react-icons/md'

export const DropDown = ({question, name, options, required, errorMsg, error, index}) => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.form)
  const data = form[name]
  useEffect(() => {
    if (data) {
      dispatch(setError({name: index, error: false}))
    }
  }, [data])
  return (
    <div className='flex flex-col pt-2'>
      <h1 className='text-purplegray-400 mb-2'>{question}{required && '*'}</h1>
      <div class="relative w-full">
        <select 
          value={data} 
          onChange={e => {
            if(e.target.value === 'None') {
              dispatch(setField([name, null]))
            } else {
              dispatch(setField([name, e.target.value]))
            }
          }} 
          class="appearance-none w-full border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none bg-blue-100 focus:border-gray-400">
          {options.map(option => <option>{option}</option>)}
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <MdKeyboardArrowDown />
        </div>
      </div>
      {error ? <p className='text-red-500 text-sm mt-1'>{errorMsg}</p> : '‎'}
    </div>
  )
}
