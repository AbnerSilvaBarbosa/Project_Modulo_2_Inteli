//
function pesquisa() {
    let input = document.getElementById('search').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('vagas');
    if (input.lenght >= 3) {
        $.ajax({
            url: 'http://localhost:3000/vaga/listAllVgasUser',
            type: 'GET',
            data: { input: input },
            success: data => {
                var list = '';
                data.forEach(element => {
                    list += `<li class="d-flex">${element.name}<div class="w-100"><button class="pull-right" id="btn-excluir" onclick="metodos.delete(${element.id})"><i class="fa fa-times" aria-hidden="true"></i></button><button class="pull-right" id="btn-edit" onclick="adicionarLinguagem(${element.id}, '${element.name}')"><i class="fa fa-pencil" aria-hidden="true"></i></button></div></li>`;
                });
                $('#linguagens').html(list);
            }
        });
    }

    //criar uma nova rota que receba o valor do input acima
}