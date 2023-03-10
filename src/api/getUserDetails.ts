import axios from "axios";
import { CreateUser, GettingUserData, UserData } from "../types/userTypes";

export const getAllUserDetails = async () => {
  try {
    const response = await axios.get<GettingUserData>(
      `https://blue-journalist-bbrpv.ineuron.app:4000/users`
    );
    return response?.data;
  } catch (err) {
    console.log("error");
  }
};

export const createUsers = async (params: CreateUser) => {
  try {
    const response = await axios.post(
      `https://blue-journalist-bbrpv.ineuron.app:4000/user/create`,
      { ...params }
    );
    return response;
  } catch (err) {
    console.log("error");
  }
};

export const updateUser = async (params: CreateUser, id: string) => {
  try {
    const response = await axios.patch(
      `https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`,
      {
        ...params,
      }
    );
    return response;
  } catch (err) {
    console.log("error");
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await axios.delete(
      `https://blue-journalist-bbrpv.ineuron.app:4000/user/${id}`
    );
    return response;
  } catch (err) {
    console.log("error");
  }
};
