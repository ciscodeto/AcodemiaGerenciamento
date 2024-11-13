// yrelatorios.js

let listaRelatorios = [];
let tipoRelatorioAtual = 'geral'; // Valor padrão

function carregarRelatorios() {
    carregarAlunos();
    carregarModalidades();
    carregarPraticas();
    gerarRelatorios();
    atualizarTipoRelatorio(); // Configura a tabela inicialmente
}

function atualizarTipoRelatorio() {
    tipoRelatorioAtual = document.getElementById('tipo-relatorio').value;
    ajustarFiltros();
    gerarRelatorios();
}

function ajustarFiltros() {
    // Esconder ou mostrar campos de filtro conforme o tipo de relatório
    const cpfField = document.getElementById('buscador-cpf');
    const codigoModalidadeField = document.getElementById('buscador-codigo-modalidade');

    if (tipoRelatorioAtual === 'alunos') {
        cpfField.style.display = 'inline';
        codigoModalidadeField.style.display = 'none';
    } else if (tipoRelatorioAtual === 'modalidades') {
        cpfField.style.display = 'none';
        codigoModalidadeField.style.display = 'inline';
    } else if (tipoRelatorioAtual === 'praticas' || tipoRelatorioAtual === 'geral') {
        cpfField.style.display = 'inline';
        codigoModalidadeField.style.display = 'inline';
    }
}

function gerarRelatorios() {
    switch (tipoRelatorioAtual) {
        case 'alunos':
            gerarRelatorioAlunos();
            break;
        case 'modalidades':
            gerarRelatorioModalidades();
            break;
        case 'praticas':
            gerarRelatorioPraticas();
            break;
        default:
            gerarRelatorioGeral();
    }
}

function gerarRelatorioGeral() {
    listaRelatorios = [];

    // Lógica existente para relatório geral (como antes)
    let agrupamento = {};

    listaPraticas.forEach(pratica => {
        let chave = `${pratica.pCPF}_${pratica.pCOD}`;
        if (!agrupamento[chave]) {
            agrupamento[chave] = [];
        }
        agrupamento[chave].push(pratica);
    });

    for (let chave in agrupamento) {
        let praticas = agrupamento[chave];
        let praticaExemplo = praticas[0];

        let aluno = listaAlunos.find(aluno => aluno.CPF === praticaExemplo.pCPF);
        let modalidade = listaModalidades.find(modalidade => modalidade.COD === praticaExemplo.pCOD);

        let totalDias = modalidade ? modalidade.diasdisp.length : 0;
        let presencas = praticas.length;
        let faltas = totalDias > presencas ? totalDias - presencas : 0;

        listaRelatorios.push({
            cpfAluno: praticaExemplo.pCPF,
            nomeAluno: aluno ? aluno.nome : "Não encontrado",
            modalidade: praticaExemplo.pCOD,
            descricao: modalidade ? modalidade.descr : "Não encontrada",
            presencas: presencas,
            faltas: faltas
        });
    }

    atualizarTabelaRelatorios(listaRelatorios);
}

function gerarRelatorioAlunos() {
    // Relatório de Alunos
    listaRelatorios = listaAlunos.map(aluno => ({
        cpfAluno: aluno.CPF,
        nomeAluno: aluno.nome,
        sexo: aluno.sexo,
        peso: aluno.peso,
        altura: aluno.altu,
        emails: aluno.emai.join(', '),
        telefones: aluno.tele.join(', ')
    }));

    atualizarTabelaRelatorios(listaRelatorios);
}

function gerarRelatorioModalidades() {
    // Relatório de Modalidades
    listaRelatorios = listaModalidades.map(modalidade => ({
        codigo: modalidade.COD,
        descricao: modalidade.descr,
        duracao: modalidade.durac,
        dias: modalidade.diasdisp.join(', '),
        horarios: modalidade.horarios.join(', '),
        professores: modalidade.profs.join(', '),
        valor: modalidade.valor
    }));

    atualizarTabelaRelatorios(listaRelatorios);
}

function gerarRelatorioPraticas() {
    // Relatório de Práticas individuais
    listaRelatorios = listaPraticas.map(pratica => ({
        cpfAluno: pratica.pCPF,
        modalidade: pratica.pCOD,
        data: pratica.data,
        horario: pratica.horario
    }));

    atualizarTabelaRelatorios(listaRelatorios);
}

