// src/services/apiConfig.ts

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://localhost:5000";

const API_URL = BASE_URL;

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export type ProductQueryParams = {
  category?: string;
  category_id?: string;
  is_featured?: boolean | string;
  is_popular?: boolean | string;
  is_flash_sale?: boolean | string;
  limit?: number | string;
  sort?: string;
  filter?: string;
  [key: string]: string | number | boolean | undefined;
};

export type FetchOptions = RequestInit & {
  params?: ProductQueryParams;
  timeout?: number;
};

type ApiErrorObject = {
  message?: string;
  details?: string;
};

type ApiErrorResponse = {
  success?: boolean;
  message?: string;
  error?: string | ApiErrorObject;
  msg?: string;
};

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(
    message: string,
    status: number,
    data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

function getAccessToken(): string | null {
  if (typeof window === "undefined") {
    return null;
  }

  const token =
    localStorage.getItem("access_token") ||
    localStorage.getItem("token") ||
    localStorage.getItem("jwt") ||
    localStorage.getItem("auth_token") ||
    localStorage.getItem("user_token");

  return token;
}

function isApiErrorResponse(
  value: unknown
): value is ApiErrorResponse {
  return (
    typeof value === "object" &&
    value !== null
  );
}

function isApiErrorObject(
  value: unknown
): value is ApiErrorObject {
  return (
    typeof value === "object" &&
    value !== null
  );
}

export async function fetchApi<T>(
  endpoint: string,
  options: FetchOptions = {}
): Promise<T> {
  const {
    params,
    // Naikkan default timeout dari 15 detik menjadi 30 detik untuk mengakomodasi proses Auth/Email eksternal
    timeout = 30000,
    ...fetchOptions
  } = options;

  const formattedEndpoint =
    endpoint.startsWith("/")
      ? endpoint
      : `/${endpoint}`;

  let url =
    `${API_URL}${formattedEndpoint}`;

  if (params) {
    const searchParams =
      new URLSearchParams();

    Object.entries(params).forEach(
      ([key, value]) => {
        if (
          value !== undefined &&
          value !== null &&
          value !== ""
        ) {
          searchParams.append(
            key,
            String(value)
          );
        }
      }
    );

    const queryString =
      searchParams.toString();

    if (queryString) {
      url += `?${queryString}`;
    }
  }

  const headers =
    new Headers(fetchOptions.headers);

  if (
    !headers.has("Content-Type") &&
    !(fetchOptions.body instanceof FormData)
  ) {
    headers.set(
      "Content-Type",
      "application/json"
    );
  }

  const token =
    getAccessToken();

  if (token) {
    headers.set(
      "Authorization",
      `Bearer ${token}`
    );
  }

  const controller =
    new AbortController();

  const timer =
    setTimeout(() => {
      controller.abort();
    }, timeout);

  try {
    const response =
      await fetch(url, {
        ...fetchOptions,
        method:
          fetchOptions.method ?? "GET",
        headers,
        signal:
          controller.signal,
      });

    const responseText =
      await response.text();

    let responseData: unknown =
      null;

    if (
      responseText &&
      responseText.trim().length > 0
    ) {
      try {
        responseData =
          JSON.parse(responseText);
      } catch {
        responseData =
          responseText;
      }
    }

    if (!response.ok) {
      let message =
        `Request failed (${response.status})`;

      if (
        isApiErrorResponse(
          responseData
        )
      ) {
        const errData =
          responseData;

        if (
          isApiErrorObject(
            errData.error
          )
        ) {
          message =
            errData.error.details ||
            errData.error.message ||
            JSON.stringify(
              errData.error
            );
        } else {
          message =
            errData.message ||
            errData.error ||
            errData.msg ||
            message;
        }
      }

      if (
        typeof responseData ===
          "string" &&
        responseText.trim().length > 0
      ) {
        message =
          responseText;
      }

      throw new ApiError(
        message,
        response.status,
        responseData
      );
    }

    if (
      !responseText ||
      responseText.trim().length === 0
    ) {
      return {} as T;
    }

    return responseData as T;
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      error.name ===
        "AbortError"
    ) {
      throw new Error(
        "Request timeout. The server took too long to respond. Please try again."
      );
    }

    if (
      error instanceof ApiError
    ) {
      throw error;
    }

    if (
      error instanceof Error
    ) {
      throw error;
    }

    throw new Error(
      "Unknown API error occurred."
    );
  } finally {
    clearTimeout(timer);
  }
}