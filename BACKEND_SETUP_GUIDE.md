# 🚀 Backend API Setup Guide - Past Paper Pro

## ✅ What's Been Implemented

### **1. Database Model (MongoDB)**
- ✅ Complete Paper schema with all fields
- ✅ Indexes for fast queries
- ✅ Text search support
- ✅ Validation for all enum fields

### **2. API Endpoints**
All endpoints are ready and functional:

#### **Upload & Update:**
- `POST /api/papers/upload` - Upload new paper (with file or Google Drive URL)
- `PUT /api/papers/:id` - Update existing paper

#### **Get Papers:**
- `GET /api/papers` - Get papers with filters (for students)
- `GET /api/papers/my-uploads?facultyId=xxx` - Get faculty's papers
- `GET /api/papers/all` - Get all papers (admin view)

#### **Delete:**
- `DELETE /api/papers/:id` - Delete single paper
- `POST /api/papers/bulk-delete` - Delete multiple papers

#### **Statistics:**
- `GET /api/papers/stats/overview` - Get statistics

### **3. File Upload Support**
- ✅ Multer middleware configured
- ✅ PDF-only validation
- ✅ 10MB file size limit
- ✅ Unique filename generation
- ✅ Static file serving from `/uploads`

### **4. Features**
- ✅ CORS enabled for frontend
- ✅ JSON and FormData support
- ✅ Error handling
- ✅ MongoDB connection with fallback
- ✅ Health check endpoint

---

## 📋 Setup Instructions

### **Step 1: Install Dependencies**

```bash
cd server
npm install
```

This will install:
- express
- mongoose
- cors
- dotenv
- multer
- nodemon (dev)

### **Step 2: Set Up MongoDB**

**Option A: MongoDB Atlas (Cloud - Recommended)**

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a free account
3. Create a new cluster (free tier)
4. Click "Connect" → "Connect your application"
5. Copy the connection string
6. Replace `<password>` with your database password

**Option B: Local MongoDB**

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/past-paper-pro`

### **Step 3: Create .env File**

Create `server/.env` file:

```env
PORT=4000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/past-paper-pro?retryWrites=true&w=majority
CLIENT_ORIGIN=http://localhost:5177
```

### **Step 4: Create Uploads Directory**

```bash
mkdir server/uploads
```

### **Step 5: Start the Server**

**Development mode (with auto-restart):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

Server will run on: `http://localhost:4000`

---

## 🧪 Testing the API

### **1. Health Check**
```bash
curl http://localhost:4000/health
```

Expected response:
```json
{
  "ok": true,
  "service": "past-paper-pro-server"
}
```

### **2. Upload Paper (with Google Drive URL)**
```bash
curl -X POST http://localhost:4000/api/papers/upload \
  -H "Content-Type: application/json" \
  -d '{
    "paperTitle": "Machine Learning End Sem 2023",
    "branch": "CSE",
    "studentYear": "3",
    "semester": "5",
    "semesterType": "Odd Sem",
    "subject": "Machine Learning",
    "examType": "End-Sem",
    "paperYear": 2023,
    "academicYear": "2023-24",
    "driveUrl": "https://drive.google.com/file/d/example123",
    "facultyId": "faculty-uid-123",
    "facultyName": "Dr. Smith"
  }'
```

### **3. Get All Papers**
```bash
curl http://localhost:4000/api/papers
```

### **4. Get Papers with Filters**
```bash
curl "http://localhost:4000/api/papers?branch=CSE&studentYear=3&semester=5"
```

### **5. Get Faculty's Papers**
```bash
curl "http://localhost:4000/api/papers/my-uploads?facultyId=faculty-uid-123"
```

### **6. Delete Paper**
```bash
curl -X DELETE http://localhost:4000/api/papers/PAPER_ID_HERE
```

### **7. Get Statistics**
```bash
curl http://localhost:4000/api/papers/stats/overview
```

---

## 📁 Project Structure

```
server/
├── src/
│   ├── app.js                 # Main Express app
│   ├── models/
│   │   └── Paper.js          # MongoDB Paper schema
│   ├── routes/
│   │   └── papers.js         # All API endpoints
│   └── middleware/
│       └── upload.js         # Multer file upload config
├── uploads/                  # Uploaded PDF files
├── .env                      # Environment variables
├── .env.example             # Example env file
└── package.json             # Dependencies

```

---

## 🔌 API Endpoints Reference

