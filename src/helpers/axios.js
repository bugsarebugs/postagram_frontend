import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh"
import  useUserActions  from "@/hooks/user.actions";

const axiosService = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type" : "application/json",
    },
}); 

axiosService.interceptors.request.use(async (config) => {
    /**
     * Retrieving the access token from the localstorage and 
     * adding it to the headers of the request
     * 
     */
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth?.access){
        config.headers.Authorization = `Bearer ${auth.access}`;
    }
    return config;
}); 

axiosService.interceptors.response.use(
    (res) => Promise.resolve(res),
    (err) => Promise.reject(err),
);

const refreshAuthLogic = async (failedRequest) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    const refresh = auth?.refresh;
    return axios.post("/auth/refresh/", null, {
        baseURL: process.env.NEXT_PUBLIC_API_URL + "/api",
        headers : {
            Authorization : `Bearer ${useUserActions.getRefreshToken(refresh)}`,
        },
    }).then((resp) => {
        const { access, refresh, user } = resp.data;
        failedRequest.response.config.headers["Authorization"] = "Bearer " + access;
        localStorage.setItem("auth", JSON.stringify({ access, refresh, user }));
    }).catch(() => {
        localStorage.removeItem("auth");
    });
};

createAuthRefreshInterceptor(axiosService, refreshAuthLogic);

export function fetcher(url){
    return axiosService.get(url).then((res) => res.data);
}
export default axiosService;