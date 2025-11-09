// API service for connecting to the backend
const API_BASE_URL = 'http://localhost:5000/api';

class APIService {
  constructor() {
    this.token = localStorage.getItem('token');
  }

  // Set authentication token
  setToken(token) {
    this.token = token;
    localStorage.setItem('token', token);
  }

  // Remove authentication token
  removeToken() {
    this.token = null;
    localStorage.removeItem('token');
  }

  // Make API request
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    };

    // Add authentication header if token exists
    if (this.token) {
      config.headers.Authorization = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      throw error;
    }
  }

  // Authentication endpoints
  async register(userData) {
    const response = await this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    });
    
    if (response.success && response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async login(credentials) {
    const response = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response.success && response.token) {
      this.setToken(response.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return await this.request('/auth/me');
  }

  async logout() {
    this.removeToken();
  }

  // Task endpoints
  async getTasks(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const endpoint = `/tasks${queryParams ? `?${queryParams}` : ''}`;
    return await this.request(endpoint);
  }

  async createTask(taskData) {
    return await this.request('/tasks', {
      method: 'POST',
      body: JSON.stringify(taskData)
    });
  }

  async updateTask(id, taskData) {
    return await this.request(`/tasks/${id}`, {
      method: 'PUT',
      body: JSON.stringify(taskData)
    });
  }

  async deleteTask(id) {
    return await this.request(`/tasks/${id}`, {
      method: 'DELETE'
    });
  }

  async toggleTask(id) {
    return await this.request(`/tasks/${id}/toggle`, {
      method: 'PUT'
    });
  }

  // Family endpoints
  async getFamily() {
    return await this.request('/family');
  }

  async updateFamily(familyData) {
    return await this.request('/family/update', {
      method: 'PUT',
      body: JSON.stringify(familyData)
    });
  }

  async getInviteCode() {
    return await this.request('/family/invite');
  }

  async joinFamily(inviteData) {
    return await this.request('/family/join', {
      method: 'POST',
      body: JSON.stringify(inviteData)
    });
  }

  async removeFamilyMember(memberId) {
    return await this.request('/family/remove-member', {
      method: 'POST',
      body: JSON.stringify({ memberId })
    });
  }

  // Statistics endpoints
  async getDashboardStats() {
    return await this.request('/stats/dashboard');
  }

  async getWeeklyStats() {
    return await this.request('/stats/weekly');
  }
}

// Export singleton instance
export default new APIService();