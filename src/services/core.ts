import { StorageUtil } from '@/utils/storage';
import type { AxiosRequestConfig, AxiosResponse, RequestOptions } from '@@/plugin-request/request';
import { history, type RequestConfig } from '@umijs/max';
import { message } from 'antd';

const storageUtil = new StorageUtil('local');

export const servicesConfig: RequestConfig = {
  errorConfig: {
    errorHandler(error: any) {
      if (error.response) {
        const { status } = error as AxiosResponse;
        if (status === 401) {
          history.replace('/user/login');
          message.error(`登录已过期`);
        } else {
          message.error(`网络异常`);
        }
      }
    },
  },
  requestInterceptors: [
    (config: RequestOptions) => {
      const token = storageUtil.getItem('token');
      if (token) {
        config.headers!.Authorization = 'Bearer ' + token;
      }
      return config;
    },
  ],
  responseInterceptors: [
    (res) => {
      const requestConfig = res.request as AxiosRequestConfig;
      const responseData = res.data as API.ResponseStructure;
      if (res.status !== SUCCESS_CODE) {
        if (requestConfig.showErrorMsg !== false) {
          message.error(responseData.message);
        }
      }

      return res;
    },
  ],
};
