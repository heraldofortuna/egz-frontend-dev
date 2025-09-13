import {
  IRegisterValues,
  IRegisterValidations,
  ILoginValues,
  ILoginValidations,
  ISupportValues,
  ISupportValidations,
  IProfileValues,
  IProfileValidations,
} from '@customtypes/states';

export const DefaultRegisterValues: IRegisterValues = {
  name: '',
  lastname: '',
  phone: '',
  email: '',
  document: '',
};

export const DefaultRegisterValidations: IRegisterValidations = {
  name: false,
  lastname: false,
  phone: false,
  email: false,
  document: false,
};

export const DefaultLoginValues: ILoginValues = {
  email: '',
  phone: '',
};

export const DefaultLoginValidations: ILoginValidations = {
  email: false,
  phone: false,
};

export const DefaultSupportValues: ISupportValues = {
  email: '',
  subject: '',
  message: '',
};

export const DefaultSupportValidations: ISupportValidations = {
  email: false,
  subject: false,
  message: false,
};

export const DefaultProfileValues: IProfileValues = {
  userTeam: '',
  userName: '',
  userLastname: '',
  userPhone: '',
  userEmail: '',
  userDocument: '',
};

export const DefaultProfileValidations: IProfileValidations = {
  userTeam: true,
  userName: true,
  userLastname: true,
  userPhone: true,
  userEmail: true,
  userDocument: true,
};
