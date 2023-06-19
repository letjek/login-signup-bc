// import Cookies from "cookies";
// const { createHash } = require("node:crypto");

// import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method == "POST") {
    try {
      const email = req.body["email"];
      const password = req.body["password"];
      const passwordagain = req.body["passwordagain"];

      if (password != passwordagain){
          res.redirect("/signup?msg=PASSWORD%20UNMATCH");
          return;
      }

      await fetch(`${process.env.BACKEND_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        })
      });
      
      res.redirect("/");
    } catch (error) {
      res.redirect("/signup?msg=FAILED%20ERROR");
    }    
  } else {
    res.redirect("/");
  }
}