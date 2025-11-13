import express from 'express';
import Paper from '../models/Paper.js';
import upload from '../middleware/upload.js';
import mongoose from 'mongoose';
import memoryStorage from '../storage/memoryStorage.js';

const router = express.Router();

// Helper to check if MongoDB is connected
const isMongoConnected = () => mongoose.connection.readyState === 1;

// Helper to get storage (MongoDB or memory)
const getStorage = () => {
  if (isMongoConnected()) {
    return Paper;
  }
  console.log('⚠️ MongoDB not connected, using in-memory storage');
  return memoryStorage;
};

// ==================== UPLOAD PAPER ====================
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    const {
      paperTitle,
      branch,
      studentYear,
      semester,
      semesterType,
      subject,
      examType,
      paperYear,
      academicYear,
      driveUrl,
      facultyId,
      facultyName,
      facultyEmail
    } = req.body;

    // Validation
    if (!paperTitle || !branch || !studentYear || !semester || !semesterType || 
        !subject || !examType || !paperYear || !academicYear || !facultyId || !facultyName) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // At least one of driveUrl or file must be provided
    if (!driveUrl && !req.file) {
      return res.status(400).json({ error: 'Either Google Drive URL or file upload is required' });
    }

    const paperData = {
      paperTitle,
      branch,
      studentYear,
      semester,
      semesterType,
      subject,
      examType,
      paperYear: parseInt(paperYear),
      academicYear,
      driveUrl: driveUrl || null,
      fileUrl: req.file ? req.file.path : null,
      fileName: req.file ? req.file.originalname : null,
      fileSize: req.file ? req.file.size : null,
      facultyId,
      facultyName,
      facultyEmail: facultyEmail || null
    };

    const storage = getStorage();
    const paper = await storage.create(paperData);
    res.status(201).json({ success: true, paper });
  } catch (err) {
    console.error('Upload error:', err);
    res.status(500).json({ error: 'Failed to upload paper', details: err.message });
  }
});

// ==================== GET ALL PAPERS (for students & faculty) ====================
router.get('/', async (req, res) => {
  try {
    const { branch, studentYear, semester, subject, examType, search } = req.query;
    
    const filter = {};
    if (branch) filter.branch = branch;
    if (studentYear) filter.studentYear = studentYear;
    if (semester) filter.semester = semester;
    if (subject) filter.subject = subject;
    if (examType) filter.examType = examType;
    if (search) {
      filter.$text = { $search: search };
    }

    const storage = getStorage();
    let papers;
    
    if (isMongoConnected()) {
      papers = await storage.find(filter)
        .sort({ createdAt: -1 })
        .limit(200);
    } else {
      papers = storage.find(filter).slice(0, 200);
    }
    
    res.json(papers);
  } catch (err) {
    console.error('Get papers error:', err);
    res.status(500).json({ error: 'Failed to fetch papers' });
  }
});

// ==================== GET FACULTY'S PAPERS ====================
router.get('/my-uploads', async (req, res) => {
  try {
    const { facultyId } = req.query;
    
    if (!facultyId) {
      return res.status(400).json({ error: 'Faculty ID is required' });
    }

    const storage = getStorage();
    let papers;
    
    if (isMongoConnected()) {
      papers = await storage.find({ facultyId })
        .sort({ createdAt: -1 });
    } else {
      papers = storage.find({ facultyId });
    }
    
    res.json(papers);
  } catch (err) {
    console.error('Get my papers error:', err);
    res.status(500).json({ error: 'Failed to fetch papers' });
  }
});

// ==================== GET ALL PAPERS (Admin view) ====================
router.get('/all', async (req, res) => {
  try {
    const storage = getStorage();
    let papers;
    
    if (isMongoConnected()) {
      papers = await storage.find()
        .sort({ createdAt: -1 })
        .limit(500);
    } else {
      papers = storage.find().slice(0, 500);
    }
    
    res.json(papers);
  } catch (err) {
    console.error('Get all papers error:', err);
    res.status(500).json({ error: 'Failed to fetch all papers' });
  }
});

// ==================== UPDATE PAPER ====================
router.put('/:id', upload.single('file'), async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    
    // Remove fields that shouldn't be updated
    delete updateData._id;
    delete updateData.createdAt;
    delete updateData.updatedAt;

    // If new file uploaded, update file info
    if (req.file) {
      updateData.fileUrl = req.file.path;
      updateData.fileName = req.file.originalname;
      updateData.fileSize = req.file.size;
    }

    const storage = getStorage();
    const paper = await storage.findByIdAndUpdate(id, updateData);

    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }

    res.json({ success: true, paper });
  } catch (err) {
    console.error('Update error:', err);
    res.status(500).json({ error: 'Failed to update paper', details: err.message });
  }
});

// ==================== DELETE PAPER ====================
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const storage = getStorage();
    const paper = await storage.findByIdAndDelete(id);
    
    if (!paper) {
      return res.status(404).json({ error: 'Paper not found' });
    }

    res.json({ success: true, message: 'Paper deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).json({ error: 'Failed to delete paper' });
  }
});

// ==================== BULK DELETE ====================
router.post('/bulk-delete', async (req, res) => {
  try {
    const { paperIds } = req.body;
    
    if (!paperIds || !Array.isArray(paperIds) || paperIds.length === 0) {
      return res.status(400).json({ error: 'Paper IDs array is required' });
    }

    const storage = getStorage();
    const result = await storage.deleteMany({ _id: { $in: paperIds } });
    
    res.json({ 
      success: true, 
      message: `${result.deletedCount} paper(s) deleted successfully`,
      deletedCount: result.deletedCount
    });
  } catch (err) {
    console.error('Bulk delete error:', err);
    res.status(500).json({ error: 'Failed to delete papers' });
  }
});

// ==================== STATISTICS ====================
router.get('/stats/overview', async (req, res) => {
  try {
    const storage = getStorage();
    const totalPapers = await storage.countDocuments();
    
    const papersByBranch = await storage.aggregate([
      { $group: { _id: '$branch', count: { $sum: 1 } } },
      { $sort: { _id: 1 } }
    ]);

    const papersByExamType = await storage.aggregate([
      { $group: { _id: '$examType', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    res.json({
      totalPapers,
      papersByBranch,
      papersByExamType
    });
  } catch (err) {
    console.error('Stats error:', err);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

export default router;
