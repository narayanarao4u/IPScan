import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Info } from "lucide-react";
import styled from "styled-components";

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
  const [isOpen, setIsOpen] = useState(false);

  const baseULR = `http://10.34.130.254:3005/api-pcinfo/data?mac=`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = baseULR + MAC.toUpperCase();
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData.data);
        setError(null);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
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
      <div className="grid grid-cols-3">
          <strong className="font-bold text-gray-900">
            {MAC}
          </strong>
          
          <span>{data[0]?.empname}</span>
          <button onClick={() => setIsOpen(true)} className="text-red-500 inline-block align-middle">
              <Info />
          </button>
      </div> 
      

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <DIV>
          {/*  */}

          <div>HR NO:</div> <div>{data[0]?.hrmsno}</div>
          <div>Emp Name:</div> <div>{data[0]?.empname?.toUpperCase()}</div>
          <div>Location:</div> <div>{data[0]?.locationtxt}</div>
          <div>Phone:</div> <div>{data[0]?.phone}</div>
          
          <div>Hostname:</div> <div>{data[0]?.Hostname}</div>
          <div>IPv4Address:</div> <div>{data[0]?.IPv4Address}</div>
          <div>MACAddress:</div> <div>{data[0]?.MACAddress}</div>
          <div>Manufacturer:</div> <div>{data[0]?.Manufacturer}</div>
          <div>OS_Name:</div> <div>{data[0]?.OS_Name}</div>
          <div>OS_Version:</div> <div>{data[0]?.OS_Version}</div>
          <div>PC ID:</div> <div>{data[0]?.PCid}</div>
          <div>Processor:</div> <div>{data[0]?.ProcessorName}</div>
          <div>RAM_GB:</div> <div>{Math.ceil(data[0]?.RAM_GB)} GB</div>
          <div>SerialNumber:</div> <div>{data[0]?.SerialNumber}</div>
          <div>SystemManufacturer:</div>{" "}
          <div>{data[0]?.SystemManufacturer}</div>
          <div>SystemModel:</div> <div>{data[0]?.SystemModel}</div>
          <div>SystemName:</div> <div>{data[0]?.SystemName}</div>
          <div>SystemUserName:</div> <div>{data[0]?.SystemUserName}</div>
          
          <div>Printer Make:</div> <div>{data[0]?.prnMake}</div>
          <div>Printer Model:</div> <div>{data[0]?.prnModel}</div>
          <div>SerialNo:</div> <div>{data[0]?.prnSerialNo}</div>
          <div>createdAt:</div> <div>{data[0]?.createdAt}</div>
          <div>updatedAt:</div> <div>{data[0]?.updatedAt}</div>
          {/*  */}
        </DIV>
      </Modal>
    </>
  );
}

const DIV = styled.div`
  border: 3px solid #ccc;
  padding: 1rem;
  border-radius: 0.5rem;
  
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  div {    
    border-bottom: 1px solid #ccc;
  }
  `

export default PCInfoByMAC;
