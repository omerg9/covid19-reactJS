import React, {useState,useEffect} from 'react'

import {  AreaChart, Area,  XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer} from 'recharts';
import {getCovidData, getIncreaseRates} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';

import tableColumnsData from '../utils/tableColumnsData'


const MostStable = () => {
  const [data, setData] = useState([])
  const [topTenCases, setTopTenCases] =useState([])
  
  useEffect(() => {
    if(data.length===0){
      getCovidData(setData)
    }
    if(topTenCases.length===0){
      setTopTenCases(getIncreaseRates(data, true))
    }
  })


  const defaultSorted = [{
    dataField: 'increaseRate',
    order: 'desc'
  }]

  return(
    <DataVisualization 
      topTenCases={topTenCases} 
      defaultSorted={defaultSorted} 
      columns={tableColumnsData('mostStable')} 
      title={'Most stable countries'}
      keyField={'geo_id'}
    >
      <ResponsiveContainer maxHeight={500}>
        <AreaChart
          width={500}
          height={400}
          data={topTenCases}
          margin={{
            top: 10, right: 30, left: 0, bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey={'geo_id'} />
          <YAxis  domain={[0, 2]}/>
          <Tooltip />
          <Area type="monotone" dataKey="increaseRate" stroke="#8884d8" fill="#8884d8" name="Increase rate" />
        </AreaChart>
      </ResponsiveContainer>
    </DataVisualization>
  )
}

export default MostStable