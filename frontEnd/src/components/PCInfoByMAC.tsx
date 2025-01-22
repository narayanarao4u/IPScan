import React, { useEffect, useState } from 'react'

interface Data {
  _id: string;
  empname: string;
  hrmsno: string;
  phone: string;
  locationtxt: string;
  prnMake: string;
  prnModel: string;
  prnSerialNo: string;
  MACAddress: string;
  IPv4Address: string;
  Hostname: string;
  SystemName: string;
  SystemManufacturer: string;
  SystemModel: string;
  SystemUserName: string;
  ProcessorName: string;
  RAM_GB: number;
  SerialNumber: string;
  Manufacturer: string;
  OS_Name: string;
  OS_Version: string;
  PCid: number;
  createdAt: string; // Date format might need adjustment based on your needs
  updatedAt: string; // Date format might need adjustment based on your needs
  __v: number;
  desgn: string; 
}

interface PCInfoByMACProps {
  MAC: string;
}

function PCInfoByMAC({ MAC }: PCInfoByMACProps) {
  const [data, setData] = useState<Data[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
  
    const baseULR = `http://10.34.130.254:3005/api-pcinfo/data?mac=`;
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          let url = baseULR + MAC.toUpperCase();;
          const response = await fetch(url);
          console.log(url);
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const jsonData = await response.json();
          console.log(jsonData.data);
          
          setData(jsonData.data);
          setError(null);
          setLoading(false);
          
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, [MAC]);
  
    if (loading) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading data...</p>
          </div>
        </div>
      );
    }
  
    if (error) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center text-red-600">
            <p>Error: {error}</p>
            <p className="mt-2 text-sm text-gray-500">
              Make sure your API server is running at http://10.34.130.254:3005
            </p>
          </div>
        </div>
      );
    }

  return (
    <>
    <div>
      PCInfoByMAC
    </div>
    <pre>
      {JSON.stringify(data, null, 2)}
    </pre>
    </>
    
  )
}

export default PCInfoByMAC