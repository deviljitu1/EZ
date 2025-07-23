// D:\Users\Nahush Patel\Shopez-main\Shopez-main\Server\Frontend\src\api\axios.js

import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://shopez-2-78dv.onrender.com/api',
  withCredentials: false, // Set to true only if using cookies/sessions
});

export default axiosInstance;
