// Test script to upload sample papers to the server
const testPapers = [
  {
    paperTitle: "Data Structures Mid-Term Exam 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Data Structures",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/sample1",
    facultyId: "FAC001",
    facultyName: "Dr. Smith",
    facultyEmail: "smith@example.com"
  },
  {
    paperTitle: "Database Management Systems Final 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Spring",
    subject: "DBMS",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/sample2",
    facultyId: "FAC001",
    facultyName: "Dr. Smith",
    facultyEmail: "smith@example.com"
  },
  {
    paperTitle: "Operating Systems Mid-Term 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Operating Systems",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/sample3",
    facultyId: "FAC002",
    facultyName: "Dr. Johnson",
    facultyEmail: "johnson@example.com"
  },
  {
    paperTitle: "Computer Networks Final 2023",
    branch: "CSE",
    studentYear: "4th Year",
    semester: "7",
    semesterType: "Spring",
    subject: "Computer Networks",
    examType: "Final",
    paperYear: "2023",
    academicYear: "2022-2023",
    driveUrl: "https://drive.google.com/file/d/sample4",
    facultyId: "FAC003",
    facultyName: "Dr. Williams",
    facultyEmail: "williams@example.com"
  },
  {
    paperTitle: "Web Technologies Mid-Term 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Web Technologies",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/sample5",
    facultyId: "FAC001",
    facultyName: "Dr. Smith",
    facultyEmail: "smith@example.com"
  }
];

async function uploadPapers() {
  console.log("🚀 Starting to upload test papers...\n");
  
  for (let i = 0; i < testPapers.length; i++) {
    const paper = testPapers[i];
    console.log(`📄 Uploading ${i + 1}/${testPapers.length}: ${paper.paperTitle}`);
    
    try {
      const response = await fetch('http://localhost:4000/api/papers/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paper)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log(`   ✅ Success! Paper ID: ${result.paper._id}`);
      } else {
        const error = await response.text();
        console.log(`   ❌ Failed: ${response.status} - ${error}`);
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
    }
    
    console.log('');
  }
  
  console.log("✨ Upload complete! Check the student dashboard.\n");
}

uploadPapers();
