const mongoose = require('mongoose');
const chartHistorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    chartType: { type: String, required: true },
    xAxis: { type: String, required: true },
    yAxis: { type: String, required: true },
    fileName: { type: String },
    createdAt: { type: Date, default: Date.now }
});
module.exports = mongoose.model('ChartHistory', chartHistorySchema);
