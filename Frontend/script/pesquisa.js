function pesquisa() {   
    let input = document.getElementById('search').value
    input = input.toLowerCase();
    let x = document.getElementsByClassName('nomeVaga');
    let cardVagas = document.getElementsByClassName('cardsVagas')

    for (i = 0; i < x.length; i++) {
        if (!x[i].innerHTML.toLowerCase().includes(input)) {
            x[i].style.display = "none";
            cardVagas[i].style.display = 'none';
        }
        else {
            x[i].style.display = 'flex'
            cardVagas[i].style.display = 'flex'

        }
    }

    console.log(cardVagas)
}