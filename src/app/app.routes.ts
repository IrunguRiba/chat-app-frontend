import { Routes } from '@angular/router';
import {SignIn} from './sign-in/sign-in'
import {Messages} from './messages/messages';
// import {LoadingPage} from './loading-page/loading-page';
import { Register } from './sign-in/register/register';
import { Texts } from './messages/texts/texts';

export const routes: Routes = [
    
    {path:'', component:Register},
    {path: 'sign-in', component: SignIn},
    {path: 'messages', component: Messages,
    children:[
        {path: 'text', component: Texts},
    ]

},
    // {path: 'loading-page', component: LoadingPage}0
];

