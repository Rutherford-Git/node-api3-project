const server = require("./api/server");

// require your server and launch it
const port = 9000

server.listen(port, ()=> {
    console.log(`listening on`, port)
})