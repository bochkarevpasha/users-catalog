export interface Company {
  name: string;
  title: string;
}

export interface Address {
  city: string;
  country: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  username: string;
  age: number;
  gender: string;
  company?: Company;
  address?: Address;
}

