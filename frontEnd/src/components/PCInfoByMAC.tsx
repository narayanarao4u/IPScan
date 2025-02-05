import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { Info } from "lucide-react";

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
      <strong className="font-bold text-gray-900">
        {MAC}
        <button onClick={() => setIsOpen(true)} className="text-red-500">
          <Info />
        </button>
      </strong>
      <span>{data[0]?.empname}</span>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        {/* <pre>{JSON.stringify(data, null, 2)}</pre> */}
        <div className="grid grid-cols-2 border border-gray-600  rounded-md p-2">
          {/*  */}
          <div>Hostname:</div> <div>{data[0]?.Hostname}</div>
          <div>IPv4Address:</div> <div>{data[0]?.IPv4Address}</div>
          <div>MACAddress:</div> <div>{data[0]?.MACAddress}</div>
          <div>Manufacturer:</div> <div>{data[0]?.Manufacturer}</div>
          <div>OS_Name:</div> <div>{data[0]?.OS_Name}</div>
          <div>OS_Version:</div> <div>{data[0]?.OS_Version}</div>
          <div>PC ID:</div> <div>{data[0]?.PCid}</div>
          <div>Processor:</div> <div>{data[0]?.ProcessorName}</div>
          <div>RAM_GB:</div> <div>{data[0]?.RAM_GB}</div>
          <div>SerialNumber:</div> <div>{data[0]?.SerialNumber}</div>
          <div>SystemManufacturer:</div>{" "}
          <div>{data[0]?.SystemManufacturer}</div>
          <div>SystemModel:</div> <div>{data[0]?.SystemModel}</div>
          <div>SystemName:</div> <div>{data[0]?.SystemName}</div>
          <div>SystemUserName:</div> <div>{data[0]?.SystemUserName}</div>
          <div>empname:</div> <div>{data[0]?.empname}</div>
          <div>hrmsno:</div> <div>{data[0]?.hrmsno}</div>
          <div>locationtxt:</div> <div>{data[0]?.locationtxt}</div>
          <div>phone:</div> <div>{data[0]?.phone}</div>
          <div>prnMake:</div> <div>{data[0]?.prnMake}</div>
          <div>prnModel:</div> <div>{data[0]?.prnModel}</div>
          <div>prnSerialNo:</div> <div>{data[0]?.prnSerialNo}</div>
          <div>createdAt:</div> <div>{data[0]?.createdAt}</div>
          <div>updatedAt:</div> <div>{data[0]?.updatedAt}</div>
          {/*  */}
        </div>
      </Modal>
    </>
  );
}

export default PCInfoByMAC;
