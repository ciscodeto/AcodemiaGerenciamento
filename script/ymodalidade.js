function carregarModalidades() {
    console.log(localStorage.getItem('listaModalidades'))
    if (localStorage.getItem('listaModalidades')) {
        listaModalidades = JSON.parse(localStorage.getItem('listaModalidades'));
    }
}

function salvarModalidades() {
    let strlistaModalidades = JSON.stringify(listaModalidades);
    localStorage.setItem('listaModalidades', strlistaModalidades);
}

function buscarModalidade() {
    let c = document.getElementById('buscador-codigo').value;
    if (c) {
        index = -1
    } else {
        index = -2
    }
    for (let i = 0 ; i < (listaModalidades).length ; i++) {
        if (c === listaModalidades[i].COD) {
            index = i
        }
    }

    return index
}

function incluirModalidadePopUp() {
    let index = buscarModalidade();
    let inHTML = '';
    switch (index) {
        case -2:
            inHTML = '<h1>Digite o CÓDIGO...</h1><hr><br><p>Você não digitou o CÓDIGO da modalidade que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        case -1:
            inHTML = '<h1>Adicionar Modalidade</h1><hr><p><form action=""><br><label>CÓDIGO</label><span> '+ document.getElementById('buscador-codigo').value +'</span><br><label>Descrição</label><input type="text" id="descr-modalidade" placeholder="Digite a descrição"><br><label>Duração</label><input type="time" id="durac-modaidade"><br><label>Valor</label><input type="text" id="valor-modalidade" placeholder="Digite o valor(R$)"><br><div id="dias-modalidade"><label>Dias</label><input type="date" class="DiasDisp"></div><a onclick="addMaisDia()">+ Adicionar dia</a><div id="horarios-modalidade"><label>Horarios</label><input type="time" class="HorariosMod"></div><a onclick="addMaisHorario()">+ Adicionar horário</a><div id="profs-modalidade"><label>Professores</label><input type="text" class="ProfsMod" placeholder="Digite um professor"></div><a onclick="addMaisProf()">+ Adicionar professor</a><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><a class="btn" onclick="incluirModalidade();fecharPopUp();">finalizar</a></div></form></p>';
            abrirPopUp(inHTML);
            return 0;
        default:
            inHTML = '<h1>Modalidade já registrada...</h1><hr><br><p>Este CÓDIGO pertence a uma das modalidades já cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
    }
    listarModalidades(-2);
}

function incluirModalidade() {
    let incCOD = document.getElementById('buscador-codigo').value;
    let incDesc = document.getElementById('descr-modalidade').value;
    let incDura = document.getElementById('durac-modaidade').value;
    let incValo = document.getElementById('valor-modalidade').value;

    let incDias = [];
    let incHorarios = [];
    let incProfs = [];

    let listDias = document.getElementsByClassName('DiasDisp');
    let listHorarios = document.getElementsByClassName('HorariosMod');
    let listProfs = document.getElementsByClassName('ProfsMod');

    for (let i = 0 ; i < listDias.length ; i++) 
        {incDias.push(listDias[i].value);}
    
    for (let i = 0 ; i < listHorarios.length ; i++)
        {incHorarios.push(listHorarios[i].value);}

    for (let i = 0 ; i < listProfs.length ; i++)
        {incProfs.push(listProfs[i].value);}

    let novaModalidade = {
        COD: incCOD,
        descr: incDesc,
        durac: incDura,
        diasdisp: incDias,
        horarios: incHorarios,
        profs: incProfs,
        valor: incValo,
    }
    
    listaModalidades.push(novaModalidade);
    console.log('nova modalidade cadastrada: ' + novaModalidade.COD);
    listarModalidades(-2);
}

function alterarModalidadePopUp() {
    let index = buscarModalidade();
    let inHTML = ''
    switch (index) {
        case -2:
            inHTML = '<h1>Digite a Modalidade...</h1><hr><br><p>Você não digitou o CÓDIGO da modalidade que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        case -1:
            inHTML = '<h1>Modalidade não encontrada...</h1><hr><br><p>Este CÓDIGO não é de nenhuma das modalidades cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        default:
            inHTML = '<h1>Alterar Modalidade</h1><hr><p><form action=""><br><label>CÓDIGO</label><span> '+ document.getElementById('buscador-codigo').value +'</span><br><label>Descrição</label><input type="text" id="descr-modalidade"><br><label>Duração</label><input type="time" id="durac-modaidade"><br><label>Valor</label><input type="text" id="valor-modalidade"><br><div id="dias-modalidade"><label>Dias</label><input type="date" class="DiasDisp"></div><a onclick="addMaisDia()">+ Adicionar dia</a><div id="horarios-modalidade"><label>Horarios</label><input type="time" class="HorariosMod"></div><a onclick="addMaisHorario()">+ Adicionar horário</a><div id="profs-modalidade"><label>Professores</label><input type="text" class="ProfsMod" placeholder="digite um professor"></div><a onclick="addMaisProf()">+ Adicionar professor</a><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><a class="btn" onclick="alterarModalidade('+index+');fecharPopUp();">finalizar</a></div></form></p>';
            abrirPopUp(inHTML);
            document.getElementById('buscador-codigo').value = listaModalidades[index].COD;
            document.getElementById('descr-modalidade').value = listaModalidades[index].descr;
            document.getElementById('durac-modalidade').value = listaModalidades[index].durac;
            document.getElementById('valor-modalidade').value = listaModalidades[index].valor;
            for (let i = 1 ; i < listaModalidades[index].diasdisp.length ; i++) {
                addMaisDia();
            }
            for (let i = 1 ; i < listaModalidades[index].horarios.length ; i++) {
                addMaisHorario();
            }
            for (let i = 1 ; i < listaModalidades[index].profs.length ; i++) {
                addMaisProf();
            }
            listDias = document.getElementsByClassName('DiasDisp');
            listHorarios = document.getElementsByClassName('HorariosMod');
            listProfs = document.getElementsByClassName('ProfsMod');
            for (let i = 0 ; i < listDias.length ; i ++) {
                listDias[i].value = listaModalidades[index].diasdisp[i];
            }

            for (let i = 0 ; i < listHorarios.length ; i ++) {
                listHorarios[i].value = listaModalidades[index].horarios[i];
            };
            for (let i = 0 ; i < listProfs.length ; i ++) {
                listProfs[i].value = listaModalidades[index].profs[i];
            };
    }
    listarModalidades(-2);
}

