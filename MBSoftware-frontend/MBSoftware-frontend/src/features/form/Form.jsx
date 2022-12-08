import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../../components/Navbar'
import { BsPersonFill, BsPeopleFill, BsExclamationCircleFill } from "react-icons/bs";
import { IoLocationSharp, IoMenuSharp, IoCloseSharp } from "react-icons/io5";
import { MdVerifiedUser, MdSystemUpdateAlt, MdDeleteForever } from "react-icons/md";
import { TextField } from './inputElements/TextField';
import Radio from './inputElements/Radio';
import File from './inputElements/File';
import Photo from './inputElements/Photo';
import { Calender } from './inputElements/Calender';
import { addFamilyMember, removeFamilyMember, removeReference, setField, clearFields, resetFamilyMembers } from './formSlice';
import Swal from "sweetalert2";  
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { usePostNewFormMutation, useUpdateExistingFormMutation } from './formApiSlice';
import { usePostExistingFormMutation } from './formApiSlice';
import { setError } from './fieldsSlice';
import Verify from './inputElements/Verify';
import { DropDown } from './inputElements/DropDown';
import { ref, uploadBytes , getDownloadURL } from 'firebase/storage'
import { VscLoading } from 'react-icons/vsc';

const data = {
  "AadharNumber": "582725937562",
  "FirstName": "Mihir", 
  "MiddleName": "Umesh",
  "LastName": "Shinde",
  "DateOfBirth": "29/03/2002",
  "GrandFatherName": "xyz",
  "Gender": "Male",
  "MaritalStatus": "Single",
  "BloodGroups": "A-",
  "FamilyDetails": [],
  "EducationQualification": "12th",
  "Occupation": "None",
  "Address": "xyz",
  "Area": "xyz",
  "City": "xyz",
  "State": "xyz",
  "Pincode": "400703",
  "Country": "India",
  "Phone": "9320423965",
  "Mobile": "9320432965",
  "Email": "mihirushinde29@gmail.com",
  "NativeTaluka": "xyz",
  "NativeVillage": "xyz",
  "References": [],
  
  "MDO": "",

  "AadharS3": "wbwfb",
  "PhotoS3": "bwbwfb",

  "Processed": false,
  "Verified": false,
  "Paid": false,
  "New": true,
  "Self": true,
  "MDOBool": false,
  "UpdatedBy": '',
  "VerifiedBy": ''

}

const FileOrPhotoSelctor = ({ question, name, required, errorMsg, error, folder, setFolder, aadhar, setAadhar }) => {
  return (
    <div className="">
      <h1 className='text-purplegray-400 mb-2'>Choose way to upload Aadhar card or PAN card</h1>
      <div className={`flex gap-4`}>
        <label class={`flex items-center gap-1 text-sm text-purplezinc`}>
          <input type="radio" checked={aadhar === 'file'} onChange={e => {
              const object = {...folder, [name]: null}
              setFolder(object)
              setAadhar(e.target.value)
            }} value='file' class="w-4 h-4 accent-purplegray-600 bg-gray-100 border-gray-300" />
          File
        </label>
        <label class={`flex items-center gap-1 text-sm text-purplezinc`}>
          <input type="radio" checked={aadhar === 'photo'} onChange={e => {
              const object = {...folder, [name]: null}
              setFolder(object)
              setAadhar(e.target.value)
            }} value='photo' class="w-4 h-4 accent-purplegray-600 bg-gray-100 border-gray-300" />
          Photo
        </label>
      </div>
      {aadhar === 'file' && <File folder={folder} setFolder={setFolder} errorMsg={errorMsg} required={required} question={question + ' PDF'} name={name} error={error} />}
      {aadhar === 'photo' && <Photo folder={folder} setFolder={setFolder} errorMsg={errorMsg} required={required} question={question + " Photo"} name={name} error={error} />}
    </div>
  )
}

const IconSelector = ({checked}) => {
  return (
    <>
      {checked === 'Personal Details' && <BsPersonFill className='w-full h-full text-purplegray-300' />}
      {checked === 'Family Details' && <BsPeopleFill className='w-full h-full text-purplegray-300' />}
      {checked === 'Address Details' && <IoLocationSharp className='w-full h-full text-purplegray-300' />}
      {checked === 'Other' && <BsExclamationCircleFill className='w-full h-full text-purplegray-300' />}
      {checked === 'Verification' && <MdVerifiedUser className='w-full h-full text-purplegray-300' />}
    </>
  )
}

