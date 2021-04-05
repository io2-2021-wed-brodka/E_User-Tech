import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {BikesComponent} from "./bikes/bikes-component";

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: '', redirectTo: '/', pathMatch: 'full'},
    {
        path: 'start',
        component: MainComponent,
        children: [
            {
                path: 'bikes',
                component: BikesComponent
            }
        ]
    },
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

