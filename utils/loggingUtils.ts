import consola from 'consola';

export const serverLogging = consola.withTag('pcs').setReporters([
  {
    log: (e) => {
      process.stdout.write(JSON.stringify(e) + '\n');
    },
  },
]);

export const getContextFromHeaders: any = (headers: any) => ({
  brand: headers?.brand || null,
  country: headers?.country || null,
  language: headers?.language || null,
});

export const formatAxiosErrorMessage: any = (
  err: any,
  userMessage?: string,
  pid?: number | string,
  headers?: object
) => ({
  message: userMessage || err.message,
  level: 0,
  status: err.response.status,
  statusText: err.response.statusText,
  pid: pid || null,
  context: headers || getContextFromHeaders(err.response.config.headers),
  apiUrl: err.response.config.url,
});
