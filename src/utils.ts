import { AxiosError, Method as AxiosMethod, AxiosRequestConfig } from 'axios';

export function toQueryParams(x: any): string {
    if (!x) return '';
    return Object.entries(x).map(([ k, v ]) => (
        k && v && `${k}=${encodeURIComponent(v as any)}`
    )).filter(Boolean).join('&')
}

export type Disposer = () => void;

export class ApiError extends Error {
    constructor(
        public error: AxiosError,
    ) {
        super(error.message);
        this.name = 'ApiError';
        // Maintains proper stack trace for where our error was thrown (only available on V8)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, ApiError);
        }
    }
}

export type ApiRequestMethod = <T>(url: string, opts?: { method: AxiosMethod, data: AxiosRequestConfig["data"] }) => Promise<T>;
