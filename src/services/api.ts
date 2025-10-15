// Create this file: frontend/src/services/api.ts

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function for making API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error.message || `API request failed: ${response.statusText}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// ==================== DASHBOARD API ====================

export const dashboardAPI = {
  /**
   * Get real-time metrics for dashboard
   */
  getMetrics: () => 
    apiRequest<any>('/metrics'),
  
  /**
   * Get 24-hour energy consumption data
   */
  getEnergyConsumption: () => 
    apiRequest<any>('/energy-consumption'),
};

// ==================== DATA UPLOAD API ====================

export const dataUploadAPI = {
  /**
   * Upload CSV file for processing
   */
  uploadCSV: async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await fetch(`${API_BASE_URL}/upload-csv`, {
      method: 'POST',
      body: formData,
      // Don't set Content-Type header - browser will set it with boundary
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }
    
    return await response.json();
  },
  
  /**
   * Analyze uploaded CSV data
   */
  analyzeData: (filename: string) =>
    apiRequest<any>('/analyze-data', {
      method: 'POST',
      body: JSON.stringify({ filename }),
    }),
};

// ==================== OPTIMIZATION API ====================

export const optimizationAPI = {
  /**
   * Run AI optimization algorithm
   */
  runOptimization: (data?: any) =>
    apiRequest<any>('/run-optimization', {
      method: 'POST',
      body: JSON.stringify(data || {}),
    }),
  
  /**
   * Get predictive maintenance schedule
   */
  getMaintenancePredictions: () =>
    apiRequest<any>('/maintenance-predictions'),
};

// ==================== SIMULATION API ====================

export const simulationAPI = {
  /**
   * Run process simulation with given parameters
   */
  simulate: (params: {
    ore_hardness: number;
    feed_size: number;
    crusher_gap: number;
    mill_speed: number;
  }) =>
    apiRequest<any>('/simulate', {
      method: 'POST',
      body: JSON.stringify(params),
    }),
};

// ==================== RENEWABLE ENERGY API ====================

export const renewableEnergyAPI = {
  /**
   * Calculate renewable energy savings
   */
  calculateSavings: (params: {
    current_energy: number;
    renewable_capacity: number;
    energy_cost: number;
  }) =>
    apiRequest<any>('/calculate-renewable-savings', {
      method: 'POST',
      body: JSON.stringify(params),
    }),
};

// ==================== HEALTH CHECK ====================

export const healthAPI = {
  /**
   * Check backend health status
   */
  check: () => apiRequest<{ status: string; timestamp: string }>('/health'),
  
  /**
   * Get API root information
   */
  getInfo: async () => {
    const response = await fetch('http://localhost:5000');
    return await response.json();
  }
};

// Export all APIs as a single object
export const api = {
  dashboard: dashboardAPI,
  dataUpload: dataUploadAPI,
  optimization: optimizationAPI,
  simulation: simulationAPI,
  renewableEnergy: renewableEnergyAPI,
  health: healthAPI,
};

export default api;