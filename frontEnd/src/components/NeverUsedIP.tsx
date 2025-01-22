import FetchDataComponent from './FetchDataComponent';

function NeverUsedIP() {
    const columns = [   
        
        { key: "IP_Address", label: "IP" },
        // Add more columns based on your API response structure
      ];
    
      return (
        <FetchDataComponent
          endpoint="/api/scan/ipNeverUsed"
          columns={columns}
          title="IP Never Used"
        />
      );
    }

export default NeverUsedIP