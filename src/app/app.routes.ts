import { Routes } from '@angular/router';
import {SignIn} from './sign-in/sign-in'
import {Messages} from './messages/messages';
import {LoadingPage} from './loading-page/loading-page';

export const routes: Routes = [
    {path: '', component: SignIn},
    {path: 'messages', component: Messages},
    {path: 'loading-page', component: LoadingPage}
];

