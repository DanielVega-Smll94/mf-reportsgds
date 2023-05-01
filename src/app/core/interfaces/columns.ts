import { DxNumberBoxModule, DxSelectBoxModule, DxTextBoxModule } from "devextreme-angular";

export const columns: any[] = [
    {
      dataField: 'name',
      caption: 'Name',
      allowEditing: true,
      editorType: DxTextBoxModule
    },
    {
      dataField: 'age',
      caption: 'Age',
      allowEditing: true,
      editorType: DxNumberBoxModule
    },
    {
      dataField: 'gender',
      caption: 'Gender',
      allowEditing: true,
      editorType: DxSelectBoxModule,
      editorOptions: {
        items: ['Male', 'Female', 'Other']
      }
    }
  ];