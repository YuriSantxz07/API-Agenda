const API_URL = "http://localhost:8080/agendamentos";

async function buscarAgendamentos() {
  try {
    let resposta = await axios.get(API_URL);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar agendamentos:", erro);
    return [];
  }
}

async function criarAgendamento(titulo, descricao, dataHora, local) {
  try {
    await axios.post(API_URL, { titulo, descricao, dataHora, local });
  } catch (erro) {
    console.error("Erro ao criar agendamento:", erro);
  }
}

function atualizarListaNaPagina(listaAgendamentos) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  listaAgendamentos.forEach((a) => {
    const item = document.createElement("li");
    item.textContent = `${a.titulo} - ${a.descricao} - ${a.dataHora} - ${a.local}`;
    lista.appendChild(item);
  });
}

function inicializaAplicacao() {
  const entradaTitulo = document.getElementById("titulo");
  const entradaDescricao = document.getElementById("descricao");
  const entradaDataHora = document.getElementById("dataHora");
  const entradaLocal = document.getElementById("local");
  const botaoAgendar = document.getElementById("btn-agendar");

  if (
    !(entradaTitulo instanceof HTMLInputElement) ||
    !(entradaDescricao instanceof HTMLInputElement) ||
    !(entradaDataHora instanceof HTMLInputElement) ||
    !(entradaLocal instanceof HTMLInputElement)
  ) {
    return;
  }

  botaoAgendar.addEventListener("click", async () => {
    const titulo = entradaTitulo.value;
    const descricao = entradaDescricao.value;
    const dataHora = entradaDataHora.value;
    const local = entradaLocal.value;

    if (!titulo || !descricao || !dataHora || !local) {
      alert("Preencha todos os campos!");
      return;
    }

    await criarAgendamento(titulo, descricao, dataHora, local);
    const agendamentos = await buscarAgendamentos();
    atualizarListaNaPagina(agendamentos);
  });

  buscarAgendamentos().then(atualizarListaNaPagina);
}

document.addEventListener("DOMContentLoaded", inicializaAplicacao);
