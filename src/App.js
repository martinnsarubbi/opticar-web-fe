import React, { useState } from 'react';
import './App.css';
import MaterialTable from 'material-table'
import { Button } from '@material-ui/core';
import AddIcon from "@material-ui/icons/Add";
import XLSX from 'xlsx';
import { uploadFile } from './services/UploadFile';
import { BarChartOutlined } from '@material-ui/icons';

const EXTENSIONS = ['xlsx', 'xls', 'csv']
function App() {
  const [colDefs, setColDefs] = useState();
  const [data, setData] = useState();
  const [isDisabled, setIsDisabled] = useState(true);

  const getExention = (file) => {
    const parts = file.name.split('.')
    const extension = parts[parts.length - 1]
    return EXTENSIONS.includes(extension) // return boolean
  }

  const convertToJson = (headers, data) => {
    const rows = []
    data.forEach(row => {
      let rowData = {}
      row.forEach((element, index) => {
        rowData[headers[index]] = element
      })
      rows.push(rowData)

    });
    return rows
  }


  const importExcel = (e) => {
    const file = e.target.files[0]

    const reader = new FileReader()
    reader.onload = (event) => {
      //parse data

      const bstr = event.target.result
      const workBook = XLSX.read(bstr, { type: "binary" })

      //get first sheet
      const workSheetName = workBook.SheetNames[0]
      const workSheet = workBook.Sheets[workSheetName]

      //convert to array
      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 })

      // console.log(fileData)
      const headers = fileData[0]
      const heads = headers.map(head => ({ title: head, field: head }))
      
      setColDefs(heads)

      //removing header
      fileData.splice(0, 1)

      setData(convertToJson(headers, fileData))
      setIsDisabled(false)
    }

    if (file) {
      if (getExention(file)) {
        reader.readAsBinaryString(file)
      }
      else {
        alert("Invalid file input, Select Excel, CSV file")
      }
    } else {
      setData([])
      setColDefs([])
    }
  }

  function loadData() {
    console.log(data);
    for(let i = 0; i < data.length; i++) {
        data[i].dni = data[i].DNI;
        data[i].name = data[i].Nombre;
        data[i].surname = data[i].Apellido;
        data[i].address = data[i].Dirección;
        data[i].telephone = data[i].Teléfono;
        data[i].latitude = data[i].Latitud;
        data[i].longitude = data[i].Longitud;
        data[i].neighborhood = data[i]['Localidad/Barrio'];
        data[i].province = data[i].Provincia;
        data[i].barcode = data[i]['Código de barras del producto'];
        data[i].description = data[i]['Descripción del producto'];
        data[i].category = data[i]['Categoría'];
        data[i].weight = data[i].Peso;
        data[i].width = data[i].Ancho;
        data[i].large = data[i].Largo;
        data[i].height = data[i].Alto;
        data[i].fragility = data[i].Fragilidad;
        data[i].stackability = data[i].Apilabilidad;
      }
    
    setData([]);
    setColDefs([]);
    setIsDisabled(true);
    uploadFile(data);
    alert('Productos cargados correctamente.');
    window.location.reload()
  }


  return (
    <div className="App">
      <h1 align="center">Opticar</h1>
      <h4 align='center'>Importe los datos desde un Excel</h4>
      <div className='ButtonContainer'>
        <div className="Buttons">
        <Button variant="contained" component="label" color="primary">
          {" "}
          <AddIcon /> Subir archivo
          <input type="file" onChange={importExcel} hidden />
        </Button>
        </div>
        <div className="Buttons">
        <Button variant="contained" disabled={isDisabled} onClick={loadData}>
          {" "}
          Cargar los datos
        </Button>
        </div>
      </div>
      <MaterialTable title="Datos de pedidos" data={data} columns={colDefs} />
    </div>
  );
}

export default App;
