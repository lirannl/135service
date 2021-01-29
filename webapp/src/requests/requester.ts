const API_URL = process.env.REACT_APP_API_URL || '/api';

const requester = async (algorithm: string, mode: string, key: string, content: string, extras: string[]) => {
    const requrl = `${API_URL}/${algorithm}`;

    const response = await fetch(requrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: key, content: content, operation: mode, extras: extras || [] })
    });
    const resBody = await response.json();
    if (response.status !== 200) return `${mode.charAt(0).toUpperCase() + mode.slice(1)}ion of "${content}" failed.`;
    return resBody.message;
};

export default requester;