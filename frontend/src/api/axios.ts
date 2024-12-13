import axios from "axios";
import { parsedenv } from "./api";


const api = axios.create({
    baseURL: parsedenv.VITE_BASE_URL,
    headers: {
        "Content-Type":"application/json",
    }
})


async function GET(endpoint: string) { 
    return  api.get(endpoint)
}
async function POST(endpoint: string, data: object) { 
    return  api.post(endpoint, data);
}
async function PUT(endpoint: string, data: object) { 
    return  api.put(endpoint, data);
}
async function DELETE(endpoint: string, id: string) {
    return  api.post(endpoint, id);
}

export {GET, POST, PUT, DELETE, api};