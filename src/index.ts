import axios from 'axios';
import { unescape } from './unescape';
import { normalize } from './normalize';

interface LighthouseOptions {
    code: string;
    lang: string;
    lineNumbers?: boolean;
    api?: string;
    fileTheme?: string;
    theme?: string;
};

interface HTMLReturnData {
    error: boolean;
    errorType: string;
    html: string;
};

export class Lighthouse {
    lang: string;
    lineNumbers: boolean;
    api: string;
    fileTheme: string;
    theme: string;

    constructor(options: LighthouseOptions) {
        this.lang = options.lang || 'javascript';
        this.lineNumbers = options.lineNumbers || false;
        this.api = options.api || 'https://lighthouse-api.com/api/highlight';
        this.fileTheme = options.fileTheme || '';
        this.theme = options.theme || 'material-palenight';
    };

    async getHTML(code: string): Promise<string> {
        console.log({
            lang: this.lang,
            lineNumbers: this.lineNumbers,
            api: this.api,
            fileTheme: this.fileTheme,
            code: code
        });
        try {
            if (this.fileTheme) {
                const { data } = await axios.post<HTMLReturnData>(
                    this.api,
                    {
                        lang: this.lang,
                        lineNumbers: this.lineNumbers,
                        api: this.api,
                        fileTheme: this.fileTheme,
                        code: code,
                        theme: this.theme
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    });   
                    return unescape(data.html);
            } else {
                const { data } = await axios.post<HTMLReturnData>(
                    this.api,
                    {
                        lang: this.lang,
                        lineNumbers: this.lineNumbers,
                        api: this.api,
                        fileTheme: this.fileTheme,
                        code: code,
                        theme: this.theme
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: 'application/json',
                        },
                    });

                    return unescape(data.html);
            }

        } catch (error) {
            if (axios.isAxiosError(error)) {
                console.log('error message: ', error.message);
                return error.message;
              } else {
                console.log('unexpected error: ', error);
                return 'An unexpected error occurred';
              }
        }
    }

    fillCodeBlocks(): Boolean {
        const codeBlocks = document.getElementsByTagName('code');
        console.log(codeBlocks);
        for (let i = 0; i<codeBlocks.length; i++) {
            let code = normalize(codeBlocks[i].innerHTML);
            this.getHTML(code).then(res => {
                console.log(res);
                codeBlocks[i].innerHTML = res;
            });
        }
        return true;
    }
};