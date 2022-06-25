/**
 * CSP is an eye-sore security measure that prevents malicious content from
 * being injected into the page.
 */
import * as fs from 'fs';

export const generateCsp = () => {
  const csp = {
    'default-src': ['self'],
    'script-src': ['self', 'unsafe-inline', 'http://localhost:1234'],
    'style-src': ['self', 'unsafe-inline', 'https://fonts.googleapis.com'],
    'font-src': ['self', 'https://fonts.gstatic.com'],
    'connect-src': ['self', 'ws://localhost:1234']
  };

  return Object.entries(csp).reduce<string[]>((acc, [key, value]) => {
    const entries = value.reduce<string[]>(
      (acc, v) => [...acc, (v.indexOf('://') > -1 ? v : `'${v}'`)], []
    ).join(' ');

    return [...acc, `${key} ${entries}`];
  }, []).join('; ');
};

export const addCspToFile = (path: string, csp: string) => {
  const file = fs.readFileSync(path).toString();
  const newTag = `<meta http-equiv="Content-Security-Policy" content="${csp}">`;
  const currentTag = /<meta http-equiv="Content-Security-Policy" content=".*">/gm;
  const containsCsp = currentTag.test(file);

  return fs.writeFileSync(
    path,
    file.replace(
      containsCsp ? currentTag : /^<head>$/gm,
      containsCsp ? newTag : `<head>\n${newTag}`,
    )
  );
};
