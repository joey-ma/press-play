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
    // client side:
    if (process.env.NODE_ENV === 'development')
      if (res.status > 399 || res.status < 200) {
        console.log('fetcher.js -> res status:', res.status);

        // todo: maybe handle more specific scenarios?
        // 401: Unauthorized
        // if (res.status === 401) {
        //   console.log(res.url);
        //   console.log('res.statusText:', res.statusText); // Unauthorized
        // }

        // throw new Error();
      }

    return res.json();
  });
}
