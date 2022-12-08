import React, { useState, useEffect } from 'react'
import { getDeclinedApplicantions } from '../../app/apis'
import DataMap from './DataMap'
import Paginate from '../../components/Paginate'
import Loader from '../../components/Loader'
import {  toast } from 'react-toastify';


const BlankVerification = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);

    const getData = async (page) => {
        try {
            const d = await getDeclinedApplicantions(page)
            setLoading(true);
            setData(d.data)
            setLastPage(d.last_page)
            setLoading(false);
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
    const handleChange = (event, value) => {
        setCurrentPage(value);
    };

    useEffect(() => {
        getData(currentPage);
    }, [currentPage])

    console.log(data)
    return (
        <> {loading ?
            <Loader />
            :
            <>
                <div className=' w-full flex justify-between'>
                    <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                        Declined Applications
                    </h1>
                </div>
                {data.length === 0 ?
                    
                    <div className='grid h-screen place-items-center'>
                        <h1 className='text-2xl font-bold border text-purple-800  border-purple-300 px-10 py-2 rounded-lg  bg-purple-200'>NO RESULTS FOUND</h1>
                    </div>
                :
                <>
                    <Paginate count={lastPage} currentPage={currentPage} handleChange={handleChange} />
                    <DataMap data={data} />
                    <Paginate count={lastPage} currentPage={currentPage} handleChange={handleChange} />
                </>
            }
            </>
        }
        </>
    )
}

export default BlankVerification