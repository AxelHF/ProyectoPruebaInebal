import axios, { AxiosInstance, AxiosRequestConfig, AxiosError, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { GENERAL_CONSTANTS } from '../utils/Constants.ts';

const instance: AxiosInstance = axios.create({
  baseURL: GENERAL_CONSTANTS.BASE_URL,
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  withCredentials: true,
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig<any>) => {
    try {
      const configuration = await AsyncStorage.getItem('configuration');
      const storage = JSON.parse(configuration || '{}');
      if (storage?.encodetoken) {
        config.headers['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtYWlsIjoibWluZWNyYWZ0ZXJvc2ZvcmV2ZXIiLCJpYXQiOjE2MzY2NDY1NDZ9.kyTKHv2QbwwdWjjyUxmkIxzBnzq47_P6e1GgMqDoXpY';
        //config.headers['token'] = `${storage.encodetoken}`;
      }
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error: AxiosError) => {
    const { config, response } = error;
    if (response && response.status === 401) { }
    return Promise.reject(error);
  },
);

export default instance;