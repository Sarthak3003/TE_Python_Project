import React from 'react'
import Navbar from '../components/Navbar'
const Landing = () => {
    return (
        <>
            <Navbar />
            {/* 
            <div className='w-full h-screen bg-gradient-to-r from-violet-500 to-fuchsia-500'>
                <img src="https://mdbootstrap.com/img/new/slides/041.jpg" className="w-full" alt="..." />

                <div class="h-1/2">
                    <div className='w-full flex flex-row justify-center items-center  md:flex-row sm:flex-col xs:flex-col'>

                        <div class="flex justify-center items-center w-1/2 h-screen">
                            <div class="block p-10 rounded-lg shadow-lg bg-white m-2">
                                <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Card title</h5>
                                <p class="text-gray-700 text-base mb-4">
                                    Some quick example text to build on the card title and make up the bulk of the card's
                                    content.
                                </p>
                                <button type="button" class=" inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Click Here</button>
                            </div>
                        </div>

                        <div class="flex justify-center w-1/2">
                            <div class="block p-10 rounded-lg shadow-lg bg-white m-2">
                                <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Card title</h5>
                                <p class="text-gray-700 text-base mb-4">
                                    Some quick example text to build on the card title and make up the bulk of the card's
                                    content.
                                </p>
                                <button type="button" class=" inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Click Here</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}

            <div className="flex justify-center items-center">
                <div className=" h-screen border bg-gradient-to-r from-purple-500 to-fuchsia-500 border-gray-600">
                    <div class="flex justify-center w-1/2">
                        <div class="block p-10 rounded-lg shadow-lg bg-white m-2">
                            <h5 class="text-gray-900 text-xl leading-tight font-medium mb-2">Card title</h5>
                            <p class="text-gray-700 text-base mb-4">
                                Some quick example text to build on the card title and make up the bulk of the card's
                                content.
                            </p>
                            <button type="button" class=" inline-block px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Click Here</button>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 h-screen border border-gray-600">1</div>
            </div>

        </>
    )
}

export default Landing