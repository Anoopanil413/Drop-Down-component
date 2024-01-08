import React, { useEffect, useState } from 'react'
import { useTable } from 'react-table';
import{getMetaData,getTableData} from '../../services/apiCall'
import './dropdown.css'


export default function DynamicDropDown() {

    const [selectedTable, setSelectedTable] = useState('');
    const [data, setData] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [error, setError] = useState(null);

  
    useEffect(() => {
      getMetaData()
        .then((tables) => {
          console.log(tables)
          setMetadata(tables);
        })
        .catch((error) => {
          console.error('Error fetching metadata', error);
          setError('Error fetching metadata');

        });
    }, []);
  
    useEffect(() => {
      if (selectedTable) {
        getTableData(selectedTable)
          .then((tableData) => {
            console.log(tableData)
            setData(tableData);
          })
          .catch((error) => {
            console.error(`Error fetching data for table ${selectedTable}`, error);
            setError(`Error fetching data for table ${selectedTable}`);

          });
      }
    }, [selectedTable]);
  
    const handleTableChange = (event) => {
      setSelectedTable(event.target.value);
    };
  
    const columns = React.useMemo(
      () => [
        {
          Header: 'ID',
          accessor: 'id',
        },
        {
          Header: 'Name',
          accessor: 'name',
        }
         ],
      []
    );
  
    const tableInstance = useTable({ columns, data });


  return (
    <>
   <div className='container'>
      <label htmlFor="table-select">Select a table:</label>
      <select id="table-select" value={selectedTable} onChange={handleTableChange}>
        <option value="">--Please choose a table--</option>
        {metadata.map((table) => (
          <option key={table.name} value={table.name}>
            {table.name}
          </option>
        ))}
      </select>
      {error ? (
        <p>{error}</p>
      ) : data.length > 0 ? (
        <table {...tableInstance.getTableProps()}>
          <thead>
            {tableInstance.headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...tableInstance.getTableBodyProps()}>
            {tableInstance.rows.map((row) => {
              tableInstance.prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        <p>Please select a table to view data.</p>
      )}
    </div>

    </>
  )
}
