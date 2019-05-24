import { Routes } from '@angular/router';

import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AuthLayoutComponent} from './layouts/auth/auth-layout.component';
import {AuthGuard} from './_guards';
import {LoginComponent} from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { SpardhaDetail } from './spardha/spardhalist/spardhaBalakListPDF.component';
import { TopRankers } from './spardha/topRankers/toprankers.component';
import { Role } from './_models';

export const AppRoutes: Routes = [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
    }, {
    path: '',
    component: AdminLayoutComponent,
    children: [{
        path: '',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canActivate: [AuthGuard]
    }, {
        path: 'components',
        canActivate: [AuthGuard],
        loadChildren: './components/components.module#ComponentsModule'
    }, {
        path: 'forms',
        canActivate: [AuthGuard],
        loadChildren: './forms/forms.module#Forms'
    }, {
        path: 'tables',
        canActivate: [AuthGuard],
        loadChildren: './tables/tables.module#TablesModule'
    }, {
        path: 'spardha',
        canActivate: [AuthGuard],
        data: {roles: [Role.SUPER_ADMIN, Role.MARKSHEET_MANAGER, Role.VERIFICATION_MANAGER]},
        loadChildren: './spardha/spardha.module#SpardhaModule'
        },
        { path: 'spardhaDetail/:id', component: SpardhaDetail, canActivate: [AuthGuard]
            , data: { roles: [Role.SUPER_ADMIN, Role.VERIFICATION_MANAGER, Role.MARKSHEET_MANAGER] }},
        { path: 'topRenkars', component: TopRankers, canActivate: [AuthGuard]},
    {
        path: 'accomodation',
        canActivate: [AuthGuard],
        data: { roles: [Role.ACCOMMODATION_MANAGER, Role.SUPER_ADMIN] },
            loadChildren: './accomodation/accomodation.module#AccomodationModule'
    },
    {
        path: 'tables',
        canActivate: [AuthGuard],
        loadChildren: './tables/tables.module#TablesModule'
    }, {
        path: 'maps',
        canActivate: [AuthGuard],
        loadChildren: './maps/maps.module#MapsModule'
    }, {
        path: 'charts',
        canActivate: [AuthGuard],
        loadChildren: './charts/charts.module#ChartsModule'
    }, {
        path: 'calendar',
        loadChildren: './calendar/calendar.module#CalendarModule'
    }, {
        path: '',
        loadChildren: './userpage/user.module#UserModule'
    }, {
        path: '',
        loadChildren: './timeline/timeline.module#TimelineModule'
    }, {
        path: '',
        loadChildren: './widgets/widgets.module#WidgetsModule'
    }]
}, {
    path: '',
    component: AuthLayoutComponent,
    children: [{
        path: 'pages',
        loadChildren: './pages/pages.module#PagesModule'
    }]
},
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'register',
        component: RegisterComponent,
    }
];
