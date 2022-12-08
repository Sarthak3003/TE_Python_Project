import { useState } from 'react'
import { getFilteredAdminApplications } from '../../app/apis'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify';


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
const Filter = () => {
    const [states, setStates] = useState({ ...state })
    const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(false)
    const searchData = async () => {
        try{
        setLoading(true)
        const data = await getFilteredAdminApplications(states)
        console.log(JSON.parse(data).data)
        setSearch(JSON.parse(data).data)
        setLoading(false)
        }
        catch {
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

    return (
        <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Filters
                </h1>
            </div>
            <div className='flex flex-wrap justify-center '>
                {filterFormField.map((data, key) => (
                    <div className='flex flex-col p-2 border border-gray-600 rounded  m-2 w-1/3 '>
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
                search.length === 0 ? 
                <div className='grid h-screen place-items-center'>
                    <h1 className='text-2xl font-bold border text-purple-800  border-purple-300 px-10 py-2 rounded-lg  bg-purple-200'>NO RESULTS FOUND</h1>
                </div> :
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
                                    <Link to={`/form/${data.ApplicationID}`} state={{ "userinfo": data }} className='bg-green-600 mr-3 p-2 rounded-lg text-white text-center'>
                                        UPDATE
                                    </Link>
                                    <Link to={`/info/${data.ApplicationID}`} state={{ "userinfo": data }} className='bg-purple-900 p-2 rounded-lg text-white text-center'>
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

export default Filter