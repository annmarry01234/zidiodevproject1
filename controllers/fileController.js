const File = require('../models/File');
const User = require('../models/User');
const { parseExcelFile } = require('../utils/excelParser');

exports.uploadAndParseExcel = async (req, res) => {
  try {
    const filePath = req.file.path;
    const userId = req.user.id;

    console.log('✅ Saving file for user:', userId);
    console.log('📄 File name:', req.file.filename);

    const parsedData = parseExcelFile(filePath);

    const newFile = new File({
      fileName: req.file.filename,
      userId: userId
    });

    const savedFile = await newFile.save();

    await User.findByIdAndUpdate(userId, {
      $push: { uploadHistory: savedFile._id }
    });

    res.status(200).json({
      message: 'File uploaded and parsed successfully',
      fileId: savedFile._id,
      data: parsedData
    });
  } catch (err) {
    console.error('❌ Upload error:', err);
    res.status(500).json({ error: 'Failed to parse and save Excel file' });
  }
};

exports.getUserFileHistory = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log('📜 Fetching files for user:', userId);
    const files = await File.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(files);
  } catch (err) {
    console.error('❌ History fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch file history' });
  }
};
