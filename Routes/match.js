const express = require("express") // trazedno o express para ser utilizado
const sqlite3 = require("sqlite3").verbose() // Trazendo o sqlite3 (oficial do sqlite) para ser utilizado
const sqlite = require("sqlite") // Trazendo o sqlite (criado pela comunidade) para ser utilizado

const app = express()
const bodyParser = require('body-parser')
const Routes = express.Router(); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Routes.post('/listMatch', (req, res) => {

    const { id_candidata } = req.body
    
    async function matchDoMilenio() {
        const db = await sqlite.open({ filename: `./database/banco_de_dados.db`, driver: sqlite3.Database })
    
        // pegando as habilidades da candidata e todas as vagas
        const dbCandidata = await db.get('SELECT  cargo_candidata, softskill_candidata, hardskill_candidata FROM candidatas WHERE id_candidata = ?', [id_candidata]);
        const dbVagas = await db.all(`SELECT vagas.id_vaga, vagas.nome_vaga, vagas.descricao_vaga, vagas.softskill_vaga, vagas.hardskill_vaga, vagas.local_vaga, vagas.modalidade_vaga, vagas.salario_vaga, empresas.id_empresas, empresas.logo_empresa FROM vagas JOIN empresas on vagas.id_empresas = empresas.id_empresas`);
       
        //transformando as habilidades da candidata em um array
        let candidataAllSkills = dbCandidata.softskill_candidata + ',' + dbCandidata.hardskill_candidata;
        let candidataSkills = candidataAllSkills.split(',');
        let idVagasMatched = [] //variável que guardará o ID das vagas que deram match
    
    
        for (let x = 0; x < dbVagas.length; x++) { //mapeando vaga por vaga
            let vagaAllSkills = dbVagas[x].softskill_vaga + ',' + dbVagas[x].hardskill_vaga;
            let vagaSkillsOld = vagaAllSkills.split(',') //transformando as skills da vaga mapeada em um array
    
            let vagaSkills =  [...new Set(vagaSkillsOld)]

            let matchedSkills = []
            for (let i = 0; i < candidataSkills.length; i++) { // mapeando skill por skill 
                if (vagaSkills.indexOf(candidataSkills[i]) > -1) { // quando uma skill não da match, retorna -1 e quando da match, retorna um número >= 0
                    matchedSkills.push(candidataSkills[i]) // guarda o valor da skill que deu match 
                }
            }
            
            var matchedSkillsN = [...new Set(matchedSkills)]

            let matchPercent = matchedSkillsN.length / vagaSkills.length; 
    
            if (matchPercent >= 0.5) { // caso o match for maior que 0.5, acontecer as coisas abaixo
                let jsonS = JSON.stringify(dbVagas[x])
                let res = ` { "vagaData": ${jsonS}, "matchPercent": ${parseFloat(matchPercent.toFixed(4))} }`  
                let jsonP = JSON.parse(res)
                idVagasMatched.push(jsonP)
            }
        }
        res.status(200).json(idVagasMatched)
    }

    matchDoMilenio()
});

module.exports = Routes