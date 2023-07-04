const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");
let pas = "salom.html";
let data = `fhfgh`;
const port = process.env.PORT || 8080
// app.set('view engine', 'ejs');
app.get("/", async (req, res) => {
    const puppeteer = require("puppeteer");
    async function run() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto("https://namozvaqti.uz/shahar/navoiy");

        // await page.screenshot({ path: "example.png", fullPage: true });
        const time = await page.evaluate(() =>
            Array.from(document.querySelectorAll(".ad__item"), (e) => ({
                time: e.querySelector(".time").innerText,
            }))
        );

        console.log(time[3]["time"]);
        data = `<!DOCTYPE html>
    <html>
        <head>
            <title>Namaz Time</title>
            <link rel="stylesheet" href="css/style.css" />
            <style>
            * *::after *::before {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            ul,
            ol {
                list-style: none;
            }

            a {
                display: inline-block;
                text-decoration: none;
                font-size: inherit;
                color: inherit;
            }

            img {
                display: flex;
                object-fit: cover;
            }

            html {
                height: 100%;
                scroll-behavior: smooth;
                background-image: url(../images/islamic_gif.mov);
                background-repeat: no-repeat;
                background-size: cover;
            }

            body {
                display: flex;
                flex-direction: column;
                height: 100%;
                font-family: Aref Ruqaa;
            }

            button {
                outline: none;
                border: none;
            }

            .container {
                width: 100%;
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 1.5rem;
            }

            .main {
                flex-grow: 1;
            }
            .main__title {
                color: rgb(235, 234, 233);
                font-size: 3.5rem;
                font-family: Aref Ruqaa;
                font-weight: 700;
                padding-left: 6rem;
                position: relative;
            }
            .main__title::after {
                content: url(../images/kaaba.png);
                display: inline;
                position: absolute;
                right: 10rem;
                top: 1rem;
            }
            .time {
                width: 20rem;
                height: 8rem;
                background: linear-gradient(#dcedc1, #ffaaa5);
                border-radius: 0.5rem;
                box-shadow: 0.3rem;
            }
            .time-wrapper {
                display: flex;
                gap: 2rem;
            }
            .time__title {
                font-family: Aref Ruqaa;
                font-weight: 400;
                color: rgb(71, 70, 68);
                text-align: center;
                font-size: 1.8rem;
            }

            .footer__title {
                color: #e5eade;
                font-size: 1.8rem;
            }
            #myVideo {
                position: fixed;
                right: 0;
                bottom: 0;
                min-width: 70%;
                min-height: 70%;
            }
            .content {
                position: fixed;
                top: 10%;
                background: rgba(0, 0, 0, 0.5);
                color: #f1f1f1;
                width: 100%;
                padding: 20px;
            }
            .main__description {
                font-size: 1.8rem;
            }
        </style>
        </head>
        <body>
            <div class="container">
                <video autoplay muted loop id="myVideo">
                    <source src="images/walking.mp4" type="video/mp4" />
                </video>
                <div class="content container">
                    <main class="main">
                        <h1 class="main__title">Navoiy viloyati namoz vaqtlari</h1>
                        <div class="time-wrapper">
                            <div class="time">
                                <h2 class="time__title">bomdod : <br /> ${time[0]["time"]}</h2>
                            </div>
                            <div class="time">
                                <h2 class="time__title">peshin :<br />${time[1]["time"]}</h2>
                            </div>
                            <div class="time">
                                <h2 class="time__title">asr :<br />${time[2]["time"]}</h2>
                            </div>
                            <div class="time">
                                <h2 class="time__title">shom :<br />${time[3]["time"]}</h2>
                            </div>
                            <div class="time">
                                <h2 class="time__title">xufton :<br />${time[4]["time"]}</h2>
                            </div>
                        </div>
                        <p class="main__description">
                            kun:<br />
                            soat:
                        </p>
                    </main>
                    <footer class="footer__container container">
                        <h3 class="footer__title">
                            sayt: Dadajonim Murodov G'olib Muhammadovich uchun
                        </h3>
                    </footer>
                </div>
            </div>
            <!-- <script src="js/index.js"></script> -->
        </body>
    </html>
    `;
        fs.writeFile(pas, data, (err) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log("data written");
            }
        });
        await browser.close();
    }

    run();

    res.sendFile(path.join(__dirname, "./salom.html"));
});

app.listen(port, () => {
    console.log(path.join(__dirname, "/./index.html"));
    console.log("server is running");
});
