import React, { useEffect, useState } from 'react';
import { DataTable } from './DataTable';
import { ScanData } from './../types';


interface FetchDataComponentProps {
  endpoint: string;
  columns: { key: string, label: string }[];
  title: string;
  url?: string;
  children?: React.ReactNode;
}

const FetchDataComponent: React.FC<FetchDataComponentProps> = ({ endpoint, columns, title, url='', children }) => {
  const [data, setData] = useState<ScanData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const baseULR = import.meta.env.VITE_API_BASE_URL as string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = url ? url : `${baseULR}${endpoint}`;
        console.log(`Fetching data from: ${apiUrl}`);
        
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const jsonData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

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
            Make sure your API server is running at http://localhost:3000
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-2">
      <div className="w- mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">{title} ({data.length})</h1>
        {children}
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default FetchDataComponent;