### **Upload Paper**
```
POST /api/papers/upload
Content-Type: multipart/form-data

Fields:
- file (optional): PDF file
- paperTitle: string (required)
- branch: CSE|ECE|AIDS|EEE|MECH|CIVIL (required)
- studentYear: 1|2|3|4 (required)
- semester: 1-8 (required)
- semesterType: "Even Sem"|"Odd Sem" (required)
- subject: string (required)
- examType: In-Sem 1|In-Sem 2|End-Sem|Quiz|Assignment (required)
- paperYear: number (required)
- academicYear: string (required)
- driveUrl: string (optional)
- facultyId: string (required)
- facultyName: string (required)
- facultyEmail: string (optional)
```

### **Get Papers (Student View)**
```
GET /api/papers?branch=CSE&studentYear=3&semester=5&subject=ML&examType=End-Sem&search=machine

Query Parameters (all optional):
- branch: Filter by branch
- studentYear: Filter by year
- semester: Filter by semester
- subject: Filter by subject
- examType: Filter by exam type
- search: Text search in title and subject
```

### **Get Faculty's Papers**
```
GET /api/papers/my-uploads?facultyId=xxx

Query Parameters:
- facultyId: Faculty's Firebase UID (required)
```

### **Get All Papers (Admin)**
```
GET /api/papers/all

Returns all papers (up to 500)
```

### **Update Paper**
```
PUT /api/papers/:id
Content-Type: multipart/form-data

Same fields as upload
```

### **Delete Paper**
```
DELETE /api/papers/:id
```

### **Bulk Delete**
```
POST /api/papers/bulk-delete
Content-Type: application/json

Body:
{
  "paperIds": ["id1", "id2", "id3"]
}
```

### **Statistics**
```
GET /api/papers/stats/overview

Returns:
{
  "totalPapers": 150,
  "papersByBranch": [
    { "_id": "CSE", "count": 80 },
    { "_id": "ECE", "count": 40 }
  ],
  "papersByExamType": [
    { "_id": "End-Sem", "count": 60 },
    { "_id": "In-Sem 1", "count": 50 }
  ]
}
```

---

## 🔄 Next Steps

### **1. Update Frontend API Calls**

Update `client/src/services/authService.js` or create new `paperService.js`:

```javascript
const API_URL = 'http://localhost:4000/api/papers';

export const uploadPaper = async (formData) => {
  const response = await fetch(`${API_URL}/upload`, {
    method: 'POST',
    body: formData, // FormData with file and fields
  });
  return response.json();
};

export const getMyPapers = async (facultyId) => {
  const response = await fetch(`${API_URL}/my-uploads?facultyId=${facultyId}`);
  return response.json();
};

export const getAllPapers = async () => {
  const response = await fetch(`${API_URL}/all`);
  return response.json();
};

export const updatePaper = async (id, formData) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    body: formData,
  });
  return response.json();
};

export const deletePaper = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  });
  return response.json();
};

export const bulkDeletePapers = async (paperIds) => {
  const response = await fetch(`${API_URL}/bulk-delete`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ paperIds }),
  });
  return response.json();
};
```

### **2. Update Faculty Dashboard**

Replace mock API calls with real ones in `FacultyDashboard.jsx`:

```javascript
// Import the service
import * as paperService from '../services/paperService';

// In fetchMyPapers:
const data = await paperService.getMyPapers(user.uid);
setMyPapers(data);

// In fetchAllPapers:
const data = await paperService.getAllPapers();
setAllPapers(data);

// In handleUpload:
const result = await paperService.uploadPaper(formData);

// In handleDelete:
await paperService.deletePaper(paperId);

// In handleBulkDelete:
await paperService.bulkDeletePapers(selectedPapers);
```

---

## ✅ Backend Complete!

**What's Working:**
- ✅ MongoDB database with Paper model
- ✅ All API endpoints (upload, get, update, delete, bulk delete, stats)
- ✅ File upload support (PDF only, 10MB max)
- ✅ Google Drive URL support
- ✅ CORS enabled for frontend
- ✅ Error handling
- ✅ Validation

**Ready for:**
- ✅ Frontend integration
- ✅ Testing with real data
- ✅ Deployment

---

## 🎯 Quick Start Commands

```bash
# Install dependencies
cd server
npm install

# Create uploads directory
mkdir uploads

# Create .env file (add your MongoDB URI)
cp .env.example .env

# Start development server
npm run dev
```

Server will be running on **http://localhost:4000** 🚀
