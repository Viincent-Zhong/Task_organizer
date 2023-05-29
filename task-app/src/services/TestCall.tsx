import axios from 'axios';
import { BACKEND_URL } from '../constants'

export function testCall(): Promise<any> {
  const url = `${BACKEND_URL}/auth`;
  return axios.get(url, {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true // Set cookie in header
  });
}