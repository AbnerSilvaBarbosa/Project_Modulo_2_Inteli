const recruiterModel = require("../models/recruiter")

const registerRecruiter = (req, res) => { // constante que sinaliza o registro do recrutador
    const { Nome_Empresa, Email_Empresa, Ramo_de_Atividade, Logo_Empresa, Senha_Empresa, Cultura_Empresa, Telefone_Empresa, Site_Empresa, cnpj_Empresa, Localizacao_Empresa } = req.body

    const recruiter = new recruiterModel.Recruiter(Nome_Empresa, Email_Empresa, Ramo_de_Atividade, Logo_Empresa, Senha_Empresa, Cultura_Empresa, Telefone_Empresa, Site_Empresa, cnpj_Empresa, Localizacao_Empresa)

    recruiter.genereteRecruiter().then((result) => { // código para gerar o json do recrutador após registro
        if (result.type === "error") {
            res.status(500).json(result.message)
        } else {
            res.status(200).json(result.message)
        }

    })


}

const loginRecuiter = (req, res) => { // código do login (conta já criada) pelo recrutador 
    const { email, senha } = req.body

    const recruiter = new recruiterModel.Recruiter()

    recruiter.loginRecruiter(email, senha).then((result) => { // código para gerar o json do recrutador após login
        if (result.type === "error") {
            res.status(400).json(result.message)
        } else {
            res.status(200).json(result.data)
        }
    })
}

const showJobsRecruiter = (req, res) => { //  constante para mostrar as vagas dos recrutadores
    const { id_empresa } = req.body

    const recruit = new recruiterModel.Recruiter()

    recruit.allJobsRecruiter(id_empresa).then((result) => {
        res.status(200).json(result.data)
    })
}

const deleteRecuiter = (req, res) => { //  constante para deletar as vagas dos recrutadores

    const { id_empresas } = req.body

    const recruit = new recruiterModel.Recruiter()

    recruit.deleteRecuiter(id_empresas).then((result) => {
        if (result.type === "error") {
            res.status(500).json({
                error: result.message
            })
        }else{
            res.status(200).json({
                message:result.message
            })
        }
    })

}

const editRecruiter = (req,res)=>{ //  constante para editar as vagas dos recrutadores
    const {id_empresa,logo,email,senha,telefone,site,localização,ramo,cultura} = req.body

    const recruit = new recruiterModel.Recruiter()

    recruit.editRecruiter(id_empresa,logo,email,senha,telefone,site,localização,ramo,cultura).then((result)=>{
        if(result.type === "error"){
            res.status(500).json({
                error:result.message
            })
        }else{
            res.status(200).json(result.message)
        }
    })
}

const verifyEmail = (req,res)=>{ //  constante para a verificação de email
    const {email} = req.body

    const recruit = new recruiterModel.Recruiter()

    recruit.verifyEmail(email).then((result)=>{
        if(result.type === "error"){
            res.status(400).json(result.message)
        }else{
            res.status(200).json({message: result.message})
        }
    })
}

const verifyCNPJ = (req,res)=>{ //  constante para a verificação de CPF
    const {cnpj_Empresa} = req.body

    const user = new UserModel.User()

    user.verifyCNPJ(cnpj_Empresa).then((result)=>{
        if(result.type === "error"){
            res.status(400).json({message:result.message})
        }else{
            res.status(200).json({message: result.message})
        }
    })
}


const loadVagaDataWithUsers = (req, res) => { // constante que recebe o req.body, ou seja, o que vier dos valores dos inputs

    const {id_vaga,id_empresa} = req.body

    const recruiter = new recruiterModel.Recruiter()
    recruiter.loadVagaDataWithUsers(id_vaga,id_empresa).then((result)=>{
        if(result.type === "success"){
            res.status(200).json({data1:result.data1,data2:result.data2})
        }
    })
}

module.exports = { registerRecruiter, loginRecuiter, showJobsRecruiter,deleteRecuiter,editRecruiter,verifyEmail,verifyCNPJ,loadVagaDataWithUsers }
