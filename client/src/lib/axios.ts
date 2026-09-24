import axios from "axios"

const globalApi = axios.create({
  baseURL: "/",
})

export default globalApi
