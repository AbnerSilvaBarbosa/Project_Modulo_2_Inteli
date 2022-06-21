const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado
const bodyParser = require("body-parser") // Trazendo o body-parser para ser utilizado
const Routes = express.Router() // Trazendo o Router do proprio express para ser utilizado


const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

class User {
    constructor(nome, escolaridade, email, cpf, genero, nascimento, curriculo, softskill, senha, cargo, celular, localizacao, status, hardskill) {
        this.nome = nome,
            this.escolaridade = escolaridade,
            this.email = email,
            this.cpf = cpf,
            this.genero = genero,
            this.nascimento = nascimento,
            this.curriculo = curriculo,
            this.softskill = softskill,
            this.senha = senha,
            this.cargo = cargo,
            this.celular = celular,
            this.localizacao = localizacao,
            this.status = status,
            this.hardskill = hardskill
    }


    async genereteUser() {
        // abre o banco de dados
        let db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        // executa comando sql
        // 1ª liste as colunas em ordem que querem ser preenchidas
        // 2ª Values (? x quantidade de dados que entrarao)
        // 3ª [valor1, valor2,valor3 .....]

        const insi = await db.run("INSERT INTO candidatas (nome_candidata ,escolaridade_candidata ,email_candidata,cpf_candidata,genero_candidata,nascimento_candidata,curriculo_candidata,softskill_candidata,senha_candidata,cargo_candidata,celular_candidata,localizacao_candidata,status_candidata,hardskill_candidata) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)", [this.nome, this.escolaridade, this.email, this.cpf, this.genero, this.nascimento, this.curriculo, this.softskill, this.senha, this.cargo, this.celular, this.localizacao, this.status, this.hardskill])

        if (insi.changes === 0) {
            const error = {
                type: "error",
                message: "try again, erro com o banco "
            }

            return error
        }

        const success = {
            type: "success",
            message: "add with success in DB"
        }

        return success
    }

    async loginUser(email, senha) {
        if (!email && !senha) {

            const error = {
                type: "error",
                message: "Email e Senha necessários"
            }

            return error

        } else if (!email) {
            const error = {
                type: "error",
                message: "Email necessário"

            }

            return error

        } else if (!senha) {
            const error = {
                type: "error",
                message: "Senha necessária"
            }

            return error

        } else if (email && senha) {



            const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

            const user = await db.all("SELECT * FROM candidatas WHERE email_candidata == ?", [email])



            if (!user[0]) {
                const error = {
                    type: "error",
                    message: "Email não registrado"
                }

                return error
            }



            else if (user[0].senha_candidata == senha) {
                const success = {
                    type: "success",
                    data: user[0]

                }

                return success



            }

            else if ((user[0].senha_candidata == senha) == false) {
                const error = {
                    type: "error",
                    message: "Email ou Senha não corresponde"
                }

                return error
            }
        }
    }

    async listjobs(id_candidata) {

        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const result = await db.all(`SELECT vagas.id_vaga, vagas.nome_vaga, vagas.descricao_vaga, vagasCandidatas.id_vaga, vagasCandidatas.id_candidata FROM vagasCandidatas JOIN vagas on vagasCandidatas.id_vaga = vagas.id_vaga WHERE vagasCandidatas.id_candidata = ${id_candidata}`)

        const success = {
            type: "success",
            data: result
        }

        return success

    }

    async editUser(id_candidata, localizacao, cargo, grauDeInstrução, hardskill, softskill) {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const rowId = await db.all(`SELECT * FROM candidatas WHERE id_candidata = ${id_candidata}`)

        let infosChangesUser = []

        if (localizacao) {
            infosChangesUser.push(`localizacao_candidata = "${localizacao}"`)
        } if (cargo) {
            infosChangesUser.push(`cargo_candidata = "${cargo}"`)
        } if (grauDeInstrução) {
            infosChangesUser.push(`escolaridade_candidata = "${grauDeInstrução}"`)
        } if (hardskill) {
            infosChangesUser.push(`hardskill_candidata = "${hardskill}"`)
        } if (softskill) {
            infosChangesUser.push(`softskill_candidata = "${softskill}"`)
        }

        // verificar se nenhuma informação foi enviada ao servidor

        let infosForDbUser = infosChangesUser.join(",")

        const Update = await db.run(`UPDATE candidatas SET ${infosForDbUser} WHERE id_candidata = ${id_candidata}`)

        if (Update.changes === 0) {
            const error = {
                type: "error",
                message: "Erro no banco de dados"
            }
            return error
        }

        const success = {
            type: "success",
            message: "informações alteradas"
        }

        return success

    }

    async deleteUser(id_candidata) {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const rowId = await db.all(`SELECT * FROM candidatas WHERE id_candidata = ${id_candidata}`)

        //verificar se possui esase id no db

        const DeleteUser = await db.run(`DELETE FROM candidatas WHERE id_candidata = ${id_candidata}`)

        if (DeleteUser.changes === 0) {

            const error = {
                type: "error",
                message: "Erro banco de dados"
            }

            return error
        }

        const success = {
            type: "success",
            message: "Usuario deletado"
        }

        return success

    }

    async EmailVerificacion(EmailVerificacion) {
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const result = await db.all(`SELECT * FROM candidatas WHERE email_candidata == "${EmailVerificacion}" `)

        if (result[0]) {

            const error = {
                type: "error",
                message: "Email ja registrado"
            }

            return error
        }

        const success = {
            type: "success",
            message: "Email não registrado ainda"
        }

        return success






    }

    async CPFVerificacion(CPFVerificacion){
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const result = await db.all(`SELECT * FROM candidatas WHERE cpf_candidata = "${CPFVerificacion}"`)

        if(result[0]){
            const error = {
                type:"error",
                message: "CPF já está registrado"
            }

            return error
        }

        const success = {
            type:"success",
            message: "CPF não foi registrados ainda"
        }

        return success

    }

    async cancelCandidataura(id_candidata,id_vaga){
        const db = await sqlite.open({ filename: "./database/banco_de_dados.db", driver: sqlite3.Database })

        const result = await db.run(`DELETE FROM vagasCandidatas WHERE id_vaga = ${id_vaga} AND id_candidata = ${id_candidata}`)

        if(result.changes === 0){
            const error = {
                type: 'error',
                message: "erro de servidor"
            }

            return error
        }

        const success = {
            type:"success",
            message:"Candidatura cancelada :)"
        }

        return success
    }

    

}





module.exports = { User }