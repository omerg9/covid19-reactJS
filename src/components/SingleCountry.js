import React, { useEffect, useState } from 'react'
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { getChartMargin, getCountryData, getCovidData } from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsOptions from '../utils/tableColumnsOptions'

const SingleCountry = (props) => {
  const [data, setData] = useState([])
  const [countryData, setCountryData] = useState([])
  const [chartMax, setChartMax] = useState(0)

    useEffect(()=>{
        getCovidData().then((data) => {
            setData(data);
        });
    }, []);

    useEffect(()=>{
        if (!countryData.length && data.length) {
            const newCountryData = getCountryData(data, props.match.params.id);
            setCountryData(newCountryData);
        }
    }, [data, props.match.params.id, countryData.length])

    useEffect(()=>{
        if (!chartMax.length) {
            const lastDateRecord = countryData.find(el => el.date === "2020-07-01")
            if (lastDateRecord) {
                setChartMax(lastDateRecord.confirmed_cases)
            }
        }
    }, [countryData, chartMax.length]);

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
      keyField={'date'}
    >
      <LineChart data={countryData} margin={getChartMargin()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day"/>
        <YAxis tickFormatter={tick => tick.toLocaleString()} domain={[0, `dataMax + ${chartMax}`]} />
        <Tooltip formatter={(value) => new Intl.NumberFormat('en').format(value)}/>
        <Legend />
        <Line type="monotone" dataKey="confirmed_cases" fill="#2d7bbd" activeDot={{ r: 8 }}  name="Confirmed cases"/>
      </LineChart>
    </DataVisualization>
  )
}

export default SingleCountry