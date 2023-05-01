
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportPagesComponent } from './reportPages.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReportPagesRoutingModule } from './reportPages-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [
        ReportPagesComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        ReactiveFormsModule,
        ReportPagesRoutingModule,
        SharedModule
    ],
    exports: [


    ]
})
export class ReportPagesModule { }
