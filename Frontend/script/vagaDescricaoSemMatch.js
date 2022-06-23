//Função que retornar o parâmetro da URL
const getUrlParameter = new URLSearchParams(window.location.search)

let vagaSkillsForMatch = []

function loadVagaData() { //função que os dados da vaga de acordeu com o seu ID

    let id_vaga = getUrlParameter.get('id_vaga')
    let match_percent = getUrlParameter.get('m')
    $.ajax({
        url: `/rotas/listVagas?id_vaga=${id_vaga}&m=${match_percent}`,
        method: 'post',
        success: function (res) {
            $("#tituloVaga").html(res.vagaInfos.nome_vaga)
            $("#nomeEmpresa").html(res.empresaInfos.nome_empresa)
            $("#salarioVaga").html(` - R$ ${res.vagaInfos.salario_vaga}`)
            $("#descricaoVaga").html(res.vagaInfos.descricao_vaga)
            $("#culturaEmpresa").html(res.empresaInfos.cultura_empresa)

            // puxa o ID do banco e mostra todas as infomações da vaga

            const softskills = res.vagaInfos.softskill_vaga.split(',')
            const hardskills = res.vagaInfos.hardskill_vaga.split(',')

            for (let i = 0; i < softskills.length; i++) { // para cada valor do array, está sendo dividido da maneira escrita no código abaixo
                const divSoftSkills = document.querySelector('#soft-skills');
                divSoftSkills.innerHTML += `<p class="skill rounded-pill">${softskills[i]}</p>`
                vagaSkillsForMatch.push(softskills[i])
            }

            for (let x = 0; x < hardskills.length; x++) { // mesma lógica do array de soft skills vale para o de hard skills
                const divHardSkills = document.querySelector('#hard-skills');
                divHardSkills.innerHTML += `<p class="skill rounded-pill">${hardskills[x]}</p>`
                vagaSkillsForMatch.push(hardskills[x])
            }

            // Match algorithm 
            vagaSkillsForMatch = [...new Set(vagaSkillsForMatch)] 
            let matchedSkills = []
            let { softskill_candidata, hardskill_candidata } = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))
            let userSkills = (softskill_candidata + ',' + hardskill_candidata).split(',')
            userSkills = [...new Set(userSkills)]

            for (let i = 0; i < userSkills.length; i++) {
                if (vagaSkillsForMatch.indexOf(userSkills[i]) > -1) {
                    matchedSkills.push(userSkills[i])
                }
            }

            let matchPercent = matchedSkills.length / vagaSkillsForMatch.length
            const applyButton = document.querySelector('#applyBTN')

            applyButton.setAttribute('onclick', `applyVaga(${matchPercent})`)
        }
    })
}


function applyVaga(matchPercent) { // função que é executada quando o usuário se candidata para uma vaga
    let id_vaga = getUrlParameter.get('id_vaga')

    let { id_candidata } = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))

    $.ajax({
        url: '/rotas/applied',
        method: 'POST',
        data: {
            id_candidata: id_candidata,
            id_vaga: id_vaga,
            match_percent: matchPercent
        },
        success: function () {
            window.location.replace("/views/Users/usuariaCandidata5.html")
        },
        error:function (res) {
            closePopup()
            let error = document.getElementById("error")
            error.innerHTML = res.responseJSON.message
            setTimeout(function(){
                error.innerHTML = ""
            },7000)

        }
    })
}