function alterarModalidade(index) {
    excluirModalidade(index);
    incluirModalidade();
}

function excluirModalidadePopUp() {
    let index = buscarModalidade();
    let inHTML = ''
    switch (index) {
        case -2:
            inHTML = '<h1>Digite o CÓDIGO...</h1><hr><br><p>Você não digitou o CÓDIGO da modalidade que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        case -1:
            inHTML = '<h1>Modalidade não encontrada...</h1><hr><br><p>Este CÓDIGO não é de nenhuma das modalidades cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        default:
            inHTML = '<h1>Excluir modalidade</h1><hr><br><span>Excluir modalidade de CÓDIGO: '+ document.getElementById('buscador-codigo').value +'</span><p>Você tem certeza de que quer excluir os dados dessa modalidade? Todas os registros de pratica e informações serão deletados permanentemente do sistema!</p><br><hr><br><div class="btns"><a class="btn" onclick="excluirModalidade('+index+');fecharPopUp();">Excluir Modalidade</a><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
    }
}

function excluirModalidade(index) {
    console.log(listaModalidades[index])
    listaModalidades.splice(index, 1);
    console.log(listaModalidades[index])
    excluirPratica(buscarPraticas())
    listarModalidades(-2);
}

function listarModalidades(index) {
    salvarModalidades();
    if (!index) {
        index = buscarModalidade();
    }
    switch (index) {
        case -2:
            str = ''
            for (let i=0; i<(listaModalidades).length;i++) {
                str +=
                '<tr><td>' + listaModalidades[i].COD + '</td><td>'
                + listaModalidades[i].descr + '</td><td>'
                + listaModalidades[i].durac + '</td><td>';
                for (let j = 0 ; j < listaModalidades[i].diasdisp.length ; j++) {
                    str += listaModalidades[i].diasdisp[j] + '<br>'
                }
                str += '</td><td>';
                for (let j = 0 ; j < listaModalidades[i].horarios.length ; j++) {
                    str += listaModalidades[i].horarios[j] + '<br>'
                }
                str += '</td><td>';
                for (let j = 0 ; j < listaModalidades[i].profs.length ; j++) {
                    str += listaModalidades[i].profs[j] + '<br>'
                }
                str += '</td><td>';
                str += listaModalidades[i].valor + '</td></tr>';
            }
            document.getElementById('tabela-modalidades').innerHTML = str;
            break;
        case -1:
            inHTML = '<h1>Modalidade não encontrada...</h1><hr><br><p>Este CÓDIGO não é de nenhuma das modalidades cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            break;
        default:
            str +=
                '<tr><td>' + listaModalidades[i].COD + '</td><td>'
                + listaModalidades[index].descr + '</td><td>'
                + listaModalidades[index].durac + '</td><td>';
                for (let j = 0 ; j < listaModalidades[index].diasdisp.length ; j++) {
                    str += listaModalidades[index].diasdisp[j] + '<br>'
                }
                str += '</td><td>';
                for (let j = 0 ; j < listaModalidades[i].horarios.length ; j++) {
                    str += listaModalidades[index].horarios[j] + '<br>'
                }
                str += '</td><td>';
                for (let j = 0 ; j < listaModalidades[i].profs.length ; j++) {
                    str += listaModalidades[index].profs[j] + '<br>'
                }
                str += '</td><td>';
                str += listaModalidades[index].valor + '</td></tr>';
            
            document.getElementById('tabela-modalidades').innerHTML = str;
    }
}

function addMaisDia() {
    let maisdia = document.createTextNode('Dia')
    let label = document.createElement('label');
    label.appendChild(maisdia)
    let input = document.createElement('input');
    input.setAttribute('type', 'date');
    input.className = 'DiasDisp';
    document.getElementById('dias-modalidade').appendChild(label);
    document.getElementById('dias-modalidade').appendChild(input);
}

function addMaisHorario() {
    let maishorario = document.createTextNode('Horario')
    let label = document.createElement('label');
    label.appendChild(maishorario)
    let input = document.createElement('input');
    input.setAttribute('type', 'time');
    input.className = 'HorariosMod';
    document.getElementById('horarios-modalidade').appendChild(label);
    document.getElementById('horarios-modalidade').appendChild(input);
}

function addMaisProf() {
    let maisprof = document.createTextNode('Professor')
    let label = document.createElement('label');
    label.appendChild(maisprof)
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.placeholder = 'digite um professor';
    input.className = 'ProfsMod';
    document.getElementById('profs-modalidade').appendChild(label);
    document.getElementById('profs-modalidade').appendChild(input);
}