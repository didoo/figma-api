import { AxiosResponse, Method as AxiosMethod } from 'axios';
export declare function toQueryParams(x: any): string;
export declare type Disposer = () => void;
export declare class ApiError extends Error {
    response: AxiosResponse;
    constructor(response: AxiosResponse, message?: string);
}
export declare type ApiRequestMethod = <T>(url: string, opts?: {
    method: AxiosMethod;
    data: string;
}) => Promise<T>;
