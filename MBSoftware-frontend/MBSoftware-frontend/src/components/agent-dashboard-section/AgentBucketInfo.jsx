import { data } from 'autoprefixer';
import React,{useState} from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import {agentVerification } from '../../app/apis'

const AgentBucketInfo = () => {
  const navigate = useNavigate()
  const location = useLocation();
  const { bucketinfo } = location.state;
  const [family,setFamily] = useState(bucketinfo.FamilyDetails.members)
  const [verify,setVerify] =useState([])
  const [classname,setClassname] = useState(`w-full p-2 border border-purple-500`)
  const [reject,setReject] =useState([])
  const [check,setCheck]=useState(false)

  const agentVerify = async () => {
      if(verify.length === 0){
        setCheck(true)
        setClassname(`w-full p-2 border border-red-600`)
        console.log('object');
      }
      else{
        const response = await agentVerification({"app_id" : `${verify}`})
        console.log(response)
      }
    
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col w-auto my-10">
        <div className='flex justify-between bg-purple-600 text-white w-1/2 items-center m-1 p-3'>
          <div className='flex flex-row items-center justify-between w-full px-2'>
            <a href={bucketinfo.PhotoS3} target="_blank">
              <img src={bucketinfo.PhotoS3} alt="no image" className='h-[50px] w-[50px] rounded-full'
              />
            </a>
            <a href={bucketinfo.AadharS3} target="_blank"> <button className='ml-3 bg-white text-purple-900 px-4 py-1 rounded-lg'>
              Aadhaar/PAN
            </button>
            </a>
          </div>
        </div>
        <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          <span>First Name : {bucketinfo.FirstName}</span>
          <span>Middle Name : {bucketinfo.MiddleName}</span>
          <span>Last Name : {bucketinfo.LastName}</span>
        </div>

        <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
          <span>Gender : {bucketinfo.Gender}</span>
          <span>Email ID : {bucketinfo.Email}</span>
          <span>Occupation : {bucketinfo.Occupation}</span>
        </div>
        <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          {/* <span>Member ID : {bucketinfo.MemberID === null ? "NA" : bucketinfo.MemberID}</span> */}
          {/* <span>Application ID : {bucketinfo.ApplicationID}</span> */}
          <span>Aadhaar Number: {bucketinfo.AadharNumber}</span>
        </div>
        <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
          <span>Mobile : {bucketinfo.Mobile}</span>
          <span>DOB : {bucketinfo.DateOfBirth}</span>
          <span>Education Qualification : {bucketinfo.EducationQualification}</span>
          
        </div>
        <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          <span>Address: {bucketinfo.Address}</span>
        </div>
        <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
          <span>PinCode : {bucketinfo.Pincode}</span>
          <span>Native Village : {bucketinfo.NativeVillage}</span>
        </div>
        <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          <span>Blood Group: {bucketinfo.BloodGroups}</span>
          <span>Marital Status: {bucketinfo.MaritalStatus}</span>
        </div>
        <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
          <span>Area : {bucketinfo.Area}</span>
          <span>City : {bucketinfo.City}</span>
          <span>State: {bucketinfo.State}</span>
        </div>
        <div className='flex flex-col bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          <div className='flex justify-between items-center w-full'>
            <h1 className='font-semibold text-xl'>Family Details</h1>
            <h3 className='font-semibold text-mb'>
              Members: {bucketinfo.FamilyDetails.number ? bucketinfo.FamilyDetails.number : "NA"}
            </h3>
          </div>

          {family?.map((data,key)=>(
              <div className='flex justify-between items-center w-full'>
                <p>Name : {data.FamilyMemberName}</p>
                <p>Relation : {data.Relation}</p>
                <p>DOB : {data.RelativeDateOfBirth}</p>
                
              </div>
            ))}
          
        </div>
        <div className='w-1/2 flex justify-center items-center'>
        {/* <button className='w-1/2 my-2 mx-1 bg-purple-900 p-2 items-center text-white'>
            <Link to={`/form/${bucketinfo.MemberID}`} state={{ "userinfo": bucketinfo }} >
              Update
            </Link>

          </button>
          {bucketinfo.Paid ? null : 
            <button className='w-1/2 my-2 mx-1 bg-blue-600 p-2 text-white'>
           Send Payment Link
          </button>
          } */}
          </div>    
        {bucketinfo.Verified ? null : <div className='flex w-1/2 flex-col justify-center items-center mt-3'>
          <div className='flex w-full'>
          <div className='w-5/6'>
              <input type="text" className={classname} 
              onChange={e => setReject(e.target.value)}
              placeholder='Reason' />
              {check ? <span className='text-red-600'>This field is required</span> : null}
            </div>
            <div className='w-1/6'>
              <button className='p-2 bg-red-600 w-full text-white'>Reject</button>
            </div>
          </div>
          <div className='flex w-full mt-2'>
            <div className='w-5/6'>
              <input type="text" className={classname} 
              onChange={e => setVerify(e.target.value)}
              placeholder='Enter Application ID' />
              {check ? <span className='text-red-600'>This field is required</span> : null}
            </div>
            <div className='w-1/6'>
              <button className='p-2 bg-green-600 w-full text-white' onClick={()=>agentVerify()}>Verify</button>
            </div>
          </div>
        </div>}
      </div>

    </>
  )
}

export default AgentBucketInfo