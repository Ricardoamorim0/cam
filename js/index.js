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
  10: "Tecnologias de informação e comunicação"
}

const FORMAT = {
  0: "Com respostas",
  1: "Sem respostas"
}

let json = [];
let moduleSelector = document.getElementById("modules");
let formatSelector = document.getElementById("format");
let counter = document.getElementById("count");

for (let index = 0; index < Object.keys(MODULES).length; index++) {
  const element = MODULES[index];

  moduleSelector.innerHTML += `<option ${index == 0? "selected" : ""} value="${index}">${element}</option>`;
}

for (let index = 0; index < Object.keys(FORMAT).length; index++) {
  const element = FORMAT[index];

  formatSelector.innerHTML += `<option ${index == 0? "selected" : ""} value="${index}">${element}</option>`;
}

function getAnswer(button) {
  let questionNum = button.parentElement.dataset.question;
  let answer = json[questionNum][6];

  button.parentElement.querySelectorAll('ul')[0].querySelectorAll('li')[answer - 1].classList.toggle("underline");
}

function load(module = 0) {
  let tmp = 1;
  for (let index = 0; index < json.length; index++) {
    const element = json[index];

    if (element[0] == module) {
      document.getElementById("datatable").innerHTML += `<div class="question" data-question="${index}">
      <p class="bold">${tmp++}) ${element[1]}</p>
      <ul>
        <li class="question-option ${(element[6] == 1 && formatSelector.value == 0) ? "underline" : ""}">${element[2]}</li>
        <li class="question-option ${(element[6] == 2 && formatSelector.value == 0) ? "underline" : ""}">${element[3]}</li>
        <li class="question-option ${(element[6] == 3 && formatSelector.value == 0) ? "underline" : ""}">${element[4]}</li>
        <li class="question-option ${(element[6] == 4 && formatSelector.value == 0) ? "underline" : ""}">${element[5]}</li>
      </ul>
      ${formatSelector.value == 1 ? '<button onclick="getAnswer(this)">Resposta</button>' : ""}
      </div>`;
    }
  }
  counter.innerText = `${tmp - 1} perguntas de ${json.length}`;
}

fetch('./js/table.json')
    .then((response) => response.json())
    .then((j) => {
      json = j;
      load(moduleSelector.value);
    });



moduleSelector.addEventListener("change", (e) => {
  document.getElementById("datatable").innerHTML = "";
  load(e.target.value);
  e.preventDefault();
});

formatSelector.addEventListener("change", (e) => {
  document.getElementById("datatable").innerHTML = "";
  load(moduleSelector.value);
  e.preventDefault();
});
