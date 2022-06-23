declare const SERVER_API_URL: string;
declare const I18N_HASH: string;

declare module '*.scss' {
    const content: { [className: string]: string };
    export = content;
}
