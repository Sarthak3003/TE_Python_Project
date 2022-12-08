import { useState } from 'react'
import { getFilteredAgentApplications } from '../../app/apis'
import DataMap from '../dashboard-section/DataMap'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'

const filterFormField = [
    {
        "name": "First Name",
        "id": "FirstName",
        "type": "text",
    },
    {
        "name": "Middle Name",
        "id": "MiddleName",
        "type": "text",
    },
    {
        "name": "Last Name",
        "id": "LastName",
        "type": "text",
    },
    {
        "name": "Area",
        "id": "Area",
        "type": "text",
    },
    {
        "name": "City",
        "id": "City",
        "type": "text",
    },
    {
        "name": "Native Village",
        "id": "NativeVillage",
        "type": "text",
    },
    {
        "name": "Address",
        "id": "Address",
        "type": "text",
    },
    {
        "name": "Pincode",
        "id": "Pincode",
        "type": "number",
    },
    {
        "name": "Mobile",
        "id": "Mobile",
        "type": "number",
    },
]
let state = {}
filterFormField.forEach(field => {
    state[field.id] = ''
})

const AgentFilter = () => {
    const [states, setStates] = useState({ ...state })
    const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(false)
    const searchData = async () => {
        setLoading(true)
        const data = await getFilteredAgentApplications(states)
        console.log(data)
        console.log(JSON.parse(data).data)
        setSearch(JSON.parse(data).data)
        setLoading(false)
    }

    return (
        <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Filters
                </h1>
            </div>


            <div className='flex flex-wrap justify-center '>
                {filterFormField.map((data, key) => (

                    <div className='flex flex-col p-2 border border-gray-600 rounded  m-2  lg:w-1/3 md:w-full sm:w-full'>
                        <h1 className='text-purplegray-900 mb-2'>{data.name}</h1>
                        <input
                            className='bg-purple-200 text-gray-700 appearance-none py-2 px-3 border rounded focus:bg-purple-50 focus:border-gray-400 focus:shadow-outline focus:outline-none'
                            type={data.type}
                            value={states[data.id]}
                            onChange={e => setStates({ ...states, [data.id]: e.target.value })}
                        />
                    </div>
                ))}
            </div>
            <div className="w-full my-3 flex justify-center">
                <button onClick={() => searchData()} className='bg-purple-600 px-7 py-2 text-white rounded-lg w-1/3'>Search</button>
            </div>

            {search && loading ? <Loader /> :
                <>
                    <div className=' w-full flex justify-between mt-2'>
                        <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                            Results
                        </h1>
                    </div>
                    {search.map((data, key) => (
                        <div className='flex justify-between items-center bg-purple-200 p-4 rounded-lg my-3 border border-purple-300 rounded-lg'>
                            <h1>Name: {data.FirstName + ' ' + data.MiddleName + ' ' + data.LastName}</h1>
                            <h1>City: {data.City === "" ? "NA" : data.City}</h1>
                            <h1>Pin Code: {data.Pincode === "" ? "NA" : data.Pincode}</h1>
                            <h1> Village: {data.NativeVillage === "" ? "NA" : data.NativeVillage} </h1>
                            <div>
                                <Link to={`/form/${data.MemberID}`} state={{ "userinfo": data }} className='bg-green-600 mr-3 p-2 rounded-lg text-white text-center'>
                                    UPDATE
                                </Link>
                                <Link to={`/info/${data.MemberID}`} state={{ "userinfo": data }} className='bg-purple-900 p-2 rounded-lg text-white text-center'>
                                    INFO
                                </Link>
                            </div>
                        </div>
                    ))}
                </>

            }

        </>

    )
}

export default AgentFilter