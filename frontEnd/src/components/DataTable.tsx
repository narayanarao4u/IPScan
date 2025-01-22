import React, { useState, useEffect } from 'react';
import { Search, SlidersHorizontal } from 'lucide-react';
import { ScanData } from '../types';
import { createPortal } from 'react-dom';
import PCInfoByMAC from './PCInfoByMAC';
import Modal from '../Modal';

interface DataTableProps {
  data: ScanData[];
  columns: { key: string; label: string }[];
}

export function DataTable({ data, columns }: DataTableProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [visibleRows, setVisibleRows] = useState(100);
  const [selectedMAC, setSelectedMAC] = useState<string | null>(null);

  const filteredData = data.filter(item => {
    // Search across all fields
    const matchesSearch = Object.values(item).some(value =>
      String(value).toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Apply column filters
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (key === 'IP_Address' && value.includes('.') && value.split('.').length === 4) {
        return String(item[key]) === value;
      }
      return String(item[key]).toLowerCase().includes(value.toLowerCase());
    });

    return matchesSearch && matchesFilters;
  });

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom = e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight;
    if (bottom) {
      setVisibleRows(prev => Math.min(prev + 100, filteredData.length));
    }
  };

  useEffect(() => {
    setVisibleRows(100);
  }, [searchTerm, filters]);

  const PCInfo = (key: string, data: ScanData) => {
    if (key === 'Physical_Address') {
      setSelectedMAC(data[key]);           
    }
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-4 relative">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      {/* Filters */}
      <div className="mb-4 flex items-center gap-4">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-gray-500" />
          <span className="text-gray-700">Filters:</span>
        </div>
        {columns.map(({ key, label }) => (
          <input
            key={key}
            type="text"
            placeholder={`Filter ${label}...`}
            className="px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={filters[key] || ''}
            onChange={(e) => setFilters(prev => ({
              ...prev,
              [key]: e.target.value
            }))}
          />
        ))}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200" 
          style={{ maxHeight: '500px', overflowY: 'auto' }}
          onScroll={handleScroll}>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {columns.map(({ key, label }) => (
                <th
                  key={key}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.slice(0, visibleRows).map((item, index) => (
              <tr key={item.id || index} className="hover:bg-gray-50">
                {columns.map(({ key }) => (
                  <td key={key} 
                    onClick={() => PCInfo(key, item)}
                    className="px-6 py-1 whitespace-nowrap text-sm text-gray-500"
                  >
                    {String(item[key])}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedMAC && <Modal isOpen={true} onClose={() => setSelectedMAC(null)}>
        <PCInfoByMAC MAC={selectedMAC} />
      </Modal>}
    </div>
  );
}