export interface UserDetails {
  id: string,
  email: string,
  password: string,
  name: string,
  surname: string
  role: UserRole
  phone: string
}

export interface Doctor extends UserDetails {
  specialization: string,
}

export interface Patient extends UserDetails {
  pesel: string,
  dateOfBirth: string
  doctorId: string
}

export enum UserRole {
  Doctor = 'doctor',
  Patient = 'patient'
}

export interface User  {
  sessionId: string,
  user: UserDetails
}

export type GenericUser = Doctor | Patient;
