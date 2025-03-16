import Swal, { SweetAlertPosition } from 'sweetalert2';

type ToastType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info';

const toast = (
    type: ToastType,
    title: string,
    position: SweetAlertPosition = 'top-end'
) => Swal.mixin({
    toast: true,
    showConfirmButton: false,
    showCloseButton: true,
    position: position,
    timer: 3000,
    customClass: {
        popup: `color-${type}`
    },
    titleText: title,
});

export default () => ({
    success(title: string) {
        toast('success', title).fire()
    },
    danger(title: string) {
        toast('danger', title).fire()
    },
});