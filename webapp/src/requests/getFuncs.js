// @ts-nocheck
const API_URL = process.env.REACT_APP_API_URL || 'https://135code.com:8443';

export async function getFuncs()
{
    const requrl = `${API_URL}/funcs`;

    const response = await fetch(requrl, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });
    const resBody = await response.json();
    if (response.status !== 200) return [];
    return resBody;
}