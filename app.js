// Exercise 1 Section
const http = require("http");
const PORT = 3000;
// Finish setting up the server
http.createServer((req, res)=>{
    const url = req.url;
    const method = req.method;
    res.setHeader("content-type", "text/html")
    console.log(`request method used: ${method}`);
    const dataChunksArray = [];
    req.on(`data`, (chunk)=>{
    console.log(`chunk is: ${chunk}`)
    dataChunksArray.push(chunk)
    })

    req.on('end', ()=>{
        if(method == 'POST'){
            const body = JSON.parse(Buffer.concat(dataChunksArray).toString());
            const responseBody = { method, url, body };

            if(url == "/"){
                res.write("<h2>Hi guyz</h2>")
                res.write(JSON.stringify(responseBody));
                console.log("homeRoute")
                res.statusCode = 202;
                // res.end();
            }
            else {
                res.write("<h1> THIS PAGE WAS NOT FOUND </h1>")
                res.statusCode = 404;
                console.log("errorRoute")
            }
            res.end();
            
        }})
            
        if (url == "/wildcard") {
            res.write("<h1>One of Sparta's greatest leaders was a woman named Gorgo</h1>")
            res.statusCode = 200;
            // res.end();
        }
        if(url == "/about"){
            res.write("<p> I love history and especially the age of antiquity </p>")
            res.statusCode = 200;
            res.end();
        }
        if (url == "/echo") {
            res.write("whatev")
            res.statusCode = 200;
        }
            res.end();
        })



.listen(PORT, ()=>{
    console.log(`server is listening at local host ${PORT} port`)
})