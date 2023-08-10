/* eslint-disable @typescript-eslint/no-unused-vars */
import type { AxiosRequestConfig } from '@@/plugin-request/request';

declare module '@@/plugin-request/request' {
  declare interface AxiosRequestConfig {
    showErrorMsg?: boolean;
  }
}
export {};
