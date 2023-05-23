import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Producto } from 'src/app/interfaces/producto.interface';
import { ProductoService } from 'src/app/services/producto/producto.service';
import { msjConfirmacion, msjError } from 'src/app/utils/sweetalert';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  formProducto!: FormGroup;
  busqueda: string = '';
  productos: any;
  modoEdicion = false;
  productofiltrado: any;


  constructor(
    private formBuilder: FormBuilder,
    private servicio: ProductoService
  ) { }

  ngOnInit() {

    this.formProducto = this.formBuilder.group({
      id: [''],
      nombre: ['', Validators.required],
      precio: ['', Validators.required]
    });

    this.listarProductos();
  }

  listarProductos() {
    this.servicio.getProductos().subscribe({
      next: (resp) => {
        this.productos = resp.data;
      },
      error: (err) => {
        console.log(err);
      },
    })
  }


  buscarProductos() {
    if (this.busqueda) {
      this.productos = [];

      const id = parseInt(this.busqueda, 10);

      this.servicio.buscarProductoId(id).subscribe({
        next: resp => {
          this.productos.push(resp.data);
        },
        error: err => {
          const mensajeError = err.error.mensaje;
          msjError(mensajeError);
          this.listarProductos();
        }
      });
    }
  }


  editarProducto(producto: Producto) {

    /* Se cargan los datos en el formulario y se indica que es una edicion */
    this.modoEdicion = true;
    this.formProducto.get('id')?.setValue(producto.id);
    this.formProducto.get('nombre')?.setValue(producto.nombre);
    this.formProducto.get('precio')?.setValue(producto.precio);
  }

  guardarProducto(): void {

    const precioValido = !isNaN(parseFloat(this.formProducto.get('precio')?.value));

    if (!precioValido) {
      msjError('Precio no válido');
      return;
    }

    let producto = {
      id: this.formProducto.get('id')?.value,
      nombre: this.formProducto.get('nombre')?.value,
      precio: this.formProducto.get('precio')?.value
    };

    if (this.modoEdicion) {
      this.servicio.editarProducto(producto).subscribe({
        next: resp => {
          this.listarProductos();
          msjConfirmacion("Producto guardado exitosamente");
        },
        error: error => {
          msjError(error);
        }
      });

    } else {
      // Llamar al servicio de crear producto
      this.servicio.guardarProducto(producto).subscribe({
        next: resp => {
          this.listarProductos();
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


  eliminarProducto(id: number) {

    Swal.fire({
      icon: 'warning',
      title: 'Desea eliminar el registro?',
      showCancelButton: true,
      confirmButtonText: 'Aceptar',
    }).then((result) => {

      /* Si la da click en aceptar se elimina el registro */
      if (result.isConfirmed) {
        this.servicio.eliminarProducto(id).subscribe({
          next: (resp) => {
            this.listarProductos();
          },
          error: (err) => {
            console.log(err);
          },
        })
      }
    })

  }

  limpiarCampos() {
    this.formProducto.get('nombre')?.setValue('');
    this.formProducto.get('precio')?.setValue('');
  }

}
