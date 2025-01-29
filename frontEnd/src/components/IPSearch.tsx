import FetchDataComponent from './FetchDataComponent';
import PCInfoByMAC from './PCInfoByMAC';

function IPSearch() {
  const columns = [
    // { key: 'id', label: 'ID' },
    { key: 'IP_Address', label: 'IP' },
    { key: 'Physical_Address', label: 'MAC',
       render: (value: any) => (
       <PCInfoByMAC MAC={value} />
      ) },
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