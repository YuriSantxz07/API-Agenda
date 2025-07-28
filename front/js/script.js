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

async function criarAgendamento(nome, data, local) {
  try {
    await axios.post(API_URL, { nome, data, local });
  } catch (erro) {
    console.error("Erro ao criar agendamento:", erro);
  }
}

function atualizarListaNaPagina(listaAgendamentos) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";
  listaAgendamentos.forEach((a) => {
    const item = document.createElement("li");
    item.textContent = `${a.nome} - ${a.data} - ${a.local}`;
    lista.appendChild(item);
  });
}

function inicializaAplicacao() {
  const entradaNome = document.getElementById("nome");
  const entradaData = document.getElementById("data");
  const entradaLocal = document.getElementById("local");
  const botaoAgendar = document.getElementById("btn-agendar");

  if (
    !(entradaNome instanceof HTMLInputElement) ||
    !(entradaData instanceof HTMLInputElement) ||
    !(entradaLocal instanceof HTMLInputElement)
  ) {
    return;
  }

  botaoAgendar.addEventListener("click", async () => {
    const nome = entradaNome.value;
    const data = entradaData.value;
    const local = entradaLocal.value;

    if (!nome || !data || !local) {
      alert("Preencha todos os campos!");
      return;
    }

    await criarAgendamento(nome, data, local);
    const agendamentos = await buscarAgendamentos();
    atualizarListaNaPagina(agendamentos);
  });

  buscarAgendamentos().then(atualizarListaNaPagina);
}

document.addEventListener("DOMContentLoaded", inicializaAplicacao);
