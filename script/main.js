let listaAlunos = []
let listaModalidades = []
let listaPraticas = []
class Alunos {}
class Modalidades {}
class Praticas {}

// FUNÇÕES ALUNOS

function buscarAluno() {
    let cpf = document.getElementById('buscador-cpf').value
    if (cpf) {
        index = -1
    } else {
        index = -2
    }
    for (let i=0; i<(listaAlunos).length; i++) {
        if (cpf === listaAlunos[i].CPF) {
            index = i
        }
    }
    console.log(index)
    return index
}

function incluirAluno() {
    let incCpf = document.getElementById('buscador-cpf').value;
    let incNome = document.getElementById('nome-aluno').value;
    let incData_nasc = document.getElementById('data-nasc').value;
    let incSexo = document.getElementById('sexo-aluno').value;
    let incPeso = document.getElementById('peso-aluno').value;
    let incAltura = document.getElementById('altura-aluno').value;
    let incEmail = document.getElementById('email-aluno').value.split(",");
    let incTel = document.getElementById('tel-aluno').value.split(",");

    let novoAluno = {
        CPF: incCpf,
        nome: incNome,
        nasc: incData_nasc,
        sexo: incSexo,
        peso: incPeso,
        altura: incAltura,
        email: incEmail,
        tel: incTel,
    }

    listaAlunos.push(novoAluno);
    console.log(listaAlunos);
    fecharPopUp();
    listarAlunos(-2);
}

function abrirPopUp_Alunos(id) {
    let indexAluno = buscarAluno();
    let inHTML;
    let incluirAlunoHTML = '<h1>Adicionar Aluno</h1><hr><p><form action=""><div><br><label for="nome-aluno">Nome</label><input type="text" id="nome-aluno" name="nome-aluno" placeholder="Nome do aluno" required><br><label for="data-nasc">Nascimento</label><input type="date" id="data-nasc" name="data-nasc" required><br><label for="sexo-aluno">Sexo</label><select id="sexo-aluno" name="sexo-aluno"><option selected disabled required>Selecione o Sexo</option><option value="M">Masculino</option><option value="F">Feminino</option><option value="NB">Não-Binário</option><option value="O">Outro</option></select><br><label for="peso-aluno">Peso</label><input type="text" id="peso-aluno" name="peso-aluno" placeholder="Peso do aluno (kg)" required>kg<br><label for="altura-aluno">Altura</label><input type="text" id="altura-aluno" name="altura-aluno" placeholder="Altura do aluno (m)" required>m<br><label for="email-aluno">Email</label><input type="text" id="email-aluno" name="email-aluno" placeholder="E-mails separados por vírgula (,)" required><br><label for="tel-aluno">Telefone</label><input type="text" id="tel-aluno" name="tel-aluno" placeholder="Telefones separados por vírgula (,)" required><br><br></div></p><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><a id="enviar-aluno" class="btn" onclick="incluirAluno();">finalizar</a></div></form>';
    let alterarAlunoHTML = '<h1>Alterar Aluno</h1><hr><p><form action=""><div><br><label for="nome-aluno">Nome</label><input type="text" id="nome-aluno" name="nome-aluno" placeholder="Nome do aluno" required><br><label for="data-nasc">Nascimento</label><input type="date" id="data-nasc" name="data-nasc" required><br><label for="sexo-aluno">Sexo</label><select id="sexo-aluno" name="sexo-aluno"><option selected disabled required>Selecione o Sexo</option><option value="M">Masculino</option><option value="F">Feminino</option><option value="NB">Não-Binário</option><option value="O">Outro</option></select><br><label for="peso-aluno">Peso</label><input type="text" id="peso-aluno" name="peso-aluno" placeholder="Peso do aluno (kg)" required>kg<br><label for="altura-aluno">Altura</label><input type="text" id="altura-aluno" name="altura-aluno" placeholder="Altura do aluno (m)" required>m<br><label for="email-aluno">Email</label><input type="text" id="email-aluno" name="email-aluno" placeholder="E-mails separados por vírgula (,)" required><br><label for="tel-aluno">Telefone</label><input type="text" id="tel-aluno" name="tel-aluno" placeholder="Telefones separados por vírgula (,)" required><br><br></div></p><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><a id="enviar-aluno" class="btn" onclick="alterarAluno('+indexAluno+');">finalizar</a></div></form>';
    let excluirAlunoHTML = '<h1>Excluir aluno</h1><hr><br><p>Você tem certeza de que quer excluir os dados desse aluno? Todas os registros de pratica e informações serão deletados permanentemente do sistema!</p><br><hr><br><div class="btns"><a class="btn" onclick="excluirAluno();fecharPopUp();">Excluir Aluno</a><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let alunoVazioHTML = '<h1>Digite o CPF...</h1><hr><br><p>Você não digitou o CPF do aluno que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let aluno404HTML = '<h1>Aluno não encontrado...</h1><hr><br><p>Este CPF não é de nenhum dos alunos cadastrados...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let alunoJaCadastradoHTML = '<h1>Aluno já registrado...</h1><hr><br><p>Este CPF pertence a um dos alunos já cadastrados...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';

    if (indexAluno === -2) {
        if (id === "listar-aluno") {
            listarAlunos(indexAluno)
            return indexAluno
        } else {
            inHTML = alunoVazioHTML
        }
    } else if (indexAluno === -1) {
        if (id === 'incluir-aluno') {
            inHTML = incluirAlunoHTML
        } else if (id === 'alterar-aluno' || id === 'excluir-aluno' || id ==='listar-aluno') {
            inHTML = aluno404HTML
        }
    } else {
        if (id === 'incluir-aluno') {
            inHTML = alunoJaCadastradoHTML
        } else if (id === 'excluir-aluno') {
            inHTML = excluirAlunoHTML
        } else if (id === 'listar-aluno') {
            listarAlunos(indexAluno);
            return indexAluno
        } else if (id === 'alterar-aluno') {
            inHTML = alterarAlunoHTML;
        }
    }
    document.getElementById('modal-conteudo').innerHTML = inHTML
    let popup = document.getElementById('modal');
    popup.classList.add("modalContainerOpen")
    return indexAluno
}

