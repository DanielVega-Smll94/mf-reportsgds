export interface rptEmbarque {
    resp: respuestaEmbarque[],
    stringCodResp: string;
    intCodResp: any;
}

export interface respuestaEmbarque {
    codesGroup: codesGroups[],
    codConte: string;
    codesList: codeLists[]
}

export interface codesGroups {
    totalCod: number;
    loteMarcado: string;
    codigoProducto: string;

}
export interface codeLists {
    opProduccion: string;
    codigoBarra: string;
    tipo: string;
    loteMarcado: string;
    talla: string;
    lote: string;
    fila: number;
    codigoProducto: string;
    tipoCodigo: string;
}