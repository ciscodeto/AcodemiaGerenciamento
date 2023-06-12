function carregarAlunos() {
    console.log(localStorage.getItem('listaAlunos'))
    if (localStorage.getItem('listaAlunos')) {
        listaAlunos = JSON.parse(localStorage.getItem('listaAlunos'));
    }
}

function salvarAlunos() {
    let strListaAlunos = JSON.stringify(listaAlunos);
    localStorage.setItem('listaAlunos', strListaAlunos);
}

function buscarAluno() {
    let c = document.getElementById('buscador-cpf').value;
    if (c) {
        index = -1
    } else {
        index = -2
    }
    for (let i = 0 ; i < (listaAlunos).length ; i++) {
        if (c === listaAlunos[i].CPF) {
            index = i
        }
    }
    return index
}

function incluirAlunoPopUp() {
    let index = buscarAluno();
    let inHTML = '';
    switch (index) {
        case -2:
            inHTML = '<h1>Digite o CPF...</h1><hr><br><p>Você não digitou o CPF do aluno que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        case -1:
            inHTML = '<h1>Adicionar Aluno</h1><hr><p><form action=""><br><label>CPF</label><span> '+ document.getElementById('buscador-cpf').value +'</span><br><label>Nome</label><input type="text" id="nome-aluno" placeholder="Digite o nome"><br><label>Nascimento</label><input type="date" id="data-nasc"><br><label>Sexo</label><select id="sexo-aluno"><option selected disabled>Selecionar</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option><option value="Outro">Outro</option></select><br><label>Peso</label><input type="text" id="peso-aluno" placeholder="em quilogramas (kg)">kg<br><label>Altura</label><input type="text" id="altura-aluno" placeholder="em metros (m)">m<br><div id="emails-aluno"><label>email</label><input type="email" class="EmailAluno" placeholder="digite um email"></div><a onclick="addMaisEmail()">+ Adicionar email</a><div id="telefs-aluno"><label>telefone</label><input type="text" class="TelsAluno" placeholder="digite um telefone"></div><a onclick="addMaisTel()">+ Adicionar telefone</a><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><a id="enviar-aluno" class="btn" onclick="incluirAluno();fecharPopUp();">finalizar</a></div></form></p>';
            abrirPopUp(inHTML);
            return 0;
        default:
            inHTML = '<h1>Aluno já registrado...</h1><hr><br><p>Este CPF pertence a um dos alunos já cadastrados...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
    }
    listarAlunos(-2);
}

function incluirAluno() {
    let incCPF = document.getElementById('buscador-cpf').value;
    let incNome = document.getElementById('nome-aluno').value;
    let incNasc = document.getElementById('data-nasc').value;
    let incSexo = document.getElementById('sexo-aluno').value;
    let incPeso = document.getElementById('peso-aluno').value;
    let incAltr = document.getElementById('altura-aluno').value;
    let incEmails = [];
    let incTelefs = [];

    let listEmails = document.getElementsByClassName('EmailAluno');
    for (let i = 0 ; i < listEmails.length ; i++) {
            incEmails.push(listEmails[i].value);
    }

    let listTelefs = document.getElementsByClassName('TelsAluno');
    for (let i = 0 ; i < listTelefs.length ; i++) {
        incTelefs.push(listTelefs[i].value);
    }

    let novoAluno = {
        CPF: incCPF,
        nome: incNome,
        nasc: incNasc,
        sexo: incSexo,
        peso: incPeso,
        altu: incAltr,
        emai: incEmails,
        tele: incTelefs,
    }
    
    listaAlunos.push(novoAluno);
    console.log('novo aluno cadastrado: ' + novoAluno.CPF);
    console.log(novoAluno.emai, novoAluno.tele)
    listarAlunos(-2);
}

function alterarAlunoPopUp() {
    let index = buscarAluno();
    let inHTML = ''
    switch (index) {
        case -2:
            inHTML = '<h1>Digite o CPF...</h1><hr><br><p>Você não digitou o CPF do aluno que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        case -1:
            inHTML = '<h1>Aluno não encontrado...</h1><hr><br><p>Este CPF não é de nenhum dos alunos cadastrados...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        default:
            inHTML = '<h1>Alterar Aluno</h1><hr><p><form action=""><br><label>CPF</label><span> '+ document.getElementById('buscador-cpf').value +'</span><br><label>Nome</label><input type="text" id="nome-aluno"><br><label>Nascimento</label placeholder="Digite o nome"><input type="date" id="data-nasc"><br><label>Sexo</label><select id="sexo-aluno"><option selected disabled>Selecionar</option><option value="Masculino">Masculino</option><option value="Feminino">Feminino</option><option value="Outro">Outro</option></select><br><label>Peso</label><input type="text" id="peso-aluno" placeholder="em quilogramas (kg)">kg<br><label>Altura</label><input type="text" id="altura-aluno" placeholder="em metros (m)">m<br><div id="emails-aluno"><label>email</label><input type="email" class="EmailAluno" placeholder="digite um email"></div><a onclick="addMaisEmail()">+ Adicionar email</a><div id="telefs-aluno"><label>telefone</label><input type="text" class="TelsAluno" placeholder="digite um telefone"></div><a onclick="addMaisTel()">+ Adicionar telefone</a><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><a id="enviar-aluno" class="btn" onclick="alterarAluno('+ index +');fecharPopUp();">finalizar</a></div></form></p>';
            abrirPopUp(inHTML);
            document.getElementById('buscador-cpf').value = listaAlunos[index].CPF;
            document.getElementById('nome-aluno').value = listaAlunos[index].nome;
            document.getElementById('data-nasc').value = listaAlunos[index].nasc;
            document.getElementById('sexo-aluno').value = listaAlunos[index].sexo;
            document.getElementById('peso-aluno').value = listaAlunos[index].peso;
            document.getElementById('altura-aluno').value = listaAlunos[index].altu;
            for (let i = 1 ; i < listaAlunos[index].emai.length ; i++) {
                addMaisEmail();
            }
            for (let i = 1 ; i < listaAlunos[index].tele.length ; i++) {
                addMaisEmail();
            }
            listEmails = document.getElementsByClassName('EmailAluno');
            listTelefs = document.getElementsByClassName('TelsAluno');
            for (let i = 0 ; i < listEmails.length ; i ++) {
                listEmails[i].value = listaAlunos[index].emai[i];
            }

            for (let i = 0 ; i < listTelefs.length ; i ++) {
                listTelefs[i].value = listaAlunos[index].tele[i];
            };
    }
    listarAlunos(-2);
}

