import React from 'react'
import Tile from './Tile'

const DataMap = ({data}) => {
  return (
    <>
        {data.map((d, key) => (
            <div key={key} className="">
                <Tile data={d} />
            </div>
        ))}
    </>
  )
}

export default DataMap