import { toast } from "react-toastify";
import { selectToast } from "../../../redux/selector";
import { useSelector } from "react-redux";

function ToastNotification() {
    const toastNotification = useSelector(selectToast);
    let toastConfig = {
        position: toast.POSITION.TOP_RIGHT,
        pauseOnFocusLoss: true,
    };
    switch (toastNotification.action) {
        case "add": {
            toast.success(toastNotification.message, toastConfig);
            break;
        }
        case "delete": {
            toast.error(toastNotification.message, toastConfig);
            break;
        }
        case "update": {
            toast.info(toastNotification.message, toastConfig);
            break;
        }
        case "warning": {
            toast.warning(toastNotification.message, toastConfig);
            break;
        }
        default:
    }
    return;
}

export default ToastNotification;
