export interface UserDetails {
  id: string,
  email: string,
  password: string,
  name: string,
  surname: string
  role: string
}

export interface Doctor extends UserDetails {
  specialization: string,
  phone: string
}

export interface Patient extends UserDetails {
  pesel: string,
  phone: string,
  dateOfBirth: string
}

export enum UserRole {
  ADMIN = 'admin',
  Doctor = 'doctor',
  Patient = 'patient'
}
