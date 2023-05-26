import axios from 'axios';
import { BACKEND_URL } from '../constants'

export function testCall(): Promise<any> {
  const url = `${BACKEND_URL}/auth`;
  return axios.get(url);
}