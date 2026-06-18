import { toast } from "sonner";

export function displaySuccess(message: string) {
    toast.success(message);
}

export function displayError(message: string) {
    toast.error(message);
}

export function displayWarning(message: string) {
    toast.warning(message);
}
