import FetchDataComponent from './FetchDataComponent';

function MacIp() {
  const columns = [   
    { key: "Physical_Address", label: "MAC" },
    { key: "IP_Address", label: "IP" },
    // Add more columns based on your API response structure
  ];

  return (
    <FetchDataComponent
      endpoint="/api/scan/macip"
      columns={columns}
      title="MAC-IP Data"
    />
  );
}

export default MacIp;
