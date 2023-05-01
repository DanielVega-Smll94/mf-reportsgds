
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MostrarOPComponent } from './BuscarOp/mostrarOp.component';
import { ReportCamaraRoutingModule } from './modcamara-routing.module';
import { SharedModule } from "../../shared/shared.module";
import { MaterialModule } from 'src/app/shared/material.module';
import { DevExtremeElementsModule } from 'src/app/shared/devextreme.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [
        MostrarOPComponent
    ],
    exports: [],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        ReportCamaraRoutingModule,
        SharedModule,
        MaterialModule,
        DevExtremeElementsModule,
        HttpClientModule
    ]
})
export class ReportCamaraModule { }
