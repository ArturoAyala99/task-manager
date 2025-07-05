import axios from "axios";

const baseURL = "http://127.0.0.1:8000/api/";

// estadarizamos las peticiones
const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request Interceptor
axiosInstance.interceptors.request.use(
    function(config){
        const access_token = localStorage.getItem('accessToken');

        if ( access_token ){
            config.headers['Authorization'] = `Bearer ${access_token}`
        }

        return config;
    },
    function(error){
        return Promise.reject(error);
    }
);

// Response Interceptor
axiosInstance.interceptors.response.use(
    function(response){
        return response;
    },
    async function(error){
        const originalRequest = error.config;

        // interceptamos el response
        if ( error.response.status === 401 && !originalRequest.retry ){
            originalRequest.retry = true; 

            // obtaining the refresh token that we set in Login.jsx
            const refresh_token = localStorage.getItem('refreshToken'); 
            try{

                const response = await axiosInstance.post('accounts/token/refresh/', { 
                    refresh: refresh_token
                });

                localStorage.setItem('accessToken', response.data.access);

                originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`;

                return axiosInstance(originalRequest)

            }catch(error){
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;