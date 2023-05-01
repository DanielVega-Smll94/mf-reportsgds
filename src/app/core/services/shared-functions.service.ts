import { Injectable, ViewChild } from '@angular/core';
import Swal from "sweetalert2";
import { exportDataGrid as exportDataExcel } from 'devextreme/excel_exporter';
import * as saveAs from 'file-saver';
import * as ExcelJS from 'exceljs';
import { SpinnerComponent } from 'src/app/shared/Component/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SharedFunctionsService {

  constructor() { }

  onExporting(dataGrid: any, tipo: string, columnsHeaders: string[], context: any, fechaInicio?: string, fechaFin?: string, existMasterDetail?: boolean, nameDatafieldDetail?: string, dataFieldperRegister?: string) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Seguimiento de' + tipo);
    let masterDataDetail: any[] = [];
    let masterColumnsheader: any[] = [];
    let masterDataFieldColumns: any[] = [];
    exportDataExcel({
      component: dataGrid,
      worksheet: worksheet,
      topLeftCell: { row: fechaInicio && fechaFin ? 6 : 4, column: 1 },

      customizeCell: function (options) {
        const excelCell = options;
        excelCell.excelCell.border = {
          top: { style: 'thin' },
          bottom: { style: 'thin' },
          left: { style: 'thin' },
          right: { style: 'thin' }
        };

        excelCell.excelCell.fill = {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: 'FFFFFF' },
          bgColor: { argb: 'FFFFFF' }
        };

        excelCell.excelCell.font = { fontSize: 10, font: 'helvetica', bold: false, color: { argb: '000000' } };
        excelCell.excelCell.alignment = { vertical: 'center' };

        if (excelCell.gridCell?.rowType === 'header') {
          excelCell.excelCell.fill.fgColor.argb = 'FFFF00';
          excelCell.excelCell.border.top.style = 'thick';
          excelCell.excelCell.border.left.style = 'thick';
          excelCell.excelCell.border.right.style = 'thick';
          excelCell.excelCell.border.bottom.style = 'thick';
          excelCell.excelCell.font.bold = true;
          excelCell.excelCell.alignment.horizontal = 'center';
        }

        else if (excelCell.gridCell?.rowType === 'data') {
          if (excelCell.excelCell._value?.type === 4) {
            excelCell.excelCell.style.alignment.horizontal = 'left';
          }
          if (excelCell.gridCell?.data.totalLibras === excelCell.gridCell?.value || excelCell.gridCell?.data.saldoCajas === excelCell.gridCell?.value) {
            if (excelCell.gridCell?.data.totalLibras > 0) {
              excelCell.excelCell.font.color.argb = '2D572C';
              excelCell.excelCell.font.bold = true;
            }
            else if (excelCell.gridCell?.data.totalLibras < 0) {
              excelCell.excelCell.font.color.argb = 'FF0000';
              excelCell.excelCell.font.bold = true;
            }
          }
          if (existMasterDetail && excelCell.gridCell?.column?.dataField === dataFieldperRegister && nameDatafieldDetail) {
            masterDataDetail.push(excelCell.gridCell?.data[nameDatafieldDetail]);
          }
        }

        else if (excelCell.gridCell?.rowType === 'group') {
          excelCell.excelCell.alignment.horizontal = 'left';
          excelCell.excelCell.fill.fgColor.argb = 'BEE5E5'
          excelCell.excelCell.font.bold = true;
        }

        else if (excelCell.gridCell?.rowType === 'totalFooter') {
          excelCell.excelCell.fill.fgColor.argb = 'CDCDCD';
          excelCell.excelCell.border.top.style = 'thick';
          excelCell.excelCell.font.bold = true;
        }

        else if (excelCell.gridCell?.rowType === 'groupFooter') {
          if (excelCell.gridCell?.column?.dataField === 'totalLibras' || excelCell.gridCell?.column?.dataField === 'saldoCajas') {
            if (excelCell.gridCell?.value > 0) {
              excelCell.excelCell.fill.fgColor.argb = 'B4D3B2';
            }
            else if (excelCell.gridCell?.value < 0) {
              excelCell.excelCell.fill.fgColor.argb = 'FF0000';
            }
            else if (excelCell.gridCell?.value === 0) {
              excelCell.excelCell.fill.fgColor.argb = 'ECE18A';
            }
            excelCell.excelCell.font.bold = true;
          }
        }
      }
    })
      .then((cellRange: any) => {
        const headerRow = worksheet.getRow(2);
        headerRow.height = 30;
        worksheet.mergeCells(2, 1, 2, 10);
        headerRow.getCell(1).value = 'Reporte de ' + tipo;
        headerRow.getCell(1).font = { name: 'Segoe UI Light', size: 22 };
        headerRow.getCell(1).alignment = { horizontal: 'center' };
        if (fechaInicio && fechaFin) {
          worksheet.getRow(3).alignment = { horizontal: 'center', vertical: 'middle' };
          worksheet.getRow(4).alignment = { horizontal: 'center', vertical: 'middle' };
          worksheet.getRow(3).getCell(1).value = 'Fecha de inicio';
          worksheet.getRow(3).getCell(2).value = fechaInicio;
          worksheet.getRow(4).getCell(1).value = 'Fecha de fin';
          worksheet.getRow(4).getCell(2).value = fechaFin;
        }

        if (existMasterDetail && masterDataDetail.length > 0) {
          masterDataFieldColumns = Object.keys(masterDataDetail[0][0]);
          if (masterDataFieldColumns[0] === 'id') {
            masterDataFieldColumns.shift();
          }
          if (tipo === 'embarque por OP') {
            masterColumnsheader = columnsHeaders;
          }
          // if (tipo === 'liquidaciones') {
          //   masterColumnsheader = ['Lote Marcado', 'Contenedor', 'Nombre Producto', 'Unidades Cajitas'];
          //   masterDataFieldColumns = ['loteMarcado', 'contenedor', 'nombreProducto', 'unidades'];
          // }
        }

        const insertRow = (index: number, offset: number, outlineLevel: number) => {
          const currentIndex = index + offset;
          const row = worksheet.insertRow(currentIndex, [], "n");
          for (var j = worksheet.rowCount + 1; j > currentIndex; j--) {
            worksheet.getRow(j).outlineLevel = worksheet.getRow(
              j - 1
            ).outlineLevel;
          }
          row.outlineLevel = outlineLevel;
          return row;
        };

        let offset = cellRange.from.row + 1;


        for (var i = 0; i < masterDataDetail.length; i++) {
          let row = insertRow(i + 1, offset, 1);

          //SET HEADER COLUMNS FOR MASTER ROW
          masterColumnsheader.forEach((columnName, currentColumnIndex) => {
            const cell = row.getCell(currentColumnIndex + 1);
            cell.value = columnName;
            cell.font = { name: 'helvetica', size: 10, bold: true };
            cell.alignment = { horizontal: 'center' };
            cell.fill = {
              type: 'pattern',
              pattern: 'solid',
              fgColor: { argb: 'B2FFFF' }
            };
            cell.border = {
              top: { style: 'thin' },
              bottom: { style: 'thin' },
              left: { style: 'thin' },
              right: { style: 'thin' }
            };

          });
          offset++;
          //SET DATA FOR MASTER ROW
          masterDataDetail[i].forEach((masterDetail: any, currentDetailIndex: any) => {
            const row = insertRow(i + 1, offset, 1);
            masterDataFieldColumns.forEach((columnName, currentColumnIndex) => {
              const cell = row.getCell(currentColumnIndex + 1);
              cell.value = masterDetail[columnName];
              cell.font = { name: 'helvetica', size: 10 };
              cell.alignment = { horizontal: 'center' };
              cell.fill = {
                type: 'pattern',
                pattern: 'solid',
                fgColor: { argb: 'FFFFFF' }
              };
              cell.border = {
                top: { style: 'thin' },
                bottom: { style: 'thin' },
                left: { style: 'thin' },
                right: { style: 'thin' }
              };
            }
            );
            offset++;
          });
        }

      })
      .then(function () {
        workbook.xlsx.writeBuffer()
          .then(function (buffer: BlobPart) {
            context.spinner.hideSpinner();
            context.infoDownloadFile('Archivo generado con éxito',true);
            saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Reporte de ' + tipo + '.xlsx');
          });
      },
      function (error: Error) {
        context.spinner.hideSpinner();
        context.infoDownloadFile('Error al generar el archivo',false);
      });
  }
}
