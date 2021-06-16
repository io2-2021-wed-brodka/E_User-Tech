import {Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {BikesComponent} from "./bikes/bikes-component";
import {StationsComponent} from "./stations/stations.component";
import {RegisterComponent} from "./register/register-component";
import {AuthGuard} from "./common/guards/auth-guard";
import {BlockedBikesComponent} from "./blockedBikes/blockedBikes.component";
import {MalfunctionsComponent} from "./malfunctions/malfunctions.component";
import {ContactComponent} from './contact/contact.component';

export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {
        path: 'start',
        component: MainComponent,
        canActivate: [AuthGuard],
        canActivateChild: [AuthGuard],
        children: [
            {
                path: 'bikes',
                component: BikesComponent
            },
            {
                path: 'stations',
                component: StationsComponent
            },
            {
                path: 'contact',
                component: ContactComponent
            },
            {
                path: 'blockedBikes',
                component: BlockedBikesComponent
            },
            {
                path: 'malfunctions',
                component: MalfunctionsComponent
            },
        ]
    },
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];

