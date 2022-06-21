// linkar com html
const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function (e) {
    // alternar atributo type
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    // alternar ícones olho aberto / olho fechado
    this.classList.toggle('bi-eye');
});