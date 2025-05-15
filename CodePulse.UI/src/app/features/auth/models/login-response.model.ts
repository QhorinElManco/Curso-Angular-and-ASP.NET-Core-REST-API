export interface LoginResponseModel {
  email: string;
  password: null | string;
  roles: string[];
  token: string;
}
