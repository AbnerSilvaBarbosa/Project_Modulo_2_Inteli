const vagaModel = require("../models/vaga.js")


const registroVaga = (req, res) => { // código para a criação de vagas por parte das empresas

    const { SoftskillVaga, NomeVaga, DescricaoVaga, LocalVaga, SalarioVaga, IdEmpresa, HardskillVaga, ModalidadeVaga } = req.body

    const vaga = new vagaModel.Vaga(SoftskillVaga, NomeVaga, DescricaoVaga, LocalVaga, SalarioVaga, IdEmpresa, HardskillVaga, ModalidadeVaga)

    vaga.registerVaga().then((result) => {
        if (result.type === "error") {
            res.status(500).json(result.message)
        } else {
            res.status(200).json(result.message)
        }
    })


}

const editVaga = (req,res)=>{ // código para a edição de vagas já criadas por parte das empresas
    const {id_vaga,softskill,descricao,salario,hardskill,modalidade,local} = req.body

    const vaga = new vagaModel.Vaga()

    vaga.editVaga(id_vaga,softskill,descricao,salario,hardskill,modalidade,local).then((result)=>{
        if(result.type === "error"){
            res.status(500).json({
                error:result.message
            })
        }else{
            res.status(200).json(result.message)
        }
    })
}

const delVaga = (req,res)=>{ // código para a exclusão de vagas por parte das empresas
    const {id_vaga} = req.body

    const vaga = new vagaModel.Vaga()

    vaga.deleteVaga(id_vaga).then((result)=>{
        if(result.type === "error"){
            res.status(500).json({
                error:result.message
            })
        }else{
            res.status(200).json(result.message)
        }
    })
}


module.exports = {registroVaga,editVaga,delVaga}