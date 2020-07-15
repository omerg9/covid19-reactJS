import React, {useState, useEffect} from 'react'
import {LineChart, Line, Tooltip, Legend,
  XAxis, YAxis, CartesianGrid} from 'recharts';
import {getCovidData, getCountryData, getChartMargin} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsOptions from '../utils/tableColumnsOptions'

const SingleCountry = (props) => {
  const [data, setData] = useState([])
  const [countryData, setCountryData] = useState([])
  const [chartMax, setChartMax] = useState([])

  useEffect(() => {
        if(data.length===0){
          getCovidData(setData)
        }
        if(countryData.length===0){
          getCountryData(data, props.match.params.id, setCountryData)
        }
        const lastDateRecord = countryData.find(el=>el.date==='2020-07-01')
        if(lastDateRecord && !chartMax){
          setChartMax(lastDateRecord.confirmed_cases)
        }

  },[data, countryData, props.match.params.id, chartMax])

  const defaultSorted = [{
    dataField: 'date',
    order: 'asc'
  }]

  console.log(chartMax)

  return(
    <DataVisualization 
      topTenCases={countryData} 
      defaultSorted={defaultSorted} 
      columns={tableColumnsOptions('singleCountry')} 
      title={`Confirmed cases in ${props.match.params.countryName}`}
      keyField={'date'}
    >
      <LineChart data={countryData} margin={getChartMargin()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day"/>
        <YAxis tickFormatter={tick => tick.toLocaleString()} domain={[0,'dataMax+20']}/>
        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
        <Legend />
        <Line type="monotone" dataKey="confirmed_cases" fill="#2d7bbd" activeDot={{ r: 8 }}  name="Confirmed cases"/>
      </LineChart>
    </DataVisualization>
  )
}

export default SingleCountry