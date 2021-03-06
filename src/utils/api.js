import Axios from "axios";

const api = process.env.REACT_APP_RECORDS_API_URL || "https://5a54227777e1d20012fa0723.mockapi.io"

export const getAll = () =>
    Axios.get(`${api}/api/v1/records`)

export const create = (body) =>
    Axios.post(`${api}/api/v1/records`,body)

export const update = (id,body) =>
    Axios.put(`${api}/api/v1/records/${id}`,body)

export const remove = (id) =>
    Axios.put(`${api}/api/v1/records/${id}`)