import * as nodeFetch from "node-fetch"

export const sendRequest = async(username, password) => {
    const response = await nodeFetch("http://localhost:2221/api/login", {
        method: "POST",
        body: JSON.stringify({"username": username, "password": password}),
    })

    if(response.status !== 200){
        throw new Error("bad one")
    }

    const body = await response.json()
    return body.token
}