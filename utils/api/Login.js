import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:7777',
});

export const UserApi = {
  async login(dto) {
    const { data } = await instance.post({ data: dto } > ('/auth', dto));
    return data;
  },
};
