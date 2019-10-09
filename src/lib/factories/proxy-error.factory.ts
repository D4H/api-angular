/**
 * Proxy/Gateway Error Failure
 * =============================================================================
 * An unhandled error case in the API will:
 *
 *  1. Timeout (~2 minutes to complete request).
 *  2. Return HTML from the proxy saying it was unable to reach the server.
 *
 * This is the ultimate /response/ failure mode, because there are cases where
 * the actual request (DELETE/POST/PUT) still completes internally.
 */

type HttpMethod
  = 'GET'
  | 'DELETE'
  | 'OPTIONS'
  | 'POST'
  | 'PUT';

interface ProxyErrorParams {
  method: HttpMethod;
  path: string;
}

export function ProxyError(
  { path, method }: Partial<ProxyErrorParams> = { path: '', method: 'GET' }
): string {
  return `
    <!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
    <html>
        <head>
            <title>502 Proxy Error</title>
        </head>
        <body>
            <h1>Proxy Error</h1>
            <p>The proxy server received an invalid
    response from an upstream server.
                <br />
    The proxy server could not handle the request
                <em>
                    <a href="${path}">${method}&nbsp;${path}</a>
                </em>.
                <p>
    Reason:
                    <strong>Error reading from remote server</strong>
                </p>
            </p>
        </body>
    </html>
  `;
}
