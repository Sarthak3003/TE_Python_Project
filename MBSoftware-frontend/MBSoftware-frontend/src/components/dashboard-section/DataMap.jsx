import React from 'react'
import AgentTile from '../AgentTile'

const DataMap = ({data}) => {
  return (
    <>
        {data.map((d, key) => (
            <div key={key} className="">
                <AgentTile data={d} />
            </div>
        ))}
    </>
  )
}

export default DataMap
