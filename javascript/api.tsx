import { ApiError } from "./api-error";

interface PostParams {
  url: string;
  body: any;
}

interface GetParams {
  url: string;
}

export class Api {
  async post({ url, body }: PostParams) {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });
    const data = await response.json();

    if (response.status >= 200 && response.status < 300) { return data; }

    throw new ApiError(data.error);
  }

  async get({ url }: GetParams) {
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await response.json();

    if (response.status >= 200 && response.status < 300) { return data; }

    throw new ApiError(data.error);
  }
}