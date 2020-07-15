import React, {useState,useEffect} from 'react'
import {AreaChart, Area,  XAxis, YAxis, CartesianGrid, Tooltip} from 'recharts';
import {getCovidData, getIncreaseRates, getChartMargin} from '../utils/functions'
import DataVisualization from './includes/DataVisualization';
import tableColumnsOptions from '../utils/tableColumnsOptions'

const MostStable = () => {
  const [data, setData] = useState([])
  const [topTenCases, setTopTenCases] =useState([])
  
  useEffect(()=>{
    getCovidData().then((data) => {
        setData(data);
    });
  }, []);

  useEffect(()=>{
      if (!topTenCases.length && data.length) {
          const newTopTen = getIncreaseRates(data, true);
          setTopTenCases(newTopTen);
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
      columns={tableColumnsOptions('mostStable')} 
      title={'Most stable countries'}
      keyField={'geo_id'}
    >
      <AreaChart data={topTenCases} margin={getChartMargin()}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={'geo_id'} />
        <YAxis domain={[0, 2]}/>
        <Tooltip />
        <Area type="monotone" dataKey="increaseRate" stroke="#8884d8" fill="#2d7bbd" name="Increase rate" />
      </AreaChart>
    </DataVisualization>
  )
}

export default MostStable