import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogisTerrestre } from 'src/app/interfaces/LogisTerrestre.interface';
import { LogiTerrestreService } from 'src/app/services/logi-terrestre/logi-terrestre.service';
import { transformarFechaV1, transformarFechaV2 } from 'src/app/utils/convertidorFechas';
import { msjConfirmacion, msjError } from 'src/app/utils/sweetalert';
import { validarNumeroGuia, validarPlaca } from 'src/app/utils/validacionesRegex';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logi-terrestre',
  templateUrl: './logi-terrestre.component.html',
  styleUrls: ['./logi-terrestre.component.scss']
})
export class LogiTerrestreComponent {

  formLogisTerrestre!: FormGroup;
  busqueda: string = '';
  logisTerrestre: any;
  modoEdicion = false;

  constructor(
    private formBuilder: FormBuilder,
    private servicio: LogiTerrestreService
  ) { }

  ngOnInit() {

    this.formLogisTerrestre = this.formBuilder.group({
      id: [''],
      cantidadProducto: ['', Validators.required],
      fechaEntrega: [''],
      fechaRegistro: ['', Validators.required],
      idBodega: ['', Validators.required],
      idCliente: ['', Validators.required],
      idProducto: ['', Validators.required],
      numeroGuia: ['', Validators.required],
      placaVehiculo: ['', Validators.required],
      precioDescuento: [''],
      precioNormal: ['', Validators.required],

    });

    this.listarLogisTerrestre();
  }

  listarLogisTerrestre() {
    this.servicio.getLogisTerrestres().subscribe({
      next: (resp) => {
        this.logisTerrestre = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  buscarLogisTerrestre() {
    if (this.busqueda != '') {
      this.logisTerrestre = [];

      const id = parseInt(this.busqueda, 10);

      this.servicio.buscarLogisTerrestreId(id).subscribe({
        next: resp => {
          this.logisTerrestre.push(resp.data);
        },
        error: err => {
          const mensajeError = err.error.mensaje;
          msjError(mensajeError);
          this.listarLogisTerrestre();
        }
      });
    } else {
      this.listarLogisTerrestre();
    }
  }

  editarLogisTerrestre(LogTer: LogisTerrestre) {

    // Transformación y asignación de valores tipo fecha
    const fechaRegistro = transformarFechaV1(LogTer.fechaRegistro);
    const fechaEntrega = transformarFechaV1(LogTer.fechaEntrega);

    this.modoEdicion = true;
    this.formLogisTerrestre.patchValue({
      id: LogTer.id,
      cantidadProducto: LogTer.cantidadProducto,
      fechaEntrega: fechaEntrega,
      fechaRegistro: fechaRegistro,
      idBodega: LogTer.idBodega,
      idCliente: LogTer.idCliente,
      idProducto: LogTer.idProducto,
      numeroGuia: LogTer.numeroGuia,
      placaVehiculo: LogTer.placaVehiculo,
      precioDescuento: LogTer.precioDescuento,
      precioNormal: LogTer.precioNormal
    });
  }

  guardarLogisTerrestre(): void {

    if (!validarPlaca(this.formLogisTerrestre.get('placaVehiculo')?.value)) {
      msjError("La placa del vehículo no es válida");
      return;
    }

    if (!validarNumeroGuia(this.formLogisTerrestre.get('numeroGuia')?.value)) {
      msjError("El número de guía es no válido");
      return;
    }

    // Transformación y asignación de valores tipo fecha
    const fechaRegistro = transformarFechaV2(this.formLogisTerrestre.get('fechaRegistro')?.value);
    const fechaEntrega = transformarFechaV2(this.formLogisTerrestre.get('fechaEntrega')?.value);
    this.formLogisTerrestre.get('fechaRegistro')?.setValue(fechaRegistro);
    this.formLogisTerrestre.get('fechaEntrega')?.setValue(fechaEntrega);


    let logisTerrestre = {

      id: this.formLogisTerrestre.get('id')?.value,
      cantidadProducto: this.formLogisTerrestre.get('cantidadProducto')?.value,
      fechaEntrega: this.formLogisTerrestre.get('fechaEntrega')?.value,
      fechaRegistro: this.formLogisTerrestre.get('fechaRegistro')?.value,
      idBodega: this.formLogisTerrestre.get('idBodega')?.value,
      idCliente: this.formLogisTerrestre.get('idCliente')?.value,
      idProducto: this.formLogisTerrestre.get('idProducto')?.value,
      numeroGuia: this.formLogisTerrestre.get('numeroGuia')?.value,
      placaVehiculo: this.formLogisTerrestre.get('placaVehiculo')?.value,
      precioDescuento: this.formLogisTerrestre.get('precioDescuento')?.value,
      precioNormal: this.formLogisTerrestre.get('precioNormal')?.value

    };

    if (this.modoEdicion) {

      this.servicio.editarLogisTerrestre(logisTerrestre).subscribe({
        next: resp => {
          this.listarLogisTerrestre();
          msjConfirmacion("Logistica Terrestre guardada exitosamente");
        },
        error: error => {
          msjError(error);
        }
      });

    } else {
      // Llamar al servicio de crear producto
      this.servicio.guardarLogisTerrestre(logisTerrestre).subscribe({
        next: resp => {
          this.listarLogisTerrestre();
        },
        error: error => {
          console.log(error);
        }
      })
    }

    /* se restauran valores defecto */
    this.limpiarCampos();
    this.modoEdicion = false;

  }


  eliminarLogisTerrestre(id: number) {

    Swal.fire({
      icon: 'warning',
      title: 'Desea eliminar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {

      /* Si la da click en aceptar se elimina el registro */
      if (result.isConfirmed) {
        this.servicio.eliminarLogisTerrestre(id).subscribe({
          next: (resp) => {
            this.listarLogisTerrestre();
          },
          error: (err) => {
            console.log(err);
          },
        })
      }
    })

  }


  limpiarCampos() {

    this.formLogisTerrestre.get('id')?.setValue(''),
      this.formLogisTerrestre.get('cantidadProducto')?.setValue(''),
      this.formLogisTerrestre.get('fechaEntrega')?.setValue(''),
      this.formLogisTerrestre.get('fechaRegistro')?.setValue(''),
      this.formLogisTerrestre.get('idBodega')?.setValue(''),
      this.formLogisTerrestre.get('idCliente')?.setValue(''),
      this.formLogisTerrestre.get('idProducto')?.setValue(''),
      this.formLogisTerrestre.get('numeroGuia')?.setValue(''),
      this.formLogisTerrestre.get('placaVehiculo')?.setValue(''),
      this.formLogisTerrestre.get('precioDescuento')?.setValue(''),
      this.formLogisTerrestre.get('precioNormal')?.setValue('')

  }





}
