import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { SaprdhaRoutes } from './spardha.routing';

import { SpardhalistComponent } from './spardhalist/spardhalist.component'; 



@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(SaprdhaRoutes),
        FormsModule
    ],
    declarations: [
        SpardhalistComponent
    ]
})

export class SpardhaModule {}
