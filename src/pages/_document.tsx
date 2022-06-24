import { Head, Html, Main, NextScript } from "next/document";
import { THEME, TITLE } from "../utils/config";

export default function Document() {
    return(
        <Html data-theme={THEME}>
            <Head>
                <title>{TITLE}</title>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}