let listaRelatorios = []; // Será uma lista filtrada de práticas para exibição nos relatórios

function carregarRelatorios() {
    // Carrega as listas de alunos, modalidades e práticas a partir do armazenamento local
    carregarAlunos();
    carregarModalidades();
    carregarPraticas();
    listarRelatorios(); // Exibe todos os relatórios inicialmente
}

function listarRelatorios() {
    listaRelatorios = listaPraticas.map(pratica => {
        // Busca o nome do aluno e descrição da modalidade para cada prática
        const aluno = listaAlunos.find(aluno => aluno.CPF === pratica.pCPF);
        const modalidade = listaModalidades.find(modalidade => modalidade.COD === pratica.pCOD);

        return {
            data: pratica.datas[0], // Supondo a primeira data, modificar se necessário
            cpfAluno: pratica.pCPF,
            nomeAluno: aluno ? aluno.nome : "Aluno não encontrado",
            modalidade: pratica.pCOD,
            descricao: modalidade ? modalidade.descr : "Modalidade não encontrada",
            presencas: pratica.datas.length,
            faltas: calcularFaltas(pratica, modalidade)
        };
    });

    atualizarTabelaRelatorios(listaRelatorios);
}

function filtrarRelatorios() {
    // Obtém o CPF e o código da modalidade para filtragem
    const cpfFiltro = document.getElementById('buscador-cpf').value.trim();
    const codModalidadeFiltro = document.getElementById('buscador-codigo-modalidade').value.trim();

    const relatoriosFiltrados = listaRelatorios.filter(relatorio => {
        const cpfMatch = cpfFiltro ? relatorio.cpfAluno === cpfFiltro : true;
        const codMatch = codModalidadeFiltro ? relatorio.modalidade === codModalidadeFiltro : true;
        return cpfMatch && codMatch;
    });

    atualizarTabelaRelatorios(relatoriosFiltrados);
}

function listarTodosRelatorios() {
    atualizarTabelaRelatorios(listaRelatorios);
}

function atualizarTabelaRelatorios(relatorios) {
    let str = '';
    relatorios.forEach(relatorio => {
        str += `
            <tr>
                <td>${relatorio.data || "N/A"}</td>
                <td>${relatorio.cpfAluno}</td>
                <td>${relatorio.nomeAluno}</td>
                <td>${relatorio.modalidade}</td>
                <td>${relatorio.descricao}</td>
                <td>${relatorio.presencas}</td>
                <td>${relatorio.faltas}</td>
            </tr>
        `;
    });
    document.getElementById('tabela-relatorios').innerHTML = str;
}

function calcularFaltas(pratica, modalidade) {
    // Calcula faltas com base nos dias disponíveis na modalidade e nas presenças registradas
    const diasDisponiveis = modalidade ? modalidade.diasdisp.length : 0;
    const presencas = pratica.datas.length;
    return diasDisponiveis > presencas ? diasDisponiveis - presencas : 0;
}
