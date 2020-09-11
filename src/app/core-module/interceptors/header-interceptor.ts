import { Injectable } from "@angular/core";
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from "rxjs/operators";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";
import { environment } from '../../../environments/environment';

@Injectable()

export class CommonHttpService {
    API_URL = environment.base_URL;

    constructor(private http: HttpClient) { }

    get<T>(url: string): Observable<T> {
        return this.http.get<T>(this.API_URL + url);
    }

    post<T>(url: string, body: any): Observable<T> {
        return this.http.post<T>(this.API_URL + url, body);
    }

    put<T>(url: string, body: any): Observable<T> {
        return this.http.put<T>(this.API_URL + url, body);
    }

    delete<T>(url: string): Observable<T> {
        return this.http.delete<T>(this.API_URL + url);
    }

    patch<T>(url: string, body: any): Observable<T> {
        return this.http.patch<T>(this.API_URL + url, body);
    }
    
}

@Injectable()

export class HeadParInterceptor implements HttpInterceptor {

    constructor(private _toastr: ToastrService, private spinner: NgxSpinnerService) { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler): Observable<HttpEvent<any>> {
        // if (localStorage.getItem('client_secret')) {
            const req = request.clone({
                headers: new HttpHeaders({
                    'client_secret': "915961CD8EC45C16C65EB07DC376D2BC24B81B7E5D9402CC0936185BF8C7E295",
                })
            });

            return next.handle(req).pipe(
                tap((event: HttpEvent<any>) => {
                    let err_msg = '';
                    this.spinner.show();
                    if (event instanceof HttpResponse) {
                        if (event.body && event.body.result) {
                            this.spinner.hide();
                        }
                        if (event.body && event.body.error) {
                            this.spinner.hide();
                            err_msg = event.body.error.msg;
                            this._toastr.error(err_msg);
                        }
                    }
                }), catchError((err: any) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === 400) {
                            if (err.error) {
                                this._toastr.error(err.error.message);
                                this.spinner.hide();
                            }
                        }
                        if (err.status === 401) {
                            localStorage.clear();
                            if (!environment.production) {
                                window.location.replace('/login');
                                this.spinner.hide();
                            }
                        }
                        if (err.status === 500) {
                            if (err.error) {
                                this._toastr.error(err.error.error.msg, 'Something went wrong!');
                                this.spinner.hide();
                            }
                        }
                        if (err.status === 0) {
                            this._toastr.error("Please check your internet connection.");
                            this.spinner.hide();
                        }
                    }
                    return of(err);
                })
            )
        // }
        // else {
        //     const updatedRequest = request.clone({});
        //     return next.handle(updatedRequest).pipe(
        //         tap((event: HttpEvent<any>) => {
        //             let err_msg = '';
        //             this.spinner.show();
        //             if (event instanceof HttpResponse) {
        //                 if (event.body && event.body.result) {
        //                     this.spinner.hide();
        //                 }
        //                 if (event.body && event.body.error) {
        //                     this.spinner.hide();
        //                     err_msg = event.body.error.msg;
        //                     this._toastr.error(err_msg, 'Error', {
        //                         closeButton: true
        //                     });
        //                 }
        //             }
        //         }), catchError((err: any) => {
        //             if (err instanceof HttpErrorResponse) {
        //                 if (err.status === 400) {
        //                     if (err.error) {
        //                         this._toastr.error(err.error.error.msg);
        //                         this.spinner.hide();
        //                     }
        //                 }
        //                 if (err.status === 401) {
        //                     localStorage.clear();
        //                     if (!environment.production) {
        //                         window.location.replace('/login');
        //                         this.spinner.hide();
        //                     }
        //                 }
        //                 if (err.status === 500) {
        //                     if (err.error) {
        //                         this._toastr.error(err.error.error.msg, 'Something went wrong!');
        //                         this.spinner.hide();
        //                     }
        //                 }
        //                 if (err.status === 0) {
        //                     this._toastr.error("Please check your internet connection.");
        //                     this.spinner.hide();
        //                 }
        //             }
        //             return of(err);
        //         })
        //     )
        // }
    }
}