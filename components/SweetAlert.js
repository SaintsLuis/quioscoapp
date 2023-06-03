import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const ConfirmDialogAlert = ({ title, text, onConfirm }) => {
  MySwal.fire({
    title: title || '¿Estás seguro?',
    text: text || '¡No podrás revertir esto!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, elimínalo',
  }).then(result => {
    if (result.isConfirmed) {
      MySwal.fire(
        '¡Eliminado!',
        'Tu producto ha sido eliminado.',
        'success',
      ).then(() => {
        if (typeof onConfirm === 'function') {
          onConfirm();
        }
      });
    }
  });
};

export { ConfirmDialogAlert };
