let campoCidade = document.querySelector("#cidade");
let elementoMensagem = document.querySelector("#mensagem");
let elementoCidades = document.querySelector("#cidades");
let elementoPrevisao = document.querySelector("#previsao");

campoCidade.addEventListener("keydown", function (evento) {
    if (evento.key == "Enter") {
        buscarCidade();
    }
});

async function buscarCidade() {
    let nome = campoCidade.value.trim();
    if (nome == "") {
        elementoMensagem.textContent = "Digite o nome de uma cidade.";
        elementoCidades.innerHTML = "";
        elementoPrevisao.innerHTML = "";
    } else {
        elementoMensagem.textContent = "Buscando...";
        let resposta = await fetch(`https://brasilapi.com.br/api/cptec/v1/cidade/${nome}`)
        //https://brasilapi.com.br/api/cptec/v1/cidade/
        console.log(resposta);
        let dados = await resposta.json();
        if (resposta.ok) {
            for (let i = 0; i < dados.length; i++) {
                let elementoCidade = document.createElement("button");
                elementoCidade.type = "type";
                elementoCidade.textContent = `${dados[i].nome} - ${dados[i].estado}`;
                elementoCidade.classList.add("cidade")
                elementoCidade.addEventListener("click", function () {
                    buscarPrevisao(dados[i].id)
                });
                elementoCidades.appendChild(elementoCidade);
            }
            elementoMensagem.textContent = `$(dados.length) cidade(s) encontrada(s)`
        } else {
            elementoMensagem.textContent = "Nenhuma cidade localizada";
        }
    }


}

async function buscarPrevisao(id) {
    elementoPrevisao.textContent = "Buscando...";
    let resposta = await fetch(`https://brasilapi.com.br/api/cptec/v1/clima/previsao/${id}`)
    let dados = await resposta.json();
    if (resposta.ok) {
        let dias = `<artcle class"dia">
    <p class="data">${formatarData(dados.clima[0].data)}</p>
    <p>${dados.clima[0].condicao_desc}</p>
    <div class= "temperaturas">
    <apan><strong>${dados.clima[0].min} °C</strong>Mínima</span>
    <apan><strong>${dados.clima[0].max} °C</strong>M</spaáximan>
    </div>
    <p>Índice UV: ${dados.clima[0].indice_uv}</p>
    </article>
        `;
        elementoPrevisao.innerHTML = `
    <h2>${dados.cidade} - ${dados.estado}</h2>
    <div class"dias">${dias}</div>
    `;
    } else {
        elementoPrevisao.textContent = dados.message;
    }
    elementoCidades.innerHTML = "";
    elementoMensagem.textContent = "";
}

function formatarData(data) {
    let partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;

}