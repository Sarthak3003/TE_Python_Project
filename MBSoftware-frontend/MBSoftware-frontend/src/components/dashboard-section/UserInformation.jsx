import React, { useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { adminVerification } from '../../app/apis'
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UserInformation = () => {
  const location = useLocation();
  const { userinfo } = location.state;
  const [family, setFamily] = useState(userinfo.FamilyDetails)
  const [reject, setReject] = useState([])
  const isEmpty = Object.keys(family).length === 0;

  const checkObj  = {
    Area : userinfo.Area,
    City : userinfo.City,
    Phone : userinfo.Phone,
    Email : userinfo.Email,
    NativeVillage : userinfo.NativeVillage,
  }

  const impFieldCheck = Object.values(checkObj).every(x => x === null || x === '');

  console.log(impFieldCheck)
  console.log(userinfo)

  const verify = async () => {
    if(impFieldCheck){
      toast.error('Fields Incomplete', {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
    else{
      try{
        const response = await adminVerification({ "app_id": `${userinfo.ApplicationID}` })
        console.log(response)
        toast.success(' Verified Successfully', {
          position: "top-center",
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
        }
        catch{
          toast.error('Something went Wrong :(', {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
    }
  }

  return (
    <>
      <div className="flex justify-center items-center flex-col w-auto my-10  rounded">
        <div className='flex justify-between bg-purple-600 text-white w-1/2 items-center m-1 p-3'>
          <div className='flex flex-row items-center justify-center'>
            <a href={userinfo.PhotoS3} target="_blank">
              <img src={userinfo.PhotoS3} alt="no image" className='h-[50px] w-[50px] rounded-full'
              />
            </a>
            <a href={userinfo.AadharS3} target="_blank"> <button className='ml-3 bg-white text-purple-900 px-4 py-1 rounded-lg'>
              Aadhaar/PAN
            </button>
            </a>
          </div>

          <div>
            {userinfo.Verified ? <span className='px-3 py-1 bg-green-600 text-white rounded-full mr-3'>Verified</span>
              : <span className='px-3 py-1 bg-red-600 text-white rounded-full mr-3'>Not Verified</span>
            }
            {userinfo.Paid ? <span className='px-3 py-1 bg-green-700 text-white rounded-full mr-3'>Paid</span>
              : <span className='px-3 py-1 bg-red-700 text-white rounded-full mr-3'>Not Paid</span>
            }
            {userinfo.New ? <span className='px-3 py-1 bg-teal-500 text-white rounded-full mr-3'>New</span>
              : <span className='px-3 py-1 bg-amber-800 text-white rounded-full mr-3'>Old</span>
            }
          </div>
        </div>
        <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          <span>First Name : {userinfo.FirstName}</span>
          <span>Middle Name : {userinfo.MiddleName}</span>
          <span>Last Name : {userinfo.LastName}</span>
        </div>

        <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
          <span>Gender : {userinfo.Gender}</span>
          <span>Email ID : {userinfo.Email}</span>
          <span>Occupation : {userinfo.Occupation}</span>
        </div>
        <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          <span>Member ID : {userinfo.MemberID === null ? "NA" : userinfo.MemberID}</span>
          <span>Application ID : {userinfo.ApplicationID}</span>
          <span>Aadhaar Number: {userinfo.AadharNumber}</span>
        </div>
        <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
          <span>Mobile : {userinfo.Mobile}</span>
          <span>DOB : {userinfo.DateOfBirth}</span>
          <span>Education Qualification : {userinfo.EducationQualification}</span>

        </div>
        <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          <span>Address: {userinfo.Address}</span>
        </div>
        <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
          <span>PinCode : {userinfo.Pincode}</span>
          <span>Native Village : {userinfo.NativeVillage}</span>
        </div>
        <div className='flex justify-around bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
          <span>Blood Group: {userinfo.BloodGroups}</span>
          <span>Marital Status: {userinfo.MaritalStatus}</span>
        </div>
        <div className='flex justify-around bg-purple-100 text-purple w-1/2 items-center m-1 p-2'>
          <span>Area : {userinfo.Area}</span>
          <span>City : {userinfo.City}</span>
          <span>State: {userinfo.State}</span>
        </div>
        {isEmpty ? null :
          <div className='flex flex-col bg-purple-600 text-white w-1/2 items-center m-1 p-2'>
            <div className='flex justify-between items-center w-full'>
              <h1 className='font-semibold text-xl'>Family Details</h1>
              <h3 className='font-semibold text-mb'>
                Members: {userinfo.FamilyDetails.length}
              </h3>
            </div>
            {family.map((data, key) => (
              <div className='flex justify-between items-center w-full'>
                <p>Name : {data.FamilyMemberName}</p>
                <p>Relation : {data.Relation}</p>
                <p>DOB : {data.RelativeDateOfBirth}</p>

              </div>
            ))}

          </div>
        }
        <div className='w-1/2 flex justify-center items-center'>
          <button className='w-1/2 my-2 mx-1 bg-purple-900 p-2 items-center text-white'>
            <Link to={`/form/${userinfo.MemberID}`} state={{ "userinfo": userinfo }} >
              Update
            </Link>

          </button>
          {userinfo.Paid ? null :
            <button className='w-1/2 my-2 mx-1 bg-blue-600 p-2 text-white'>
              Send Payment Link
            </button>
          }
          {/* <button className='my-20 mx-3 px-10 py-3 border rounded bg-purple-600 text-white'>
            <Link to={`/form/${id}`} state={{ "userinfo": userinfo }}>
                Update
            </Link>
          </button> */}
        </div>
        {userinfo.Verified ? null : <div className='flex w-1/2 flex-col justify-center items-center mt-3'>
          <div className='flex w-full'>
            <div className='w-5/6'>
              <input type="text" className={reject.length === 0 ? 'w-full p-2 border border-red-600' : 'w-full p-2 border border-purple-200'} placeholder='Reason' onChange={e => setReject(e.target.value)} />
              {reject.length === 0 ? <span className='text-red-600'>This field is required</span> : null}
            </div>
            <div className='w-1/6'>
              <button className='p-2 bg-red-600 w-full text-white'>Reject</button>
            </div>
          </div>
          <button className='w-full bg-green-500 mt-2 text-white p-2 ' 
          onClick={() => verify()}>Verify</button>
        </div>}

      </div>

    </>
  )
}

export default UserInformation