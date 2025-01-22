import FetchDataComponent from './FetchDataComponent';

function IPSearch() {
  const columns = [
    // { key: 'id', label: 'ID' },
    { key: 'IP_Address', label: 'IP' },
    { key: 'Physical_Address', label: 'MAC' },
    { key: 'Date', label: 'Date' },
    { key: 'Time', label: 'Time' },
    // Add more columns based on your API response structure
  ];

  return (
    <FetchDataComponent
      endpoint="/api/scan"
      columns={columns}
      title="Scan Data"
    />
  );
}

export default IPSearch;