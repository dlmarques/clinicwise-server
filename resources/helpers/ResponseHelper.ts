import { devNull } from "os";
import { Response } from "../../types/Response";

export default function responseHelper(data: any, error: any): Response {
  if (error && Object.keys(error).length > 0) {
    return {
      status: "error",
      message: "An error occurred while processing the request",
      error,
    };
  }

  return {
    status: "success",
    message: "Request processed successfully",
    data,
  };
}
