declare module 'slash2';
declare module '*.css';
declare module '*.less';
declare module '*.scss';
declare module '*.sass';
declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';
declare module 'omit.js';
declare module 'numeral';
declare module '@antv/data-set';
declare module 'mockjs';
declare module 'react-fittext';
declare module 'bizcharts-plugin-slider';

//#region 环境变量

declare const REACT_APP_ENV: 'test' | 'dev' | 'pre' | false;
/** 启用MOCK_SERVER */
declare const MOCK_SERVER: string;
declare const SUCCESS_CODE: number;

declare namespace NodeJS {
  declare interface ProcessEnv {
    REACT_APP_ENV: typeof REACT_APP_ENV;
    MOCK_SERVER: typeof MOCK_SERVER;
  }
}

//#endregion
