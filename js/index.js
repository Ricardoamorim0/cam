const MODULES = {
  0: "Mecânica e eletrónica",
  1: "Condução defensiva, económica e ambiental",
  2: "Regulamentação laboral",
  3: "Regulamentação da atividade",
  4: "Sinistralidade",
  5: "Prevenção da criminalidade nos transportes",
  6: "Saúde, segurança e higiene no trabalho",
  7: "Situações de emergência e primeiros socorros",
  8: "Relações interpessoais e qualidade de serviço",
  9: "Contexto económico e organização empresarial",
  10: "Tecnologias de informação e comunicação",
  11: "Todos"
}

let json = [];
let moduleSelector = document.getElementById("modules");

for (let index = 0; index < Object.keys(MODULES).length; index++) {
  const element = MODULES[index];

  document.getElementById("modules").innerHTML += `<option ${index == 11? "selected" : ""} value="${index}">${element}</option>`;
}

function load(module = 11) {
  for (let index = 0; index < json.length; index++) {
    const element = json[index];

    if (module == 11 || element[0] == module) {
      document.getElementById("datatable").innerHTML += `<div class="question">
      <p class="bold">${MODULES[element[0]]}</p>
      <p class="bold">${element[1]}</p>
      <ul>
        <li class="question-option ${element[6] == 1 ? "underline" : ""}">${element[2]}</li>
        <li class="question-option ${element[6] == 2 ? "underline" : ""}">${element[3]}</li>
        <li class="question-option ${element[6] == 3 ? "underline" : ""}">${element[4]}</li>
        <li class="question-option ${element[6] == 4 ? "underline" : ""}">${element[5]}</li>
      </ul>
      </div>`;
    }
  }
}

fetch('./js/table.json')
    .then((response) => response.json())
    .then((j) => {
      json = j;
      load();
    });



moduleSelector.addEventListener("change", (e) => {
  console.log(e.target.value);
  document.getElementById("datatable").innerHTML = "";
  load(e.target.value);
  e.preventDefault();
})
