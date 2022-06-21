// quando do login, pegar infos de candidata cadastradas no banco de dados, e display na página de perfil da candidata 

let Softskills
let Hardskills

// pegar dados de login da sessão atual com as infos correspondentes
// cadastradas no banco de dados para exibição na página de perfil do usuário
// display cards de vagas aplicadas pelo usuário
function logadoUser() {
    let usuario = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))

    $("#name").html(usuario.nome_candidata)
    $("#cidade").val(usuario.cidade_candidata)
    $("#localizacao").val(usuario.localizacao_candidata)
    $("#estado").val(usuario.estado_candidata)
    $("#cargoCandidata").val(usuario.cargo_candidata)
    $("#escolaridadeCandidata").val(usuario.escolaridade_candidata)


    Hardskills = usuario.hardskill_candidata.split(",")

    updateHardSkills(Hardskills)

    Softskills = usuario.softskill_candidata.split(",")

    updateSoftSkills(Softskills)

    $.ajax({
        url: "http://localhost:3000/user/listVagaUser",
        method: "POST",
        data: {
            id_candidata: usuario.id_candidata
        },
        success: function (res) {

            
            for (let i = 0; i < res.length; i++) {
                let div = document.querySelector(".vagasUser")

                div.innerHTML += `
                <div class="appliedCard card mb-2" style="width: 445px;">
                    <a href="./usuariaCandidata2.html?id_vaga=${res[i].id_vaga}">
                        <h1 class = "d-flex justify-content-center fs-4 p-3">${res[i].nome_vaga}</h1>
                        <p class = "d-flex justify-content-center descrição">${res[i].descricao_vaga}</p>
                    </a>
                    <div class="icons">
                        <button class = "" onclick="descandidaturaUser(${res[i].id_vaga})">
                            <img src="../../images/DeleteIcon.svg"
                                style="filter: invert(41%) sepia(53%) saturate(6570%) hue-rotate(343deg) brightness(96%) contrast(99%);"

                                alt="Retirar aplicação">
                        </button>
                    </div>
            </div>`

            }

        }
    })

}

// variáveis atribuídas às tags de hard e soft skills
let hardspace = document.querySelector("#hardskillsContainer")
let softspace = document.querySelector("#softskillsContainer")

// botão para excluir e fazer update da lista de hardskills no perfil
function updateHardSkills(array) {
    clearHardSkills()
    for (let i = 0; i < array.length; i++) {
        hardspace.innerHTML += `<span id="${array[i]}" class="rounded-pill skill">${array[i]} <i class="closeSoftSkill" onclick="removeHardSkill(${i})"></i></span>`
    }
}

// botão para excluir e fazer update da lista de softskills no perfil
function updateSoftSkills(array) {
    clearSoftSkills()
    for (let i = 0; i < array.length; i++) {
        softspace.innerHTML += `<span id="${array[i]}" class="skill rounded-pill">${array[i]} <i class="closeSoftSkill" onclick="removeSoftSkill(${i})"></i></span>`
    }
}

// remover elemento "tag"
function clearHardSkills() {
    hardspace.querySelectorAll('span').forEach(tagElement => tagElement.remove());
}

function clearSoftSkills() {
    softspace.querySelectorAll('span').forEach(tagElement => tagElement.remove());
}

function removeHardSkill(e) {
    Hardskills.splice(e, 1)
    updateHardSkills(Hardskills)
}

function removeSoftSkill(e) {
    Softskills.splice(e, 1)
    updateSoftSkills(Softskills)
}

// pegar dados de login da cantidata para display na página de perfil
function loginUser(email,senha) {

    


    $.ajax({
        url: "http://localhost:3000/user/loginUser",
        method: "POST",
        data: {
            email: email,
            senha: senha

        },
        error: function (res) {

            $("#error").html(res.responseJSON)
        },
        success: function (res) {

            sessionStorage.setItem("UsuarioDadosLogin", JSON.stringify(res))
            

        }
    })
}

// submeter ao banco de dados infos da candidata editadas no perfil 
function editarUser(id_candidata, localizacao, cargo, grauDeInstrução, hardskill, softskill) {
    $.ajax({
        url: "http://localhost:3000/user/editarUser",
        method: "PUT",
        data: {
            id_candidata: id_candidata,
            localização: localizacao,
            cargo: cargo,
            grauDeInstrução: grauDeInstrução,
            hardskill: hardskill,
            softskill: softskill
        },
        success: function () {
            //se tiver que voltar a tela usar window.replace,
            // se for fazer na mesma tela so pede para fazer reload na pagina ou aparecer um popup e depois reload

            let Senha_candidata = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin")).senha_candidata
            let Email_candidata = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin")).email_candidata

            sessionStorage.removeItem("UsuarioDadosLogin")

            loginUser(Email_candidata,Senha_candidata)
            window.location.reload()

        },
        error: function (err) {
            // colocar algum ponto do html para aparecer a mensagem de erro
            console.log(err)
        }
    })
}

// deletar conta da candidata do banco de dados
function deleteUser(id_candidata) {
    $.ajax({
        url: "http://localhost:3000/user/deleteCandidata",
        method: "DELETE",
        data: {
            id_candidata: id_candidata
        },
        success: function () {
            //redirecionar para o index.js
        },
        error: function () {
            //mostrar erro na pagina html 
        }


    })
}

// remover candidatura da usuária
function descandidaturaUser(id_vaga) {

    $.ajax({
        url: 'http://localhost:3000/user/descandidatura',
        method: 'POST',
        data: {
            id_vaga: id_vaga,
            id_candidata: JSON.parse(sessionStorage.getItem("UsuarioDadosLogin")).id_candidata
        },
        success: function () {
            window.location.reload();
        },
        error: function (err) {
            console.log(err);
        }
    })
}