function alterarAluno(index) {
    excluirAluno(index);
    incluirAluno();
}

function excluirAlunoPopUp() {
    let index = buscarAluno();
    let inHTML = ''
    switch (index) {
        case -2:
            inHTML = '<h1>Digite o CPF...</h1><hr><br><p>Você não digitou o CPF do aluno que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        case -1:
            inHTML = '<h1>Aluno não encontrado...</h1><hr><br><p>Este CPF não é de nenhum dos alunos cadastrados...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
            return 0;
        default:
            inHTML = '<h1>Excluir aluno</h1><hr><br><span>Excluir aluno de CPF: '+ document.getElementById('buscador-cpf').value +'</span><p>Você tem certeza de que quer excluir os dados desse aluno? Todas os registros de pratica e informações serão deletados permanentemente do sistema!</p><br><hr><br><div class="btns"><a class="btn" onclick="excluirAluno('+index+');fecharPopUp();">Excluir Aluno</a><a class="btn" onclick="fecharPopUp();">fechar</a>';
            abrirPopUp(inHTML);
    }
}

function excluirAluno(index) {
    console.log(listarAlunos[index])
    listaAlunos.splice(index, 1);
    console.log(listarAlunos[index])
    listarAlunos(-2);
}

function listarAlunos(index) {
    salvarAlunos();
    if (!index) {
        index = buscarAluno();
    }
    switch (index) {
        case -2:
            str = ''
            for (let i=0; i<(listaAlunos).length;i++) {
                str +=
                '<tr><td>' + listaAlunos[i].CPF + '</td><td>'
                + listaAlunos[i].nome + '</td><td>'
                + listaAlunos[i].nasc + '</td><td>'
                + listaAlunos[i].sexo + '</td><td>'
                + listaAlunos[i].peso + '</td><td>'
                + listaAlunos[i].altu + '</td><td>';
                for (let j = 0 ; j < listaAlunos[i].emai.length ; j++) {
                    str += listaAlunos[i].emai[j] + '<br>'
                }
                str += '</td><td>';
                for (let j = 0 ; j < listaAlunos[i].tele.length ; j++) {
                    str += listaAlunos[i].tele[j] + '<br>'
                }
                str += '</td></tr>';
            }
            document.getElementById('tabela-alunos').innerHTML = str;
            break;
        case -1:
            inHTML = '<h1>Aluno não encontrado...</h1><hr><br><p>Este CPF não é de nenhum dos alunos cadastrados...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
            break;
        default:
            str = '<tr><td>' + listaAlunos[index].CPF + '</td><td>'
            + listaAlunos[index].nome + '</td><td>'
            + listaAlunos[index].nasc + '</td><td>'
            + listaAlunos[index].sexo + '</td><td>'
            + listaAlunos[index].peso + '</td><td>'
            + listaAlunos[index].altura + '</td><td>';
            for (let j = 0 ; j < listaAlunos[index].emai.length ; j++) {
                str += listaAlunos[index].emai[j] + '<br>'
            }
            str += '</td><td>';
            for (let j = 0 ; j < listaAlunos[index].tele.length ; j++) {
                str += listaAlunos[index].tele[j] + '<br>'
            }
            str += '</td></tr>';
            document.getElementById('tabela-alunos').innerHTML = str;
    }
}

function addMaisEmail() {
    let maisemail = document.createTextNode('email')
    let label = document.createElement('label');
    label.appendChild(maisemail)
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.placeholder = 'digite um email';
    input.className = 'EmailAluno';
    document.getElementById('emails-aluno').appendChild(label);
    document.getElementById('emails-aluno').appendChild(input);
}

function addMaisTel() {
    let maistelef = document.createTextNode('telefone')
    let label = document.createElement('label');
    label.appendChild(maistelef)
    let input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.placeholder = 'digite um telefone'
    input.className = 'TelsAluno';
    document.getElementById('telefs-aluno').appendChild(label);
    document.getElementById('telefs-aluno').appendChild(input);
}