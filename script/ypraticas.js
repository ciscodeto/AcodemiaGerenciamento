function carregarPraticas() {
    console.log(localStorage.getItem('listaPraticas'))
    if (localStorage.getItem('listaPraticas')) {
        listaPraticas = JSON.parse(localStorage.getItem('listaPraticas'));
    }
}

function salvarPraticas() {
    let strListaPraticas = JSON.stringify(listaPraticas);
    localStorage.setItem('listaPraticas', strListaPraticas);
}

function buscarPraticas() {
    let cpf = document.getElementById('buscador-cpf').value;
    let cod = document.getElementById('buscador-codigo').value;
    index = [-2]
    if (cpf) {
        index = [-3]
        if (cod) {
            index = [-1]
            for (let i = 0 ; i < (listaPraticas).length ; i++) {
                if (cpf === listaPraticas[i].pCPF && cod === listaPraticas[i].pCOD) {
                    index = [i]
                }
            }
        } else {
            for (let i = 0 ; i < (listaPraticas).length ; i++) {
                if (cpf === listaPraticas[i].pCPF) {
                    index.push(i)
                }
            }
        }
    } else {
        if (cod) {
            index = [-3]
            for (let i = 0 ; i < (listaPraticas).length ; i++) {
                if (cod === listaPraticas[i].pCOD) {
                    index.push(i)
                }
            }
        }
    }

    if (index.length > 1) {
        index.splice(0,1);
    }
    return index
}

function incluirPraticaPopUp() {
    let index = buscarPraticas();
    let inHTML = '';
    let permtcpf = buscarAluno();
    let permtcod = buscarModalidade();
        switch (index[0]) {
            case -3:
                inHTML = '<h1>Prática já registrada...</h1><hr><br><p>Este aluno já pratica essa modalidade...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>'
                abrirPopUp(inHTML);
                return 0;
            case -2:
                inHTML = '<h1>Digite o CPF e o CÓDIGO...</h1><hr><br><p>Você não digitou o CPF ou o CÓDIGO da prática que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
                abrirPopUp(inHTML);
                return 0;
            case -1:
                if (permtcod != -1 && permtcpf != -1) {
                    inHTML = '<h1>Pratica registrada!!!</h1><hr><br><p>Você registrou um aluno na realização de uma modalidade!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>'
                    incluirPratica(permtcod);
                } else {
                    inHTML = '<h1>Não encontrado!!!</h1><hr><br><p>Você digitou um CÓDIGO ou CPF que não está registrado no sistema!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>'
                }
                abrirPopUp(inHTML);
                return 0;
            default:
                if (index.length > 1) {
                    inHTML = '<h1>Digite o CPF e o CÓDIGO...</h1><hr><br><p>Você não digitou o CPF ou o CÓDIGO da prática que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>'
                }
                abrirPopUp(inHTML);
        }
    listarPraticas(-2);
}

function incluirPratica(cod) {
    let incCPF = document.getElementById('buscador-cpf')
    let incCOD = document.getElementById('buscador-codigo').value;
    let incData = listaModalidades[cod].diasdisp;
    let incHorario = listaModalidades[cod].horarios;
}

function excluirPraticas() {

}

function listarPraticas() {

}