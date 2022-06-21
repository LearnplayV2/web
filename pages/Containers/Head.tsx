import Head from "next/head";

export default function Header({title}: {title: string}) {
    return(
        <>
            <Head>
                <title>{title}</title>
            </Head>
        </>
    );
}