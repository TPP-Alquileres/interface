import { ApiError } from "./api-error";

interface PostParams {
  url: string;
  body: any;
  currentUser: any;
}

interface GetParams {
  url: string;
  currentUser: any;
}

export class Api {
  constructor() {
    this.baseUrl = 'http://localhost:3000/api/';
  }

  async post( { url, body, currentUser } : PostParams) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', user_email: currentUser.email },
      body: JSON.stringify(body)
    });
    const data = await response.json();

    if (response.status >= 200 && response.status < 300) { return data; }

    throw new ApiError(data.error);
  }

  async get( { url, currentUser } : GetParams) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', user_email: currentUser.email },
    });
    const data = await response.json();

    if (response.status >= 200 && response.status < 300) { return data; }

    throw new ApiError(data.error);
  }
}