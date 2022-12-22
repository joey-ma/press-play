import fetcher from './fetcher';

export function auth(
  mode: 'signin' | 'signup',
  body: { email: string | undefined; password: string | undefined }
) {
  return fetcher(`${mode}`, body);
}

// Fisher–Yates shuffle
export function shuffle(array: any[]) {
  let currentIndex = array.length,
    randomIndex;
  const output = array.slice();

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [output[currentIndex], output[randomIndex]] = [
      output[randomIndex],
      output[currentIndex],
    ];
  }

  return output; // shuffles array in-place + returns shuffled array
}
