import Axios from 'axios';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LoginInfo } from '@models/LoginInfo.js';
import { ApiResponse } from '@models/ApiResponse.js';
import { type IAjaxCallbackOptions } from '@models/IAjaxCallbackOptions.js';

const checkLogin = async (credential: {
    Id: string,
    Password: string
}) => {
    const res = await Axios<ApiResponse<LoginInfo>>({
        method: "post",
        url: "/api/authenticate/check",
        data: credential,
        withCredentials: true,
        responseType: "json"
    });
    return res.data;
}

const getLoginInfo = async () => {
    const res = await Axios<ApiResponse<LoginInfo>>({
        method: "get",
        url: "/api/authenticate/getUserInfo",
        withCredentials: true,
        responseType: "json"
    });
    return res.data;
}

const logout = async () => {
    const res = await Axios<ApiResponse<string>>({
        method: "post",
        url: "/api/authenticate/logout",
        withCredentials: true,
        responseType: "json"
    });
    return res.data;
}

export const useCheckLogin = ({ onSuccess, onError }: IAjaxCallbackOptions<ApiResponse<LoginInfo>>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: checkLogin,
        onSuccess: async (data) => {
            if(onSuccess){
                await onSuccess(data);
                queryClient.invalidateQueries({ queryKey: ['login'] });
            }
        },
        onError: onError
    });
}

export const useGetLoginInfo = () => {
    return useQuery({
        queryKey: ['login'],
        queryFn: getLoginInfo
    });
}

export const useLogout = ({ onSuccess, onError }: IAjaxCallbackOptions<ApiResponse<string>>) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: logout,
        onSuccess: async (data) => {
            if(onSuccess){
                await onSuccess(data);
                queryClient.invalidateQueries({ queryKey: ['login'] });
            }
        },
        onError: onError
    });
}