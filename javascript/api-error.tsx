// import Error from "next/error";

export class ApiError extends Error {
  constructor(message: string) {
    super(message);

    // 👇️ because we are extending a built-in class
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}