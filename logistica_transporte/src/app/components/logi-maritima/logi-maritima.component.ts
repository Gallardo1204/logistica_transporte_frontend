import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LogisMaritima } from 'src/app/interfaces/LogisMaritima.interface';
import { LogiMaritimaService } from 'src/app/services/logi-maritima/logi-maritima.service';
import { transformarFechaV1, transformarFechaV2 } from 'src/app/utils/convertidorFechas';
import { msjConfirmacion, msjError } from 'src/app/utils/sweetalert';
import { validarNumeroFlota, validarNumeroGuia } from 'src/app/utils/validacionesRegex';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logi-maritima',
  templateUrl: './logi-maritima.component.html',
  styleUrls: ['./logi-maritima.component.scss']
})
export class LogiMaritimaComponent {

  formLogisMaritima!: FormGroup;
  busqueda: string = '';
  logisMaritima: any;
  modoEdicion = false;

  constructor(
    private formBuilder: FormBuilder,
    private servicio: LogiMaritimaService
  ) { }

  ngOnInit() {

    this.formLogisMaritima = this.formBuilder.group({
      id: [''],
      idCliente: ['', Validators.required],
      idProducto: ['', Validators.required],
      cantidadProducto: ['', Validators.required],
      fechaRegistro: ['', Validators.required],
      fechaEntrega: [''],
      idPuerto: ['', Validators.required],
      precioNormal: ['', Validators.required],
      precioDescuento: [''],
      numeroFlota: ['', Validators.required],
      numeroGuia: ['', Validators.required],

    });

    this.listarLogisMaritima();
  }

  listarLogisMaritima() {
    this.servicio.getLogisMaritimas().subscribe({
      next: (resp) => {
        this.logisMaritima = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }

  buscarLogisMaritima() {
    if (this.busqueda != '') {
      this.logisMaritima = [];

      const id = parseInt(this.busqueda, 10);

      this.servicio.buscarLogisMaritimaId(id).subscribe({
        next: resp => {
          this.logisMaritima.push(resp.data);
        },
        error: err => {
          const mensajeError = err.error.mensaje;
          msjError(mensajeError);
          this.listarLogisMaritima();
        }
      });
    } else {
      this.listarLogisMaritima();
    }
  }

  editarLogisMaritima(LogMar: LogisMaritima) {

    // Transformación y asignación de valores tipo fecha
    const fechaRegistro = transformarFechaV1(LogMar.fechaRegistro);
    const fechaEntrega = transformarFechaV1(LogMar.fechaEntrega);

    this.modoEdicion = true;
    this.formLogisMaritima.patchValue({
      id: LogMar.id,
      idCliente: LogMar.idCliente,
      idProducto: LogMar.idProducto,
      cantidadProducto: LogMar.cantidadProducto,
      fechaRegistro: fechaRegistro,
      fechaEntrega: fechaEntrega,
      idPuerto: LogMar.idPuerto,
      precioNormal: LogMar.precioNormal,
      precioDescuento: LogMar.precioDescuento,
      numeroFlota: LogMar.numeroFlota,
      numeroGuia: LogMar.numeroGuia,
    });
  }


  guardarLogisMaritima(): void {

    if (!validarNumeroFlota(this.formLogisMaritima.get('numeroFlota')?.value)) {
      msjError("El numero de la flota no es válido");
      return;
    }

    if (!validarNumeroGuia(this.formLogisMaritima.get('numeroGuia')?.value)) {
      msjError("El número de guía es no válido");
      return;
    }

    // Transformación y asignación de valores tipo fecha
    const fechaRegistro = transformarFechaV2(this.formLogisMaritima.get('fechaRegistro')?.value);
    const fechaEntrega = transformarFechaV2(this.formLogisMaritima.get('fechaEntrega')?.value);
    this.formLogisMaritima.get('fechaRegistro')?.setValue(fechaRegistro);
    this.formLogisMaritima.get('fechaEntrega')?.setValue(fechaEntrega);


    let logisMaritima = {

      id: this.formLogisMaritima.get('id')?.value,
      idCliente: this.formLogisMaritima.get('idCliente')?.value,
      idProducto: this.formLogisMaritima.get('idProducto')?.value,
      cantidadProducto: this.formLogisMaritima.get('cantidadProducto')?.value,
      fechaRegistro: this.formLogisMaritima.get('fechaRegistro')?.value,
      fechaEntrega: this.formLogisMaritima.get('fechaEntrega')?.value,

      idPuerto: this.formLogisMaritima.get('idPuerto')?.value,
      precioNormal: this.formLogisMaritima.get('precioNormal')?.value,
      precioDescuento: this.formLogisMaritima.get('precioDescuento')?.value,
      numeroFlota: this.formLogisMaritima.get('numeroFlota')?.value,
      numeroGuia: this.formLogisMaritima.get('numeroGuia')?.value

    };

    if (this.modoEdicion) {

      this.servicio.editarLogisMaritima(logisMaritima).subscribe({
        next: resp => {
          this.listarLogisMaritima();
          msjConfirmacion("Logistica Maritima guardada exitosamente");
        },
        error: error => {
          msjError(error);
        }
      });

    } else {
      // Llamar al servicio de crear producto
      this.servicio.guardarLogisMaritima(logisMaritima).subscribe({
        next: resp => {
          this.listarLogisMaritima();
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


  eliminarLogisMaritima(id: number) {

    Swal.fire({
      icon: 'warning',
      title: 'Desea eliminar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {

      /* Si la da click en aceptar se elimina el registro */
      if (result.isConfirmed) {
        this.servicio.eliminarLogisMaritima(id).subscribe({
          next: (resp) => {
            this.listarLogisMaritima();
          },
          error: (err) => {
            console.log(err);
          },
        })
      }
    })

  }

  limpiarCampos() {

    this.formLogisMaritima.get('id')?.setValue(''),
      this.formLogisMaritima.get('idCliente')?.setValue(''),
      this.formLogisMaritima.get('idProducto')?.setValue(''),
      this.formLogisMaritima.get('cantidadProducto')?.setValue(''),
      this.formLogisMaritima.get('fechaRegistro')?.setValue(''),
      this.formLogisMaritima.get('fechaEntrega')?.setValue(''),
      this.formLogisMaritima.get('idPuerto')?.setValue(''),
      this.formLogisMaritima.get('precioNormal')?.setValue(''),
      this.formLogisMaritima.get('precioDescuento')?.setValue(''),
      this.formLogisMaritima.get('numeroFlota')?.setValue(''),
      this.formLogisMaritima.get('numeroGuia')?.setValue('')

  }


}
