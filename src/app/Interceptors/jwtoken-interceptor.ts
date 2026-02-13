import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
export const jwtokenInterceptor: HttpInterceptorFn = (req:HttpRequest<any>, next:HttpHandlerFn) => {

  const router = inject(Router);

  const userToken= localStorage.getItem('token');

  const excludedUrls = ['login', 'new'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (userToken && !isExcluded){
    const newRequest= req.clone({
      setHeaders:{
Authorization: `Bearer ${userToken}`
      }
    })
    return next(newRequest);
  } else{
    router.navigate(['/sign-in']);
    return next(req)
  }
};
