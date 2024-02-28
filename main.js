// script.js

// Função para exibir uma mensagem
function mostrarMensagem(valor) {
    alert("O valor da planilha é: " + valor);
}

// Função para carregar a API do Google Sheets
function carregarAPI() {
    gapi.client.load('sheets', 'v4', function() {
        console.log('API do Google Sheets carregada.');
    });
}

// Função para carregar o valor da planilha do Google Sheets
function carregarValorPlanilha() {
    // ID da planilha do Google Sheets
    var SPREADSHEET_ID = 'https://docs.google.com/spreadsheets/d/1Gkkk25W6OeloUwx83B-j2vdczMmxnHtlNTmmG3iXkZM/edit#gid=0';
    // Intervalo da célula que contém o valor que você deseja exibir
    var RANGE = 'A1';

    var request = gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
    });

    request.then(function(response) {
        var range = response.result;
        if (range.values.length > 0) {
            var valorPlanilha = range.values[0][0];
            mostrarMensagem(valorPlanilha);
        } else {
            mostrarMensagem("Nenhum dado encontrado na planilha.");
        }
    }, function(reason) {
        console.error('Erro ao carregar valor da planilha: ' + reason.result.error.message);
    });
}

// Adicionar um ouvinte de eventos para o botão de início dentro da barra de navegação
document.addEventListener("DOMContentLoaded", function() {
    var btnInicio = document.getElementById("btnInicio");
    btnInicio.addEventListener("click", function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        carregarValorPlanilha();
    });
});
