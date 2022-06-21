function validateEmail(email) {
    var re = /\S+@\S+\.\S+/; // função de validação de email
    return re.test(email);
}

function catchUserData() { // função que pega os dados de usuário de acordo com o que colocam no input
    let errorNome = document.querySelector("#errorNome")
    let errorEmail = document.querySelector("#errorEmail")
    let errorCelular = document.querySelector("#errorCelular")
    let errorCPF = document.querySelector("#errorCPF")
    let errorDate = document.querySelector("#errorData")
    let errorGenero = document.querySelector("#errorGenero")
    let errorSenha = document.querySelector("#errorSenha")

    //Tela de Cadastro 1
    let forms1 = {
        NomeCandidata: document.querySelector('#nomeCandidata').value,
        EmailCandidata: document.querySelector('#emailCandidata').value,
        CelularCandidata: document.querySelector('#celularCandidata').value,
        CPFCandidata: document.querySelector('#cpfCandidata').value,
        GeneroCandidata: document.querySelector('#genero').value,
        SenhaCandidata: document.querySelector('#senha').value,
        NascimentoCandidata: document.querySelector("#data-nascimento").value,
        LocalizacaoCandidata: document.querySelector('#localizacao').value
    }

    // caso o usuário não preencha um campo corretamente, ele receberá uma mensagem de alerta
    if (!forms1.NomeCandidata) {
        errorNome.innerHTML = "Nome necessário"
        window.scroll(0, 0)
        setTimeout(function () {
            errorNome.innerHTML = ""
        }, 5000)
    } else if (forms1.NomeCandidata) {
        let transform = forms1.NomeCandidata.split("")
        let verify

        for (let i = 0; i < transform.length; i++) {
            if (isNaN(parseInt(transform[i])) == false) {
                verify = true
            }
        }

        if (verify === true) {
            errorNome.innerHTML = "Nome não pode conter numero"
            window.scroll(0, 0)
            setTimeout(function () {
                errorNome.innerHTML = ""
            }, 5000)
        } else {

        } if (!forms1.EmailCandidata) {
            errorEmail.innerHTML = "Email necessário"
            window.scroll(0, 0)
            setTimeout(function () {
                errorEmail.innerHTML = ""
            }, 5000)

        } else if (forms1.EmailCandidata) {
            if (validateEmail(forms1.EmailCandidata) == false) {
                errorEmail.innerHTML = "Email invalido"
                window.scroll(0, 0)
                setTimeout(function () {
                    errorEmail.innerHTML = ""
                }, 5000)
            }
            else {
                if (forms1.CelularCandidata == "(__) _____-____") {
                    errorCelular.innerHTML = "Numero de celular obrigatório"
                    window.scroll(0, 0)
                    setTimeout(function () {
                        errorCelular.innerHTML = ""
                    }, 5000)
                } else if (forms1.CPFCandidata == "___.___.___-__") {
                    errorCPF.innerHTML = "CPF necessário"
                    window.scroll(0, 0)
                    setTimeout(function () {
                        errorCPF.innerHTML = ""
                    }, 5000)

                } else if (!forms1.LocalizacaoCandidata) {
                    errorDate.innerHTML = "Localização necessária"
                    window.scroll(0, 0)
                } else if (!forms1.NascimentoCandidata) {
                    errorDate.innerHTML = "Data necessária"
                    window.scroll(0, 150)
                    setTimeout(function () {
                        errorDate.innerHTML = ""
                    }, 5000)

                } else if (!forms1.GeneroCandidata) {
                    errorGenero.innerHTML = "Gênero necessário"
                    window.scroll(0, 160)
                    setTimeout(function () {
                        errorGenero.innerHTML = ""
                    }, 5000)
                } else if (!forms1.SenhaCandidata) {

                    errorSenha.innerHTML = "Senha obrigatoria"
                    window.scroll(0, 170)
                    setTimeout(function () {
                        errorSenha.innerHTML = ""
                    }, 5000)
                } else {

                    $.ajax({
                        url: "http://localhost:3000/user/verifyEmail",
                        method: "POST",
                        data: {
                            Email_candidata: forms1.EmailCandidata
                        },
                        success: function (res) {

                            $.ajax({
                                url: "http://localhost:3000/user/verifyCPF",
                                method: "POST",
                                data: {
                                    CPF_candidata: forms1.CPFCandidata
                                },
                                success: function () {
                                    sessionStorage.setItem("User1", JSON.stringify(forms1)) // salvando objeto na session storage

                                    window.location.replace("/views/Users/cadastroUsuaria2.html") // direciona para outr página


                                }, error: function (res) {
                                    console.log(res)
                                    errorCPF.innerHTML = res.responseJSON.error
                                    window.scroll(0, 0)
                                    setTimeout(function () {
                                        errorCPF.innerHTML = ""
                                    }, 5000)

                                }
                            })



                        },
                        error: function (res) {
                            console.log(res)
                            errorEmail.innerHTML = res.responseJSON.error
                            window.scroll(0, 0)
                            setTimeout(function () {
                                errorEmail.innerHTML = ""
                            }, 5000)
                        }
                    })


                }
            }
        }

    }
}


