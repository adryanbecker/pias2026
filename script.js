// =====================================================
// MURAL DE AÇÕES DO BAIRRO
// Código responsável pelo funcionamento do formulário
// =====================================================


// Pegamos o formulário que criamos no arquivo index.html
const formulario = document.getElementById("formulario-acao");


// Quando o usuário clicar em "Cadastrar ação",
// este código será executado.
formulario.addEventListener("submit", function(evento) {

    // Impede que o navegador recarregue a página
    // quando o formulário for enviado.
    evento.preventDefault();


    // Pegamos o valor digitado no campo "Título da ação".
    const titulo = document.getElementById("titulo").value;


    // Pegamos a categoria escolhida pelo usuário.
    const categoria = document.getElementById("categoria").value;


    // Pegamos o local escolhido pelo usuário.
    const local = document.getElementById("local").value;


    // Pegamos a quantidade de participantes.
    // O Number transforma o texto recebido pelo formulário
    // em um número.
    const participantes = Number(
        document.getElementById("participantes").value
    );


    // Pegamos o texto escrito na descrição da ação.
    const descricao = document.getElementById("descricao").value;


    // Criamos automaticamente a data em que a ação
    // foi cadastrada.
    const data = new Date().toLocaleDateString("pt-BR");


    // Criamos um objeto contendo todos os dados
    // dessa ação.
    const novaAcao = {
        titulo: titulo,
        categoria: categoria,
        local: local,
        participantes: participantes,
        descricao: descricao,
        data: data
    };


    // Tentamos pegar as ações que já estão salvas
    // no localStorage.
    const acoesSalvas = localStorage.getItem("acoes");


    // Se já existirem ações salvas, transformamos o texto
    // armazenado novamente em uma lista.
    // Se não existir nenhuma, começamos com uma lista vazia.
    const acoes = acoesSalvas
        ? JSON.parse(acoesSalvas)
        : [];


    // Colocamos a nova ação no final da lista.
    acoes.push(novaAcao);


    // Transformamos a lista em texto e salvamos
    // novamente no localStorage do navegador.
    localStorage.setItem("acoes", JSON.stringify(acoes));


    // Mostra uma mensagem para avisar que o cadastro
    // foi realizado.
    alert("Ação cadastrada com sucesso!");


    // Limpa todos os campos do formulário depois do cadastro.
    formulario.reset();

});
// =====================================================
// EXIBIR AS AÇÕES NO MURAL
// =====================================================


// Pegamos o espaço do HTML onde as ações serão exibidas.
const mural = document.getElementById("mural-acoes");


// Esta função busca as ações que estão salvas
// no localStorage e coloca cada uma delas na tela.
function mostrarAcoes() {

    // Buscamos as ações salvas no navegador.
    const acoesSalvas = localStorage.getItem("acoes");


    // Se não houver nenhuma ação salva,
    // mostramos uma mensagem no mural.
    if (!acoesSalvas) {

        mural.innerHTML = "<p>Nenhuma ação cadastrada ainda.</p>";

        return;
    }


    // Transformamos o texto salvo no localStorage
    // novamente em uma lista de ações.
    const acoes = JSON.parse(acoesSalvas);


    // Limpamos o conteúdo atual do mural.
    mural.innerHTML = "";


    // Passamos por cada ação que está salva.
    acoes.forEach(function(acao) {

        // Criamos uma caixa para representar a ação.
        const cartao = document.createElement("article");


        // Colocamos as informações da ação dentro do cartão.
        cartao.innerHTML = `
            <h3>${acao.titulo}</h3>

            <p>
                <strong>Categoria:</strong>
                ${acao.categoria}
            </p>

            <p>
                <strong>Local:</strong>
                ${acao.local}
            </p>

            <p>
                <strong>Participantes:</strong>
                ${acao.participantes}
            </p>

            <p>
                <strong>O que foi feito:</strong>
                ${acao.descricao}
            </p>

            <p>
                <strong>Data:</strong>
                ${acao.data}
            </p>
        `;


        // Colocamos o cartão dentro do mural.
        mural.appendChild(cartao);
    });
}


// Executamos a função assim que a página é carregada.
mostrarAcoes();
