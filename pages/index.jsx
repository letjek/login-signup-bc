import Layout from "../components/layout";
import { getCookie } from "cookies-next";
import Link from "next/link";

export default function HomePage({ email, token }) {
    return (
        <Layout pageTitle="Home">
        { email ?
            <>
                <h2>Hi { email }</h2>
                <p>Your Access Token is: { token }</p>
                <Link href="/profile">Profile</Link><br/>
                <Link href="/api/logout">Logout</Link>
            </>
        : 
            <>
                <h2>Auth with Blockchain</h2>
                <Link href="/login">Login</Link><br/>
                <Link href="/signup">Signup</Link>
            </>
        }
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req;
    const res = context.res;
    let email = getCookie("email", { req, res });
    let token = getCookie("token", { req, res });
    if (!email || !token) {
        email = false;
        token = false;
    }
    return { 
        props: {
            email,
            token,
        }
    }
};