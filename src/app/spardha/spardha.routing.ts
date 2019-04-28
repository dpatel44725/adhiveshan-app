import { Routes } from '@angular/router';

import { SpardhalistComponent } from './spardhalist/spardhalist.component';


export const SaprdhaRoutes: Routes = [{
        path: '',
        children: [{
            path: 'detail',
            component: SpardhalistComponent
        }]
    }
];