function loadDataForms1User() {
    let userinfos =JSON.parse(sessionStorage.getItem("User1"))

    let NomeCandidata = document.querySelector('#nomeCandidata').value = userinfos.NomeCandidata
    let EmailCandidata = document.querySelector('#emailCandidata').value = userinfos.EmailCandidata
    let CelularCandidata = document.querySelector('#celularCandidata').value = userinfos.CelularCandidata
    let CPFCandidata = document.querySelector('#cpfCandidata').value = userinfos.CPFCandidata
    let GeneroCandidata = document.querySelector('#genero').value = userinfos.GeneroCandidata
    let SenhaCandidata = document.querySelector('#senha').value = userinfos.SenhaCandidata
    let NascimentoCandidata = document.querySelector("#data-nascimento").value = userinfos.NascimentoCandidata
    let LocalizacaoCandidata = document.querySelector('#localizacao').value = userinfos.LocalizacaoCandidata

  



    
}

let PDFcurriculo
let LogoEmpresa

function onChange() {
    let file = document.querySelector('#formFile').files[0];
    if (file.size > 2197152) {
        alert("File is too big!");
        this.value = "";
    } else {
        getBase64(file).then(
            data =>
                PDFcurriculo = data
        );

        $("#nameFile").html("Currículo carregado com sucesso")
        $("#nameFile").attr("class", "sucesso")
    }

}

function onChange2() {
    let file = document.querySelector('#formFile').files[0];
    if (file.size > 2197152) {
        alert("File is too big!");
        this.value = "";
    } else {
        getBase64(file).then(
            data =>
                LogoEmpresa = data
        );

        $("#nameFile").html("Arquivo carregado com sucesso")
        $("#nameFile").attr("class", "sucesso")

    }

}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function catchUserData2() { // função que pega os dados do formulário
    let userForms1 = JSON.parse(sessionStorage.getItem("User1"))

    //aqui vai as infos da tela cadastro 2
    let Status_candidata = document.querySelector("#statusCandidata").value
    let Escolaridade_candidata = document.querySelector("#escolaridadeCandidata").value
    let Cargo_canditada = document.querySelector("#cargoCandidata").value

    let Softskills = document.querySelectorAll("#softskills")
    let Hardskills = document.querySelectorAll("#hardskills")


    let SoftskillsOn = []
    let HardskillsOn = []



    for (let i = 0; i < Softskills.length; i++) {

        SoftskillsOn.push(Softskills[i].innerText) // soft skills são adicionadas no array SoftskillsOn

    }

    for (let i = 0; i < Hardskills.length; i++) {

        HardskillsOn.push(Hardskills[i].innerText) // hard skills são adicionadas no array HardskillsOn

    }

    let SoftskillsDB = SoftskillsOn.toString() // transforma em string
    let HardskillsDB = HardskillsOn.toString() // transforma em string

    let errorStatus = document.getElementById("errorStatus");
    let errorEscolaridade = document.getElementById("errorEscolaridade");
    let errorTrabalho = document.getElementById("errorTrabalho");
    let errorSoft = document.getElementById("errorSoft");
    let errorHard = document.getElementById("errorHard");



    if (!Status_candidata) {
        errorStatus.innerHTML = "Campo obrigatório"
        window.scroll(0, 0)
        setTimeout(function () {
            errorStatus.innerHTML = ""
        }, 5000)

    } else if (!Escolaridade_candidata) {
        errorEscolaridade.innerHTML = "Campo obrigatório"
        window.scroll(0, 0)
        setTimeout(function () {
            errorEscolaridade.innerHTML = ""
        }, 5000)

    } else if (!Cargo_canditada) {
        errorTrabalho.innerHTML = "Campo obrigatório"
        window.scroll(0, 0)
        setTimeout(function () {
            errorTrabalho.innerHTML = ""
        }, 5000)

    } else if (Softskills.length <= 3) {
        errorSoft.innerHTML = "Pelo menos mais do que 3 Softskills ;)"
        window.scroll(0, 525)
        setTimeout(function () {
            errorSoft.innerHTML = ""
        }, 5000)

    } else {

        sendUserData(userForms1.NomeCandidata, Escolaridade_candidata, userForms1.EmailCandidata, userForms1.CPFCandidata, userForms1.GeneroCandidata, userForms1.NascimentoCandidata, PDFcurriculo, SoftskillsDB, userForms1.SenhaCandidata, Cargo_canditada, userForms1.CelularCandidata, userForms1.LocalizacaoCandidata, Status_candidata, HardskillsDB)

        sessionStorage.removeItem("User1")

    }

}

function deleteCatchDataUser() { // função que remove os itens da session storage
    sessionStorage.removeItem("User1")

}


function deleteCatchDataRecruiter() {
    sessionStorage.removeItem("Recruit1")
}

function catchRecruiterData() { // função que pega os valores do formulário preenchido pelo recrutador


    let formsRecruit1 = {
        // Tela de Cadastro Recrutadora 1 
        NomeEmpresa: document.querySelector('#nomeEmpresa').value,
        RamoAtividade: document.querySelector('#ramoEmpresa').value,
        CnpjEmpresa: document.querySelector('#cnpjEmpresa').value,
        LocalizacaoEmpresa: document.querySelector('#localizacaoEmpresa').value,
        LogoEmpresa: LogoEmpresa
    }

    let errorNomeEmpresa = document.querySelector("#errorNomeEmpresa")
    let errorramoEmpresa = document.querySelector("#errorRamo")
    let errorCNPJ = document.querySelector("#errorCNPJ")
    let errorLocal = document.querySelector("#errorLocal")
    let errorLogo = document.querySelector("#errorLogo")

    // caso a recrutadora não preencha um campo corretamente, ela receberá uma mensagem de alerta

    //validação do preenchimento dos campos da Tela de Cadastro Recrutadora 1

    if (!formsRecruit1.NomeEmpresa) {
        errorNomeEmpresa.innerHTML = "Nome necessário"
        window.scroll(0, 0)
        setTimeout(function () {
            errorNomeEmpresa.innerHTML = ""
        }, 5000)
    }
    if (!formsRecruit1.RamoAtividade) {
        errorramoEmpresa.innerHTML = "Ramo de atividade necessário"
        window.scroll(0, 0)
        setTimeout(function () {
            errorramoEmpresa.innerHTML = ""
        }, 5000)
    }
    if (!formsRecruit1.CnpjEmpresa) {
        errorCNPJ.innerHTML = "CNPJ necessário"
        window.scroll(0, 0)
        setTimeout(function () {
            errorCNPJ.innerHTML = ""
        }, 5000)
    }
    if (!formsRecruit1.LocalizacaoEmpresa) {
        errorLocal.innerHTML = "Localização necessária"
        window.scroll(0, 520)
        setTimeout(function () {
            errorLocal.innerHTML = ""
        }, 5000)
    }
    if (!formsRecruit1.LogoEmpresa) {
        errorLogo.innerHTML = "Logo da empresa necessário"
        window.scroll(0, 530)
        setTimeout(function () {
            errorLogo.innerHTML = ""
        }, 5000)
    } else {
        sessionStorage.setItem("Recruit1", JSON.stringify(formsRecruit1))


        window.location.replace("/Recruiter/cadastroRecrutadora2.html")   // direciona para outra página

    }




}

function loadDataForms1Recruiter(){

    let dataRecruiter =JSON.parse(sessionStorage.getItem("Recruit1"))

    let NomeEmpresa= document.querySelector('#nomeEmpresa').value = dataRecruiter.NomeEmpresa
    let RamoAtividade= document.querySelector('#ramoEmpresa').value = dataRecruiter.RamoAtividade
    let CnpjEmpresa= document.querySelector('#cnpjEmpresa').value = dataRecruiter.CnpjEmpresa
    let LocalizacaoEmpresa= document.querySelector('#localizacaoEmpresa').value = dataRecruiter.LocalizacaoEmpresa

}

function catchRecruiterData2() { // função que pega os valores de outro formulário preenchido pelo recrutador

    let recuitForms1 = JSON.parse(sessionStorage.getItem("Recruit1"))

    // Tela de Cadadastro Recrutadora 2
    let TelefoneEmpresa = document.querySelector('#telefoneEmpresa').value;
    let SiteEmpresa = document.querySelector('#siteEmpresa').value;
    let EmailEmpresa = document.querySelector('#emailEmpresa').value;
    let SenhaEmpresa = document.querySelector('#senha').value;

    let errorTelefone = document.getElementById("errorTelefone");
    let errorSite = document.getElementById("errorSite");
    let errorEmail = document.getElementById("errorEmail");
    let errorSenha = document.getElementById("errorSenha");

    //validação do preenchimento dos campos da Tela de Cadastro Recrutadora 2
    if (!TelefoneEmpresa) {
        errorTelefone.innerHTML = "Campo obrigatório"
        window.scroll(0, 0)
        setTimeout(function () {
            errorTelefone.innerHTML = ""
        }, 5000)
    }
    else if (!SiteEmpresa) {
        errorSite.innerHTML = "Campo obrigatório"
        window.scroll(0, 0)
        setTimeout(function () {
            errorSite.innerHTML = ""
        }, 5000)
    }
    else if (!EmailEmpresa) {
        errorEmail.innerHTML = "Campo obrigatório"
        window.scroll(0, 0)
        setTimeout(function () {
            errorEmail.innerHTML = ""
        }, 5000)
    }
    else if (!SenhaEmpresa) {
        errorSenha.innerHTML = "Campo obrigatório"
        window.scroll(0, 0)
        setTimeout(function () {
            errorSenha.innerHTML = ""
        }, 5000)
    } else {

        sendRecruitData(recuitForms1.NomeEmpresa, EmailEmpresa, recuitForms1.RamoAtividade, recuitForms1.LogoEmpresa, SenhaEmpresa, "cultura", TelefoneEmpresa, SiteEmpresa, recuitForms1.CnpjEmpresa, recuitForms1.LocalizacaoEmpresa)
        sessionStorage.removeItem("Recruit1")
    }



}

// pegar do frontend infos cadastradas pela empresa para inserir no backend posteriormente
function catchVacancyData() {
    let Nome_vaga = document.querySelector("#nomeVaga").value
    let Descricao_vaga = document.querySelector("#descricaoVaga").value
    let ModalidadeVaga = document.querySelector("#modalidade").value
    let Local_vaga = document.querySelector("#localizacao").value

    let SoftskillsVaga = document.querySelectorAll("#softskills")
    let HardskillsVaga = document.querySelectorAll("#hardskills")

    let SoftskillsVagaOn = []
    let HardskillsVagaOn = []

    for (let i = 0; i < SoftskillsVaga.length; i++) {

        SoftskillsVagaOn.push(SoftskillsVaga[i].innerText)

    }


    for (let i = 0; i < HardskillsVaga.length; i++) {

        HardskillsVagaOn.push(HardskillsVaga[i].innerText)

    }



    let SoftskillsVagaDB = SoftskillsVagaOn.toString()
    let HardskillsVagaDB = HardskillsVagaOn.toString()
    let Salario_vaga = document.querySelector("#salarioVaga").value

    let empresa = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin"))

    sendVacancyData(SoftskillsVagaDB, Nome_vaga, Descricao_vaga, Local_vaga, Salario_vaga, empresa.id_empresas, HardskillsVagaDB, ModalidadeVaga)

}

// enviar infos do cadastro da candidata para o banco de dados
function sendUserData(Nome_Candidata, Escolaridade_candidata, Email_candidata, CPF_canditada, Genero_canditada, Data_nascimento, Curriculo_candidata, Softskill_candidata, Senha_canditada, Cargo_canditada, Celular_candidata, Localizacao_Candidata, Status_candidata, Hardskill_candidata) {
    $.ajax({
        url: "http://localhost:3000/user/formCandidata",
        method: "POST",
        data: {
            Nome_Candidata: Nome_Candidata,
            Escolaridade_candidata: Escolaridade_candidata,
            Email_candidata: Email_candidata,
            CPF_candidata: CPF_canditada,
            Genero_candidata: Genero_canditada,
            Data_nascimento: Data_nascimento,
            Curriculo_candidata: Curriculo_candidata,
            Softskill_candidata: Softskill_candidata,
            Senha_candidata: Senha_canditada,
            Cargo_candidata: Cargo_canditada,
            Celular_candidata: Celular_candidata,
            Localizacao_Candidata: Localizacao_Candidata,
            Status_candidata: Status_candidata,
            Hardskill_candidata: Hardskill_candidata,
        },
        success: function () {
            window.scroll(0, 0)
            openPopup()
        }

    })
}

// enviar infos do cadastro da companhia para o banco de dados
function sendRecruitData(NomeEmpresa, EmailEmpresa, RamoAtividade, Logo_Empresa, SenhaEmpresa, Cultura_Empresa, TelefoneEmpresa, SiteEmpresa, CnpjEmpresa, LocalizacaoEmpresa) {
    $.ajax({
        url: "http://localhost:3000/recruiter/formEmpresa",
        method: "POST",
        data: {
            Nome_Empresa: NomeEmpresa,
            Email_Empresa: EmailEmpresa,
            Ramo_de_Atividade: RamoAtividade,
            Logo_Empresa: Logo_Empresa,
            Senha_Empresa: SenhaEmpresa,
            Cultura_Empresa: Cultura_Empresa,
            Telefone_Empresa: TelefoneEmpresa,
            Site_Empresa: SiteEmpresa,
            cnpj_Empresa: CnpjEmpresa,
            Localizacao_Empresa: LocalizacaoEmpresa
        },
        success: function () {
            window.location.replace("/views/index.html")

        }
    })



}

// enviar para banco de dados uma vaga cadastrada
function sendVacancyData(SoftskillVaga, NomeVaga, DescricaoVaga, LocalVaga, SalarioVaga, IdEmpresa, HardskillVaga, ModalidadeVaga) {
    $.ajax({
        url: "http://localhost:3000/vaga/formVagas",
        method: "POST",
        data: {
            SoftskillVaga: SoftskillVaga,
            NomeVaga: NomeVaga,
            DescricaoVaga: DescricaoVaga,
            LocalVaga: LocalVaga,
            SalarioVaga: SalarioVaga,
            IdEmpresa: IdEmpresa,
            HardskillVaga: HardskillVaga,
            ModalidadeVaga: ModalidadeVaga

        },
        success: function () {
            window.location.replace("/views/Recruiter/companyDashboard.html")
        }
    })
}


function delvaga(id_vaga) {
    $.ajax({
        url: "http://localhost:3000/vaga/deleteVagas",
        method: "DELETE",
        data: {
            id_vaga: id_vaga
        },
        success: function () {
            location.reload()
        },
        error: function () {

        }
    })

}

// enviar e-mail e senha informados quando do login de candidata na landing page
function loginUser() {

    let email_candidata = document.querySelector("#email").value
    let senha_candidata = document.querySelector("#password").value


    $.ajax({
        url: "http://localhost:3000/user/loginUser",
        method: "POST",
        data: {
            email: email_candidata,
            senha: senha_candidata

        },
        error: function (res) {

            $("#error").html(res.responseJSON)
        },
        success: function (res) {

            sessionStorage.setItem("UsuarioDadosLogin", JSON.stringify(res))
            window.location.replace("/views/Users/usuariaCandidata1.html")

        }
    })
}

// enviar e-mail e senha informados quando do login de empresa na landing page
function loginRecruit() {
    let email_empresa = document.querySelector("#email").value
    let senha_empresa = document.querySelector("#password").value

    $.ajax({
        url: "http://localhost:3000/recruiter/loginRecruit",
        method: "POST",
        data: {
            email: email_empresa,
            senha: senha_empresa

        },
        error: function (res) {
            $("#error").html(res.responseJSON)
        },
        success: function (res) {
            sessionStorage.setItem("EmpresaDadosLogin", JSON.stringify(res))
            window.location.replace("/views/Recruiter/companyDashboard.html")

        }
    })
}


function listAll() {

    $.ajax({
        url: "http://localhost:3000/rotas/listAllVgasUser",
        method: "GET",
        success: function (res) {
            console.log(res)

        }
    })
}

