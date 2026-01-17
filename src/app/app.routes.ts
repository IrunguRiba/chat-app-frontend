import { Routes } from '@angular/router';
import {SignIn} from './sign-in/sign-in'
import {Messages} from './messages/messages'

export const routes: Routes = [
    {path: '', component: SignIn},
    {path: 'messages', component: Messages}
];

