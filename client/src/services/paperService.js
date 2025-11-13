const API_BASE_URL = import.meta.env.VITE_API_URL || '';
const API_URL = `${API_BASE_URL}/api/papers`;

export const uploadPaper = async (formData) => {
  try {
    console.log('Uploading paper to: - paperService.js:6', `${API_URL}/upload`);
    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || 'Upload failed');
    }

    const result = await response.json();
    console.log('Upload successful: - paperService.js:18', result);
    return result;
  } catch (error) {
    console.error('Upload error: - paperService.js:21', error);
    throw error;
  }
};

export const getPapers = async (filters = {}) => {
  try {
    const queryParams = new URLSearchParams();
    if (filters.branch) queryParams.append('branch', filters.branch);
    if (filters.studentYear) queryParams.append('studentYear', filters.studentYear);
    if (filters.semester) queryParams.append('semester', filters.semester);
    if (filters.subject) queryParams.append('subject', filters.subject);
    if (filters.examType) queryParams.append('examType', filters.examType);

    const url = queryParams.toString() ? `${API_URL}?${queryParams}` : API_URL;
    console.log('Fetching papers from: - paperService.js:36', url);
    const response = await fetch(url);

    if (!response.ok) throw new Error('Failed to fetch papers');
    const data = await response.json();
    console.log('Papers fetched: - paperService.js:41', data.length);
    return data;
  } catch (error) {
    console.error('Get papers error: - paperService.js:44', error);
    throw error;
  }
};

export const getMyPapers = async (facultyId) => {
  try {
    const response = await fetch(`${API_URL}/my-uploads?facultyId=${facultyId}`);
    if (!response.ok) throw new Error('Failed to fetch my papers');
    return await response.json();
  } catch (error) {
    console.error('Error fetching my papers: - paperService.js:55', error);
    throw error;
  }
};

export const deletePaper = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete paper');
    return await response.json();
  } catch (error) {
    console.error('Error deleting paper: - paperService.js:68', error);
    throw error;
  }
};

export const bulkDeletePapers = async (paperIds) => {
  try {
    const response = await fetch(`${API_URL}/bulk-delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ paperIds }),
    });
    if (!response.ok) throw new Error('Failed to delete papers');
    return await response.json();
  } catch (error) {
    console.error('Error bulk deleting papers: - paperService.js:85', error);
    throw error;
  }
};

export const updatePaper = async (id, updates) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update paper');
    return await response.json();
  } catch (error) {
    console.error('Error updating paper: - paperService.js:102', error);
    throw error;
  }
};
