import React, { useState, useEffect } from 'react'
import { getAgentBucket } from '../../app/apis'
import Paginate from '../../components/Paginate'
import DataMap from './DataMap'
import Loader from '../../components/Loader'

const Pending = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState()

    const getData = async (page) => {
        const d = await getAgentBucket(page)
        setLoading(true);
        setData(d.data)
        setLastPage(d.last_page)
        setLoading(false);
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
                        Pending
                    </h1>
                </div>
                <Paginate count={lastPage} currentPage={currentPage} handleChange={handleChange} />
                <DataMap data={data} />
                <Paginate count={lastPage} currentPage={currentPage} handleChange={handleChange} />
            </>
        }
        </>
    )
}

export default Pending