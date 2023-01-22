import { toast } from 'react-toastify';

export function errorHandler(err, msg) {
    if(msg) {
        toast.error(msg);
        return;
    }

    try {
        const status = err.response.data.error.status;
        const defaultMsg = err.response.data.error.message;
        let message;

        switch(status) {
            case 400:
                message = defaultMsg;
                break;
            case 401:
            case 403:
                message = 'Brak dostępu';
                break;
            case 404:
                message = 'Nie znaleziono'
            case 500:
                message = "Błąd serwera"
            case 503:
                message = "Serwer niedostępny"
            default:
                message = defaultMsg;
        }
        toast.error(message);
    } catch (e) {
        toast.error(err.message);
    }

    
}