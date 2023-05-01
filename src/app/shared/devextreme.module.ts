import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DevExtremeModule, DxButtonModule, DxDataGridModule, DxFormModule, DxTemplateModule } from 'devextreme-angular';


@NgModule({
  imports: [
    CommonModule,
    DxTemplateModule,
    DevExtremeModule,
    DxFormModule,
    DxDataGridModule,
    DxButtonModule,
  ],
  exports: [
    DxTemplateModule,
    DevExtremeModule,
    DxFormModule,
    DxDataGridModule,
    DxButtonModule,
  ]
})
export class DevExtremeElementsModule { }
