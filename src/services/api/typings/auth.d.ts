declare namespace API {
  type LoginResult = {
    token: string;
  };
  type LoginParams = {
    username?: string;
    password?: string;
    autoLogin?: boolean;
  };
}
