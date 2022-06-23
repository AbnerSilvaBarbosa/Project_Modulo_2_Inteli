
// pegar infos da candidata para cruzar dados posteriormente
function catchMatchedVagas() {
    $("#Paipopup").attr("class", "none")
    let candidataInfos = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))
    $("#nome").html(candidataInfos.nome_candidata)
    $("#titulo").html(candidataInfos.cargo_candidata)

    $.ajax({
        url: '/match/listMatch',
        method: 'POST',
        data: {
            id_candidata: candidataInfos.id_candidata
        },
        success: function (res) {

            let divVagas = document.querySelector("#vagas")

            for (let i = 0; i < res.length; i++) {
                let div = document.createElement('div');
                // interface cards de vagas
                divVagas.innerHTML += `<div class="cardsVagas col-sm-12 col-lg-12" style="background-color: white;">
                <a href="./usuariaCandidata2.html?id_vaga=${res[i].vagaData.id_vaga}&m=${res[i].matchPercent}" class="text-decoration-none d-flex " style="color: black;">
                    <div id="logo">
                        <img src="${res[i].vagaData.logo_empresa}" alt="">
                    </div>
                    <div class="textpart">
                        <h2 id="nome-vaga">${res[i].vagaData.nome_vaga}</h2>
                        <p id="descricao" class="textdescript">${res[i].vagaData.descricao_vaga}</p>
    
                    </div>
    
                </a>
            </div>`
            }
        },
    })
}

function listar() {
    const divVagas = document.querySelector('#vagas')

    $.ajax({
        url: '/rotas/listAllVagasUser',
        type: 'GET',
        success: (res) => {
            console.log(divVagas)
            console.log(res)
            for (let i = 0; i < res.length; i++) {
                divVagas.innerHTML += `<div class="cardsVagas col-sm-12 col-lg-12" style="background-color: white;">
                <a href="./vagaDescricao.html?id_vaga=${res[i].id_vaga}" class="text-decoration-none d-flex " style="color: black;">
                    <div id="logo">
                        <img src="${res[i].logo_empresa}" alt="">
                    </div>
                    <div class="textpart">
                        <h2 class="nomeVaga" id="nome-vaga">${res[i].nome_vaga}</h2>
                        <p id="descricao" class="textdescript">${res[i].descricao_vaga}</p>
    
                    </div>
    
                </a>
            </div>`
            }

        }
    })

}

const filter = document.querySelector('input[id=matched]')

filter.addEventListener('change', e => {
    if (e.target.checked == true) {
        clean()
        catchMatchedVagas()
    } else {
        clean()
        listar()
    }
})

function clean() { // função para limpar
    const divVagas = document.querySelector('#vagas')
    divVagas.innerHTML = ''
}