function filtrarRelatorios() {
    const cpfFiltro = document.getElementById('buscador-cpf').value.trim();
    const codModalidadeFiltro = document.getElementById('buscador-codigo-modalidade').value.trim();

    let relatoriosFiltrados = listaRelatorios;

    if (tipoRelatorioAtual === 'alunos' && cpfFiltro) {
        relatoriosFiltrados = listaRelatorios.filter(relatorio => relatorio.cpfAluno === cpfFiltro);
    } else if (tipoRelatorioAtual === 'modalidades' && codModalidadeFiltro) {
        relatoriosFiltrados = listaRelatorios.filter(relatorio => relatorio.codigo === codModalidadeFiltro);
    } else if (tipoRelatorioAtual === 'praticas') {
        relatoriosFiltrados = listaRelatorios.filter(relatorio => {
            const cpfMatch = cpfFiltro ? relatorio.cpfAluno === cpfFiltro : true;
            const codMatch = codModalidadeFiltro ? relatorio.modalidade === codModalidadeFiltro : true;
            return cpfMatch && codMatch;
        });
    } else if (tipoRelatorioAtual === 'geral') {
        relatoriosFiltrados = listaRelatorios.filter(relatorio => {
            const cpfMatch = cpfFiltro ? relatorio.cpfAluno === cpfFiltro : true;
            const codMatch = codModalidadeFiltro ? relatorio.modalidade === codModalidadeFiltro : true;
            return cpfMatch && codMatch;
        });
    }

    atualizarTabelaRelatorios(relatoriosFiltrados);
}

function listarTodosRelatorios() {
    atualizarTabelaRelatorios(listaRelatorios);
}

function atualizarTabelaRelatorios(relatorios) {
    let strCabecalho = '';
    let strCorpo = '';

    if (tipoRelatorioAtual === 'alunos') {
        // Cabeçalho para relatório de alunos
        strCabecalho = `
            <tr>
                <th>CPF</th>
                <th>Nome</th>
                <th>Sexo</th>
                <th>Peso</th>
                <th>Altura</th>
                <th>E-mails</th>
                <th>Telefones</th>
            </tr>
        `;
        relatorios.forEach(relatorio => {
            strCorpo += `
                <tr>
                    <td>${relatorio.cpfAluno}</td>
                    <td>${relatorio.nomeAluno}</td>
                    <td>${relatorio.sexo}</td>
                    <td>${relatorio.peso}</td>
                    <td>${relatorio.altura}</td>
                    <td>${relatorio.emails}</td>
                    <td>${relatorio.telefones}</td>
                </tr>
            `;
        });
    } else if (tipoRelatorioAtual === 'modalidades') {
        // Cabeçalho para relatório de modalidades
        strCabecalho = `
            <tr>
                <th>Código</th>
                <th>Descrição</th>
                <th>Duração</th>
                <th>Dias</th>
                <th>Horários</th>
                <th>Professores</th>
                <th>Valor</th>
            </tr>
        `;
        relatorios.forEach(relatorio => {
            strCorpo += `
                <tr>
                    <td>${relatorio.codigo}</td>
                    <td>${relatorio.descricao}</td>
                    <td>${relatorio.duracao}</td>
                    <td>${relatorio.dias}</td>
                    <td>${relatorio.horarios}</td>
                    <td>${relatorio.professores}</td>
                    <td>${relatorio.valor}</td>
                </tr>
            `;
        });
    } else if (tipoRelatorioAtual === 'praticas') {
        // Cabeçalho para relatório de práticas
        strCabecalho = `
            <tr>
                <th>CPF do Aluno</th>
                <th>Modalidade</th>
                <th>Data</th>
                <th>Horário</th>
            </tr>
        `;
        relatorios.forEach(relatorio => {
            strCorpo += `
                <tr>
                    <td>${relatorio.cpfAluno}</td>
                    <td>${relatorio.modalidade}</td>
                    <td>${relatorio.data}</td>
                    <td>${relatorio.horario}</td>
                </tr>
            `;
        });
    } else {
        // Cabeçalho para relatório geral
        strCabecalho = `
            <tr>
                <th>CPF do Aluno</th>
                <th>Nome do Aluno</th>
                <th>Modalidade</th>
                <th>Descrição</th>
                <th>Presenças</th>
                <th>Faltas</th>
            </tr>
        `;
        relatorios.forEach(relatorio => {
            strCorpo += `
                <tr>
                    <td>${relatorio.cpfAluno}</td>
                    <td>${relatorio.nomeAluno}</td>
                    <td>${relatorio.modalidade}</td>
                    <td>${relatorio.descricao}</td>
                    <td>${relatorio.presencas}</td>
                    <td>${relatorio.faltas}</td>
                </tr>
            `;
        });
    }

    if (relatorios.length === 0) {
        strCorpo = '<tr><td colspan="7">Nenhum registro encontrado.</td></tr>';
    }

    document.getElementById('tabela-cabecalho').innerHTML = strCabecalho;
    document.getElementById('tabela-relatorios').innerHTML = strCorpo;
}