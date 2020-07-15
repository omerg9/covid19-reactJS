import React from 'react'
import BootstrapTable from 'react-bootstrap-table-next';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import paginationFactory from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import {ResponsiveContainer} from 'recharts';
import { useHistory } from 'react-router-dom';

export default function DataVisualization({topTenCases, children, defaultSorted, columns, title, keyField}) {
  const history = useHistory();
  const rowEvents = {
    onClick: (e, row, rowIndex) => {
      if(window.location.href.indexOf('country')===-1){
        history.push(`/country/${row.geo_id}/${row.country}`);
      }
    }
  };
  return (
    <>
      <h4 className="subSectionTitle">{title}</h4>
      <section id="topTenSection">
        <div className="subSectionWrapper tableWrapper">
          {
            <BootstrapTable
              bootstrap4
              keyField={keyField}
              data={ topTenCases }
              columns={ columns }
              defaultSorted={ defaultSorted } 
              condensed={true}
              hover={true}
              striped={true}
              rowEvents={rowEvents}
              pagination={ paginationFactory({hideSizePerPage:true}) }
              hideSizePerPage={true}
            />
          }
        </div>
        <div className="subSectionWrapper chartWrapper">
          <ResponsiveContainer height={400}>
          {
              children
          }
          </ResponsiveContainer>
        </div>
      </section>
    </>
  )
}
