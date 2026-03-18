// Seletores
const botoes = document.querySelectorAll(".adicionar");
const listaPedido = document.getElementById("lista-pedido");
const totalElemento = document.getElementById("total");
const botaoFinalizar = document.getElementById("finalizar-pedido");

let total = 0;
let itens = [];

// Função para formatar preço
function formatarPreco(valor) {
    return valor.toFixed(2).replace(".", ",");
}

// Adicionar item ao carrinho
botoes.forEach(botao => {
    botao.addEventListener("click", () => {
        const produto = botao.parentElement;
        const nome = produto.querySelector("h3")?.innerText || produto.querySelector("p").innerText;
        const precoTexto = produto.querySelector(".preco").innerText;

        const preco = parseFloat(
            precoTexto.replace("R$", "").replace(",", ".")
        );

        // Adiciona no array
        itens.push({ nome, preco });

        // Atualiza total
        total += preco;

        // Criar item na lista
        const li = document.createElement("li");
        li.textContent = `${nome} - R$ ${formatarPreco(preco)}`;

        // Criar botão remover
        const botaoRemover = document.createElement("button");
        botaoRemover.textContent = "❌";
        botaoRemover.classList.add("remover");
        botaoRemover.style.marginLeft = "10px";

        li.appendChild(botaoRemover);
        listaPedido.appendChild(li);

        // Atualiza total na tela
        totalElemento.textContent = `Total: R$ ${formatarPreco(total)}`;
    });
});

// Remover item do carrinho ao clicar no botão ❌
listaPedido.addEventListener("click", (evento) => {
    if (evento.target.tagName === "BUTTON" && evento.target.classList.contains("remover")) {
        const li = evento.target.parentElement;
        const texto = li.firstChild.textContent; // Nome + preço

        // Extrai preço do texto
        const precoTexto = texto.match(/R\$ ([0-9]+,[0-9]{2})/);
        if (!precoTexto) return;

        const preco = parseFloat(precoTexto[1].replace(",", "."));

        // Atualiza total
        total -= preco;
        totalElemento.textContent = `Total: R$ ${formatarPreco(total)}`;

        // Extrai nome do produto
        const nome = texto.split(" - ")[0];

        // Remove do array
        const index = itens.findIndex(item => item.nome === nome && item.preco === preco);
        if (index > -1) itens.splice(index, 1);

        // Remove da lista
        li.remove();
    }
});

// Finalizar pedido
botaoFinalizar.addEventListener("click", () => {
    if (itens.length === 0) {
        alert("Seu carrinho está vazio!");
        return;
    }

    let mensagem = "🛒 *Pedido:*\n\n";

    itens.forEach(item => {
        mensagem += `- ${item.nome} (R$ ${formatarPreco(item.preco)})\n`;
    });

    mensagem += `\n💰 Total: R$ ${formatarPreco(total)}`;

    // Número do WhatsApp (coloque o seu)
    const numero = "5543999198443";

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`;

    window.open(url, "_blank");
});