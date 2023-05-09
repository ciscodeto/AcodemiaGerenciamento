let listaAlunos = []
let listaModalidades = []
let listaPraticas = []
class Alunos {}
class Modalidades {}
class Praticas {}

function buscarAluno() {
    let cpf = document.getElementById('buscador-cpf').value
    if (cpf) {
        index = -1
    } else {
        index = -2
    }
    for (let i=0; i<(listaAlunos).length; i++) {
        if (cpf === listaAlunos[i].cpf) {
            index = i
        }
    }
    return index
}

function buscarModalidade(id, listMod) {
    let codigo = document.getElementById(id).value
    if (codigo) {
        index = -1
    } else {
        index = -2
    }
    for (let i=0; i<length(listMod); i++) {
        if (codigo === listMod[i].codigo) {
            index = i
        }
    }
    return index
}

function buscarPratica(idCPF, idCodigo, listaPraticas) {
    let cpf = document.getElmentById(idCPF).value
    let codigo = document.getElementById(idCodigo).value
    let cpfIndex = -2;
    let codigoIndex = -2;

    if (!cpf && !codigo) {
        return -2 
    }
    if (cpf) {
        cpfIndex = -1
    }
    if (codigo) {
        codigoIndex = -1
    }

    for (let i=0; i < length(listaPraticas); i++) {
        
    }
}

// Funções Principais

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
        nasc: incData_nascimento,
        sexo: incSexo,
        peso: incPeso,
        altura: incAltura,
        email: incEmail,
        tel: incTel,
    }

    for (const property in novoAluno) {
        if (property == null) {
            alert('você não preencheu todos os dados');
            return 0
        }
    }
    //Adicionar 'novoAluno' ao vetor de alunos
    fecharPopUp()
}

function abrirPopUp(id) {
    let indexAluno = buscarAluno();
    let inHTML;
    let incluirAlunoHTML = '<h1>Adicionar Aluno</h1><hr><p><form action=""><div><br><label for="nome-aluno">Nome</label><input type="text" id="nome-aluno" name="nome-aluno" placeholder="Nome do aluno" required><br><label for="data-nasc">Nascimento</label><input type="date" id="data-nasc" name="data-nasc" required><br><label for="sexo-aluno">Sexo</label><select id="sexo-aluno" name="sexo-aluno"><option selected disabled required>Selecione o Sexo</option><option value="0">Masculino</option><option value="1">Feminino</option><option value="2">Não-Binário</option><option value="3">Outro</option></select><br><label for="peso-aluno">Peso</label><input type="text" id="peso-aluno" name="peso-aluno" placeholder="Peso do aluno (kg)" required>kg<br><label for="altura-aluno">Altura</label><input type="text" id="altura-aluno" name="altura-aluno" placeholder="Altura do aluno (m)" required>m<br><label for="email-aluno">Email</label><input type="text" id="email-aluno" name="email-aluno" placeholder="E-mails separados por vírgula (,)" required><br><label for="tel-aluno">Telefone</label><input type="text" id="tel-aluno" name="tel-aluno" placeholder="Telefones separados por vírgula (,)" required><br><br></div></p><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a><button type="submit" class="btn" onclick="incluirAluno();">finalizar</button></div></form>';
    let excluirAlunoHTML = '<h1>Excluir aluno</h1><hr><br><p>Você tem certeza de que quer excluir os dados desse aluno? Todas os registros de pratica e informações serão deletados permanentemente do sistema!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();excluirAluno();">Excluir Aluno</a><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let alunoVazioHTML = '<h1>Digite o CPF...</h1><hr><br><p>Você não digitou o CPF do aluno que está procurando!</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let aluno404HTML = '<h1>Aluno não encontrado...</h1><hr><br><p>Este CPF não é de nenhum dos alunos cadastrados...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';
    let alunoJaCadastradoHTML = '<h1>Aluno já registrado...</h1><hr><br><p>Este CPF pertence a um dos alunos já cadastrados...</p><br><hr><br><div class="btns"><a class="btn" onclick="fecharPopUp();">fechar</a>';

    if (indexAluno === -2) {
        inHTML = alunoVazioHTML
    } else if (indexAluno === -1) {
        if (id === 'incluir-aluno') {
            inHTML = incluirAlunoHTML
        } else if (id === 'incluir-aluno') {
            inHTML = alunoJaCadastradoHTML
        } else if (id === 'alterar-aluno' || id === 'excluir-aluno') {
            inHTML = aluno404HTML
        }
    } else {
    
    }

    document.getElementById('modal-conteudo').innerHTML = inHTML
    let popup = document.getElementById('modal');
    popup.classList.add("modalContainerOpen")
    return indexAluno
}

function listarAlunos(id, listAlu) {
    if (elena) {
        
    } else {
        abrirPopUp(id)
    }
}

function verificaIncluirModalidade(vetor) {}

function verificaExcluirAlunoModalidade(index, vetor_a, vetor_pratica) {}

//Funções estéticas e complementares

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