import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";

import Layout from "../components/layout";

export default function SignupPage() {
    const router = useRouter()
    const { msg } = router.query
    return (
        <Layout pageTitle="Signup">
            <Link href="/">Home</Link><br/>
            { msg ?
                <h3 className="red">{ msg }</h3>
            :
                <></>
            }
            <h2>Sign up</h2>
            <form action="/api/signup" method="POST">
                <input minLength="3" name="email" id="email" type="text" placeholder="email" required></input><br/>
                <input minLength="5" name="password" id="password" type="password" placeholder="password" required></input><br/>
                <input minLength="5" name="passwordagain" id="passwordagain" type="password" placeholder="password again" required></input><br/>
                <input type="submit" value="Signup"/>
            </form>
        </Layout>
    );
}

export async function getServerSideProps(context) {
    const req = context.req
    const res = context.res
    let email = getCookie("email", { req, res });
    let token = getCookie("token", { req, res });
    if (email && token) {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }
    return { 
        props: {
            email: false,
            token: false,
        } 
    };
};