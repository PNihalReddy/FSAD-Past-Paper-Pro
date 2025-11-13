import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE = path.join(__dirname, '../../data/papers.json');

// In-memory storage for when MongoDB is unavailable
class MemoryStorage {
  constructor() {
    this.papers = [];
    this.idCounter = 1;
    this.loadFromFile();
  }

  loadFromFile() {
    try {
      if (fs.existsSync(DATA_FILE)) {
        const data = JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
        this.papers = data.papers || [];
        this.idCounter = data.idCounter || 1;
        console.log(`✅ Loaded ${this.papers.length} papers from file`);
      }
    } catch (error) {
      console.error('Error loading papers from file:', error);
    }
  }

  saveToFile() {
    try {
      const dir = path.dirname(DATA_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DATA_FILE, JSON.stringify({
        papers: this.papers,
        idCounter: this.idCounter
      }, null, 2));
    } catch (error) {
      console.error('Error saving papers to file:', error);
    }
  }

  create(paperData) {
    const paper = {
      _id: String(this.idCounter++),
      ...paperData,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.papers.push(paper);
    this.saveToFile();
    return paper;
  }

  find(filter = {}) {
    let results = [...this.papers];
    
    // Apply filters
    if (filter.branch) {
      results = results.filter(p => p.branch === filter.branch);
    }
    if (filter.studentYear) {
      results = results.filter(p => p.studentYear === filter.studentYear);
    }
    if (filter.semester) {
      results = results.filter(p => p.semester === filter.semester);
    }
    if (filter.subject) {
      results = results.filter(p => p.subject === filter.subject);
    }
    if (filter.examType) {
      results = results.filter(p => p.examType === filter.examType);
    }
    if (filter.facultyId) {
      results = results.filter(p => p.facultyId === filter.facultyId);
    }
    if (filter.$text && filter.$text.$search) {
      const searchTerm = filter.$text.$search.toLowerCase();
      results = results.filter(p => 
        p.paperTitle?.toLowerCase().includes(searchTerm) ||
        p.subject?.toLowerCase().includes(searchTerm) ||
        p.facultyName?.toLowerCase().includes(searchTerm)
      );
    }
    
    // Sort by createdAt descending
    results.sort((a, b) => b.createdAt - a.createdAt);
    
    return results;
  }

  findById(id) {
    return this.papers.find(p => p._id === id);
  }

  findByIdAndUpdate(id, updateData) {
    const paper = this.findById(id);
    if (!paper) return null;
    
    Object.assign(paper, updateData, { updatedAt: new Date() });
    this.saveToFile();
    return paper;
  }

  findByIdAndDelete(id) {
    const index = this.papers.findIndex(p => p._id === id);
    if (index === -1) return null;
    
    const [deleted] = this.papers.splice(index, 1);
    this.saveToFile();
    return deleted;
  }

  deleteMany(filter) {
    let deletedCount = 0;
    
    if (filter._id && filter._id.$in) {
      const idsToDelete = filter._id.$in;
      this.papers = this.papers.filter(p => {
        if (idsToDelete.includes(p._id)) {
          deletedCount++;
          return false;
        }
        return true;
      });
    }
    
    this.saveToFile();
    return { deletedCount };
  }

  countDocuments(filter = {}) {
    return this.find(filter).length;
  }

  aggregate(pipeline) {
    // Simple aggregation support for stats
    if (!pipeline || pipeline.length === 0) return [];
    
    const firstStage = pipeline[0];
    
    if (firstStage.$group) {
      const groupBy = firstStage.$group._id;
      const grouped = {};
      
      this.papers.forEach(paper => {
        const key = paper[groupBy.replace('$', '')];
        if (!grouped[key]) {
          grouped[key] = { _id: key, count: 0 };
        }
        grouped[key].count++;
      });
      
      let results = Object.values(grouped);
      
      // Apply sort if present
      if (pipeline[1] && pipeline[1].$sort) {
        const sortKey = Object.keys(pipeline[1].$sort)[0];
        const sortOrder = pipeline[1].$sort[sortKey];
        results.sort((a, b) => {
          if (sortOrder === 1) {
            return a[sortKey] > b[sortKey] ? 1 : -1;
          } else {
            return a[sortKey] < b[sortKey] ? 1 : -1;
          }
        });
      }
      
      return results;
    }
    
    return [];
  }
}

// Global instance
const memoryStorage = new MemoryStorage();

export default memoryStorage;
