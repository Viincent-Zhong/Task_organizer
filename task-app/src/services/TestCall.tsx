import axios from 'axios';

export function testCall(): Promise<any> {
  const url = 'http://localhost:3000/auth';
  return axios.get(url);
}