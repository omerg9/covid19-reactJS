import React, {useState,useEffect} from 'react'

import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer} from 'recharts';
import {getCovidData, getIncreaseRates} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsData from '../utils/tableColumnsData'



const TopIncreaseRate = () => {
  const [data, setData] = useState([])
  const [topTenCases, setTopTen] =useState([])
  
  useEffect(() => {
    if(data.length===0){
      getCovidData(setData)
    }
    if(topTenCases.length===0){
      setTopTen(getIncreaseRates(data, false))
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
      columns={tableColumnsData('increaseRate')} 
      title={'Countries with highest increase rate'}
      keyField={'increaseRate'}
    >
      <ResponsiveContainer maxHeight={500}>
        <ScatterChart width={400} height={400} margin={{top: 20, right: 20, bottom: 20, left: 20}}>
          <CartesianGrid />
          <XAxis dataKey={'geo_id'} type="category" name='Country'/>
          <YAxis dataKey={'increaseRate'} type="number" name='Increase rate' domain={[0, 1000]}/>
          <Scatter name='A school' data={topTenCases} fill='#8884d8'/>
          <Tooltip cursor={{strokeDasharray: '3 3'}}/>
        </ScatterChart>
      </ResponsiveContainer>
    </DataVisualization>
  )
}

export default TopIncreaseRate