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
        sortFunc: (a, b, order) => {
          let fA = parseFloat(a.split(',').join(''));
          let fB = parseFloat(b.split(',').join(''));
          if (order === 'asc') {
            return fA - fB;
          }
          return fB - fA; // desc
        }
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
        sortFunc: (a, b, order) => {
          let fA = parseFloat(a.split(',').join(''));
          let fB = parseFloat(b.split(',').join(''));
          if (order === 'asc') {
            return fA - fB;
          }
          return fB - fA; // desc
        }
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
          sortFunc: (a, b, order) => {
            if (order === 'asc') {
              return a-b;
            }
            return b-a; // desc
          }
        }, {
          dataField: 'min',
          text: 'Minimum cases',
          sort:true,
          sortFunc: (a, b, order) => {
            if (order === 'asc') {
              return a-b;
            }
            return b-a; // desc
          }
        }, {
          dataField: 'max',
          text: 'Maximum cases',
          sort:true,
          sortFunc: (a, b, order) => {
            let fA = parseFloat(a.split(',').join(''));
            let fB = parseFloat(b.split(',').join(''));
            if (order === 'asc') {
              return fA - fB;
            }
            return fB - fA; // desc
          }
        }];
    }
}