
// pegar infos da candidata para cruzar dados posteriormente
function catchMatchedVagas() {
    $("#Paipopup").attr("class", "none")
    let candidataInfos = JSON.parse(sessionStorage.getItem("UsuarioDadosLogin"))
    $("#nome").html(candidataInfos.nome_candidata)
    $("#titulo").html(candidataInfos.cargo_candidata)

    $.ajax({
        url: 'http://localhost:3000/match/listMatch',
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