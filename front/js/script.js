const API_URL = "http://localhost:8080/agendamentos";
let idEmEdicao = null;

async function buscarAgendamentos() {
  try {
    const resposta = await axios.get(API_URL);
    return resposta.data;
  } catch (erro) {
    console.error("Erro ao buscar agendamentos:", erro);
    return [];
  }
}

async function criarAgendamento(titulo, descricao, dataHora, local) {
  // O objeto novoAgendamento incluirá 'local' mesmo que seja uma string vazia,
  // o que é aceitável se o backend também permitir.
  const novoAgendamento = { titulo, descricao, dataHora, local };

  try {
    if (idEmEdicao) {
      await axios.put(`${API_URL}/${idEmEdicao}`, novoAgendamento);
      idEmEdicao = null;
    } else {
      await axios.post(API_URL, novoAgendamento);
    }
  } catch (erro) {
    console.error("Erro ao salvar agendamento:", erro);
  }
}

async function deletarAgendamento(id) {
  try {
    await axios.delete(`${API_URL}/${id}`);
    const agendamentos = await buscarAgendamentos();
    atualizarListaNaPagina(agendamentos);
  } catch (erro) {
    console.error("Erro ao deletar:", erro);
  }
}

function atualizarListaNaPagina(listaAgendamentos) {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  listaAgendamentos.forEach((a) => {
    // Monta a string do agendamento de forma dinâmica para não exibir o separador se o local for vazio
    let detailsText = `<strong>${a.titulo}</strong> • ${a.descricao} • ${formatarData(a.dataHora)}`;
    if (a.local && a.local.trim() !== "") { // Verifica se 'local' existe e não é apenas espaços em branco
      detailsText += ` • ${a.local}`;
    }

    const item = document.createElement("li");
    item.innerHTML = `
      <div class="details">
        ${detailsText}
      </div>
      <div class="buttons">
        <button onclick="editarAgendamento(${a.id}, '${a.titulo}', '${a.descricao}', '${a.dataHora}', '${a.local}')">Editar</button>
        <button onclick="deletarAgendamento(${a.id})">Excluir</button>
      </div>
    `;
    lista.appendChild(item);
  });
}

function editarAgendamento(id, titulo, descricao, dataHora, local) {
  document.getElementById("titulo").value = titulo;
  document.getElementById("descricao").value = descricao;
  // A API pode retornar a data em um formato que o input datetime-local não reconhece diretamente (ex: com Z no final).
  // Se for o caso, pode ser necessário um tratamento para formatar a string da data/hora para 'YYYY-MM-DDTHH:mm'.
  // Por exemplo: new Date(dataHora).toISOString().slice(0, 16)
  document.getElementById("dataHora").value = dataHora;
  document.getElementById("local").value = local; // 'local' pode ser uma string vazia aqui
  idEmEdicao = id;
}

function formatarData(dataHoraISO) {
  const data = new Date(dataHoraISO);
  return data.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function inicializaAplicacao() {
  const botaoAgendar = document.getElementById("btn-agendar");

  botaoAgendar.addEventListener("click", async () => {
    const titulo = document.getElementById("titulo").value;
    const descricao = document.getElementById("descricao").value;
    const dataHora = document.getElementById("dataHora").value;
    const local = document.getElementById("local").value; // Local agora pode ser vazio

    // Validação ajustada: 'local' não é mais obrigatório
    if (!titulo || !descricao || !dataHora) {
      alert("Preencha os campos obrigatórios: Título, Descrição e Data/Hora!");
      return;
    }

    await criarAgendamento(titulo, descricao, dataHora, local);
    const agendamentos = await buscarAgendamentos();
    atualizarListaNaPagina(agendamentos);

    // Limpar campos
    document.getElementById("titulo").value = "";
    document.getElementById("descricao").value = "";
    document.getElementById("dataHora").value = "";
    document.getElementById("local").value = "";
  });

  buscarAgendamentos().then(atualizarListaNaPagina);
}

document.addEventListener("DOMContentLoaded", inicializaAplicacao);