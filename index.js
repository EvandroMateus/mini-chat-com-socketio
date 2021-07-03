let express = require("express");
let app = express();
let http = require("http").createServer(app);
let io = require("socket.io")(http);

io.on("connection", socket => {
    socket.on("disconnect", () => {
        console.log("Desconectou: ", socket.id);
    })

    socket.on("msg", data => {
        io.emit("showmsg", data);
        console.log(data);
    })
})

app.set("view engine", "ejs");
app.use(express.static('public'));

app.get("/", (req, res) => {
    res.render("index");
})

http.listen(3000, () => {
    console.log("App Rodando.");
})