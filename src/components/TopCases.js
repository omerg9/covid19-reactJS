import React, {useState, useEffect} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts';
import {getCovidData, getTopTenCases} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsData from '../utils/tableColumnsData'

const TopCases = () => {
  const [data, setData] = useState([])
  const [topTenCases, setTopTen] =useState([])
  
  useEffect(() => {
    if(data.length===0){
      getCovidData(setData)
    }
    if(topTenCases.length===0){
      setTopTen(getTopTenCases(data))
    }
  })

  const defaultSorted = [{
    dataField: 'confirmed_cases_formatted',
    order: 'desc'
  }]

  return(
    <DataVisualization 
      topTenCases={topTenCases} 
      defaultSorted={defaultSorted} 
      columns={tableColumnsData('topCases')} 
      title={'Confirmed cases (top countries)'}
      keyField={'confirmed_cases_formatted'}
    >
      <ResponsiveContainer maxHeight={500}>
        <BarChart height={800} data={topTenCases}  isAnimationActive={false}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
          <CartesianGrid strokeDasharray="3 3"/>
          <XAxis dataKey="geo_id"/>
          <YAxis type="number" domain={[0, 3000000]} tickFormatter={tick => tick.toLocaleString()}/>
          <Bar dataKey="confirmed_cases" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </DataVisualization>
  )
}

export default TopCases