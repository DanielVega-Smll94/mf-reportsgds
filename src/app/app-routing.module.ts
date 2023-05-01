import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // { path: 'noaccess', loadChildren: () => import('./shared/noaccess/noaccess.module').then(m => m.NoaccessModule) },
  // { path: 'reportes', loadChildren: ()=> import('./reportPages/reportPages.module').then(m=> m.ReportPagesModule)}
  { path: 'rptCamaragds', loadChildren: ()=> import('./reportPages/Camara/modcamara.module').then(m=> m.ReportCamaraModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