function listarAlunos(index) {
    console.log('listar aluno' + index)
    if (index === -2) {
        document.getElementById('tabela-alunos').innerHTML = ''
        for (let i=0; i<(listaAlunos).length;i++) {
            document.getElementById('tabela-alunos').innerHTML +=
            '<tr><td>' + listaAlunos[i].CPF + '</td><td>'
            + listaAlunos[i].nome + '</td><td>'
            + listaAlunos[i].nasc + '</td><td>'
            + listaAlunos[i].sexo + '</td><td>'
            + listaAlunos[i].peso + '</td><td>'
            + listaAlunos[i].altura + '</td><td>'
            + listaAlunos[i].email + '</td><td>'
            + listaAlunos[i].tel + '</td><td></tr>'
        }
    } else {
        
        document.getElementById('tabela-alunos').innerHTML =
            '<tr><td>' + listaAlunos[index].CPF + '</td><td>'
            + listaAlunos[index].nome + '</td><td>'
            + listaAlunos[index].nasc + '</td><td>'
            + listaAlunos[index].sexo + '</td><td>'
            + listaAlunos[index].peso + '</td><td>'
            + listaAlunos[index].altura + '</td><td>'
            + listaAlunos[index].email + '</td><td>'
            + listaAlunos[index].tel + '</td><td></tr>'
    }
}

function excluirAluno() {
    abrirPopUp_Alunos();
    listaAlunos.splice(index, 1);
    listarAlunos(-2);
}

function alterarAluno(index) {
    let altCPF = document.getElementById('buscador-cpf').value;
    let altNome = document.getElementById('nome-aluno').value;
    let altData_nasc = document.getElementById('data-nasc').value;
    let altSexo = document.getElementById('sexo-aluno').value;
    let altPeso = document.getElementById('peso-aluno').value;
    let altAltura = document.getElementById('altura-aluno').value;
    let altEmail = document.getElementById('email-aluno').value.split(",");
    let altTel = document.getElementById('tel-aluno').value.split(",");

    listaAlunos[index] = {
        CPF: altCPF,
        nome: altNome,
        nasc: altData_nasc,
        sexo: altSexo,
        peso: altPeso,
        altura: altAltura,
        email: altEmail,
        tel: altTel,
    }
    console.log(listaAlunos);
    fecharPopUp();
    listarAlunos(-2);
}

// FUNÇÕES MODALIDADE

// FUNÇÕES MODALIDADE

function buscarModalidade() {
    let cod = document.getElementById('buscador-codigo').value
    if (cod) {
        index = -1
    } else {
        index = -2
    }
    for (let i=0; i<(listaModalidades).length; i++) {
        if (cod === listaModalidades[i].CODIGO) {
            index = i
        }
    }
    console.log(index)
    return index
}

