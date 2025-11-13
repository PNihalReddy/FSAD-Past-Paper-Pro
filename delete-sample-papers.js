// Script to delete all sample papers (IDs 1-58) and keep only real uploaded papers
const API_URL = 'http://localhost:4000/api/papers';

async function deleteAllSamplePapers() {
  try {
    // Fetch all papers
    console.log('Fetching all papers...');
    const response = await fetch(API_URL);
    const papers = await response.json();
    
    console.log(`Total papers in system: ${papers.length}`);
    
    // Filter sample papers (IDs 1-58)
    const samplePapers = papers.filter(p => p.id >= 1 && p.id <= 58);
    console.log(`Found ${samplePapers.length} sample papers to delete (IDs 1-58)`);
    
    // Delete each sample paper
    let deleted = 0;
    for (const paper of samplePapers) {
      try {
        const deleteResponse = await fetch(`${API_URL}/${paper.id}`, {
          method: 'DELETE'
        });
        
        if (deleteResponse.ok) {
          deleted++;
          console.log(`✓ Deleted paper ID ${paper.id}: ${paper.subject} (${paper.branch})`);
        } else {
          console.log(`✗ Failed to delete paper ID ${paper.id}`);
        }
      } catch (err) {
        console.log(`✗ Error deleting paper ID ${paper.id}:`, err.message);
      }
    }
    
    console.log(`\n✅ Successfully deleted ${deleted} sample papers!`);
    
    // Fetch remaining papers
    const finalResponse = await fetch(API_URL);
    const remainingPapers = await finalResponse.json();
    console.log(`\n📊 Remaining papers in system: ${remainingPapers.length}`);
    console.log('\nRemaining papers:');
    remainingPapers.forEach(p => {
      console.log(`  ID ${p.id}: ${p.subject} - ${p.branch} ${p.studentYear} Sem ${p.semester} (${p.examType})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  }
}

deleteAllSamplePapers();
