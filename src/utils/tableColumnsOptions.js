const getSortFunction = (convertNum)=>{
  return convertNum?
    (a, b, order) => {
      let a1 = parseFloat(a.split(',').join(''));
      let b1 = parseFloat(b.split(',').join(''));
      if (order === 'asc') {
        return a1 - b1;
      }
      return b1 - a1; // desc
    }
    :
    (a, b, order) => {
      if (order === 'asc') {
        return a-b;
      }
      return b-a; // desc
    }
}

export default (page) => {
  switch(page){
    case 'topCases':
      return [{
        dataField: 'country',
        text: 'Country',
        sort:true
      }, {
        dataField: 'confirmed_cases_formatted',
        text: 'Confirmed Cases',
        sort:true,
        sortFunc: getSortFunction(true)
      }];
    case 'singleCountry':
      return [{
        dataField: 'date',
        text: 'Date',
        sort:true
      }, {
        dataField: 'confirmed_cases_formatted',
        text: 'Confirmed Cases',
        sort:true,
        sortFunc: getSortFunction(true)
      }];      
    default:
      return [{
          dataField: 'country',
          text: 'Country',
          sort:true
        }, {
          dataField: 'increaseRate',
          text: 'Increase Rate',
          sort:true,
          sortFunc: getSortFunction(false)
        }, {
          dataField: 'min',
          text: 'Minimum cases',
          sort:true,
          sortFunc: getSortFunction(false)
        }, {
          dataField: 'max',
          text: 'Maximum cases',
          sort:true,
          sortFunc: getSortFunction(true)
        }];
    }
}