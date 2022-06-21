const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado



const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const userController = require("../controllers/user")



Routes.post("/formCandidata",userController.registerUser)
Routes.post("/loginUser",userController.loginUser)
Routes.post("/listVagaUser",userController.listaVagasAplicadas)
Routes.put("/editarUser",userController.editarUser)
Routes.delete("/deleteCandidata",userController.deleteUser)
Routes.post("/verifyEmail",userController.verifyEmail)
Routes.post("/verifyCPF",userController.verifyCPF)
Routes.post("/descandidatura",userController.descandidatturaUser)


module.exports = Routes