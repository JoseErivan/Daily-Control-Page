let AllData = []; // Criando variável para armazenar todos os dados de registros.

// Recupero o botão que é utilizado para fazer o registro.
const registerButton = document.getElementById("register-button");

function addRegistersTable(dataRegister) {
  const table = document
    .getElementById("register-table")
    .querySelector("tbody");

  // Criando o for para percorrer a minha lista de registros retornada pelo meu localstorage e adicionando
  // os valores a minha tabela de registros.
  for (const register of dataRegister) {
    const line = table.insertRow();
    // Criando uma célula para cada dado do meu registro.
    for (const value in register) {
      const cell = line.insertCell();
      cell.textContent = register[value];
    }

    // Adiciona botão de editar
    const editCell = line.insertCell();
    const editButton = document.createElement("button");
    // Estilizando o botão de editar
    editButton.classList.add("edit-button");
    editButton.style.width = "100%";
    editButton.style.border = "none";
    editButton.style.background = "none";
    editButton.innerHTML =
      '<img src="editar.png" style="width:30px;" class="edit-button">';
    editButton.addEventListener("click", function () {
      editRegister(register);
    });
    editCell.appendChild(editButton);

    // Adiciona botão de excluir
    const deleteCell = line.insertCell();
    const deleteButton = document.createElement("button");
    // Estilizando o botão de excluir
    deleteButton.classList.add("delete-button");
    deleteButton.style.width = "100%";
    deleteButton.style.border = "none";
    deleteButton.style.background = "none";
    deleteButton.innerHTML =
      '<button class="delete-button" style="border: none; background: none; width:100%"><img src="excluir.png" style=width:25px class="delete-button"></button>';
    deleteButton.addEventListener("click", function (event) {
      deleteRegister(event);
    });
    deleteCell.appendChild(deleteButton);
  }
}

// Criando função para edição dos registros.
function editRegister(register) {
  try {
    // Alterando os valores dos inputs pelos valores do registro selecionado.
    document.getElementById("name").value = register.completeName;
    document.getElementById("cpf").value = register.cpf;
    document.getElementById("address").value = register.address;
    document.getElementById("code").value = register.code;

    // Criando e estilizando o botão de atualizar.
    const updateButton = document.createElement("button");
    updateButton.classList.add("update-button");
    updateButton.textContent = "Atualizar";
    updateButton.style.height = "50px";
    updateButton.style.border = "none";
    updateButton.style.color = "white";
    updateButton.style.fontWeight = "bold";
    updateButton.style.backgroundColor = "#14ae5c";
    updateButton.style.borderRadius = "0px 6px 6px 0px";

    // Criando função que atualiza todos os valores do registro para os valores
    // do input quando o botão for clicado.
    updateButton.addEventListener("click", function () {
      register.completeName = document.getElementById("name").value;
      register.cpf = document.getElementById("cpf").value;
      register.address = document.getElementById("address").value;
      register.code = document.getElementById("code").value;

      // Atualiza o localStorage com os registros atualizados
      localStorage.setItem("AllDataRegisters", JSON.stringify(AllData));

      updateTable();

      inputClear();

      // Substituindo o botão de registro pelo de atualização.
      updateButton.parentNode.replaceChild(registerButton, updateButton);
    });

    // Substituindo o botão de atualização de volta para o de registro.
    registerButton.parentNode.replaceChild(updateButton, registerButton);
  } catch (error) {
    return;
  }
}

// Criando função que atualiza a tabela.
function updateTable() {
  const table = document
    .getElementById("register-table")
    .querySelector("tbody");
  table.innerHTML = ""; // Limpar a tabela

  // Recriar a tabela com os dados atualizados
  addRegistersTable(AllData);
}

// Criando função para excluir um registro
function deleteRegister(event) {
  const row = event.target.closest("tr");
  const index = row.rowIndex - 1; // rowIndex considera o cabeçalho

  // Remove o registro do array AllData
  AllData.splice(index, 1);

  // Atualiza o localStorage com os registros atualizados
  localStorage.setItem("AllDataRegisters", JSON.stringify(AllData));

  // Remove a linha da tabela HTML
  row.remove();
}

// Função para verificação se todos os campos de input foram preenchidos pelo usuário.
function inputVerification(completeName, cpf, address, code) {
  const divForm = document.getElementById("input-error");
  if (completeName === "" || cpf === "" || address === "" || code === "") {
    divForm.style.display = "block";
    divForm.innerHTML = "<h3>Preencha todos os valores pedidos!</h3>";

    // Definindo um time para a mensagem de erro.
    setTimeout(() => {
      divForm.style.display = "none";
    }, 2000);

    return false;
  } else {
    return true;
  }
}

// Definindo função que recupera os meus registros e coloca na minha tabela de registros
// quando o site for aberto pela primeira vez.
window.onload = function () {
  // Verificando se os registros estão salvos no meu localstorage.
  if (localStorage.getItem("AllDataRegisters")) {
    const dataRegister = JSON.parse(localStorage.getItem("AllDataRegisters"));
    AllData = dataRegister; // Definindo os registro salvos no meu localstorage para a minha variável local.
    addRegistersTable(dataRegister);
  }
};

// Adiciono uma função para ser executada quando o botão de registro for pressionado.
registerButton.addEventListener("click", function (event) {
  event.preventDefault();

  // Recuperar todos os dados dos valores de entrada.
  const completeName = document.getElementById("name").value;
  const cpf = document.getElementById("cpf").value;
  const address = document.getElementById("address").value;
  const code = document.getElementById("code").value;

  // Verifico se todos os campos foram preenchidos.
  if (inputVerification(completeName, cpf, address, code)) {
    const registerData = {
      completeName: completeName,
      cpf: cpf,
      address: address,
      code: code,
    };

    // Salvando todos os registros no armazenamento do meu navegador.
    AllData.push(registerData);
    const AllDataJSON = JSON.stringify(AllData);
    localStorage.setItem("AllDataRegisters", AllDataJSON);

    // Recuperando os registros no armazenamento do meu navegador
    const dataRegister = JSON.parse(localStorage.getItem("AllDataRegisters"));
    const table = document
      .getElementById("register-table")
      .querySelector("tbody");

    // Limpando todos os registros da tabela e adicionando novamente
    table.innerHTML = "";
    addRegistersTable(dataRegister);

    inputClear();
  }
});

// Criando função para limpar formulário de entrada
function inputClear() {
  document.getElementById("name").value = "";
  document.getElementById("cpf").value = "";
  document.getElementById("address").value = "";
  document.getElementById("code").value = "";
}
