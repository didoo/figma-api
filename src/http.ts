let isBrowser;
try {
    isBrowser = fetch !== undefined;
} catch {}

if (!isBrowser) {
    const { parse: parseUrl } = require('url');
    const { request } = require('https');

    (global as any).fetch = function(url: any, opts: any) {
        return new Promise(resolve => {
            request({
                method: 'GET',
                ...parseUrl(url),
                ...opts,
            }, (res: any) => {
                const datas: (Buffer|string)[] = [];
                res.on('data', (data: any) => datas.push(data));
                res.on('end', () => {
                    const result = datas.join('');
                    resolve({
                        json: () => Promise.resolve(JSON.parse(result)),
                    });
                });
    
            }).end();
        });
    };
    
    (global as any).Headers = class Headers {
        append(name: string, value: string) {
            (this as any)[name] = value;
        }
    }
}

export const request = fetch;