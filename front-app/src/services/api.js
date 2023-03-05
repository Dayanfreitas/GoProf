import config from "../config";
import axios from "axios";
import { getToken } from "./auth";

const baseURL = `${config.SERVER_HOST}:${config.SERVER_PORT}` 
const timeout = config.TIMEOUT

const Api = axios.create({
    baseURL,
    timeout,
    headers: {'Authorization': 'Bearer '+ getToken()}
})

export default Api