const Tabs = ({ checked, setChecked, tabs }) => {
  const sectionList = Object.keys(tabs)
  return (
    <div className='hidden sm:grid grid-flow-col grid-cols-auto w-full my-4'>
      {sectionList.map(section => (
        <label class={`flex flex-col items-center gap-1 text-sm text-purplezinc`} onClick={() => setChecked(section)}>
          {checked === section ? (
            <>
              <input type="radio" value="" name="colored-radio" className="w-4 h-4 hidden accent-purplegray-900 bg-gray-100 border-gray-300" />
              <div className="flex w-12 h-12 bg-purplegray-900 p-3 rounded-full">
                <IconSelector checked={section} />
              </div>
              <h1 className='text-lg text-purplezinc'>
                {section}
              </h1>
            </>
          ) : (
            <>
              <input type="radio" value="" name="colored-radio" className="w-4 h-4 hidden accent-purplegray-900 bg-gray-100 border-gray-300" />
              <div className="flex w-12 h-12 bg-purplegray-100 p-3 rounded-full">
                <IconSelector checked={section} />
              </div>
              <h1 className='text-lg text-purplegray-400'>
                {section}
              </h1>
            </>
          )}
        </label>
      ))}
    </div>
  )
}

const FieldSelector = ({ data, index, folder, setFolder, aadhar, setAadhar }) => {
  return (
    <>
      {data.type === 'text' && <TextField errorMsg={data.errorMsg} required={data.required} regex={data.regex} question={data.question} name={data.name} type={data.type} error={data.error} index={index} />}
      {data.type === 'verify' && <Verify errorMsg={data.errorMsg} required={data.required} regex={data.regex} question={data.question} name={data.name} type={data.type} error={data.error} index={index} />}
      {data.type === 'radio' && <Radio errorMsg={data.errorMsg} required={data.required} question={data.question} row={true} options={data.options} name={data.name} error={data.error} index={index} />}
      {data.type === 'dropdown' && <DropDown errorMsg={data.errorMsg} required={data.required} question={data.question} row={true} options={data.options} name={data.name} error={data.error} index={index} />}
      {data.type === 'file' && <File folder={folder} setFolder={setFolder} errorMsg={data.errorMsg} required={data.required} question={data.question} name={data.name} error={data.error} />}
      {data.type === 'photo' && <Photo folder={folder} setFolder={setFolder} errorMsg={data.errorMsg} required={data.required} question={data.question} name={data.name} error={data.error} />}
      {data.type === 'file/photo' && <FileOrPhotoSelctor aadhar={aadhar} setAadhar={setAadhar} folder={folder} setFolder={setFolder} errorMsg={data.errorMsg} required={data.required} question={data.question} name={data.name} error={data.error} />}
      {data.type === 'date' && <Calender errorMsg={data.errorMsg} required={data.required} question={data.question} name={data.name} type={data.type} error={data.error} index={index} />}
    </>
  )
}

const Member = ({ index,  member, sections }) => {
  const dispatch = useDispatch()
  const fields = useSelector(state => state.fields)
  const update = (index) => {
    sections.forEach(section => {
      dispatch(setField([fields[section].name, member[fields[section].name]]))
    })
    dispatch(removeFamilyMember(index))
  }
  return (
    <div className='flex justify-between items-center bg-purplegray-100 p-4 rounded-xl my-2'>
      <h1>Name: {member.FamilyMemberName}</h1>
      <h1>Relation: {member.Relation}</h1>
      <h1>Date of Birth: {member.RelativeDateOfBirth}</h1>
      <div>
        <button className='bg-green-400 px-1 py-1 text-xl rounded mr-2' onClick={() => update(index)}><MdSystemUpdateAlt /></button>
        <button className='bg-red-400 px-1 py-1 text-xl rounded' onClick={() => {dispatch(removeFamilyMember(index))}}><MdDeleteForever /></button>
      </div>
    </div>
  )
}

