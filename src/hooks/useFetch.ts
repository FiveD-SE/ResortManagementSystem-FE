import useAsync from './useAsync';

const DEFAULT_OPTIONS: RequestInit = {
  headers: { 'Content-Type': 'application/json' },
};

export default function useFetch<T = unknown>(url: string, options: RequestInit = {}, dependencies: unknown[] = []) {
  return useAsync<T>(() => {
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json() as Promise<T>;
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
}
