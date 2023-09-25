import { API } from '@/configs/axios';

export const executeGetWithParams = async <T extends object>(path: string, requestParams: T) => {
    return await API.get(path, { params: requestParams });
};

export const executePostWithBody = async <T extends object>(path: string, data: T) => {
    return await API.post(path, { data });
};

export const executePutWithBody = async <T extends object>(path: string, data: T) => {
    return await API.put(path, { data });
};

export const executePostWithFormData = async (path: string, formData: FormData) => {
    return API.post(path, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
};
