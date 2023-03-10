export interface CreateUser {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
}

export interface GettingUserData {
  message: string;
  data: UserData[];
}

export interface UserData {
  _id: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  age: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
