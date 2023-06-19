import { getCookie } from "cookies-next";
import Link from "next/link";

import Layout from "../components/layout";

export default function ProfilePage({ email, token }) {
    return (
        <Layout pageTitle="Profile">
            <Link href="/">Home</Link><br/>
            <h2>{email}'s TOKEN:</h2>
            <p><strong>{ token }</strong></p>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    const email = getCookie("email", { req, res });
    const token = getCookie("token", { req, res });
    if (!email || !token) {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            }
        }
    }

    return {
        props: {
            email,
            token,
        },
    }
}