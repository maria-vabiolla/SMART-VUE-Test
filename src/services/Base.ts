// eslint-disable-next-line import/no-cycle
import axios from '@/plugins/axios';

class BaseService {
  baseURL = '';

  constructor(subURL = '') {
    this.baseURL = `${process.env.VUE_APP_BASE_URL}${subURL}`;
  }

  async get(params = ''): Promise<any[] | any> {
    const res = await axios.get(`${this.baseURL}?${params}`);
    return res.data;
  }

  async getOne(id, params = ''): Promise<any> {
    const res = await axios.get(`${this.baseURL}/${id}?${params}`);
    return res.data;
  }

  async post(payload: {}): Promise<any> {
    const res = await axios.post(`${this.baseURL}`, payload);
    return res.data;
  }

  async upload(payload: {}): Promise<any> {
    const res = await axios.post(`${this.baseURL}`, payload, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res;
  }

  async put(id, payload: {}): Promise<any> {
    const res = await axios.put(`${this.baseURL}/${id}`, payload);
    return res.data;
  }

  async delete(id: number): Promise<any> {
    const res = await axios.delete(`${this.baseURL}/${id}`);
    return res.data;
  }
}

export default BaseService;