function incluirModalidade() {
    let incCodigo = document.getElementById('buscador-codigo').value;
    let incDesc = document.getElementById('desc-modalidade').value;
    let incDuracao = document.getElementById('duracao-modalidade').value;
    let incDiasDisp = [];
    if (document.getElementById('dom').checked == 1){
        incDiasDisp.push('dom') ;
    } if (document.getElementById('seg').checked == 1){
        incDiasDisp.push('seg') ;
    } if (document.getElementById('ter').checked == 1){
        incDiasDisp.push('ter') ;
    } if (document.getElementById('qua').checked == 1){
        incDiasDisp.push('qua') ;
    } if (document.getElementById('qui').checked == 1){
        incDiasDisp.push('qui') ;
    } if (document.getElementById('sex').checked == 1){
        incDiasDisp.push('sex') ;
    } if (document.getElementById('sab').checked == 1){
        incDiasDisp.push('sab') ;
    }
    let incHorario = document.getElementById('horarios-modalidade').value.split(",");
    let incProfs = document.getElementById('prof-modalidade').value.split(",");
    let incValor = document.getElementById('valor-modalidade').value;

    let novaModalidade = {
        CODIGO: incCodigo,
        desc: incDesc,
        duracao: incDuracao,
        dias_disp: incDiasDisp,
        horarios: incHorario,
        prof: incProfs,
        valor: incValor,
    }

    listaModalidades.push(novaModalidade);
    console.log(listaModalidades);
    fecharPopUp();
    listarModalidades(-2);
}

function abrirPopUp_Modalidades(id) {
    let indexModalidade = buscarModalidade();
    let inHTML;
    let incluirModalidadeHTML = '<h1>Adicionar Modalidade</h1><hr><p><form action=""><div><br><label for="desc-modalidade">Descrição </label><input type="text" id="desc-modalidade" name="desc-modalidade" placeholder="Descrição da modalidade" required><br><label for="duracao-modalidade">Duração</label><input type="time" id="duracao-modalidade" name="duracao-modalidade" required><br><input type="radio" id="dom" name="dom" value="dom"><label for="dom">Domingo</label><input type="radio" id="seg" name="seg" value="seg"><label for="seg">Segunda</label><input type="radio" id="ter" name="ter" value="ter"><label for="ter">Terça</label><input type="radio" id="qua" name="qua" value="qua"><label for="qua">Quarta</label><input type="radio" id="qui" name="qui" value="qui"><label for="qui">Quinta</label><input type="radio" id="sex" name="sex" value="sex"><label for="sex">Sexta</label><input type="radio" id="sab" name="sab" value="sab"><label for="sab">Sábado</label></select><br><label for="horarios-modalidade">Horarios Disponíveis</label><input type="text" id="horarios-modalidade" name="horarios-modalidade" placeholder="Horario separados por vírgula (,)" required><br><label for="prof-modalidade">Professores</label><input type="text" id="prof-modalidade" name="prof-modalidade" placeholder="Professores separados por vírgula (,)" required><br><label for="valor-modalidade">Valor</label><input type="text" id="valor-modalidade" name="valor-modalidade" placeholder="Preço da modalidade" required><br><br><br></div></p><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><a id="enviar-modalidade" class="btn" onclick="incluirModalidade();">finalizar</a></div></form>';
    let alterarModalidadeHTML = '<h1>Alterar Modalidade</h1><hr><p><form action=""><div><br><label for="desc-modalidade">Descrição </label><input type="text" id="desc-modalidade" name="desc-modalidade" placeholder="Descrição da modalidade" required><br><label for="duracao-modalidade">Duração</label><input type="time" id="duracao-modalidade" name="duracao-modalidade" required><br><input type="radio" id="dom" name="dom" value="dom"><label for="dom">Domingo</label><input type="radio" id="seg" name="seg" value="seg"><label for="seg">Segunda</label><input type="radio" id="ter" name="ter" value="ter"><label for="ter">Terça</label><input type="radio" id="qua" name="qua" value="qua"><label for="qua">Quarta</label><input type="radio" id="qui" name="qui" value="qui"><label for="qui">Quinta</label><input type="radio" id="sex" name="sex" value="sex"><label for="sex">Sexta</label><input type="radio" id="sab" name="sab" value="sab"><label for="sab">Sábado</label></select><br><label for="horarios-modalidade">Horarios Disponíveis</label><input type="text" id="horarios-modalidade" name="horarios-modalidade" placeholder="Horario separados por vírgula (,)" required><br><label for="prof-modalidade">Professores</label><input type="text" id="prof-modalidade" name="prof-modalidade" placeholder="Professores separados por vírgula (,)" required><br><label for="valor-modalidade">Valor</label><input type="text" id="valor-modalidade" name="valor-modalidade" placeholder="Preço da modalidade" required><br><br><br></div></p><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><a id="enviar-modalidade" class="btn" onclick="alterarModalidade('+indexModalidade+');">finalizar</a></div></form>';
    let excluirModalidadeHTML = '<h1>Excluir modalidade</h1><hr><br><p>Você tem certeza de que quer excluir os dados desse modalidade? Todas os registros de pratica e informações serão deletados permanentemente do sistema!</p><br><hr><br><div class="btns"><a class="btn" onclick="excluirModalidade();fecharPopUp();">Excluir Modalidade</a><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let modalidadeVaziaHTML = '<h1>Digite o CODIGO...</h1><hr><br><p>Você não digitou o CODIGO do modalidade que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let modalidade404HTML = '<h1>Modalidade não encontrado...</h1><hr><br><p>Este CODIGO não é de nenhum dos modalidades cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let modalidadeJaCadastradaHTML = '<h1>Modalidade já registrado...</h1><hr><br><p>Este CODIGO pertence a um dos modalidades já cadastradas...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';

    if (indexModalidade === -2) {
        if (id === "listar-modalidade") {
            listarModalidades(indexModalidade)
            return indexModalidade
        } else {
            inHTML = modalidadeVaziaHTML
        }
    } else if (indexModalidade === -1) {
        if (id === 'incluir-modalidade') {
            inHTML = incluirModalidadeHTML
        } else if (id === 'alterar-modalidade' || id === 'excluir-modalidade' || id ==='listar-modalidade') {
            inHTML = modalidade404HTML
        }
    } else {
        if (id === 'incluir-modalidade') {
            inHTML = modalidadeJaCadastradaHTML
        } else if (id === 'excluir-modalidade') {
            inHTML = excluirModalidadeHTML
        } else if (id === 'listar-modalidade') {
            listarModalidades(indexModalidade);
            return indexModalidade
        } else if (id === 'alterar-modalidade') {
            inHTML = alterarModalidadeHTML;
        }
    }
    document.getElementById('modal-conteudo').innerHTML = inHTML
    let popup = document.getElementById('modal');
    popup.classList.add("modalContainerOpen")
    return indexModalidade
}

