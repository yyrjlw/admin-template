declare namespace API {
  interface ResponseStructure<T = any> {
    code: number;
    data: T;
    message: string;
  }
}
