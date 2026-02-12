import { HttpInterceptorFn, HttpRequest, HttpHandlerFn } from '@angular/common/http';

export const jwtokenInterceptor: HttpInterceptorFn = (req:HttpRequest<any>, next:HttpHandlerFn) => {

  debugger;

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
    return next(req)
  }
};
