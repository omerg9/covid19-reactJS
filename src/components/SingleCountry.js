import React, {useState, useEffect} from 'react'
import {LineChart, Line, Tooltip, Legend,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer} from 'recharts';
import {getCovidData, getCountryData, getChartMargin} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsOptions from '../utils/tableColumnsOptions'

const SingleCountry = (props) => {
  const [data, setData] = useState([])
  const [countryData, setCountryData] = useState([])

  useEffect(() => {
    if(data.length===0){
      getCovidData(setData)
    }
    if(countryData.length===0){
      setCountryData(getCountryData(data, props.match.params.id))
    }else{
      console.log(countryData)
    }
  })

  const defaultSorted = [{
    dataField: 'date',
    order: 'asc'
  }]
  
  return(
    <DataVisualization 
      topTenCases={countryData} 
      defaultSorted={defaultSorted} 
      columns={tableColumnsOptions('singleCountry')} 
      title={`Confirmed cases in ${props.match.params.countryName}`}
      keyField={'confirmed_cases_formatted'}
    >
      <ResponsiveContainer>
        <LineChart data={countryData} margin={getChartMargin()}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day"/>
          <YAxis tickFormatter={tick => tick.toLocaleString()} domain={countryData[countryData.length-1] && countryData[countryData.length-1].confirmed_cases?[0, countryData[countryData.length-1].confirmed_cases]:[0, 100000]}/>
          <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
          <Legend />
          <Line type="monotone" dataKey="confirmed_cases" stroke="#8884d8" activeDot={{ r: 8 }}  name="Confirmed cases"/>
        </LineChart>
      </ResponsiveContainer>
    </DataVisualization>
  )
}

export default SingleCountry