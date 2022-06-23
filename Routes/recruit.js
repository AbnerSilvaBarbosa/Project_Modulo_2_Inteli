const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const recruiterController = require("../controllers/recruit")

// rotas de post, put e delete abaixo


Routes.post("/formEmpresa",recruiterController.registerRecruiter)
Routes.post("/loginRecruit",recruiterController.loginRecuiter)
Routes.post('/listAllEmpresaVagas',recruiterController.showJobsRecruiter)
Routes.delete("/deleteEmpresa", recruiterController.deleteRecuiter)
Routes.put("/editEmpresa",recruiterController.editRecruiter)
Routes.post("/verifyEmail",recruiterController.verifyEmail)
Routes.post("/verifyCNPJ",recruiterController.verifyCNPJ)
Routes.post("/loadVagaDataWithUsers",recruiterController.loadVagaDataWithUsers)






module.exports = Routes