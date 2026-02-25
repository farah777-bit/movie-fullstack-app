import axios from "axios"
import { toast } from "react-toastify";

export const handelError = (error: any) => {
    console.log("this is error handler")
    if (axios.isAxiosError(error)) {
        console.log("111")
        var err = error.response;
        if (Array.isArray(err?.data.errors)) {
            console.log("*")
            for (let val of err?.data.errors) {
                toast.warning(val.description);
                console.log(val.description)
            }
        }
        else if (typeof err?.data.errors === 'object') {
            console.log("222")
            for (let e in err?.data.errors) {
                toast.warning(err.data.errors[e][0]);
            }
        }
        else if (err?.data) {
            console.log("333")
            toast.warning(err.data);
            console.log(err.data.errors)
        }
        else if (err?.status == 401) {
            console.log("444")
            toast.warning("pleas log in");
            window.history.pushState({}, "LoginPage", "/login");
        }
        else if (err) {
            console.log("555")
            toast.warning(err?.data.errors);
        }
    }
}