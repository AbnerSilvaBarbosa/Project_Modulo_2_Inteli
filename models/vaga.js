const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


class Vaga {
    constructor(softskill, nome, descricao, local, salario, idEmpresa, hardskill, modalidade) {

        this.softskill = softskill,
            this.nome = nome,
            this.descricao = descricao,
            this.local = local,
            this.idEmpresa = idEmpresa,
            this.hardskill = hardskill,
            this.modalidade = modalidade
        this.salario = salario

    }

    async registerVaga() { // método para a criação de uma vaga nova
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

    

        const insic = await db.run("INSERT INTO vagas (softskill_vaga,nome_vaga,descricao_vaga,local_vaga,salario_vaga,id_empresas,hardskill_vaga,modalidade_vaga) VALUES(?,?,?,?,?,?,?,?)", [this.softskill, this.nome, this.descricao, this.local, this.salario, this.idEmpresa, this.hardskill, this.modalidade])

        if (insic.changes === 0){
            const error = {
                type:"error",
                message:"erro no db"
            }

            return error
        }


        const success = {
            type:"success",
            message:"add in DB with success"
        }

        return success
    }

    async editVaga(id_vaga,softskill,descricao,salario,hardskill,modalidade,local){ // método para a edição de uma vaga existente
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        let vagaInfosEdit = []

        if(softskill){
            vagaInfosEdit.push(`softskill_vaga =" ${softskill}"`)
        }if(descricao){
            vagaInfosEdit.push(`descricao_vaga = "${descricao}"`)
        }if(salario){
            vagaInfosEdit.push(`salario_vaga = "${salario}"`)
        }if(hardskill){
            vagaInfosEdit.push(`hardskill_vaga = "${hardskill}"`)
        }if(modalidade){
            vagaInfosEdit.push(`modalidade_vaga = "${modalidade}"`)
        }if(local){
            vagaInfosEdit.push(`local_vaga = "${local}"`)
        }

        let vagaInfosEditDB = vagaInfosEdit.join(",")

        const UpdateVaga = db.run(`UPDATE vagas SET ${vagaInfosEditDB} WHERE id_vaga = ${id_vaga}`)

        if(UpdateVaga.changes === 0){
            const error = {
                type:"error",
                message:"Erro no banco de dados"
            }

            return error
        }

        const success = {
            type:"success",
            message:"Vaga editada com sucesso"
        }

        return success


    }

    async deleteVaga(id_vaga){ // método para a exlusão de uma vaga existente
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const DeleteVaga = db.run(`DELETE FROM vagas WHERE id_vaga = ${id_vaga} `)

        if((await DeleteVaga).changes === 0){
            const error = {
                type:"error",
                message:"erro com o banco de dados"
            }

            return error
        }

        const success = {
            type:"success",
            message:"Vaga deletada com sucesso"
        }

        return success

    }

    
}


module.exports = {Vaga}