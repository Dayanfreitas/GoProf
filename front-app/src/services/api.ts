import config from "../config";
import axios from "axios";

const baseURL = `${config.SERVER_HOST}:${config.SERVER_PORT}` 
const timeout = config.TIMEOUT

const Api = axios.create({
    baseURL,
    timeout
})

export default Api
