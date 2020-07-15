import React, {useState,useEffect} from 'react'
import {ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {getCovidData, getIncreaseRates, getChartMargin} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsOptions from '../utils/tableColumnsOptions'

const TopIncreaseRate = () => {
  const [data, setData] = useState([])
  const [topTenCases, setTopTen] =useState([])

  useEffect(()=>{
      getCovidData().then((data) => {
          setData(data);
      });
  }, []);

  useEffect(()=>{
      if (!topTenCases.length && data.length) {
          const newTopTen = getIncreaseRates(data, false);
          setTopTen(newTopTen);
      }
  }, [data, topTenCases.length])

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
      <ScatterChart margin={getChartMargin()}>
        <CartesianGrid />
        <XAxis dataKey={'geo_id'} type="category" name='Country'/>
        <YAxis dataKey={'increaseRate'} type="number" name='Increase rate' domain={[0, 1000]}/>
        <Scatter name='A school' data={topTenCases} fill='#2d7bbd'/>
        <Tooltip cursor={{strokeDasharray: '3 3'}}/>
      </ScatterChart>
    </DataVisualization>
  )
}

export default TopIncreaseRate