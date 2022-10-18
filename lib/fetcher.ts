import { validateRoute } from './auth';

export default function fetcher(url: string, data: any = undefined) {
  return fetch(`${window.location.origin}/api/${url}`, {
    method: data ? 'POST' : 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => {
    if (process.env.NODE_ENV === 'development')
      console.log('res status:', res.status);

    if (res.status > 399 || res.status < 200) throw new Error();
    return res.json();
  });
}
