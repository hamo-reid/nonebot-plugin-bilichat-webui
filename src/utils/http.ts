import axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
  AxiosError
} from "axios";


// 定义请求拦截器接口
export interface IRequestInterceptor {
  success: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  error: (error: AxiosError) => any;
}

// 定义响应拦截器接口
export interface IResponseInterceptor {
  success: (response: AxiosResponse) => AxiosResponse;
  error: (error: AxiosError) => any;
}

class HTTPClient {
  private axiosInstance: AxiosInstance;

  constructor(
    options: AxiosRequestConfig = {},
    requestInterceptor?: IRequestInterceptor[],
    responseInterceptor?: IResponseInterceptor[]
  ) {
    this.axiosInstance = axios.create({ ...options });

    // 配置请求拦截器
    if (requestInterceptor) {
      if (Array.isArray(requestInterceptor)) {
        requestInterceptor.forEach((interceptor) => {
          this.axiosInstance.interceptors.request.use(
            interceptor.success,
            interceptor.error
          );
        });
      }
    }

    // 配置响应拦截器
    if (responseInterceptor) {
      if (Array.isArray(responseInterceptor)) {
        responseInterceptor.forEach((interceptor) => {
          this.axiosInstance.interceptors.response.use(
            interceptor.success,
            interceptor.error
          );
        });
      }
    }
  }

  // 封装 GET 请求，返回 AxiosResponse<T>
  public async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.get<T>(url, config);
  }

  // 封装 POST 请求，返回 AxiosResponse<T>
  public async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.post<T>(url, data, config);
  }

  // 封装 PUT 请求，返回 AxiosResponse<T>
  public async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.put<T>(url, data, config);
  }

  // 封装 DELETE 请求，返回 AxiosResponse<T>
  public async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.axiosInstance.delete<T>(url, config);
  }
}

export default HTTPClient;

export const basicRequestInterceptor: IRequestInterceptor = {
  success: (config: InternalAxiosRequestConfig) => {
    // 在这里可以对请求配置做一些处理
    return config;
  },
  error: (error) => {
    // 在这里可以对请求错误做一些处理
    return Promise.reject(error);  // 传递错误，并中断请求
  },
};

export const basicResponseInterceptor: IResponseInterceptor = {
  success: (response: AxiosResponse) => {
    // 在这里可以对响应数据做一些处理
    return response;
  },
  error: (error: any) => {
    // 在这里可以对响应错误做一些处理
    return error.response;  // 返回响应对象，以便在调用处做进一步处理
  },
};


