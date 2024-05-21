import { jwtDecode } from 'jwt-decode'
import Cookies from 'js-cookie'

export function decodeToken() {
    const access_token = Cookies.get('access_token')
    if (access_token) {
        const decodedToken = jwtDecode(access_token)
        
        return decodedToken
    }
}