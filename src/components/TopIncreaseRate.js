import React, {useState,useEffect} from 'react'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip,  ResponsiveContainer} from 'recharts';
import {getCovidData, getIncreaseRates, getChartMargin} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsOptions from '../utils/tableColumnsOptions'

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
      columns={tableColumnsOptions('increaseRate')} 
      title={'Countries with highest increase rate'}
      keyField={'increaseRate'}
    >
      <ResponsiveContainer>
        <ScatterChart margin={getChartMargin()}>
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