const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado

const match = require('./Routes/match.js')
const rotas = require("./Routes/routes.js") // Trazendo os codigos de outra api local

const app = express()
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(express.static("../Frontend"))


const UserRoutes = require("./Routes/user.js")
const RecruiterRoutes = require("./Routes/recruit")
const VagaRoutes = require("./Routes/vaga")
const AdmRoutes = require("./Routes/adm")

// separador de rodas ( localhost:3000/rotas/X)
app.use("/rotas", rotas)
app.use("/match", match)

app.use("/user",UserRoutes)
app.use("/recruiter",RecruiterRoutes)
app.use("/vaga",VagaRoutes)
app.use("/adm", AdmRoutes)


app.use("/",express.static("../Frontend/views"))
app.use("/adm",express.static("../Frontend/views/ADM"))


// Iniciando o servidor localmente na porta 3000
app.listen(3000, () => {
    console.log("Servidor aberto http://localhost:3000")
})