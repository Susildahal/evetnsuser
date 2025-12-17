import axios from 'axios';
const serverurl = process.env.NEXT_PUBLIC_API_URL || "http://192.168.10.79:8000/api";
const axiosInstance= axios.create({
    baseURL: serverurl, // Replace with your API base URL
    timeout: 10000, // Optional: set a timeout for requests
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;
