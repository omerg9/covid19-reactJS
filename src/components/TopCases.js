import React, {useState, useEffect} from 'react'
import {BarChart, Bar, XAxis, YAxis, CartesianGrid} from 'recharts';
import {getCovidData, getTopTenCases, getChartMargin} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsOptions from '../utils/tableColumnsOptions'

const TopCases = () => {
  const [data, setData] = useState([])
  const [topTenCases, setTopTen] =useState([])

  useEffect(()=>{
      getCovidData().then((data) => {
          setData(data);
      });
  }, []);

  useEffect(()=>{
      if (!topTenCases.length && data.length) {
          const newTopTen = getTopTenCases(data);
          setTopTen(newTopTen);
      }
  }, [data, topTenCases.length])

  const defaultSorted = [{
    dataField: 'confirmed_cases_formatted',
    order: 'desc'
  }]

  return(
    <DataVisualization 
      topTenCases={topTenCases} 
      defaultSorted={defaultSorted} 
      columns={tableColumnsOptions('topCases')} 
      title={'Confirmed cases (top countries)'}
      keyField={'confirmed_cases_formatted'}
    >
      <BarChart data={topTenCases} margin={getChartMargin()}>
        <CartesianGrid strokeDasharray="3 3"/>
        <XAxis dataKey="geo_id"/>
        <YAxis type="number" domain={[0, 3000000]} tickFormatter={tick => tick.toLocaleString()}/>
        <Bar dataKey="confirmed_cases" fill="#fa895d" />
      </BarChart>
    </DataVisualization>
  )
}

export default TopCases