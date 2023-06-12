let listaAlunos = []
let listaModalidades = []
let listaPraticas = []

//ABRE E FECHA POPUPS

function abrirPopUp(mContent) {
    let inHTML = mContent
    let popup = document.getElementById('modal');
    document.getElementById('modal-conteudo').innerHTML = inHTML
    popup.classList.add("modalContainerOpen")
}

function fecharPopUp() {
    let popup = document.getElementById('modal');
    popup.classList.remove("modalContainerOpen")
}

function mascaraCPF(i){
    let v = i.value;

    if(isNaN(v[v.length-1])){ // impede entrar outro caractere que não seja número
        i.value = v.substring(0, v.length-1);
        return;
    }

    i.setAttribute("maxlength", "14");
    if (v.length == 3 || v.length == 7) i.value += ".";
    if (v.length == 11) i.value += "-";
}