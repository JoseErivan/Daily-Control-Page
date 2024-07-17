// Recuperando o botão de salvar os registros em um PDF.
const savePDF = document.getElementById("save-button");

// Adicionando o evento para o botão de salvar os registros em um PDF
savePDF.addEventListener("click", () => {
  let data = JSON.parse(localStorage.getItem("AllDataRegisters"));

  // Primeiro formatamos os dados considerando cada um das linhas
  // como um objeto que tem quatro campos específicos
  let formattedData = data.map((item) => [
    item.completeName,
    item.cpf,
    item.address,
    item.code,
  ]);

  // Aqui precisamos definir o jsPDF que é carregado direto no HTML do sistema
  const { jsPDF } = window.jspdf;
  var doc = new jsPDF({ orientation: "landscape" });
  // O parâmetro orientation defini que a orientação do meu PDF será horizontal

  // Definimos um titulo para o nosso pdf
  doc.text("Registros do dia", 10, 10);

  // Definindo os cabeçalhos da minha tabela
  const headers = ["Nome Completo", "CPF", "Endereço", "Cód. Atendimento"];

  // Criando a tabela com os cabeçalhos e com os dados já formatados
  doc.autoTable({
    body: formattedData,
    startY: 20,
    head: [headers],
  });

  // Baixando o arquivo PDF
  doc.save("registros.pdf");
});
