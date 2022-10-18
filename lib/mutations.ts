import fetcher from './fetcher';

export function auth(
  mode: 'signin' | 'signup',
  body: { email: string | undefined; password: string | undefined }
) {
  return fetcher(`${mode}`, body);
}
