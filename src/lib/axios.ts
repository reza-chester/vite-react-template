// services/api.ts
import axios, { type AxiosInstance, type AxiosRequestConfig } from "axios";
import { toast } from "sonner";
import { tokenRemove } from "../app/Reducers/tokenSlice";
import { store } from "../app/store";
import { useNavigate } from "react-router-dom";

export interface ApiResponse<T = unknown> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

class ApiService {
  private static instance: ApiService;
  private api: AxiosInstance;

  private constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_API_URL,
      // timeout: 10000,
      // headers: {
      //   "Content-Type": "application/json",
      // },
    });

    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        const statusCode = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;

        console.log("Status Code:", statusCode);
        console.log("Error Message:", errorMessage);
        console.log("Error Code:", error.code);

        if (statusCode === 401) {

          // for remove any
          store.dispatch(tokenRemove());



          toast.error("نشست شما منقضی شده است");
          const nav = useNavigate();
          nav("/");
        } else if (
          error.message === "Network Error" ||
          error.code === "ERR_NETWORK"
        ) {
         
            toast.error(
              "ارتباط با سرور برقرار نیست. لطفاً اتصال اینترنت را بررسی کنید."
            );
        
        } else {
          toast.error(errorMessage);
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

  private getToken(): string | null {
    const tokenFromStore = localStorage.getItem("token");
    if (!tokenFromStore) return null;

    let token = tokenFromStore;

    if (token.startsWith('"') && token.includes('\\"value\\"')) {
      try {
        const firstParse = JSON.parse(token);
        if (firstParse.value) {
          token = firstParse.value;
        } else {
          token = JSON.parse(firstParse);
        }
      } catch (e) {
        console.error("Error parsing token:", e);
        return null;
      }
    }

    return token;
  }

  public async get<T>(
    endpoint: string,
    params?: unknown,
    token?: string
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = { params };
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await this.api.get<ApiResponse<T>>(endpoint, config);
    return response.data;
  }

  public async post<T>(
    endpoint: string,
    data?: unknown,
    token?: string
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await this.api.post<ApiResponse<T>>(
      endpoint,
      data,
      config
    );
    return response.data;
  }
  public async postForm<T>(
    endpoint: string,
    data?: FormData,
    token?: string
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {};
  
    if (token) {
      config.headers = {
        Authorization: `Bearer ${token}`,
      };
    }
  
    const response = await this.api.post<ApiResponse<T>>(
      endpoint,
      data,
      config
    );
  
    return response.data;
  }
  public async put<T>(
    endpoint: string,
    data?: unknown,
    token?: string
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await this.api.put<ApiResponse<T>>(endpoint, data, config);
    return response.data;
  }

  public async delete<T>(
    endpoint: string,
    token?: string
  ): Promise<ApiResponse<T>> {
    const config: AxiosRequestConfig = {};
    if (token) {
      config.headers = { Authorization: `Bearer ${token}` };
    }
    const response = await this.api.delete<ApiResponse<T>>(endpoint, config);
    return response.data;
  }

  public async getWithToken<T>(
    endpoint: string,
    params?: unknown
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    return this.get<T>(endpoint, params, token || undefined);
  }

  public async postWithToken<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    return this.post<T>(endpoint, data, token || undefined);
  }

  public async putWithToken<T>(
    endpoint: string,
    data?: unknown
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
    return this.put<T>(endpoint, data, token || undefined);
  }

  public async deleteWithToken<T>(endpoint: string): Promise<ApiResponse<T>> {
    const token = this.getToken();
    return this.delete<T>(endpoint, token || undefined);
  }

  public async postFormWithToken<T>(
    endpoint: string,
    data?: FormData
  ): Promise<ApiResponse<T>> {
    const token = this.getToken();
  
    return this.postForm<T>(
      endpoint,
      data,
      token || undefined
    );
  }

  public async postFormWithCustomToken<T>(
    endpoint: string,
    token: string,
    data?: FormData
  ): Promise<ApiResponse<T>> {
    return this.postForm<T>(
      endpoint,
      data,
      token
    );
  }
  
}

export const createApiEndpoint = (endpoint: string) => {
  const api = ApiService.getInstance();
  return {
    get: <T>(params?: unknown) => api.get<T>(endpoint, params),
    post: <T>(data?: unknown) => api.post<T>(endpoint, data),
    put: <T>(data?: unknown) => api.put<T>(endpoint, data),
    delete: <T>() => api.delete<T>(endpoint),
    postForm: <T>(data?: FormData) =>
      api.postForm<T>(endpoint, data),

    getWithToken: <T>(params?: unknown) =>
      api.getWithToken<T>(endpoint, params),
    postWithToken: <T>(data?: unknown) => api.postWithToken<T>(endpoint, data),
    postFormWithToken: <T>(data?: FormData) =>
      api.postFormWithToken<T>(endpoint, data),
    putWithToken: <T>(data?: unknown) => api.putWithToken<T>(endpoint, data),
    deleteWithToken: <T>() => api.deleteWithToken<T>(endpoint),

    getWithCustomToken: <T>(token: string, params?: unknown) =>
      api.get<T>(endpoint, params, token),
    postWithCustomToken: <T>(token: string, data?: unknown) =>
      api.post<T>(endpoint, data, token),
    putWithCustomToken: <T>(token: string, data?: unknown) =>
      api.put<T>(endpoint, data, token),
    deleteWithCustomToken: <T>(token: string) => api.delete<T>(endpoint, token),
    postFormWithCustomToken: <T>(
      token: string,
      data?: FormData
    ) =>
      api.postFormWithCustomToken<T>(
        endpoint,
        token,
        data
      ),

  };
};