const FamilyForm = ({ sections, data }) => {
  const dispatch = useDispatch()
  const fields = useSelector(state => state.fields)
  const form = useSelector(state => state.form)
  const [error, setError] = useState(false)
  const { members, number } = useSelector(state => state.form.FamilyDetails)
  const addMember = () => {
    const member = {}
    let Fields = []
    let count = 0
    sections.forEach(section => {
      member[fields[section].name] = form[fields[section].name]
      Fields.push(fields[section].name)
      if(form[fields[section].name] === null) {
        count++
      }
    })
    if(count === 0) {
      dispatch(addFamilyMember(member))
      dispatch(clearFields(Fields))
      setError(false)
    } else setError(true)
  }
  return (
    <div>
      <h1 className="text-3xl text-center my-2">Family Members List</h1>
      {!number && <h1 className="text-2xl text-center my-4 text-purplezinc">No Family Members</h1>}
      {members?.map((member, index) => <Member index={index} member={member} sections={sections} />)}
      <div className='flex flex-col sm:flex-row w-full justify-around items-center'>
        {sections.map(field => (
          <div className="sm:w-1/4">
            <FieldSelector data={fields[field]} index={field} />
          </div>
        ))}
        <button onClick={() => addMember()}>Add</button>
      </div>
      {error && <h1 className="text-xl text-center my-2 text-red-400">Please fill all fields</h1>}
    </div>
  )
}

const AuthorizedSection = () => {
  const dispatch = useDispatch()
  const form = useSelector(state => state.form)
  const {isAdmin} = useSelector(state => state.auth)
  return (
    <div>
      <div className='pt-2'>
        <h1 className='text-purplegray-400 mb-2'></h1>
        <div className={`flex gap-3`}>
          {["Married", "Divorsed", "Other", "None"].map(option => (
            <label class={`flex items-center gap-1 text-sm text-purplezinc`}>
              <input type="radio" checked={form.MDO === option || (option==="None" && form.MDO==='')} onChange={e => dispatch(setField(["MDO", e.target.value]))} value={option==="None" ? '' : option} class="w-4 h-4 accent-purplegray-600 bg-gray-100 border-gray-300" />
              {option}
            </label>
          ))}
        </div>
      </div>
      {form.MDO === 'Other' &&  
        <div className='flex flex-col pt-2'>
          <h1 className='text-purplegray-400 mb-2'>Other</h1>
          <input  className='text-gray-700 appearance-none py-2 px-3 border rounded bg-blue-100 focus:border-gray-400 focus:shadow-outline focus:outline-none' />
        </div>
      }
      {isAdmin && 
        <div className="">
          <div className='flex flex-col pt-2 w-fit'>
            <label className="flex items-center gap-1 text-sm text-purplezinc">
              <input checked={form.Verified} onChange={() => dispatch(setField(['Verified', !form.Verified]))} type="checkbox" className="accent-purplegray-900 h-6" />
              Verified
            </label>
          </div>
          <div className='flex flex-col pt-2 w-fit'>
            <label className="flex items-center gap-1 text-sm text-purplezinc">
              <input checked={form.Paid} onChange={() => dispatch(setField(['Paid', !form.Paid]))} type="checkbox" className="accent-purplegray-900 h-6" />
              Paid
            </label>
          </div>
          <div className='flex flex-col pt-2 w-fit'>
            <label className="flex items-center gap-1 text-sm text-purplezinc">
              <input checked={form.Processed} onChange={() => dispatch(setField(['Processed', !form.Processed]))} type="checkbox" className="accent-purplegray-900 h-6" />
              Processed
            </label>
          </div>
        </div>
      }
    </div>
  )
}