function listarModalidades(index) {
    console.log('listar modalidade' + index)
    if (index === -2) {
        document.getElementById('tabela-modalidades').innerHTML = ''
        for (let i=0; i<(listaModalidades).length;i++) {
            document.getElementById('tabela-modalidades').innerHTML +=
            '<tr><td>' + listaModalidades[i].CODIGO + '</td><td>'
            + listaModalidades[i].desc + '</td><td>'
            + listaModalidades[i].duracao + '</td><td>'
            + listaModalidades[i].dias_disp + '</td><td>'
            + listaModalidades[i].horarios + '</td><td>'
            + listaModalidades[i].prof + '</td><td>'
            + listaModalidades[i].valor + '</td><td></tr>'
        }
    } else {
        
        document.getElementById('tabela-modalidades').innerHTML =
            '<tr><td>' + listaModalidades[i].CODIGO + '</td><td>'
            + listaModalidades[i].desc + '</td><td>'
            + listaModalidades[i].duracao + '</td><td>'
            + listaModalidades[i].dias_disp + '</td><td>'
            + listaModalidades[i].horarios + '</td><td>'
            + listaModalidades[i].prof + '</td><td>'
            + listaModalidades[i].valor + '</td><td></tr>'
    }
}

function excluirModalidade() {
    abrirPopUp_Modalidades();
    listaModalidades.splice(index, 1);
    listarModalidades(-2);
}

function alterarModalidade(index) {
    let altCODIGO = document.getElementById('buscador-codigo').value;
    let altDesc = document.getElementById('desc-modalidade').value;
    let altDuracao = document.getElementById('duracao-modalidade').value;
    let altDiasDisp = [];
    if (document.getElementById('dom').checked == 1){
        altDiasDisp.push('dom') ;
    } if (document.getElementById('seg').checked == 1){
        altDiasDisp.push('seg') ;
    } if (document.getElementById('ter').checked == 1){
        altDiasDisp.push('ter') ;
    } if (document.getElementById('qua').checked == 1){
        altDiasDisp.push('qua') ;
    } if (document.getElementById('qui').checked == 1){
        altDiasDisp.push('qui') ;
    } if (document.getElementById('sex').checked == 1){
        altDiasDisp.push('sex') ;
    } if (document.getElementById('sab').checked == 1){
        altDiasDisp.push('sab') ;
    }
    let altHorario = document.getElementById('horarios-modalidade').value;
    let altProfs = document.getElementById('prof-modalidade').value.split(",");
    let altValor = document.getElementById('valor-modalidade').value;

    listaModalidades[index] = {
        CODIGO: altCODIGO,
        desc: altDesc,
        duracao: altDuracao,
        dias_disp: altDiasDisp,
        horarios: altHorario,
        prof: altProfs,
        valor: altValor,
    }
    console.log(listaModalidades);
    fecharPopUp();
    listarModalidades(-2);
}


// FUNÇÕES ESTÉTICAS E COMPLEMENTARES

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

function fecharPopUp() {
    let popup = document.getElementById('modal');
    popup.classList.remove("modalContainerOpen")
}