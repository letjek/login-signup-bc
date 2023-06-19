import Cookies from "cookies";
// const { createHash } = require("node:crypto");

export default async function handler(req, res) {
  if (req.method == "POST") {
    const email = req.body["email"];
    const guess = req.body["password"];

    let token = null;

    const result = await fetch(`${process.env.BACKEND_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password: guess,
      })
    });

    // console.log("RESULT: ", result.headers);

    const json = await result.json();

    // console.log("JSON: ", json);

    if (json.access_token) {
        const cookies = new Cookies(req, res);
        token = json.access_token;
        cookies.set("email", email);
        cookies.set("token", token, {
          httpOnly: true,
          maxAge: new Date().getTime() + 3600000,
          sameSite: "strict",
          secure: true,
        });
        // console.log("COOKIES: ", cookies);
        res.redirect("/");
    } else {
        res.redirect("/login?msg=FAILED");
    }
  } else {
    res.redirect("/");
  }
}