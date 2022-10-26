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

    // todo: handle more user interactions
    // 401: Unauthorized
    // if (res.status === 401) {
    //   console.log(res.url);
    // }

    if (res.status > 399 || res.status < 200) {
      console.log('at url:', res.url);
      console.log('res.status:', res.status);
      // throw new Error();
    }

    return res.json();
  });
}
