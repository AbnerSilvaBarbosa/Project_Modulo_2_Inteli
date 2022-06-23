const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Aparece todas as vagas cadastradas no banco de dados
Routes.get("/listAllVagas", (req, res) => {

    //Uma função que espera as coisas dentro dela acontecem para assim efetuar o codigo
    async function getDB() {

        //abre o banco de dados sqlite
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        let vagas = []

        //roda comando sql e retora uma promise
        const infos = await db.all("SELECT empresas.id_empresas, empresas.logo_empresa, empresas.nome_empresa, vagas.id_empresas, vagas.nome_vaga, vagas.modalidade_vaga, vagas.id_vaga FROM vagas  JOIN empresas  on vagas.id_empresas = empresas.id_empresas ")

        for (let i = 0; i < infos.length; i++) {
            const qtnCandidatas = await db.all('SELECT id_candidata FROM vagasCandidatas WHERE id_vaga = ?', [infos[i].id_vaga])
            let x = ' { "vagaInfo": ' + JSON.stringify(infos[i]) + ', "qtnCandidatas": ' + JSON.stringify(qtnCandidatas) + ' }'
            let y = JSON.parse(x)
            vagas.push(y)
        }

        res.status(200).json(vagas)

        //fecha o banco de dados
        db.close()
    }

    //chamando a função que foi criada
    getDB()


})

// Aparece todas as candidatas cadastradas no banco de dados
Routes.get("/listCandidatas", (req, res) => {

    async function listCand() {

        // abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        //roda comando sql e retorna uma promise
        await db.all("SELECT * FROM candidatas").then((result) => {
            res.json(result)
        })

        // fecha o banco de dados
        db.close()

    }


    listCand()



})

// Aparece todas as empresas cadastradas no banco de dados
Routes.get("/listEmpresasParceiras", (req, res) => {

    async function listEmpresa() {

        //abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // roda comandos sql e retorna uma promise
        let array = []
        const empresaData = await db.all("SELECT * FROM empresas WHERE isAproved = 1")

        for (let i = 0; i < empresaData.length; i++) {
            const vagaQtnInfo = await db.all(`SELECT id_vaga FROM vagas WHERE id_empresas = ${empresaData[i].id_empresas}`)
            let x = '{ "dataEmpresa": ' + JSON.stringify(empresaData[i]) + ', "qtnVagas": ' + JSON.stringify(vagaQtnInfo) + '}'
            let y = JSON.parse(x)
            array.push(y)
        }

        res.status(200).json(array)
        // fecha o banco de dados
        db.close()

    }

    listEmpresa()
})

Routes.get("/listEmpresasSolicitantes", (req, res) => { // função que mostra a lista de empresas que querem existir no db da BiT
    async function listEmpresas() {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.all('SELECT * FROM empresas WHERE isAproved = 0').then((result) => {
            res.json(result)
        })

        db.close()
    }

    listEmpresas()
})


Routes.post("/liberarEmpresa", (req, res) => { // função para liberar uma empresa que está bloqueada
    async function free() {

        const {id_empresa} = req.body

        //abre o banco de dados
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const result = await db.run(`UPDATE empresas SET  isAproved = 1 WHERE id_empresas = '${id_empresa}'`)

        if(result.changes === 0){
            res.status(500).json({
                erro:"Erro com o servidor ou banco de dados"
            })
        }else{
            res.status(200).json({
                message:"Empresa liberada com sucesso"
            })
        }



    }

    free()
})


Routes.post("/bloquearEmpresa",(req,res)=>{

    async function block(){ // função para bloquear empresa

        const {id_empresa} = req.body

        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const result = await db.run(`UPDATE empresas SET  isAproved = 0 WHERE id_empresas = '${id_empresa}'`)

        
        if(result.changes === 0){
            res.status(500).json({
                erro:"Erro com o servidor ou banco de dados"
            })
        }else{
            res.status(200).json({
                message:"Empresa bloqueada com sucesso"
            })
        }


    }

    block()
})

Routes.post(('/loadDataEmpresa'), (req, res) => {
    async function getDB() { // função que carrega os dados da empresa
        const { id_empresa } = req.body

        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        await db.get(`SELECT * FROM empresas WHERE id_empresas = ${id_empresa}`).then((result) => {
            res.json(result)
        })

        db.close()
    }

    getDB();
})

module.exports = Routes