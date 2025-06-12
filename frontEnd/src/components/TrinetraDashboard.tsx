import React from 'react';
import FetchDataComponent from './FetchDataComponent';

const columns = [
  { key: 'empname', label: 'Employee Name' },
  { key: 'phone', label: 'Phone' },
  {
    key: 'MACAddress',
    label: 'MAC Address',
    render: (mac: string) => (
      <a
        href={`http://10.34.130.254:81/printPcinfo?mac=${encodeURIComponent(mac)}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: '#2563eb', textDecoration: 'underline', cursor: 'pointer' }}
      >
        {mac}
      </a>
    ),
  },
  { key: 'IPv4Address', label: 'IPv4 Address' },
  { key: 'Hostname', label: 'Hostname' },
  { key: 'locationtxt', label: 'Location' },
  { key: 'Trinetra', label: 'Trinetra' },
  { key: 'OS_Name', label: 'OS' },
];

export default function TrinetraDashboard() {
  return (
    <FetchDataComponent
      endpoint=""
      url="http://10.34.130.254:3005/api-pcinfo/trinetra"
      columns={columns}
      title="Trinetra Dashboard"
    >
      
    </FetchDataComponent>
  );
}