const OtherForm =({ sections }) => {
  const { type } = useParams()
  const dispatch = useDispatch()
  const fields = useSelector(state => state.fields)
  const form = useSelector(state => state.form)
  const { token } = useSelector(state => state.auth)
  const references = form[fields[sections[2]].name]
  const [errors, setErrors] = useState(false)
  const [reference, setReference] = useState({
    name: '',
    number: '',
    designation: '',
  })
  const addReference = () => {
    if(reference.name !== '' && reference.number !== '' && reference.designation !== '') {
      let newRef = Array.isArray(references) ? [...references, reference] : [references, reference]
      console.log(newRef)
      dispatch(setField([fields[sections[2]].name, newRef]))
      setReference({
        name: '',
        number: '',
        designation: '',
      })
      setErrors(false)
    } else setErrors(true)
  }
  useEffect(() => {
    console.log(sections[2])
    if(references.length === fields[sections[2]].max) {
      dispatch(setError({name: sections[2], error: false}))
    }
  }, [references])
  
  return (
    <div>
      <FieldSelector data={fields[sections[0]]} index={sections[0]} />
      {form[fields[sections[0]].name] === 'Yes' && <FieldSelector data={fields[sections[1]]} index={sections[1]} />}
      <div className={type === 'existing' && 'hidden'}>
        <h1 className='text-purplezinc text-3xl my-2'>References <span className='text-xl'>(compulsory 2)</span></h1>
        {(fields[sections[2]].error) ? <p className='text-red-500 text-sm mt-1'>{fields[sections[2]].errorMsg}</p> : '‎'}
        {references.length > 0 && references.map((reference, index) => (
          <div className='flex justify-between items-center bg-purplegray-100 p-4 rounded-xl my-2'>
            <h1>Name: {reference.name}</h1>
            <h1>Number: {reference.number}</h1>
            <h1>Designation: {reference.designation}</h1>
            <button className='bg-red-400 px-1 py-1 text-xl rounded' onClick={() => {dispatch(removeReference(index))}}><MdDeleteForever /></button>
          </div>
        ))}
        {((references.length < fields[sections[2]].max || references) && type !== 'existing') && (
          <div className="grid grid-cols-4 gap-6">
            <div className='flex flex-col pt-2'>
              <h1 className='text-purplegray-400 mb-2'>Enter Name</h1>
              <input value={reference.name} onChange={e => setReference(prevState => ({...prevState, name: e.target.value}))} type='text' className='text-gray-700 appearance-none py-2 px-3 border rounded bg-blue-100 focus:border-gray-400 focus:shadow-outline focus:outline-none' />
            </div>
            <div className='flex flex-col pt-2'>
              <h1 className='text-purplegray-400 mb-2'>Enter Number</h1>
              <input value={reference.number} onChange={e => setReference(prevState => ({...prevState, number: e.target.value}))} type='text' className='text-gray-700 appearance-none py-2 px-3 border rounded bg-blue-100 focus:border-gray-400 focus:shadow-outline focus:outline-none' />
            </div>
            <div className='flex flex-col pt-2'>
              <h1 className='text-purplegray-400 mb-2'>Enter Designation</h1>
              <input value={reference.designation} onChange={e => setReference(prevState => ({...prevState, designation: e.target.value}))} type='text' className='text-gray-700 appearance-none py-2 px-3 border rounded bg-blue-100 focus:border-gray-400 focus:shadow-outline focus:outline-none' />
            </div>
            <button onClick={() => addReference()}>Add</button>
          </div>
        )}
        {errors && <h1 className="text-xl text-center my-2 text-red-400">Please fill all fields</h1>}
      </div>
      {token && type!=='new' && type!=='existing' && <AuthorizedSection />}
    </div>
  )
}

