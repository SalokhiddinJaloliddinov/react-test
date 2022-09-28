import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:7777",
});

export const UserRequest = {
  async getUserRequest() {
    const { data } = await instance.get("/user-request");
    return data;
  },
};
