import {Component, OnInit, AfterViewInit, AfterViewChecked, AfterContentInit} from '@angular/core';
import {AuthenticationService} from '../_services';

import {Role} from '../_models/role';

const currentUser: any = JSON.parse(sessionStorage.getItem('currentUser'));

// Metadata
export interface RouteInfo {
    path: string;
    title: string;
    type: string;
    icontype: string;
    // icon: string;
    role: any;
    children?: ChildrenItems[];
}

export interface ChildrenItems {
    path: string;
    title: string;
    ab: string;
    type?: string;
}

// Menu Items
// const ROUTES_OLD: RouteInfo[] = [{
//     path: '/dashboard',
//     title: 'Dashboard',
//     type: 'link',
//     icontype: 'nc-icon nc-bank'
// }, {
//     path: '/topRenkars',
//     title: 'top Renkars',
//     type: 'link',
//     icontype: 'nc-icon nc-bank'
// },
//
//     {
//         path: '/spardha',
//         title: 'Spardha',
//         type: 'sub',
//         icontype: 'nc-icon nc-layout-11',
//         children: [
//             {path: 'detail', title: 'Saprdha Detail', ab: 'SD'}
//         ]
//     },
//     {
//         path: '/accomodation',
//         title: 'Accommodation',
//         type: 'sub',
//         icontype: 'nc-icon nc-layout-11',
//         children: [
//             {path: 'accomodation-info', title: 'Info', ab: 'IN'},
//             {path: 'accomodation', title: 'Accommodation', ab: 'AD'}
//         ]
//     },
//     // , {
//     //     path: '/components',
//     //     title: 'Components',
//     //     type: 'sub',
//     //     icontype: 'nc-icon nc-layout-11',
//     //     children: [
//     //         {path: 'buttons', title: 'Buttons', ab: 'B'},
//     //         {path: 'grid', title: 'Grid System', ab: 'GS'},
//     //         {path: 'panels', title: 'Panels', ab: 'P'},
//     //         {path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA'},
//     //         {path: 'notifications', title: 'Notifications', ab: 'N'},
//     //         {path: 'icons', title: 'Icons', ab: 'I'},
//     //         {path: 'typography', title: 'Typography', ab: 'T'}
//     //     ]
//     // }, {
//     //     path: '/forms',
//     //     title: 'Forms',
//     //     type: 'sub',
//     //     icontype: 'nc-icon nc-ruler-pencil',
//     //     children: [
//     //         {path: 'regular', title: 'Regular Forms', ab: 'RF'},
//     //         {path: 'extended', title: 'Extended Forms', ab: 'EF'},
//     //         {path: 'validation', title: 'Validation Forms', ab: 'VF'},
//     //         {path: 'wizard', title: 'Wizard', ab: 'W'}
//     //     ]
//     // }, {
//     //     path: '/tables',
//     //     title: 'Tables',
//     //     type: 'sub',
//     //     icontype: 'nc-icon nc-single-copy-04',
//     //     children: [
//     //         {path: 'regular', title: 'Regular Tables', ab: 'RT'},
//     //         {path: 'extended', title: 'Extended Tables', ab: 'ET'},
//     //         {path: 'datatables.net', title: 'Datatables.net', ab: 'DT'}
//     //     ]
//     // }, {
//     //     path: '/maps',
//     //     title: 'Maps',
//     //     type: 'sub',
//     //     icontype: 'nc-icon nc-pin-3',
//     //     children: [
//     //         {path: 'google', title: 'Google Maps', ab: 'GM'},
//     //         {path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM'},
//     //         {path: 'vector', title: 'Vector Map', ab: 'VM'}
//     //     ]
//     // }, {
//     //     path: '/widgets',
//     //     title: 'Widgets',
//     //     type: 'link',
//     //     icontype: 'nc-icon nc-box'
//
//     // }, {
//     //     path: '/charts',
//     //     title: 'Charts',
//     //     type: 'link',
//     //     icontype: 'nc-icon nc-chart-bar-32'
//
//     // }, {
//     //     path: '/calendar',
//     //     title: 'Calendar',
//     //     type: 'link',
//     //     icontype: 'nc-icon nc-calendar-60'
//     // }, {
//     //     path: '/pages',
//     //     title: 'Pages',
//     //     type: 'sub',
//     //     icontype: 'nc-icon nc-book-bookmark',
//     //     children: [
//     //         {path: 'timeline', title: 'Timeline Page', ab: 'T'},
//     //         {path: 'user', title: 'User Page', ab: 'UP'},
//     //         {path: 'login', title: 'Login Page', ab: 'LP'},
//     //         {path: 'register', title: 'Register Page', ab: 'RP'},
//     //         {path: 'lock', title: 'Lock Screen Page', ab: 'LSP'}
//     //     ]
//     // },
// ];
const ROUTES_ARR: RouteInfo[] = [{
        path: '/dashboard',
        title: 'Dashboard',
        type: 'default',
        role: '',
        icontype: 'nc-icon nc-bank'
    },
    {
        path: '/topRenkars',
        title: 'top Renkars',
        role: [Role.SUPER_ADMIN],
        type: 'link',
        icontype: 'nc-icon nc-bank'
    },
    {
        children: [],
        role: [Role.MARKSHEET_MANAGER, Role.SUPER_ADMIN],
        path: '/spardha/detail',
        title: 'Spardha',
        type: 'link',
        icontype: 'nc-icon nc-layout-11'
        /*children: [
            {path: 'detail', title: 'Saprdha Detail', ab: 'SD'}
        ]*/
    },
    {
        path: '/accomodation',
        role: [Role.ACCOMMODATION_MANAGER, Role.SUPER_ADMIN],
        title: 'Accommodation',
        type: 'sub',
        icontype: 'nc-icon nc-layout-11',
        children: [
            {path: 'accomodation-info', title: 'Info', ab: 'IN'},
            {path: 'accomodation', title: 'Accommodation', ab: 'AD'}
        ]
    },
];
// if (currentUser != null && currentUser.user_role !== undefined) {
//     switch (currentUser.user_role) {
//         case Role.MARKSHEET_MANAGER:
//             ROUTES_ARR.push({
//                 children: [],
//                 role: Role.MARKSHEET_MANAGER,
//                 path: '/spardha/detail',
//                 title: 'Spardha',
//                 type: 'link',
//                 icontype: 'nc-icon nc-layout-11'
//                 /*children: [
//                     {path: 'detail', title: 'Saprdha Detail', ab: 'SD'}
//                 ]*/
//             });
//             break;
//         case Role.ACCOMMODATION_MANAGER:
//             ROUTES_ARR.push({
//                 path: '/accomodation',
//                 role: Role.ACCOMMODATION_MANAGER,
//                 title: 'Accommodation',
//                 type: 'sub',
//                 icontype: 'nc-icon nc-layout-11',
//                 children: [
//                     {path: 'accomodation-info', title: 'Info', ab: 'IN'},
//                     {path: 'accomodation', title: 'Accommodation', ab: 'AD'}
//                 ]
//             });
//             break;
//         case Role.SUPER_ADMIN:
//             ROUTES_ARR.push(
//                 {
//                     path: '/topRenkars',
//                     title: 'top Renkars',
//                     role: Role.SUPER_ADMIN,
//                     type: 'link',
//                     icontype: 'nc-icon nc-bank'
//                 },
//                 {
//                     path: '/spardha/detail',
//                     title: 'Spardha',
//                     role: Role.SUPER_ADMIN,
//                     type: 'link',
//                     icontype: 'nc-icon nc-layout-11',
//                 },
//                 {
//                     path: '/accomodation',
//                     title: 'Accommodation',
//                     type: 'sub',
//                     role: Role.SUPER_ADMIN,
//                     icontype: 'nc-icon nc-layout-11',
//                     children: [
//                         {path: 'accomodation-info', title: 'Info', ab: 'IN'},
//                         {path: 'accomodation', title: 'Accommodation', ab: 'AD'}
//                     ]
//                 }
//             );
//             break;
//     }
// }
export const ROUTES: RouteInfo[] = [...ROUTES_ARR];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    currentUser: any;
    Role: Role;

    constructor(private authenticationService: AuthenticationService) {
        this.currentUser = authenticationService.currentUserValue;
    }

    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