const SideBar = ({ checked, setChecked, tabs }) => {
  const sectionList = Object.keys(tabs)
  const [open, setOpen] = React.useState(false);
  return (
    <div className='sm:hidden flex'>
      <IoMenuSharp className='text-2xl my-4' onClick={() => setOpen(true)} />
      {open && (
        <div className="bg-purplegray-500 z-10 absolute flex flex-col top-0 left-0 h-full min-h-screen items-end">
          <IoCloseSharp className='mt-4 mr-4 text-2xl' onClick={() => setOpen(false)} />
          <div className='flex flex-col py-6 px-4 gap-6'>
            {sectionList.map(section => (
              <label class={`flex items-center gap-1 text-sm text-purplezinc`} onClick={() => setChecked(section)}>
                {checked === section ? (
                  <>
                    <input type="radio" value="" name="colored-radio" className="w-4 h-4 hidden accent-purple-600 bg-gray-100 border-gray-300" />
                    <div className="flex w-8 h-8 bg-purplegray-900 p-2 rounded-full">
                      <IconSelector checked={section} />
                    </div>
                    <h1 className='text-purplezinc'>
                      {section}
                    </h1>
                  </>
                ) : (
                  <>
                    <input type="radio" value="" name="colored-radio" className="w-4 h-4 hidden accent-purple-600 bg-gray-100 border-gray-300" />
                    <div className="flex w-8 h-8 bg-purplegray-100 p-2 rounded-full">
                      <IconSelector checked={section} />
                    </div>
                    <h1 className='text-purplegray-400'>
                      {section}
                    </h1>
                  </>
                )}
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

const Form = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { type } = useParams()
  const [postNewForm, {isLoading: loadingNew}] = usePostNewFormMutation()
  const [postExistingForm, {isLoading: loadingExisting}] = usePostExistingFormMutation()
  const [updateExistingForm, {isLoading: loadingUpdate}] = useUpdateExistingFormMutation()
  const sections = useSelector(state => state.section)
  const fields = useSelector(state => state.fields)
  const form = useSelector(state => state.form)
  const {token} = useSelector(state => state.auth)
  const [checked, setChecked] = useState(Object.keys(sections)[0])
  const [folder, setFolder] = useState({
    'AadharS3': null,
    'PhotoS3': null
  })
  const [aadhar, setAadhar] = useState('file')
  const { storage } = useSelector(state => state.firebase);
  const location = useLocation();
  let data = null
  useEffect(() => {
    if(type!=='new' && type!=='existing') {
      if(!token) navigate('/')
      const { userinfo } = location.state;
      data = userinfo
      const { bucketinfo } = location.state;
      console.log(userinfo, bucketinfo)
      if(userinfo){
        Object.entries(userinfo).forEach(([key, value]) => {
          if(form[key]===null) {
            if(key==='FamilyDetails') {
              dispatch(resetFamilyMembers())
              if(!Array.isArray(value)) {
                dispatch(addFamilyMember(value.members))
              } else if(value!==[])  dispatch(addFamilyMember(value))
            } else dispatch(setField([key, value]))
          }
          if(form[key]) {
            if(key==='FamilyDetails') {
              console.log(value)
              dispatch(resetFamilyMembers())
              if(!Array.isArray(value)) {
                if(value.members) dispatch(addFamilyMember(value.members))
              } else if(value!==[]) dispatch(addFamilyMember(value))
            } else dispatch(setField([key, value]))
          }
        })
      } else {
        Object.entries(bucketinfo).forEach(([key, value]) => {
          if(form[key]===null) {
            if(key==='FamilyDetails') {
              dispatch(resetFamilyMembers())
              if(!Array.isArray(value)) {
                dispatch(addFamilyMember(value.members))
              } else if(value!==[])  dispatch(addFamilyMember(value))
            } else dispatch(setField([key, value]))
          }
          if(form[key]) {
            if(key==='FamilyDetails') {
              console.log(value)
              dispatch(resetFamilyMembers())
              if(!Array.isArray(value)) {
                console.log('hi')
                if(value.members) dispatch(addFamilyMember(value.members))
              } else if(value!==[]) dispatch(addFamilyMember(value))
            } else dispatch(setField([key, value]))
          }
        })
      }
    }
  }, [])
  
  const uploadImage = (img, name) => {
    console.log(img.file.name)
    if (img === null) return;
    const imageRef = ref(storage, `images/${img.file.name}`)
    return uploadBytes(imageRef, img.file).then((snapshot) => {
      return getDownloadURL(snapshot.ref).then((url) => {
        console.log(url)
        dispatch(setField([name, url]))
      })
    })
  }
  const submit = async () => {
    let empty = []
    let count = 0
    Object.entries(form).forEach((value, index) => {
      if(index < Object.keys(fields).length-4) {
        const regex = fields[index+1]?.regex
        if(fields[index+1].required) {
          if (value[1] === null || value[1] === '' || value[1] === [] || value[1] === {}) {
            empty.push(Object.values(fields)[index].label)
            dispatch(setError({name: index+1, error: true}))
            count++
          } 
          else if (regex && !regex?.test(value[1])) {
            empty.push(Object.values(fields)[index].label)
            dispatch(setError({name: index+1, error:true}))
            count++
          }
          else if (regex==='' && value[1]==='') {
            empty.push(Object.values(fields)[index].label)
            dispatch(setError({name: index+1, error:true}))
            count++
          } else dispatch(setError({name: index+1, error:false}))
        }
      }
      // if(value[0] === 'FamilyDetails' && value[1]?.number === 0) {
      //   empty.push("Family Details")
      //   count++
      // }
      if(value[0] === 'References' && value[1].length !== Object.values(fields)[index].max && type!=='existing') {
        empty.push('Add ' + Object.values(fields)[index].max + ' references')
        dispatch(setError({name: index+1, error: true}))
        count++
      }
    })
    console.log(empty)
    if (count !== 0) {
      alert(`Please fill out the following fields: ${empty.join(', ')}`)
    } else {
      let newData = {
        ...form,
        "FamilyDetails": [...form.FamilyDetails.members],
        "Processed": false,
        "Verified": false,
        "Paid": false,
        "New": type==='new',
        "Self": true,
        "MDOBool": false,
        "UpdatedBy": '',
        "VerifiedBy": ''
      }
      if(type==='new') {
        try {
          const res = await postNewForm(newData).unwrap()
          console.log(res)
          navigate('/')
        } catch(e) {
          console.log(e)
          alert('Something went wrong')
        }
      } else if(type==='existing') {
        try {
          newData = {...newData, "References": []}
          console.log(newData)
          const res = await postExistingForm(newData).unwrap()
          console.log(res)
          navigate('/')
        } catch(e) {
          console.log(e)
          alert('Something went wrong')
        }
      } else {
        try {
          const { userinfo } = location.state;
          newData = {...newData, "ApplicationID": userinfo.ApplicationID, "MemberID": userinfo.MemberID}
          console.log(newData)
          const res = await updateExistingForm(newData).unwrap()
          console.log(res)
          navigate('/')
        } catch(e) {
          console.log(e)
          alert('Something went wrong')
        }
      }
    }
  }
  
  const submitForm = () => {
    console.log(folder)
    Object.entries(folder).forEach(async ([key, value]) => {
      if(value !== null) {
        await uploadImage(value, key)
      }
    })
    submit()
  }  
  
  // const modal = () => {
  //   if((form.FirstName || form.MiddleName || form.LastName) && form.NativeVillage) {
  //     Swal.fire({  
  //       title: 'Question', 
  //       icon: 'warning',  
  //       input: 'radio',
  //       inputOptions: {
  //         "Married": 'Married',
  //         "Diseased": 'Diseased',
  //         "Other": 'Other'
  //       },
  //       showCancelButton: true,
  //       confirmButtonColor: '#301896',
  //       cancelButtonColor: '#43464A',
  //       confirmButtonText: 'Ok'  
  //     }).then(result => {
  //       if (result.value === 'Other') {
  //         Swal.fire({
  //           title: 'Question',
  //           icon: 'question',
  //           input: 'text',
  //           inputPlaceholder: 'Reason',
  //           showCancelButton: true,
  //           confirmButtonColor: '#301896',
  //           cancelButtonColor: '#43464A',
  //           inputValidator: (value) => {
  //             return !value && 'You need to write something!'
  //           }
  //         })
  //       }
  //     })
  //   } else {
  //     Swal.fire({  
  //       title: 'Question', 
  //       icon: 'warning',
  //       text: 'Please enter your first/middle/last name and your village',
  //       showCancelButton: true,
  //       confirmButtonColor: '#301896',
  //       cancelButtonColor: '#43464A',
  //       confirmButtonText: 'Ok'  
  //     })
  //   }
  // }
  return (
    <div className=''>
      <Navbar />
      <div className="px-4 sm:px-8 md:px-24 lg:px-48 relative py-4">
        <SideBar checked={checked} setChecked={setChecked} tabs={sections} />
        <Tabs checked={checked} setChecked={setChecked} tabs={sections} />
        <div className="flex w-full justify-center mb-2">
          <button
            type="button"
            className="w-full h-12 my-2 rounded bg-purplegray-900 uppercase font-semibold text-purplegray-100 text-lg hover:shadow-purplegray-600/1.7 hover:shadow-xl"
            onClick={() => submitForm()}
          >
            {(loadingNew || loadingExisting || loadingUpdate) ? <VscLoading className='w-6 h-6 animate-spin mx-auto' /> : <h1>{(type!=='new' && type!=='existing') ? (data ? 'Update & Verify form' : 'Update form') : 'Submit Form'}</h1>}
          </button>
        </div>
        {/* <div className={`${(type === 'new' || type === 'existing') && 'hidden'} w-full flex items-center border-2 border-purple-500 rounded p-4`}>
          <button className='bg-purplegray-900 text-purplegray-100 px-4 py-2 rounded mr-2' onClick={() => modal()}>
            Open
          </button>
          <h1 className='text-purplezinc'>Open modal</h1>
        </div> */}
        {
          checked === 'Family Details' ?
          <FamilyForm sections={sections[checked]} data={fields[32]} /> :
          checked === 'Other' ? 
          <OtherForm sections={sections[checked]} /> :
          sections[checked].map(field => <FieldSelector aadhar={aadhar} setAadhar={setAadhar} folder={folder} setFolder={setFolder} data={fields[field]} index={field} />)
        }
      </div>
    </div>
  )
}

export default Form