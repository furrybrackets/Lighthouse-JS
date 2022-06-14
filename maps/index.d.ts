interface LighthouseOptions {
    code: string;
    lang: string;
    lineNumbers?: boolean;
    api?: string;
    fileTheme?: string;
    theme?: string;
}
export declare class Lighthouse {
    lang: string;
    lineNumbers: boolean;
    api: string;
    fileTheme: string;
    theme: string;
    constructor(options: LighthouseOptions);
    getHTML(code: string): Promise<string>;
    fillCodeBlocks(): Boolean;
}
export {};
//# sourceMappingURL=index.d.ts.map