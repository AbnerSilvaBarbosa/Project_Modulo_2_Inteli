const getUrlParameter = new URLSearchParams(window.location.search)

function loadData() {
    loadCandidatas()
    loadEmpresasParceiras()
    loadEmpresasSolicitantes()
    loadVagas()
}

//função apenas para a dashboard. retorna apenas os números de candidatas
function loadCandidatas() {
    $.ajax({
        url: "http://localhost:3000/adm/listCandidatas",
        type: 'GET',
        success: (res) => {
            $("#qtnCandidatas").html(res.length)
        }
    })
}

// função apenas para a dashboard. retorna apenas os números de empresas
function loadEmpresasParceiras() {
    $.ajax({
        url: "http://localhost:3000/adm/listEmpresasParceiras",
        type: 'GET',
        success: (res) => {
            $("#qtnEmpresas").html(res.length)
            const tbody = document.querySelector('#tabela-empresas')
            for (let i = 0; i < res.length; i++) {
                tbody.innerHTML += `
                <tr>
                    <td class="opportunities">
                        <img src="${res[i].dataEmpresa.logo_empresa}"alt="Logo da empresa ${res[i].nome_empresa}">
                        <div class="people-de">
                        <h5>${res[i].dataEmpresa.nome_empresa}</h5>
                    </td>

                    <td class="people-designation">
                        <p>${res[i].qtnVagas.length}</p>
                    </td>


                    <td class="edit"><a href="#"> Remover empresa </a></td>
                </tr>`
            }
            console.log(res)
        }
    })
}

// função carrega 
function loadEmpresasSolicitantes() {
    $.ajax({
        url: 'http://localhost:3000/adm/listEmpresasSolicitantes',
        type: 'GET',
        success: (res) => {
            const tbody = document.querySelector('tbody')
            for (let i = 0; i < res.length; i++) {
                tbody.innerHTML += `
                <tr>
                <td class="opportunities">
                    <img src="${res[i].logo_empresa}" alt="logo da empresa cadastrada">
                    <div class="people-de">
                        <h5>${res[i].nome_empresa}</h5>
                </td>

                <td class="edit"><a href="./empresaInfo.html?id_empresa=${res[i].id_empresas}"> Analisar solicitação </a></td>
            </tr>
                `
            }
        }
    })
}

// função apenas para a dashboard. retorna apenas os números de vagas
function loadVagas() {
    $.ajax({
        url: "http://localhost:3000/adm/listAllVagas",
        type: 'GET',
        success: (res) => {
            $("#qtnVagas").html(res.length)
            let tbody = document.querySelector('#tabela-vagas')
            for (let i = 0; i < res.length; i++) {
                tbody.innerHTML += `
                   <tr>
                        <td class="opportunities">
                            <img src="${res[i].vagaInfo.logo_empresa}" alt="Logo da empresa ${res[i].nome_empresa}">
                            <div class="people-de">
                                <h5>${res[i].vagaInfo.nome_empresa}</h5>
                        </td>

                        <td class="people-designation">
                            <h5>${res[i].vagaInfo.nome_vaga}</h5>
                            <p>${res[i].vagaInfo.modalidade_vaga}</p>
                        </td>

                        <td class="active"><p>${res[i].qtnCandidatas.length}</p></td>

                        <td class="edit"><a href="#"> Promover vaga </a></td>
                    </tr>
                `
            }
        }
    })
}


function liberarEmpresa(id_empresa){

    $.ajax({
        url:"http://localhost:3000/adm/liberarEmpresa",
        method:"POST",
        data:{
            id_empresa:id_empresa
        },
        success:function(data){
            window.location.replace("/views/ADM/empresas.html")
        },
        error:function(data){
            alert(data)
        }
    })

}


function bloquearEmpresa(id_empresa){
    $.ajax({
        url:"http://localhost:3000/adm/bloquearEmpresa",
        method:"POST",
        data:{
            id_empresa:id_empresa
        },
        success:function(data){ 
            window.location.replace("/views/ADM/index.html")
        },
        error:function(data){
            alert(data)
        }
    })
}


function loadDataEmpresa() {
    const id_empresa = getUrlParameter.get("id_empresa")
    const acceptButton = document.querySelector('#acceptBtn')
    const rejectButton = document.querySelector('#rejectBtn')

    $.ajax({
        url: 'http://localhost:3000/adm/loadDataEmpresa', 
        type: 'POST',
        data: {
            id_empresa: id_empresa
        }, 
        success: (res) => {
            $('#nomeEmpresa').html(res.nome_empresa)
            $('#ramoAtividade').html(res.ramo_empresa)
            $('#cnpjEmpresa').html(res.cnpj_empresa)
            $('#emailEmpresa').html(res.email_empresa)
            $('#siteEmpresa').html(res.site_empresa)
            $('#telEmpresa').html(res.telefone_empresa)
            $('#culturaEmpresa').html(res.cultura_empresa)


            acceptButton.setAttribute('onclick', `liberarEmpresa(${res.id_empresas})`)
            rejectButton.setAttribute('onclick', `bloquearEmpresa(${res.id_empresas})`)

            console.log(res)
        }
    })
}