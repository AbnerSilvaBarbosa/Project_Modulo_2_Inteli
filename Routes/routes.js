const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




//----------------------------------------------


Routes.post("/listVagas", (req, res) => {
    async function getDB() {

        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const vaga = await db.get("SELECT * FROM vagas WHERE id_vaga = ?", [req.query.id_vaga])
        const empresa = await db.get("SELECT nome_empresa, cultura_empresa, telefone_empresa, site_empresa FROM empresas WHERE id_empresas = ?", [vaga.id_empresas])

        const vagaString = JSON.stringify(vaga)
        const empresaString = JSON.stringify(empresa)

        const allInfos = `{"vagaInfos": ${vagaString}, "empresaInfos":${empresaString}}`;

        const JSONInfos = JSON.parse(allInfos)

        res.status(200).json(JSONInfos)
        db.close()
    }
    getDB()
})


//Abner e Gabriel
Routes.post('/applied', (req, res) => {
    async function insertDB() {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const { id_candidata, id_vaga, match_percent } = req.body
        const id_empresa = await db.get(`SELECT id_empresas FROM vagas WHERE id_vaga = ${id_vaga} `)

        const verifyVaga = await db.all(`SELECT id_vaga,id_candidata FROM vagasCandidatas WHERE id_vaga = ${id_vaga} AND id_candidata = ${id_candidata}`)
        
        if(verifyVaga[0]){
            res.status(400).json({
                message:"Você ja se aplicou para essa vaga"
            })
        }else{
            await db.run(`INSERT INTO vagasCandidatas (id_vaga,id_candidata,id_empresa,status, match_percent) VALUES (?,?,?,?,?)`,[id_vaga,id_candidata,JSON.stringify(id_empresa.id_empresas),"aberta", match_percent])
            res.status(200).send()
        }

        

    
    }

    insertDB();

})

Routes.post('/listVagaInfo', (req, res) => {
    async function loadDB(){ 
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.get("SELECT * FROM vagas WHERE id_vaga = ?", [req.query.id_vaga]).then((result) => {
            res.status(200).json(result)
        })

        db.close()
    }
    loadDB()
})

Routes.post('/listCandidatas', (req, res) => {
    async function db() {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })
        const { id_vaga }  = req.body
        db.all('SELECT candidatas.nome_candidata, candidatas.id_candidata, candidatas.email_candidata, candidatas.curriculo_candidata, vagasCandidatas.id_candidata, vagasCandidatas.id_vaga, vagasCandidatas.match_percent FROM vagasCandidatas JOIN candidatas  ON candidatas.id_candidata = vagasCandidatas.id_candidata WHERE vagasCandidatas.id_vaga = ?', [id_vaga]).then((result) => {
            res.status(200).json(result)
        })

        db.close()
    }
    db()
})

Routes.get("/listAllVagasUser",(req,res)=>{
    async function getDB(){
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })
        const infos = await db.all("SELECT empresas.id_empresas, empresas.logo_empresa, empresas.nome_empresa, vagas.id_empresas, vagas.nome_vaga, vagas.descricao_vaga, vagas.id_vaga FROM vagas  JOIN empresas  on vagas.id_empresas = empresas.id_empresas ")

        res.status(200).json(infos)

        db.close()

    }

    getDB()
   
})

// exportando todos os Routes para serem utilizados em outro arquivo js
module.exports = Routes

