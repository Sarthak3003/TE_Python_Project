import React from 'react'

const AgentInfo = () => {
    const agentData = [
        {
            id: 1,
            name: 'Sachin',
            info: 'tp',
            forms_filled: 10,
        },
        {
            id: 2,
            name: 'Patel',
            info: 'tp',
            forms_filled: 12,
        },
        {
            id: 3,
            name: 'Ram',
            info: 'tp',
            forms_filled: 20,
        },

    ]
    return (
        <>
            <div className=' w-full flex justify-between'>
                <h1 className='font-semibold text-lg sm:text-xl py-2 text-center md:text-4xl heading text-purple-600 mb-2'>
                    Agent Information
                </h1>
            </div>
            <div class="flex flex-col">
                <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                        <div class="overflow-hidden">
                            <table class="min-w-full">
                                <thead class="border-b">
                                    <tr className='bg-purple-800 uppercase'>
                                        <th scope="col" class="text-sm font-medium  text-gray-100 px-6 py-4 text-left">
                                            #
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                            Agent Name
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                            Info
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                            Forms Filled
                                        </th>
                                        <th scope="col" class="text-sm font-medium text-gray-100 px-6 py-4 text-left">
                                            Options
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {agentData.map((data, key) => (
                                        <tr key={key} class="border-b">
                                            <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {data.id}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {data.name}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {data.info}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                {data.forms_filled}
                                            </td>
                                            <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                <button className='border rounded bg-purple-500 px-3 py-1 text-white'>Click</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AgentInfo