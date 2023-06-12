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
    let cpf=null;
    let cod=null;
    if (document.getElementById('buscador-cpf')) {
        cpf = document.getElementById('buscador-cpf').value;
    }
    if (document.getElementById('buscador-codigo')) {
        cod = document.getElementById('buscador-codigo').value;
    }
    let index = [-2];
    //Index -1 = CADASTRO NÃO ENCONTRADO
    //Index -2 = CPF E CÓDIGO não digitados 
    //Index array unico = Registro de Pratica Específica Encontrado
    //Index array cheio = Localizações de CPFs ou CÓDIGOs encontrados

    if (cpf) {
        if (cod) {
            index = [-1]
            for (let i = 0 ; i < (listaPraticas).length ; i++) {
                if (cpf == listaPraticas[i].pCPF && cod == listaPraticas[i].pCOD) {
                    index.push(i)
                }
            }
        } else {
            for (let i = 0 ; i < (listaPraticas).length ; i++) {
                if (cpf == listaPraticas[i].pCPF) {
                    index.push(i)
                }
            }
        }
    } else {
        if (cod) {
            index = [-1]
            for (let i = 0 ; i < (listaPraticas).length ; i++) {
                if (cod == listaPraticas[i].pCOD) {
                    index.push(i)
                }
            }
        }
    }

    if (index.length > 1) {
        index.splice(0,1);
    }
    console.log('Busca pelo index realizada: ',index)
    return index
}

function incluirPraticaPopUp() {
    let index = buscarPraticas();
    let inHTML = '';
    let permtcpf = buscarAluno();
    let permtcod = buscarModalidade();
    console.log(permtcod)
    console.log(permtcpf)
    console.log(index[0])
    switch (index[0]) {
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
                abrirPopUp(inHTML);
            } else {
                inHTML = '<h1>PRÁTICA já registrada...</h1><hr><br><p>Este CÓDIGO e CPF pertencem a uma das praticas já cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
                abrirPopUp(inHTML);
            }
            
    }
}

function incluirPratica(cod) {
    let incCPF = document.getElementById('buscador-cpf').value;
    let incCOD = document.getElementById('buscador-codigo').value;
    let incData = listaModalidades[cod].diasdisp;
    let incHorario = listaModalidades[cod].horarios;

    let novaPratica = {
        pCPF: incCPF,
        pCOD: incCOD,
        datas: incData,
        horarios: incHorario,
    }

    listaPraticas.push(novaPratica);
    console.log('novo aluno cadastrado: ' + novaPratica.pCPF + novaPratica.pCOD);
    console.log('novo aluno cadastrado: ' + novaPratica.datas + novaPratica.horarios);
    listarPraticas([-2]);
}

function excluirPraticaPopUp() {
    let index = buscarPraticas();
    let inHTML = ''
    switch (index[0]) {
        case -1:
            inHTML = '<h1>Pratica não encontrada...</h1><hr><br><p>Este CÓDIGO ou CPF não é de nenhuma das praticas cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            break;
        case -2:
            inHTML = '<h1>Digite o CPF ou CÓDIGO...</h1><hr><br><p>Você não digitou o CPF ou o CÓDIGO da prática que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>'
            abrirPopUp(inHTML);
            break;
        default:
            inHTML = '<h1>Excluir Práticas</h1><hr><br><p>Você tem certeza de que quer excluir as práticas relacionadas ao CPF e CÓDIGO DIGITADO? Todas os registros de pratica e informações serão deletados permanentemente do sistema!</p><br><hr><br><div class="btns"><a class="btn" onclick="excluirPratica(['+index+']);fecharPopUp();">Excluir Práticas</a><a class="btn" onclick="fecharPopUp();">fechar</a>';
            console.log('ué véi',index)
            abrirPopUp(inHTML);
    }
    listarPraticas([-2]);
}

function excluirPratica(index) {
    console.log('index excluir:  ',index)
    for (let i = 0 ; i < index.length ; i++) {
        listaPraticas.splice((index[i]-1), 1);
    }
}

function listarPraticas(index) {
    salvarPraticas();
    if (!index) {
        index = buscarPraticas();
    }
    str = ''
    console.log('tamanho da lista: ',listaPraticas.length)
    console.log('elemento 0 da lista: ',listaPraticas[0])
    console.log('index: ',index, index.length)
    switch (index[0]) {
        case -1:
            inHTML = '<h1>Pratica não encontrada...</h1><hr><br><p>Este CÓDIGO e CPF não é de nenhuma das praticas cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            break;
        case -2:
            for (let i=0; i < listaPraticas.length;i++) {
                str +=
                '<tr><td>' + listaPraticas[i].pCPF + '</td><td>'
                + listaPraticas[i].pCOD + '</td><td>'
                for (let j = 0 ; j < listaPraticas[i].datas.length ; j++) {
                    str += listaPraticas[i].datas[j] + '<br>'
                }
                str += '</td><td>';
                for (let j = 0 ; j < listaPraticas[i].horarios.length ; j++) {
                    str += listaPraticas[i].horarios[j] + '<br>'
                }
                str += '</td></tr>';
            }
            document.getElementById('tabela-praticas').innerHTML = str;
            break;
        default:
            if (listaPraticas.length > 0){
                for (let i=0; i < (index).length;i++) {
                    str +=
                    '<tr><td>' + listaPraticas[index[i]].pCPF + '</td><td>'
                    + listaPraticas[index[i]].pCOD + '</td><td>'
                    for (let j = 0 ; j < listaPraticas[i].datas.length ; j++) {
                        str += listaPraticas[index[i]].datas[j] + '<br>'
                    }
                    str += '</td><td>';
                    for (let j = 0 ; j < listaPraticas[index[i]].horarios.length ; j++) {
                        str += listaPraticas[index[i]].horarios[j] + '<br>'
                    }
                    str += '</td></tr>';
                }
            }
            document.getElementById('tabela-praticas').innerHTML = str;
    }
}