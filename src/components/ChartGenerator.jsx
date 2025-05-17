import React, { useEffect, useState, useRef } from 'react';
import * as XLSX from 'xlsx';
import * as THREE from 'three';
import {
  Chart as ChartJS,
  BarElement,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Title
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  ArcElement,
  PointElement,
  Tooltip,
  Legend,
  Title
);

const ChartGenerator = () => {
  const [chartType, setChartType] = useState('bar');
  const [dimension, setDimension] = useState('2d');
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [chartData, setChartData] = useState(null);
  const [parsedData, setParsedData] = useState([]);
  const [columnOptions, setColumnOptions] = useState([]);
  const containerRef = useRef();

  useEffect(() => {
    if (dimension === '3d' && chartData && containerRef.current) {
      draw3DChart();
    }
  }, [chartData, dimension, chartType]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const wb = XLSX.read(event.target.result, { type: 'binary' });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      if (json.length === 0) {
        alert('The uploaded Excel sheet is empty.');
        return;
      }

      setParsedData(json);
      setColumnOptions(Object.keys(json[0]));
    };
    reader.readAsBinaryString(file);
  };

  const generateChart = () => {
    if (!xAxis || !yAxis) {
      alert('Select both X and Y axes');
      return;
    }

    const labels = parsedData.map((row) => row[xAxis]);
    const dataPoints = parsedData.map((row) => row[yAxis]);

    setChartData({
      labels,
      datasets: [
        {
          label: `${yAxis} by ${xAxis}`,
          data: dataPoints,
          backgroundColor: labels.map((_, i) => `hsl(${(i / labels.length) * 360}, 100%, 60%)`),
          borderColor: '#333',
          borderWidth: 1
        }
      ]
    });
  };

  const draw3DChart = () => {
    if (!chartData || !containerRef.current) return;
    containerRef.current.innerHTML = '';
    const width = containerRef.current.clientWidth;
    const height = 500;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f0f0f0');
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    const data = chartData.datasets[0].data;
    const labels = chartData.labels;
    const colors = labels.map((_, i) => new THREE.Color(`hsl(${(i / labels.length) * 360}, 100%, 50%)`));

    if (chartType === 'bar') {
      data.forEach((val, i) => {
        const barHeight = val / 10;
        const geometry = new THREE.BoxGeometry(1, barHeight, 1);
        const material = new THREE.MeshLambertMaterial({ color: colors[i] });
        const cube = new THREE.Mesh(geometry, material);
        cube.position.set(i * 2 - data.length, barHeight / 2, 0);
        scene.add(cube);
      });
    } else if (chartType === 'line') {
      const points = data.map((val, i) => new THREE.Vector3(i * 2 - data.length, val / 10, 0));
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({ color: 0xff0000 });
      const line = new THREE.Line(geometry, material);
      scene.add(line);
    } else if (chartType === 'pie') {
      const total = data.reduce((sum, val) => sum + val, 0);
      let startAngle = 0;

      data.forEach((val, i) => {
        const angle = (val / total) * Math.PI * 2;
        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, 5, startAngle, startAngle + angle, false);
        shape.lineTo(0, 0);

        const extrudeSettings = { depth: 1, bevelEnabled: false };
        const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        const material = new THREE.MeshLambertMaterial({ color: colors[i] });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.rotation.x = -Math.PI / 2;
        scene.add(mesh);

        startAngle += angle;
      });
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  };

  const renderChart = () => {
    if (dimension === '3d') {
      return <div ref={containerRef} className="w-full h-[500px] border rounded bg-white shadow" />;
    }

    return (
      <div className="w-full">
        {chartType === 'bar' && <Bar data={chartData} />}
        {chartType === 'line' && <Line data={chartData} />}
        {chartType === 'pie' && <Pie data={chartData} />}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 p-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Chart Generator</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block mb-2 text-sm font-medium">Upload Excel File</label>
            <input
              type="file"
              accept=".xlsx, .xls"
              onChange={handleFileUpload}
              className="block w-full border border-gray-300 px-4 py-2 rounded-lg"
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Chart Type</label>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Dimension</label>
            <select
              value={dimension}
              onChange={(e) => setDimension(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option value="2d">2D</option>
              <option value="3d">3D</option>
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">X-Axis</label>
            <select
              value={xAxis}
              onChange={(e) => setXAxis(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option value="">Select X</option>
              {columnOptions.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Y-Axis</label>
            <select
              value={yAxis}
              onChange={(e) => setYAxis(e.target.value)}
              className="w-full border px-4 py-2 rounded-lg"
            >
              <option value="">Select Y</option>
              {columnOptions.map(col => (
                <option key={col} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={generateChart}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold mb-6"
        >
          Generate Chart
        </button>

        <div className="bg-gray-50 p-4 rounded-xl shadow-inner">
          {chartData ? renderChart() : <p className="text-center text-gray-500">No chart data yet</p>}
        </div>
      </div>
    </div>
  );
};

export default ChartGenerator;
