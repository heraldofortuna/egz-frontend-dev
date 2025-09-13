export interface IRegisterValues {
  name: string;
  lastname: string;
  phone: string;
  email: string;
  document: string;
}

export interface IRegisterValidations {
  name: boolean;
  lastname: boolean;
  phone: boolean;
  email: boolean;
  document: boolean;
}

export interface ILoginValues {
  email: string;
  phone: string;
}

export interface ILoginValidations {
  email: boolean;
  phone: boolean;
}

export interface ISupportValues {
  email: string;
  subject: string;
  message: string;
}

export interface ISupportValidations {
  email: boolean;
  subject: boolean;
  message: boolean;
}

export interface IProfileValues {
  userTeam: string;
  userName: string;
  userLastname: string;
  userPhone: string;
  userEmail: string;
  userDocument: string;
}

export interface IProfileValidations {
  userTeam: boolean;
  userName: boolean;
  userLastname: boolean;
  userPhone: boolean;
  userEmail: boolean;
  userDocument: boolean;
}
