import { stateObj } from "../utils";

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

export async function sendInput(func: string, algorithm: string,
    result: stateObj<any>, setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    args: Object) {
    setLoading(true);
    try {
      const res = await requester(algorithm, func, args);
      setLoading(false);
      if (res.response.ok) result.value = res.result;
      else result.value = `Failed:${res.result.split(':')[1]}`;
      return res as { response: Response, result: any };
    }
    catch (e) {
      result.set("Failed to contact API.");
      setLoading(false);
      return;
    }
  
  }