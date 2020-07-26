export const getCovidData = async () => {
  const proxy = 'https://cors-anywhere.herokuapp.com/'
  const endPoint = 'http://univo.co.il/covid-may-jul.json'
  const res = await fetch(proxy + endPoint)//fetch request via proxy, to bypass CORS incompatibility on the client without server setup
  const data = await res.json()
  return data;
}

export const getTopTenCases = (data) => {
  return data
    .filter(el=>el.date==="2020-07-01")
    .sort((a,b)=>b.confirmed_cases-a.confirmed_cases)
    .slice(0,10)
    .map(el=>{
      return {
          ...el,
          country:el.countries_and_territories.split('_').join(' '),
          confirmed_cases:Number(el.confirmed_cases), //used for chart, thousands separator added later
          confirmed_cases_formatted:Number(el.confirmed_cases).toLocaleString('en') //used for table, thousands separator added here
      }
    })
}

export const getIncreaseRates = (data, isStable) => {
  let starterRecord
  return data.filter(el=>el.date==="2020-05-01" || el.date==="2020-07-01").reduce((acc,curr,idx,arr)=>{
      if(curr.date==="2020-07-01"){
          if(arr[idx-1].date!=="2020-05-01"){//there are two countries, Lesotho and Comoros, that their earliest record is not "2020-05-01"
              starterRecord=data.find(item=>item.countries_and_territories===curr.countries_and_territories)//find earliest record for the above countries
          }else{
              starterRecord=arr[idx-1]
          }
        acc.push(
          {
            country:curr.countries_and_territories.split('_').join(' '),
            geo_id:curr.geo_id,
            increaseRate:(Math.round((curr.confirmed_cases/starterRecord.confirmed_cases) * 100) / 100).toFixed(2),//round to 2 decimals
            max:Number(curr.confirmed_cases).toLocaleString('en'),
            min:starterRecord.confirmed_cases
          }
        )
      }
      return acc
    },[]).sort((a,b)=>isStable?a.increaseRate-b.increaseRate:b.increaseRate-a.increaseRate).slice(0,10)

}

export const getCountryData = (data, id) => {
  const countryData = data
    .filter(el=>el.geo_id===id)
    .map(el=>{
      return{
        ...el,
        confirmed_cases_formatted:Number(el.confirmed_cases).toLocaleString('en'),
        country:el.countries_and_territories.split('_').join(' ')
      }
    })
    return countryData;
}

export const getChartMargin = () => {
  return {top: 10, right: 30, left: 15, bottom: 0}
}
