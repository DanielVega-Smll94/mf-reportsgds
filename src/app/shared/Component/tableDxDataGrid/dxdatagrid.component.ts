import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import { SharedFunctionsService } from 'src/app/core/services/shared-functions.service';
import { SpinnerComponent } from '../spinner/spinner.component';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dxdatagrid',
  templateUrl: './dxdatagrid.component.html',
  styleUrls: ['./dxdatagrid.component.scss']
})
export class DataGridComponent implements OnInit {
  @Input() dataSource!: any
  @Input() keyGrid!: string;// DataSource;
  @Input() columns!: any[];;
  @Input() defaultGroupBy!: string[];
  @Output() rowSelected: any = new EventEmitter<any>();// null;
  @Output() onActionClick = new EventEmitter<any>();
  @ViewChild(DxDataGridComponent, { static: false }) dataGrid!: DxDataGridComponent;
  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent
  defaultGroupingApplied = false;

  readonly allowedPageSizes = [10, 30, 50, 75, 100, 'all'];
  readonly displayModes = [{ text: "Display Mode 'full'", value: 'full' }, { text: "Display Mode 'compact'", value: 'compact' }];
  displayMode = 'full';
  showPageSizeSelector = true;
  showInfo = true;
  showNavButtons = true;
  columnsForFileExcel: string[] = []
  constructor(
    private sharedService: SharedFunctionsService,
    private toastr: ToastrService
  ) {

  }
  ngOnInit(): void {
  }
  applyDefaultGrouping($event: any) {
    if (!this.defaultGroupingApplied) {
      const grid = $event.component;
      const visibleColumns = grid.getVisibleColumns();
      console.log(visibleColumns)
      const groupConfig: any = [];
      visibleColumns.forEach((column: any) => {
        this.columnsForFileExcel.push(column.dataField)
        if (this.defaultGroupBy.includes(column.dataField)) {
          groupConfig.push(column.dataField);
        }
      });
      if (groupConfig.length > 0) {
        grid.columnOption(groupConfig[0], 'groupIndex', 0);
        if (groupConfig.length > 1) {
          grid.columnOption(groupConfig[1], 'groupIndex', 1);
        }
        grid.expandRow(['T1']);
      }
      this.defaultGroupingApplied = true;
    }
  }
  onExportingXLS() {
    this.spinner.showSpinner()
    this.sharedService.onExporting(this.dataGrid.instance, "embarque por OP", this.columnsForFileExcel, this);
  }
  infoDownloadFile(msj: string, status: boolean) {
    if (status)
      this.toastr.success(msj, "OK", { closeButton: true, progressBar: true, timeOut: 1200 })
    else
      this.toastr.warning(msj, "Advertencia", { closeButton: true, progressBar: true, timeOut: 1200 })
  }
  onButtonClick(event: any) {
    /* console.log(event)
    console.log(event.itemData)*/
    this.onActionClick.emit({ button: event.itemData, data: event.row.data });
  }
  onFocusedRowChanged(e: any) {
    const rowData = e.row && e.row.data;
    if (rowData) {
      this.rowSelected = rowData;
    }
  }
}