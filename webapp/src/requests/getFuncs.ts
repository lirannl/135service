const API_URL = process.env.REACT_APP_API_URL || '/api';

export async function getFuncs()
{
    const requrl = `${API_URL}/funcs`;

    const response = await fetch(requrl, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    }).catch(() => null);
    if (!response) return [];
    const resBody = await response.json();
    if (response.status !== 200) return [];
    return resBody as {func: string, category: string}[];
}