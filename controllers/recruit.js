const recruiterModel = require("../models/recruiter")

const registerRecruiter = (req, res) => {
    const { Nome_Empresa, Email_Empresa, Ramo_de_Atividade, Logo_Empresa, Senha_Empresa, Cultura_Empresa, Telefone_Empresa, Site_Empresa, cnpj_Empresa, Localizacao_Empresa } = req.body

    const recruiter = new recruiterModel.Recruiter(Nome_Empresa, Email_Empresa, Ramo_de_Atividade, Logo_Empresa, Senha_Empresa, Cultura_Empresa, Telefone_Empresa, Site_Empresa, cnpj_Empresa, Localizacao_Empresa)

    recruiter.genereteRecruiter().then((result) => {
        if (result.type === "error") {
            res.status(500).json(result.message)
        } else {
            res.status(200).json(result.message)
        }

    })


}

const loginRecuiter = (req, res) => {
    const { email, senha } = req.body

    const recruiter = new recruiterModel.Recruiter()

    recruiter.loginRecruiter(email, senha).then((result) => {
        if (result.type === "error") {
            res.status(400).json(result.message)
        } else {
            res.status(200).json(result.data)
        }
    })
}

const showJobsRecruiter = (req, res) => {
    const { id_empresa } = req.body

    const recruit = new recruiterModel.Recruiter()

    recruit.allJobsRecruiter(id_empresa).then((result) => {
        res.status(200).json(result.data)
    })
}

const deleteRecuiter = (req, res) => {

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

const editRecruiter = (req,res)=>{
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

const verifyEmail = (req,res)=>{
    const {email} = req.body

    const recruit = new recruiterModel.Recruiter()

    recruit.verifyEmail(email).then((result)=>{
        if(result.type === "error"){
            res.status(400).json({message:result.message})
        }else{
            res.status(200).json({message: result.message})
        }
    })
}

const verifyCNPJ = (req,res)=>{
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


const loadVagaDataWithUsers = (req, res) => {

    const {id_vaga,id_empresa} = req.body

    const recruiter = new recruiterModel.Recruiter()
    recruiter.loadVagaDataWithUsers(id_vaga,id_empresa).then((result)=>{
        if(result.type === "success"){
            res.status(200).json({data1:result.data1,data2:result.data2})
        }
    })
}

module.exports = { registerRecruiter, loginRecuiter, showJobsRecruiter,deleteRecuiter,editRecruiter,verifyEmail,verifyCNPJ,loadVagaDataWithUsers }
