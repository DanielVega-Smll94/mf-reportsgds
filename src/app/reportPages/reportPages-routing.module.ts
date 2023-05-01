
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReportPagesComponent } from './reportPages.component';

const routes: Routes = [
    {
        path: '', component:ReportPagesComponent,
        children: [
            // { path: 'camara', loadChildren: () => import('./Camara/modcamara.module').then(m => m.ReportCamaraModule) },
        ]


    }]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportPagesRoutingModule { }
