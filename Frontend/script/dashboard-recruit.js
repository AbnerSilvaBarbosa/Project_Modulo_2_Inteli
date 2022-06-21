const getUrlParameter = new URLSearchParams(window.location.search)

// função que carrega todas as vagas registradas de tal empresa registrada

function loadVagas() {
    let EmpresaInfos = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin"));
    $("#nomeEmpresa").html(EmpresaInfos.nome_empresa) // coloca as informações da empresa logando diretamente no frontend
    $("#email").html(EmpresaInfos.email_empresa) // coloca as informações da empresa logando diretamente no frontend

    $.ajax({
        url: 'http://localhost:3000/recruiter/listAllEmpresaVagas', // porta da rota
        method: 'POST',
        data: { // o que será enviado (req.body)
            id_empresa: EmpresaInfos.id_empresas
        },
        success: function (res) { //se retornar status:200, executa código abaixo
            console.log(res)
            const divPai = document.querySelector('#rowBack');
            for (let i = 0; i < res.length; i++) {
                const divPai = document.querySelector('#rowBack');

                //abaixo: modelo HTML que será retornado

                divPai.innerHTML += `
                <div class="card" style="width: 445px;">  
                    <a style="color: black; text-decoration: none;" href="./VagaDescricao.html?id_vaga=${res[i].id_vaga}">
                    <h1>${res[i].nome_vaga}</h1>
                    <p>${res[i].descricao_vaga}</p>

                <div class="icons">
                    <button class="btn btn-danger" style="justify-content: center;" onclick="openPopup(${res[i].id_vaga})">
                        <img src="../../images/DeleteIconWhite.svg" alt="">
                    </button>
                </div>
                </a>
            </div>`
            }

            divPai.innerHTML += `<button><a href="./cadastroRecrutadora5.html" ><img src="../../images/AddBtn.svg" alt="Adicionar vaga" srcset=""></a></button>`

        }
    })
}

// quando do login, pegar infos de empresa cadastradas no banco de dados, e display na página de perfil da empresa
function logadoRecruit(email,senha) {
    let Recruit = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin"))
    $("#name").html(Recruit.nome_empresa)
    $("#localizacao").val(Recruit.localizacao_empresa)
    $("#telefone").val(Recruit.telefone_empresa)
    $("#site").val(Recruit.site_empresa)
    $("#cultura").val(Recruit.cultura_empresa)
    $("#preview").attr("src", Recruit.logo_empresa)
    $("#email").val(Recruit.email_empresa)
    $("senha").val(Recruit.senha_empresa)

    $.ajax({ // o que acontece quando aplicado o método POST, caso correto salvar no session store as infos da empresa
        url: "http://localhost:3000/recruiter/loginRecruit",
        method: "POST",
        data: {
            email: email,
            senha: senha

        },
        error: function (res) {
            $("#error").html(res.responseJSON)
        },
        success: function (res) {
            sessionStorage.setItem("EmpresaDadosLogin", JSON.stringify(res))


        }
    })

}

let hardSkills
let softSkills

function loadVagaInformation() { // função para carregar as informações da vaga no site

    const id_vaga = getUrlParameter.get('id_vaga')

    $.ajax({
        url: `http://localhost:3000/rotas/listVagaInfo?id_vaga=${id_vaga}`,
        method: 'POST', 
        success: (res) => {
            console.log(res) // abaixo as classes estão sendo linkados com os valores dos inputs inseridos
            $("#tituloVaga").html(res.nome_vaga)
            $("#descricaoVaga").val(res.descricao_vaga)
            $("#salario").val(res.salario_vaga)
            $("#localizacao").val(res.local_vaga)
            $("#modalidade").val(res.modalidade_vaga)

            hardSkills = res.hardskill_vaga.split(',')
            updateHardSkills(hardSkills)
            softSkills = res.softskill_vaga.split(',')
            updateSoftSkills(softSkills)

            $.ajax({
                url: 'http://localhost:3000/rotas/listCandidatas',
                method: 'POST',
                data: {
                    id_vaga: id_vaga
                }, 
                success: (res) => {

                    let divC = document.querySelector('#AplicantesCards') // código para mostrar o match

                    for (let i = 0; i < res.length; i++) {
                        let match = res[i].match_percent * 100

                        divC.innerHTML += `
                        <div id="${i}" class="CardCandidata">
                            <h2 id="nomeCandidata" class="nomeCand">${res[i].nome_candidata}</h2>
                            <a href="mailto:${res[i].email_candidata}" id="contato">Entrar em contato</a>
                            <p><span id="porcentagem">${match}% de compatibilidade</span></p>

                            

                        </div>

                        `
                        
                        let div = document.getElementById(`${i}`) // mostrando para o usuário cores diferentes de acordo com a porcentagem de match.

                        if (match >= 80) {
                            div.classList.add('roxoesc')
                        } else {
                            div.classList.add('roxoclaro')
                        }

                        if (res[i].curriculo_candidata !== null) {
                            div.innerHTML += `<div class="CV">
                                <a id="CV${i}" download="${res[i].nome_candidata} - CV" href="${res[i].curriculo_candidata}"> <img src="../../images/DownloadIcon.svg" style="width: 20px;" alt="Icone de download">Baixar CV</a>
                            </div>`
                        } else {
                            div.innerHTML += `<div class="CV"> <i> * Usuária sem currículo cadastrado </i></div>`
                        }
                    }
                }
            })
        }
    })
}

let hardspace = document.querySelector("#hardskillsContainer")
let softspace = document.querySelector("#softskillsContainer")

function updateHardSkills(array) { // função que bota na tela as novas hard skills adicionadas
    clearHardSkills() // função que tira as hard skills antigas
    for (let i = 0; i < array.length; i++) {
        hardspace.innerHTML += `<span id="${array[i]}" class="rounded-pill skill">${array[i]} <i class="closeSoftSkill" onclick="removeHardSkill(${i})"></i></span>`
    }
}

function updateSoftSkills(array) {
    clearSoftSkills() // função que tira as soft skills antigas
    for (let i = 0; i < array.length; i++) {
        softspace.innerHTML += `<span id="${array[i]}" class="skill rounded-pill">${array[i]} <i class="closeSoftSkill" onclick="removeSoftSkill(${i})"></i></span>`
    }
}

function clearHardSkills() {
    hardspace.querySelectorAll('span').forEach(tagElement => tagElement.remove());
}

function clearSoftSkills() {
    softspace.querySelectorAll('span').forEach(tagElement => tagElement.remove());
}

function removeHardSkill(e) { // função executada quando aperta o pequeno 'x' para tirar as skills
    hardSkills.splice(e, 1)
    updateHardSkills(hardSkills)
}

function removeSoftSkill(e) { // função executada quando aperta o pequeno 'x' para tirar as skills
    softSkills.splice(e, 1)
    updateSoftSkills(softSkills)
}

function loginRecruit(email,senha) { // função de login para recrutadores
  

    $.ajax({
        url: "http://localhost:3000/recruiter/loginRecruit",
        method: "POST",
        data: {
            email: email,
            senha: senha

        },
        error: function (res) {
            console.log(res)
            $("#error").html(res.responseJSON)
        },
        success: function (res) { // quando der certo, os dados vão ser salvos na session storage
            
            sessionStorage.setItem("EmpresaDadosLogin", JSON.stringify(res))
            window.location.reload()
            

        }
    })
}

function EditCompany(id_empresa, logo, email, senha, telefone, site, localização, ramo, cultura) { // função para editar os dados das empresas

    $.ajax({
        url: "http://localhost:3000/recruiter/editEmpresa",
        method: "PUT",
        data: {
            id_empresa: id_empresa,
            logo: logo,
            email: email,
            senha: senha,
            telefone: telefone,
            site: site,
            localização: localização,
            ramo: ramo,
            cultura: cultura
        },
        success: function () { // manda os valores (caso dê certo) para o session storage
           
            let email = document.querySelector("#email").value
            let senha = JSON.parse(sessionStorage.getItem("EmpresaDadosLogin")).senha_empresa

            sessionStorage.removeItem("EmpresaDadosLogin")
            setTimeout(function(){
                loginRecruit(email,senha)

            },1000) 
            
            // 
        },
        error: function (res) {
            alert(res)
        }

    })

}

function editVaga(softskill, descricao, salario, hardskill, modalidade, local) { // função para editar os dados dos usuários
    $.ajax({
        url: "http://localhost:3000/vaga/editVaga",
        method: "PUT",
        data: {
            id_vaga: getUrlParameter.get("id_vaga"),
            softskill: softskill,
            descricao: descricao,
            salario: salario,
            hardskill: hardskill,
            modalidade: modalidade,
            local: local
        },
        success: function () {
            window.location.reload()
        },
        error: function (err) {
            alert(err)
        }
    })

}



