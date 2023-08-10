import { useRequest as umiUseRequest } from '@umijs/max';

export const getResponse = async <T = any>(requestHandle: Promise<T>) => {
  const { code, data: responseData, message } = (await requestHandle) as API.ResponseStructure<T>;
  if (code !== SUCCESS_CODE) {
    return {
      error: {
        code,
        message,
      },
    };
  }
  return {
    data: responseData,
  };
};

export const useRequest = <T = any>(
  requestHandle: () => Promise<any>,
  options: Parameters<typeof umiUseRequest>[1],
) => {
  return umiUseRequest<T>(async () => {
    const result = await requestHandle();
    if (result.error) {
      throw new Error(result.error);
    }
    return result.data ?? result;
  }, options);
};
