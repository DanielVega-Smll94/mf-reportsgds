import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoAccessComponent } from './Component/noaccess/noaccess.component';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { DataGridComponent } from './Component/tableDxDataGrid/dxdatagrid.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { SpinnerComponent } from './Component/spinner/spinner.component';



@NgModule({
  declarations: [NoAccessComponent,DataGridComponent,SpinnerComponent
  ],
  imports: [
    CommonModule,DxDataGridModule,DxButtonModule,
    NgxSpinnerModule
  ],
  exports: [NoAccessComponent,DataGridComponent,SpinnerComponent]
})
export class SharedModule { }
