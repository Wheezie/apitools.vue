import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Subject, Observable } from 'rxjs';
import { AuthenticationStatus } from '../enums/AuthenticationStatus';
import { TokenResponse } from '@/models/authentication/TokenResponse';
import { AuthenticationRequest } from '@/models/authentication/AuthenticationRequest';

const STORAGE_API_TOKEN = "apitools_token";

class ApiService {
    private _http = axios.create({
        baseURL: process.env.VUE_APP_API_BASEURL,
        headers: {
            "content-type": "application/json"
        }
    });
    private _authentication: Subject<AuthenticationStatus>;
    private _authentication$: Observable<AuthenticationStatus>;

    constructor() {
        this._authentication = new Subject<AuthenticationStatus>();
        this._authentication$ = this._authentication.asObservable();
    }

    /* Authentication */
    get authentication() {
        return this._authentication$;
    }

    login(username: string, password: string) {
        const authRequest: AuthenticationRequest = {
            username: username,
            password: password
        };

        this.post<TokenResponse>('auth/login', authRequest)
            .then(response => {
                if (response.status == 200) {
                    this.setAuthenticationToken(response.data.token);
                }
            }, _ => this.clearAuthenticationToken());

            
        return this._authentication$;
    }

    logout() {
        this.post<TokenResponse>('auth/signout', null)
            .then(_ => this.clearAuthenticationToken());
    }

    verify() {
        this.get<TokenResponse>('auth/checkin')
            .then(response => {
                if (response.status == 200) {
                    this.setAuthenticationToken(response.data?.token);
                }
            });
    }

    /* REST functionality */
    get<T>(uri: string, options?: AxiosRequestConfig | undefined) {
        return this._http.get<T>(uri, options)
            .then(response => this.checkResponseErrors<T>(response));
    }
    
    post<T>(uri: string, data: any, options?: AxiosRequestConfig | undefined) {
        return this._http.post<T>(uri, data, options)
            .then(response => this.checkResponseErrors<T>(response));
    }

    put<T>(uri: string, data: any, options?: AxiosRequestConfig | undefined) {
        return this._http.put<T>(uri, data, options)
            .then(response => this.checkResponseErrors<T>(response));
    }
    
    patch<T>(uri: string, options?: AxiosRequestConfig | undefined) {
        return this._http.patch<T>(uri, options)
            .then(response => this.checkResponseErrors<T>(response));
    }
    
    delete<T>(uri: string, options?: AxiosRequestConfig | undefined) {
        return this._http.delete<T>(uri, options)
            .then(response => this.checkResponseErrors<T>(response));
    }

    /* Private */
    private checkResponseErrors<T>(response: AxiosResponse<T>) {
        switch (response.status)
        {
            case 401:
                this.clearAuthenticationToken();
                break;
        }

        return response;
    }

    private setAuthenticationToken(token: string) {
        if (token != null) {
            this._http.defaults.headers["authorization"] = token;
            localStorage.setItem(STORAGE_API_TOKEN, token);
            this._authentication.next(AuthenticationStatus.Authenticated);
        } else {
            const token = localStorage.getItem(STORAGE_API_TOKEN);
            if (token != null) {
                this._http.defaults.headers["authorization"] = token;
                this._authentication.next(AuthenticationStatus.Authenticated);
            }
        }
    }

    private clearAuthenticationToken() {
        localStorage.removeItem(STORAGE_API_TOKEN);
        delete this._http.defaults.headers["authorization"];
        this._authentication.next(AuthenticationStatus.Unauthenticated);
    }
};

export default new ApiService();