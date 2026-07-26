// services/api.ts
import axios, { type AxiosInstance } from 'axios';

interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
  success:boolean
}

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      // timeout: 10000, 
      headers: {
        'Content-Type': 'application/json',
      },
      
    });

    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token');
          // window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }

  public get<T>(endpoint: string, params?: unknown): Promise<ApiResponse<T>> {
    return this.api.get(endpoint, { params });
  }

  public post<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.api.post(endpoint, data);
  }

  public put<T>(endpoint: string, data?: unknown): Promise<ApiResponse<T>> {
    return this.api.put(endpoint, data);
  }

  public delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.api.delete(endpoint);
  }
}

export const createApiEndpoint = (endpoint: string) => {
  const api = ApiService.getInstance();
  return {
    get: <T>(params?: unknown) => api.get<T>(endpoint, params),
    post: <T>(data?: unknown) => api.post<T>(endpoint, data),
    put: <T>(data?: unknown) => api.put<T>(endpoint, data),
    delete: <T>() => api.delete<T>(endpoint),
  };
};