import React from 'react';

const dummyUploads = [
  { id: '1', name: 'SalesData.xlsx', uploadDate: new Date() },
  { id: '2', name: 'Inventory.xlsx', uploadDate: new Date() }
];

const dummyCharts = [
  {
    chartType: 'Bar',
    xAxis: 'Month',
    yAxis: 'Revenue',
    fileName: 'SalesData.xlsx',
    createdAt: new Date()
  },
  {
    chartType: '3D Column',
    xAxis: 'Product',
    yAxis: 'Quantity',
    fileName: 'Inventory.xlsx',
    createdAt: new Date()
  }
];

const Dashboard = () => {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">User Dashboard</h2>

      <h3 className="text-lg mt-4">Upload History</h3>
      {dummyUploads.length === 0 ? <p>No uploads found.</p> : (
        <ul className="mt-2">
          {dummyUploads.map(file => (
            <li key={file.id} className="border-b py-2">
              <strong>{file.name}</strong> – {file.uploadDate.toLocaleDateString()}
            </li>
          ))}
        </ul>
      )}

      <h3 className="text-lg mt-6">Chart History</h3>
      {dummyCharts.length === 0 ? <p>No chart history found.</p> : (
        <ul className="mt-2">
          {dummyCharts.map((chart, i) => (
            <li key={i} className="border-b py-2">
              <strong>{chart.chartType}</strong> – {chart.fileName} ({chart.xAxis} vs {chart.yAxis})  
              <div className="text-xs text-gray-500">{chart.createdAt.toLocaleString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dashboard;
