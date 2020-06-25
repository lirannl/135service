// @ts-nocheck
const API_URL = process.env.REACT_APP_API_URL || 'https://135code.com:8443';

export default async function crypto(mode, key, text)
{
    const requrl = `${API_URL}/${mode}`;
    console.log(API_URL);

    const response = await fetch(requrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({key: key, text: text})
    });
    const resBody = await response.json();
    if (response.status !== 200) return `${mode.charAt(0).toUpperCase() + mode.slice(1)}ion of "${text}" failed.`;
    return resBody.message;
}