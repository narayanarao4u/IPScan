import FetchDataComponent from './FetchDataComponent';



function DateTime() {
  const columns = [
    // { key: 'id', label: 'ID' },
    { key: 'Date', label: 'Date' },
    { key: 'Time', label: 'Time' },
    { key: 'PCs', label: 'PCs' },
    // Add more columns based on your API response structure
  ];
  return (
    <FetchDataComponent
      endpoint="/api/scan/dateTime"
      columns={columns}
      title="Scan Data"
    />
  );
}

export default DateTime;