import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Subject, throwError, tap, BehaviorSubject } from "rxjs";
import { Registeration } from "../model/registeration.model";
import { User } from "../model/user.model";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {


    user = new BehaviorSubject<any>(null);
    private tokenExipirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }

    // sign up method
    signUp(registrationData: Registeration) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCjrWktjZHwqCE19TN6tiFHdbuwhqwyqcg',
            {
                email: registrationData.email,
                password: registrationData.password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }


    // login method for authentication
    login(email: string, password: string) {

        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCjrWktjZHwqCE19TN6tiFHdbuwhqwyqcg',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            console.log('res', resData);
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn);
        }));
    }

    // common function for authenticating user
    private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {

        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

        const user = new User(email, userId, token, expirationDate);

        console.log(user);

        this.user.next(user);

        this.autoLogout(expiresIn * 1000);

        localStorage.setItem('userData', JSON.stringify(user));

    }

    // autoLog out method

    autoLogout(expirationDuration: number) {

        console.log('Token expired in', expirationDuration)

        this.tokenExipirationTimer = setTimeout(() => {

            this.logout();

        }, expirationDuration);
    }

    // logout function
    logout() {

        this.user.next(null);

        this.router.navigate(['/login']);

        localStorage.removeItem('userData');

        if (this.tokenExipirationTimer) {
            clearTimeout(this.tokenExipirationTimer);
        }

        this.tokenExipirationTimer = null;
    }

    // common function for handling errors
    private handleError(errorRes: HttpErrorResponse) {

        let errorMessage = 'An unkown error accured!';
        if (!errorRes.error) {
            return throwError(() => new Error(errorMessage));
        }

        switch (errorRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists!';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = 'This email doesnot exists!';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is not correct';
                break;
            case 'INVALID_LOGIN_CREDENTIALS':
                errorMessage = 'Email and password doesnot exists';
                break;
        }
        return throwError(() => new Error(errorMessage));
    }
}