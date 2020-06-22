// @ts-nocheck
export async function getFuncs()
{
    const requrl = `https://135code.com:8443/funcs`;

    const response = await fetch(requrl, {
        method: "GET",
        headers: {"Content-Type": "application/json"}
    });
    const resBody = await response.json();
    if (response.status !== 200) return [];
    return resBody;
}