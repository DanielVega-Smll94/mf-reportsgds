import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { DxDataGridComponent } from 'devextreme-angular';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import notify from 'devextreme/ui/notify';
import { NgxSpinnerService } from 'ngx-spinner';
import { respuestaEmbarque, rptEmbarque } from 'src/app/core/interfaces/Embarque/embarque';
import { ReportsService } from 'src/app/core/services/reports.service';
import { actionsForm } from 'src/app/core/interfaces/actions';
import { CustomValidatorService } from 'src/app/core/functions/customValidatorServ';
import { SpinnerComponent } from 'src/app/shared/Component/spinner/spinner.component';
import { CommonService } from 'src/app/core/services/common.service';
@Component({
  selector: 'app-mostrarOp',
  templateUrl: './mostrarOp.component.html',
  styleUrls: ['./mostrarOp.component.scss']
})

export class MostrarOPComponent implements OnInit, AfterViewInit, actionsForm {
  @ViewChild(SpinnerComponent) spinner!: SpinnerComponent
  dataSourceOP!: respuestaEmbarque;
  respuestarptEmbarque!: rptEmbarque;
  isVisibleFilter: boolean = true;
  searchDatasourceForm!: FormGroup;
  defaultGroupBy = [
    'loteMarcado',
    'codigoProducto'
  ];
  usuario: string | null = null;
  etiquetas: any = [] = [];
  showComponent: boolean = false;
  constructor(private fb: FormBuilder, private reporteriaSrv: ReportsService, private toastr: ToastrService,
    public validatorsServ: CustomValidatorService, private router: Router, private commonServ: CommonService) {
    router.events.subscribe((urlPath: any) => {

      let url = this.commonServ.getPathURL2(urlPath.url)
      /* console.log(url,urlPath.url) */
      if (url) {//&& url == 'productos') {
        this.commonServ.getPermisoById('embarque-op');
        const objectRetrieved = localStorage.getItem("etiquetas") ?? '';
        if (objectRetrieved != undefined || objectRetrieved != "") {
          let objetoPermiso = objectRetrieved ? JSON.parse(objectRetrieved) : {};
          if (objetoPermiso.path === 'embarque-op') {
            this.etiquetas = objetoPermiso.eventos;
          }
        }
      }
    })
    this.searchDatasourceForm = this.fb.group({
      cod: [null, Validators.compose([Validators.required])!],
      user: [null, Validators.compose([Validators.nullValidator])!],
    });

  }
  searchData(): void {
    if (this.searchDatasourceForm.invalid) {
      this.toastr.warning('Debe ingresar el código de embarque', 'Advertencia',
        { progressBar: true, timeOut: 1000, closeButton: true });

      return
    }
    this.spinner.showSpinner();
    this.reporteriaSrv.getCodigoOPEmbarque(this.searchDatasourceForm.value).subscribe((data) => {
      const list = data.resp[0].codesList
      console.log(data)
      console.log(this.dataSourceOP)
      this.spinner.hideSpinner();
      if (list.length > 0) {
        this.dataSourceOP = data.resp[0]
      } else {
        const varInit: respuestaEmbarque = {
          codesGroup: [], codConte: "", codesList: []
        }
        this.dataSourceOP = varInit
        this.toastr.warning('No se encontraron datos', 'Advertencia')
      }
    }, (error) => {
      this.spinner.hideSpinner();
      this.toastr.error(error.message, 'Error')
    })

  }
  ngAfterViewInit(): void {
  }

  minimizeFilters(): void {
    this.isVisibleFilter = !this.isVisibleFilter
  }
  ngOnInit(): void {

    if (localStorage.getItem("etiquetas") && localStorage.getItem("localstorage") && localStorage.getItem("bearer")) {
      this.showComponent = true
      this.usuario = null; //localStorage.getItem("user") ?? "";
      this.searchDatasourceForm.patchValue({ user: this.usuario })
    };
  }
}
