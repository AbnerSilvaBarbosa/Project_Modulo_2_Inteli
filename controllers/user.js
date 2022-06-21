const { response } = require("express")
const userModel = require("../models/user")

const registerUser = (req,res)=>{


    const { Nome_Candidata, Escolaridade_candidata, Email_candidata, CPF_candidata, Genero_candidata, Data_nascimento, Curriculo_candidata, Softskill_candidata, Senha_candidata, Cargo_candidata, Celular_candidata, Pais_candidata, Status_candidata, Hardskill_candidata, Estado_candidata, Cidade_candidata } = req.body


    const user = new userModel.User(Nome_Candidata, Escolaridade_candidata, Email_candidata, CPF_candidata, Genero_candidata, Data_nascimento, Curriculo_candidata, Softskill_candidata, Senha_candidata, Cargo_candidata, Celular_candidata, Pais_candidata, Status_candidata, Hardskill_candidata, Estado_candidata, Cidade_candidata)

    user.genereteUser().then((result)=>{
        if(result.type === "error"){
            res.status(500).json(result.message)
        }else{
            res.status(200).json(result.message)
        }
    })
}

const loginUser = (req,res)=>{
    const { email, senha } = req.body

    const user = new userModel.User()

    user.loginUser(email,senha).then((result)=>{
        if(result.type === "error"){
            res.status(400).json(result.message)
        }else{
            res.status(200).json(result.data)
        }
    })
}

const listaVagasAplicadas = (req,res)=>{
    const {id_candidata} = req.body

    const user = new userModel.User()

    user.listjobs(id_candidata).then((result)=>{
        console.log(result.data)
        res.status(200).json(result.data)
    })
  
}

const editarUser = (req,res)=>{
    const {id_candidata,localização,cargo,grauDeInstrução,hardskill,softskill} = req.body

    const user = new userModel.User()

    user.editUser(id_candidata,localização,cargo,grauDeInstrução,hardskill,softskill).then((result)=>{

        if(result.type === "error"){
            res.status(500).json({
                error: result.message
            })
        }else{
            res.status(200).json({
                message: result.message
            })
        }
    })
}

const deleteUser = (req,res)=>{
    const {id_candidata} = req.body

    const user = new userModel.User()

    user.deleteUser(id_candidata).then((result)=>{
        if(result.type === "error"){
            res.status(500).json({
                error:result.message
            })
        }else{
            res.status(200).json({
                message: result.message
            })
        }
    })
}

const verifyEmail = (req,res)=>{
    const {Email_candidata} = req.body

    const user = new userModel.User()

    user.EmailVerificacion(Email_candidata).then((result)=>
    {
        if(result.type === "error"){
            res.status(400).json({
                error:result.message
            })
        }else{
            res.status(200).json({
                message: result.message
            })
        }
    })
}

const verifyCPF = (req,res)=>{
    const {CPF_candidata} = req.body

    const user = new userModel.User()
    
    user.CPFVerificacion(CPF_candidata).then((result)=>{
        if(result.type === "error"){
            res.status(400).json({
                error:result.message
            })
        }else{
            res.status(200).json({message:result.message})
        }
    })
}

const descandidatturaUser = (req,res)=>{
    const {id_candidata,id_vaga} = req.body

    const user = new userModel.User()
    user.cancelCandidataura(id_candidata,id_vaga).then((result)=>{
        if(result.type ==="error"){
            res.status(500).json({message:result.message})
        }else{
            res.status(200).json({message:result.message})
        }

    })
}


module.exports = {registerUser,loginUser,listaVagasAplicadas,editarUser,deleteUser,verifyEmail,verifyCPF,descandidatturaUser}