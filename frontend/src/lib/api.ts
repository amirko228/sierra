const base =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, '') ?? 'http://localhost:4000/api';

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public body: unknown,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function parseJson(res: Response): Promise<unknown> {
  const text = await res.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
}

export async function postJson<T>(
  path: string,
  body: Record<string, unknown>,
): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const data = await parseJson(res);
  if (!res.ok) {
    const msg =
      typeof data === 'object' && data && 'message' in data
        ? String((data as { message: unknown }).message)
        : res.statusText;
    throw new ApiError(msg, res.status, data);
  }
  return data as T;
}

export async function putJson<T>(
  path: string,
  body: unknown,
  adminKey: string,
): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'x-admin-key': adminKey,
    },
    body: JSON.stringify(body),
  });
  const data = await parseJson(res);
  if (!res.ok) {
    const msg =
      typeof data === 'object' && data && 'message' in data
        ? String((data as { message: unknown }).message)
        : res.statusText;
    throw new ApiError(msg, res.status, data);
  }
  return data as T;
}

export async function getJson<T>(path: string, adminKey: string
): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    headers: { 'x-admin-key': adminKey },
    cache: 'no-store',
  });
  const data = await parseJson(res);
  if (!res.ok) {
    throw new ApiError(res.statusText, res.status, data);
  }
  return data as T;
}
