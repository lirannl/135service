const API_URL = process.env.REACT_APP_API_URL || '/api';

const requester = async (algorithm: string, mode: string, args: Object) => {
    const requrl = `${API_URL}/${algorithm}`;

    const response = await fetch(requrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation: mode, args })
    });
    const resBody = await response.json();
    return { result: JSON.parse(resBody.message), response };
};

export default requester;