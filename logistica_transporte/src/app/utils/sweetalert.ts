import Swal from 'sweetalert2';

export function msjConfirmacion(mensaje: string) {
  Swal.fire({
    icon: 'success',
    title: mensaje,
    showConfirmButton: false,
    timer: 1500
  })
}

export function msjError(mensaje: string) {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: mensaje,
    confirmButtonText: "Aceptar"
  })
}
