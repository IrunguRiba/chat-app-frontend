import { Routes } from '@angular/router';
import {SignIn} from './sign-in/sign-in'
import {Messages} from './messages/messages';
import {LoadingPage} from './loading-page/loading-page';
import { Register } from './sign-in/register/register';

export const routes: Routes = [
   
    {path: '', component: SignIn},
    {path:'register', component:Register},
    {path: 'messages', component: Messages},
    {path: 'loading-page', component: LoadingPage}
];

