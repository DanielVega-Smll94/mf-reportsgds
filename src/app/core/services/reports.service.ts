import { Injectable } from '@angular/core';
import { filterEmbarque } from '../interfaces/filter';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { environment } from 'src/environments/environment';
import { rptEmbarque } from '../interfaces/Embarque/embarque';
import { Observable, catchError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  apiReportes = environment.apiReportes;

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {

  }

  public getCodigoOPEmbarque(filter: filterEmbarque):Observable<any> {
    const params: HttpParams = new HttpParams({
      fromObject: { ...filter },
    });
    
    // return this.httpClient.get<rptEmbarque[]>('http://localhost:3000/op')
    return this.httpClient.get<rptEmbarque[]>(this.apiReportes.concat('gdsCsetqCodigosxOrden/consultaCodOp'),{params})
    .pipe(catchError((error) => {
      this.spinner.hide();
      this.toastr.error(error.message,'Error')
      throw new Error('Error de conexion con el servidor');
    }));
  }

}
