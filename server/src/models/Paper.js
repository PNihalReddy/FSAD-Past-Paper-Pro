import mongoose from 'mongoose';

const PaperSchema = new mongoose.Schema(
  {
    paperTitle: { type: String, required: true },
    branch: { type: String, required: true, enum: ['CSE', 'ECE', 'AIDS', 'EEE', 'MECH', 'CIVIL'] },
    studentYear: { type: String, required: true, enum: ['1', '2', '3', '4'] },
    semester: { type: String, required: true, enum: ['1', '2', '3', '4', '5', '6', '7', '8'] },
    semesterType: { type: String, required: true, enum: ['Even Sem', 'Odd Sem'] },
    subject: { type: String, required: true },
    examType: { type: String, required: true, enum: ['In-Sem 1', 'In-Sem 2', 'End-Sem', 'Quiz', 'Assignment'] },
    paperYear: { type: Number, required: true },
    academicYear: { type: String, required: true },
    driveUrl: { type: String }, // Google Drive URL (optional)
    fileUrl: { type: String }, // Uploaded file URL (optional)
    fileName: { type: String }, // Original file name
    fileSize: { type: Number }, // File size in bytes
    facultyId: { type: String, required: true }, // Firebase UID
    facultyName: { type: String, required: true },
    facultyEmail: { type: String },
  },
  { timestamps: true }
);

// Indexes for faster queries
PaperSchema.index({ branch: 1, studentYear: 1, semester: 1 });
PaperSchema.index({ subject: 1 });
PaperSchema.index({ facultyId: 1 });
PaperSchema.index({ paperTitle: 'text', subject: 'text' }); // Text search

export default mongoose.models.Paper || mongoose.model('Paper', PaperSchema);
