const ChartHistory = require('../models/ChartHistory');
const Chart = require('chart.js');
const File = require('../models/File');

// Save chart history
exports.saveChartHistory = async (req, res) => {
    try {
        const { chartType, xAxis, yAxis, fileName, chartImage } = req.body;
        const userId = req.user.id;

        const newChart = new ChartHistory({
            userId,
            chartType,
            xAxis,
            yAxis,
            fileName,
            chartImage, // Save the generated chart image in history
        });

        await newChart.save();
        res.status(201).json({ message: 'Chart history saved' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save chart history' });
    }
};

// Fetch chart history for logged-in user
exports.getChartHistory = async (req, res) => {
    try {
        const userId = req.user.id;
        const history = await ChartHistory.find({ userId }).sort({ createdAt: -1 });
        res.json(history);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch chart history' });
    }
};

// Generate chart and save history
exports.generateChart = async (req, res) => {
    const { fileId, xAxis, yAxis, chartType } = req.body;

    try {
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'File not found' });
        }

        const data = parseExcelData(file.data); // Assume parseExcelData is a function that extracts data from the Excel file

        const chartData = {
            labels: data.map(item => item[xAxis]),
            datasets: [{
                label: chartType,
                data: data.map(item => item[yAxis]),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }]
        };

        const chartConfig = {
            type: chartType,
            data: chartData,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        };

        const chart = new Chart(chartConfig);
        const chartImage = chart.toBase64Image(); // Generate chart image

        // Save the chart history with the chart image
        await saveChartHistory({
            chartType,
            xAxis,
            yAxis,
            fileName: file.name,
            chartImage
        });

        res.status(200).json({ chartImage });
    } catch (error) {
        res.status(500).json({ message: 'Error generating chart', error });
    }
};
