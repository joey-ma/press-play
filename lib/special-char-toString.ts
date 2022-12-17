// If you know about XSS, one of the solutions is to escape HTML strings.

export const escape = (str: any) =>
  str.replace(
    /[&<>"']/g,
    (m: string) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[
        m
      ])
  );
