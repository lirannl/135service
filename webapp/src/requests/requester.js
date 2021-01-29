const API_URL = process.env.REACT_APP_API_URL || '/api';

export default async function (algorithm, mode, key, content, extras)
{
    const requrl = `${API_URL}/${algorithm}`;

    const response = await fetch(requrl, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({key: key, content: content, operation: mode, extras: extras || []})
    });
    const resBody = await response.json();
    if (response.status !== 200) return `${mode.charAt(0).toUpperCase() + mode.slice(1)}ion of "${content}" failed.`;
    return resBody.message;
}