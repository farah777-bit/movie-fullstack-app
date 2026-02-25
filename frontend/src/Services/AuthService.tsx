
import axios from "axios";
import { handelError } from "../Helper/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5258/api/";

export const loginAPI = async (username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/login", {
            username: username,
            password: password
        });
        
        return data;

    }
    catch (error) {
        console.log("problem")
        handelError(error);
    }
};
export const registerAPI = async (email: string, username: string, password: string) => {
    try {
        const data = await axios.post<UserProfileToken>(api + "account/register", {
            email: email,
            username: username,
            password: password
        });

        return data;

    }
    catch (error) {
        handelError(error);
    }
};