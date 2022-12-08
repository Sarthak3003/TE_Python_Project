import { Link } from 'react-router-dom'
import React from 'react'

const Tile = ({ data }) => {
    return (
        <div className='flex justify-between items-center bg-purple-200 p-4 rounded-lg my-3 border border-purple-300 rounded-lg'>

            <h1>Name: {data.FirstName + ' ' + data.MiddleName + ' ' + data.LastName}</h1>
            <h1>City: {data.City === "" ? "NA" : data.City}</h1>
            <h1>Pin Code: {data.Pincode === "" ? "NA" : data.Pincode}</h1>
            <h1> Village: {data.NativeVillage === "" ? "NA" : data.NativeVillage} </h1>
            <div>
                <Link to={`/bucket/info/${data.AadharNumber}`} state={{ "bucketinfo": data }} className='bg-purple-900 p-2 rounded-lg text-white text-center'>
                    INFO
                </Link>
            </div>
        </div>
    )
}

export default Tile