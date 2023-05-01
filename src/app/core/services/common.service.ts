import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import Swal from "sweetalert2";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";

@Injectable({
    providedIn: 'root'
  })
  export class CommonService {
  
      private data$ = new BehaviorSubject<any>({});
      selectedData$ = this.data$.asObservable();

    constructor(private http: HttpClient) { }

    setDatosToForm(elemento: any) {
        this.data$.next(elemento);
      }
    resetData() {
        this.data$.next(null);
    }

    notifications(msg:string):Observable<any> {
      return new Observable(observer => {
        Swal.fire({
          icon: "warning",
          title: `Advertencia`,
          text: msg,
          allowOutsideClick: false,
          showCancelButton: true,
          confirmButtonText: "SI",
          confirmButtonColor: "#3B82F6",
          cancelButtonText: "NO",
        }).then((result) => {
          if (result.isConfirmed){
            observer.next(true);
            observer.complete();
          }else{
            observer.next(false);
            observer.complete();
          }
        })
      })
    }


    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      /* console.log(route, state) */
      return true
    }
  
    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
      return this.canActivate(route, state);
    }
  
    appendAuthHeader(contentType: string = "application/json"): HttpHeaders {
      const Bearer = localStorage.getItem('bearer') ?? '';
      const bearerToken = JSON.parse(Bearer)
  
      let headers = new HttpHeaders({
        'Content-Type': contentType,
        'Authorization': `Bearer ${bearerToken}`,
      });
      return headers;
    }
  
    getRequestOptions(urlParams?: HttpParams, body?: any): any {
      let options: any = {
        headers: this.appendAuthHeader()
      };
  
      if (urlParams != null && urlParams != undefined)
        options['params'] = urlParams;
  
      if (body != null && body != "" && body != undefined)
        options['body'] = body
  
      return options;
    }
  
    sendInformationToApiGateway(url: string, method: string, urlParams?: HttpParams, body?: any): Observable<any> {
      let httpOptions = this.getRequestOptions(urlParams, body);
      return this.http.request(method, url, httpOptions);
    }

    getPathURL2(urlPath: any) {
      if (urlPath) {
        const urlSplit = urlPath.split("/")
        /* console.log(urlSplit) */
        return urlSplit[2];
      }
    }

    getPathURLByPosition(urlPath: any,position:number) {
      if (urlPath) {
        const urlSplit = urlPath.split("/")
        return urlSplit[position];
      }
    }
  
    getPathURL(urlPath: any) {
      if (urlPath) {
        const urlSplit = urlPath.split("/")
        return urlSplit[1];
      }
    }
    getPathURLByParams(urlPath:any){
      if (urlPath) {
        const urlSplit = urlPath.split("?")
        const nuevoUrlSplit = urlSplit[0]
        const urlSplit2 = nuevoUrlSplit.split("/")
        return urlSplit2[1]
      }
    }
  
    validarRutasHijas(pathChilds: string, lista: any[]) {
      if (lista && pathChilds) {
        let listaPath = lista.filter(permiso => permiso.method === pathChilds)
        if (listaPath) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  
    getRutasHijas(lista: any[], path: string): any {
      if (lista && path) {
        let listaPath: any[] = lista.find((permiso: any) => permiso.method === path)
        return listaPath;
      }
    }
  
    getPermisoById(path: string) {
      const objectRetrieved = localStorage.getItem('localstorage') ?? '';
      let objectListFrontend: any = null;
      if (objectRetrieved != '') {
        objectListFrontend = JSON.parse(objectRetrieved);
        this.obtenerRutas(path,objectListFrontend);
      }
    }
  
    getURLBackByReference(idReference: string | number) {
      const objectRetrieved = localStorage.getItem('localstorage') ?? '';
      let objectListBackend: any[] = []
  
      if (objectRetrieved != '')
        objectListBackend = JSON.parse(objectRetrieved).backend
  
      return objectListBackend.find((back: any) => back.reference == idReference)
    }

    obtenerRutas(path: string, objectListFrontend: any) {
      const otrasRutas = objectListFrontend.otrasRutas
      let rutasHijas = this.validarRutasHijas(path, otrasRutas);
      if(objectListFrontend.method==path){
        const permisolog = {eventos:objectListFrontend.eventos,path: objectListFrontend.method};
        localStorage.setItem("etiquetas", JSON.stringify(permisolog));
      }
      if(objectListFrontend.method!=path){
        if (rutasHijas) {
          const permisos = this.getRutasHijas(otrasRutas, path);
          if (permisos != undefined) {
            const eventos = { eventos: permisos.eventos, path: path };
            localStorage.setItem("etiquetas", JSON.stringify(eventos));
            /* this.eventosComponentes.setDatosPermisosChilds(eventos); */
            /* console.log(permisos.eventos, path) */
          }
        }
      }
  
    }
    verificarPermiso($event: any, etiquetas: any[]): boolean {
      if (etiquetas) {
        let permisos: any[] = etiquetas;
        let valor = permisos.find((element: any) => element.idEvento == $event)
        if (valor) {
          let valuePermiso = valor.permit
          const permiso = JSON.parse(valuePermiso)
          if (permiso) {
            return permiso
          } else {
            return false
          }
        } else {
          return false
        }
      } else {
        return false
      }
    }
    sendInformationToApiPutGateway(url: string, body: any, urlParams?: HttpParams): Observable<any> {
      let httpOptions = this.getRequestOptions(urlParams, undefined);
      return this.http.put(url, body, httpOptions);
    }
}  

