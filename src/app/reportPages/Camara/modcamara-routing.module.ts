import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MostrarOPComponent } from './BuscarOp/mostrarOp.component';

const routes: Routes = [
      { path: 'embarque', component:MostrarOPComponent  },
      
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportCamaraRoutingModule { }