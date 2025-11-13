// Comprehensive script to upload question papers for CSE, ECE, and AIDS
// Format matches the official KLEF question paper template

const allPapers = [
  // ========== CSE SEMESTER 1 ==========
  {
    paperTitle: "Mathematics-I Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "1",
    semesterType: "Fall",
    subject: "Mathematics-I",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem1-math1-mid",
    facultyId: "FAC001",
    facultyName: "Dr. Ramesh Kumar",
    facultyEmail: "ramesh@kluniversity.in"
  },
  {
    paperTitle: "Mathematics-I Final Examination 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "1",
    semesterType: "Fall",
    subject: "Mathematics-I",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem1-math1-final",
    facultyId: "FAC001",
    facultyName: "Dr. Ramesh Kumar",
    facultyEmail: "ramesh@kluniversity.in"
  },
  {
    paperTitle: "Physics Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "1",
    semesterType: "Fall",
    subject: "Physics",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem1-physics-mid",
    facultyId: "FAC002",
    facultyName: "Dr. Priya Sharma",
    facultyEmail: "priya@kluniversity.in"
  },
  {
    paperTitle: "Programming for Problem Solving Mid-Term 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "1",
    semesterType: "Fall",
    subject: "Programming for Problem Solving",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem1-c-mid",
    facultyId: "FAC003",
    facultyName: "Prof. Suresh Reddy",
    facultyEmail: "suresh@kluniversity.in"
  },
  {
    paperTitle: "Basic Electrical Engineering Final Exam 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "1",
    semesterType: "Fall",
    subject: "Basic Electrical Engineering",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem1-bee-final",
    facultyId: "FAC004",
    facultyName: "Dr. Venkata Rao",
    facultyEmail: "venkat@kluniversity.in"
  },

  // ========== CSE SEMESTER 2 ==========
  {
    paperTitle: "Mathematics-II Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "2",
    semesterType: "Spring",
    subject: "Mathematics-II",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem2-math2-mid",
    facultyId: "FAC001",
    facultyName: "Dr. Ramesh Kumar",
    facultyEmail: "ramesh@kluniversity.in"
  },
  {
    paperTitle: "Data Structures Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "2",
    semesterType: "Spring",
    subject: "Data Structures",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem2-ds-mid",
    facultyId: "FAC005",
    facultyName: "Dr. Anitha Devi",
    facultyEmail: "anitha@kluniversity.in"
  },
  {
    paperTitle: "Data Structures Final Examination 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "2",
    semesterType: "Spring",
    subject: "Data Structures",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem2-ds-final",
    facultyId: "FAC005",
    facultyName: "Dr. Anitha Devi",
    facultyEmail: "anitha@kluniversity.in"
  },
  {
    paperTitle: "Digital Logic Design Mid-Term 2024",
    branch: "CSE",
    studentYear: "1st Year",
    semester: "2",
    semesterType: "Spring",
    subject: "Digital Logic Design",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem2-dld-mid",
    facultyId: "FAC006",
    facultyName: "Prof. Kiran Kumar",
    facultyEmail: "kiran@kluniversity.in"
  },

  // ========== CSE SEMESTER 3 ==========
  {
    paperTitle: "Discrete Mathematics Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Discrete Mathematics",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem3-dm-mid",
    facultyId: "FAC007",
    facultyName: "Dr. Lakshmi Prasad",
    facultyEmail: "lakshmi@kluniversity.in"
  },
  {
    paperTitle: "Object-Oriented Programming Final Exam 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Object-Oriented Programming",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem3-oop-final",
    facultyId: "FAC008",
    facultyName: "Prof. Madhavi Latha",
    facultyEmail: "madhavi@kluniversity.in"
  },
  {
    paperTitle: "Computer Organization and Architecture Mid-Term 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Computer Organization and Architecture",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem3-coa-mid",
    facultyId: "FAC009",
    facultyName: "Dr. Naveen Reddy",
    facultyEmail: "naveen@kluniversity.in"
  },
  {
    paperTitle: "Operating Systems Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Operating Systems",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem3-os-mid",
    facultyId: "FAC010",
    facultyName: "Dr. Srinivas Rao",
    facultyEmail: "srinivas@kluniversity.in"
  },
  {
    paperTitle: "Design and Analysis of Algorithms Final 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Design and Analysis of Algorithms",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem3-daa-final",
    facultyId: "FAC011",
    facultyName: "Prof. Rajesh Kumar",
    facultyEmail: "rajesh@kluniversity.in"
  },

  // ========== CSE SEMESTER 4 ==========
  {
    paperTitle: "Database Management Systems Mid-Term 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Database Management Systems",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem4-dbms-mid",
    facultyId: "FAC012",
    facultyName: "Dr. Padmaja Reddy",
    facultyEmail: "padmaja@kluniversity.in"
  },
  {
    paperTitle: "Database Management Systems Final Examination 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Database Management Systems",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem4-dbms-final",
    facultyId: "FAC012",
    facultyName: "Dr. Padmaja Reddy",
    facultyEmail: "padmaja@kluniversity.in"
  },
  {
    paperTitle: "Computer Networks Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Computer Networks",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem4-cn-mid",
    facultyId: "FAC013",
    facultyName: "Prof. Vijay Kumar",
    facultyEmail: "vijay@kluniversity.in"
  },
  {
    paperTitle: "Theory of Computation Final Exam 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Theory of Computation",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem4-toc-final",
    facultyId: "FAC014",
    facultyName: "Dr. Swathi Devi",
    facultyEmail: "swathi@kluniversity.in"
  },
  {
    paperTitle: "Software Engineering Mid-Term 2024",
    branch: "CSE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Software Engineering",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem4-se-mid",
    facultyId: "FAC015",
    facultyName: "Prof. Anil Kumar",
    facultyEmail: "anil@kluniversity.in"
  },

  // ========== CSE SEMESTER 5 ==========
  {
    paperTitle: "Artificial Intelligence Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Artificial Intelligence",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem5-ai-mid",
    facultyId: "FAC016",
    facultyName: "Dr. Ravi Teja",
    facultyEmail: "ravi@kluniversity.in"
  },
  {
    paperTitle: "Compiler Design Final Examination 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Compiler Design",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem5-cd-final",
    facultyId: "FAC017",
    facultyName: "Prof. Kavitha Rani",
    facultyEmail: "kavitha@kluniversity.in"
  },
  {
    paperTitle: "Web Technologies Mid-Term 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Web Technologies",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem5-wt-mid",
    facultyId: "FAC018",
    facultyName: "Dr. Prashanth Kumar",
    facultyEmail: "prashanth@kluniversity.in"
  },
  {
    paperTitle: "Machine Learning Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Machine Learning",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem5-ml-mid",
    facultyId: "FAC019",
    facultyName: "Dr. Divya Bharathi",
    facultyEmail: "divya@kluniversity.in"
  },

  // ========== CSE SEMESTER 6 ==========
  {
    paperTitle: "Machine Learning Final Examination 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "6",
    semesterType: "Spring",
    subject: "Machine Learning",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem6-ml-final",
    facultyId: "FAC019",
    facultyName: "Dr. Divya Bharathi",
    facultyEmail: "divya@kluniversity.in"
  },
  {
    paperTitle: "Data Analytics Mid-Term Examination 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "6",
    semesterType: "Spring",
    subject: "Data Analytics",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem6-da-mid",
    facultyId: "FAC020",
    facultyName: "Prof. Murali Krishna",
    facultyEmail: "murali@kluniversity.in"
  },
  {
    paperTitle: "Mobile Computing Final Exam 2024",
    branch: "CSE",
    studentYear: "3rd Year",
    semester: "6",
    semesterType: "Spring",
    subject: "Mobile Computing",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem6-mc-final",
    facultyId: "FAC021",
    facultyName: "Dr. Ramya Devi",
    facultyEmail: "ramya@kluniversity.in"
  },

  // ========== CSE SEMESTER 7 ==========
  {
    paperTitle: "Big Data Technologies Mid-Term 2024",
    branch: "CSE",
    studentYear: "4th Year",
    semester: "7",
    semesterType: "Fall",
    subject: "Big Data Technologies",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem7-bdt-mid",
    facultyId: "FAC022",
    facultyName: "Dr. Sudheer Reddy",
    facultyEmail: "sudheer@kluniversity.in"
  },
  {
    paperTitle: "Cloud Computing Final Examination 2024",
    branch: "CSE",
    studentYear: "4th Year",
    semester: "7",
    semesterType: "Fall",
    subject: "Cloud Computing",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/cse-sem7-cc-final",
    facultyId: "FAC023",
    facultyName: "Prof. Hari Prasad",
    facultyEmail: "hari@kluniversity.in"
  },

  // ========== ECE SEMESTER 3 ==========
  {
    paperTitle: "Network Theory Mid-Term Examination 2024",
    branch: "ECE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Network Theory",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem3-nt-mid",
    facultyId: "FAC030",
    facultyName: "Dr. Krishna Murthy",
    facultyEmail: "krishna@kluniversity.in"
  },
  {
    paperTitle: "Electronic Devices Final Exam 2024",
    branch: "ECE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Electronic Devices",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem3-ed-final",
    facultyId: "FAC031",
    facultyName: "Prof. Sandhya Rani",
    facultyEmail: "sandhya@kluniversity.in"
  },
  {
    paperTitle: "Signals and Systems Mid-Term 2024",
    branch: "ECE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Signals and Systems",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem3-ss-mid",
    facultyId: "FAC032",
    facultyName: "Dr. Bhavani Prasad",
    facultyEmail: "bhavani@kluniversity.in"
  },
  {
    paperTitle: "Digital Circuits Final Examination 2024",
    branch: "ECE",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Digital Circuits",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem3-dc-final",
    facultyId: "FAC033",
    facultyName: "Prof. Venkatesh Reddy",
    facultyEmail: "venkatesh@kluniversity.in"
  },

  // ========== ECE SEMESTER 4 ==========
  {
    paperTitle: "Analog Communication Mid-Term 2024",
    branch: "ECE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Analog Communication",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem4-ac-mid",
    facultyId: "FAC034",
    facultyName: "Dr. Sunitha Devi",
    facultyEmail: "sunitha@kluniversity.in"
  },
  {
    paperTitle: "Control Systems Final Examination 2024",
    branch: "ECE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Control Systems",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem4-cs-final",
    facultyId: "FAC035",
    facultyName: "Prof. Raghavendra Rao",
    facultyEmail: "raghava@kluniversity.in"
  },
  {
    paperTitle: "Linear Integrated Circuits Mid-Term 2024",
    branch: "ECE",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Linear Integrated Circuits",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem4-lic-mid",
    facultyId: "FAC036",
    facultyName: "Dr. Manjula Reddy",
    facultyEmail: "manjula@kluniversity.in"
  },

  // ========== ECE SEMESTER 5 ==========
  {
    paperTitle: "Digital Communication Mid-Term Examination 2024",
    branch: "ECE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Digital Communication",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem5-dcom-mid",
    facultyId: "FAC037",
    facultyName: "Prof. Sai Kumar",
    facultyEmail: "saikumar@kluniversity.in"
  },
  {
    paperTitle: "VLSI Design Final Examination 2024",
    branch: "ECE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "VLSI Design",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem5-vlsi-final",
    facultyId: "FAC038",
    facultyName: "Dr. Lakshmi Narayana",
    facultyEmail: "lnarayana@kluniversity.in"
  },
  {
    paperTitle: "Embedded Systems Mid-Term 2024",
    branch: "ECE",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Embedded Systems",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem5-es-mid",
    facultyId: "FAC039",
    facultyName: "Prof. Indira Priyadarshini",
    facultyEmail: "indira@kluniversity.in"
  },

  // ========== ECE SEMESTER 6 ==========
  {
    paperTitle: "Digital Signal Processing Final Exam 2024",
    branch: "ECE",
    studentYear: "3rd Year",
    semester: "6",
    semesterType: "Spring",
    subject: "Digital Signal Processing",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem6-dsp-final",
    facultyId: "FAC040",
    facultyName: "Dr. Nageswara Rao",
    facultyEmail: "nageswara@kluniversity.in"
  },
  {
    paperTitle: "Microwave Engineering Mid-Term 2024",
    branch: "ECE",
    studentYear: "3rd Year",
    semester: "6",
    semesterType: "Spring",
    subject: "Microwave Engineering",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/ece-sem6-mwe-mid",
    facultyId: "FAC041",
    facultyName: "Prof. Radhika Devi",
    facultyEmail: "radhika@kluniversity.in"
  },

  // ========== AIDS SEMESTER 3 ==========
  {
    paperTitle: "AI Fundamentals Mid-Term Examination 2024",
    branch: "AIDS",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Artificial Intelligence Fundamentals",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem3-aif-mid",
    facultyId: "FAC050",
    facultyName: "Dr. Chandra Sekhar",
    facultyEmail: "chandra@kluniversity.in"
  },
  {
    paperTitle: "Database Management Systems Final 2024",
    branch: "AIDS",
    studentYear: "2nd Year",
    semester: "3",
    semesterType: "Fall",
    subject: "Database Management Systems",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem3-dbms-final",
    facultyId: "FAC051",
    facultyName: "Prof. Usha Rani",
    facultyEmail: "usha@kluniversity.in"
  },

  // ========== AIDS SEMESTER 4 ==========
  {
    paperTitle: "Machine Learning Mid-Term Examination 2024",
    branch: "AIDS",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Machine Learning",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem4-ml-mid",
    facultyId: "FAC052",
    facultyName: "Dr. Varun Kumar",
    facultyEmail: "varun@kluniversity.in"
  },
  {
    paperTitle: "Data Warehousing and Mining Final 2024",
    branch: "AIDS",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Data Warehousing and Mining",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem4-dwm-final",
    facultyId: "FAC053",
    facultyName: "Prof. Geetha Latha",
    facultyEmail: "geetha@kluniversity.in"
  },
  {
    paperTitle: "Python for Data Science Mid-Term 2024",
    branch: "AIDS",
    studentYear: "2nd Year",
    semester: "4",
    semesterType: "Spring",
    subject: "Python for Data Science",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem4-python-mid",
    facultyId: "FAC054",
    facultyName: "Dr. Satish Babu",
    facultyEmail: "satish@kluniversity.in"
  },

  // ========== AIDS SEMESTER 5 ==========
  {
    paperTitle: "Deep Learning Mid-Term Examination 2024",
    branch: "AIDS",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Deep Learning",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem5-dl-mid",
    facultyId: "FAC055",
    facultyName: "Dr. Arjun Reddy",
    facultyEmail: "arjun@kluniversity.in"
  },
  {
    paperTitle: "Big Data Analytics Final Examination 2024",
    branch: "AIDS",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Big Data Analytics",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem5-bda-final",
    facultyId: "FAC056",
    facultyName: "Prof. Meena Kumari",
    facultyEmail: "meena@kluniversity.in"
  },
  {
    paperTitle: "Cloud Computing Mid-Term 2024",
    branch: "AIDS",
    studentYear: "3rd Year",
    semester: "5",
    semesterType: "Fall",
    subject: "Cloud Computing",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem5-cc-mid",
    facultyId: "FAC057",
    facultyName: "Dr. Balaji Krishna",
    facultyEmail: "balaji@kluniversity.in"
  },

  // ========== AIDS SEMESTER 6 ==========
  {
    paperTitle: "Computer Vision Final Examination 2024",
    branch: "AIDS",
    studentYear: "3rd Year",
    semester: "6",
    semesterType: "Spring",
    subject: "Computer Vision",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem6-cv-final",
    facultyId: "FAC058",
    facultyName: "Dr. Shalini Reddy",
    facultyEmail: "shalini@kluniversity.in"
  },
  {
    paperTitle: "Natural Language Processing Mid-Term 2024",
    branch: "AIDS",
    studentYear: "3rd Year",
    semester: "6",
    semesterType: "Spring",
    subject: "Natural Language Processing",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem6-nlp-mid",
    facultyId: "FAC059",
    facultyName: "Prof. Karthik Kumar",
    facultyEmail: "karthik@kluniversity.in"
  },
  {
    paperTitle: "Internet of Things Final Exam 2024",
    branch: "AIDS",
    studentYear: "3rd Year",
    semester: "6",
    semesterType: "Spring",
    subject: "Internet of Things",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem6-iot-final",
    facultyId: "FAC060",
    facultyName: "Dr. Preeti Sharma",
    facultyEmail: "preeti@kluniversity.in"
  },

  // ========== AIDS SEMESTER 7 ==========
  {
    paperTitle: "Ethical AI and Data Governance Mid-Term 2024",
    branch: "AIDS",
    studentYear: "4th Year",
    semester: "7",
    semesterType: "Fall",
    subject: "Ethical AI & Data Governance",
    examType: "Mid-Term",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem7-eai-mid",
    facultyId: "FAC061",
    facultyName: "Prof. Mohan Das",
    facultyEmail: "mohan@kluniversity.in"
  },
  {
    paperTitle: "Blockchain Technology Final Examination 2024",
    branch: "AIDS",
    studentYear: "4th Year",
    semester: "7",
    semesterType: "Fall",
    subject: "Blockchain Technology",
    examType: "Final",
    paperYear: "2024",
    academicYear: "2023-2024",
    driveUrl: "https://drive.google.com/file/d/aids-sem7-bc-final",
    facultyId: "FAC062",
    facultyName: "Dr. Suma Latha",
    facultyEmail: "suma@kluniversity.in"
  }
];

async function uploadAllPapers() {
  console.log(`🚀 Starting to upload ${allPapers.length} question papers for CSE, ECE, and AIDS...\n`);
  
  let successCount = 0;
  let failCount = 0;
  
  for (let i = 0; i < allPapers.length; i++) {
    const paper = allPapers[i];
    console.log(`📄 [${i + 1}/${allPapers.length}] ${paper.branch} Sem ${paper.semester} - ${paper.subject} (${paper.examType})`);
    
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
        successCount++;
      } else {
        const error = await response.text();
        console.log(`   ❌ Failed: ${response.status} - ${error}`);
        failCount++;
      }
    } catch (error) {
      console.log(`   ❌ Error: ${error.message}`);
      failCount++;
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ Upload Complete!`);
  console.log(`   ✅ Successful: ${successCount}`);
  console.log(`   ❌ Failed: ${failCount}`);
  console.log(`   📊 Total: ${allPapers.length}`);
  console.log('='.repeat(60));
  console.log('\n🎓 Check the Student Dashboard at http://localhost:5173\n');
}

uploadAllPapers();
