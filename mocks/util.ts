export const getResponseData = (data: unknown, code = 200, message = '') => {
  return {
    data,
    code,
    message,
  };
};
