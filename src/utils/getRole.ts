import {jwtDecode, JwtPayload } from 'jwt-decode';

interface CustomJwtPayload extends JwtPayload {
    role: string;
}

export const getRole = () => {
    const accessToken = sessionStorage.getItem("accesstoken");
    let role = "";
    if (accessToken) {
        const decodedToken = jwtDecode<CustomJwtPayload>(accessToken);
        role = decodedToken.role;
    } else {
        console.error("Access token is null");
    }
    return role;
}