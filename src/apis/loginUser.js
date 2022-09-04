import axios from "axios"

async function loginUserAPI(requestBody) {
    const endpoint = 'https://dev-api-hub.herokuapp.com/api/v1/users/login'
    const response = await axios.post(endpoint, requestBody)
    
    if (response.status == 200) {
        return {
            isError: false,
            errorMessage: null,
            errorCode: null,
            data: response.data
        }
    } else {
        return {
            isError: true,
            errorMessage: response.statusText,
            errorCode: response.status,
            data: null
        }
    }
}

export default loginUserAPI