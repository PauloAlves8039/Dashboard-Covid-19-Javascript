/**
 * @file: script.js
 * @author: Paulo Alves
 * @description: script responsável pelo carregamento de informações sobre o COVID-19 no dashboard. 
 * @version 1.0.1 (24/06/2020)
 */

const selecionarPais = document.querySelector("#country-select");
const nomePais = document.querySelector(".county-name")

const casosDiarios = document.querySelector("#diary-cases");
const casosMilhao = document.querySelector("#milion-cases");
const totalCasos = document.querySelector("#all-cases");

const mortesDiarias = document.querySelector("#diary-deaths");
const mortesMilhao = document.querySelector("#milion-deaths");
const totalMortes = document.querySelector("#all-deaths");

const testesMilhao = document.querySelector("#milion-tests");
const totalTestes = document.querySelector("#all-tests");

const casosAtivos = document.querySelector("#active-cases");
const casosCriticos = document.querySelector("#critical-cases");
const casosRecuperados = document.querySelector("#recovered");


let inicio = "World";

/**
 * Responsável pelo carregamento de dados sobre o COVID-19 pela api do Heroku.
 * @function
 * @name carregarDados
 * @param {*} country parâmentro para selecionar o país no carregamento de dados.
 */
async function carregarDados(country) {
    try {
        const apiCovid = await fetch(`http://coronavirus-19-api.herokuapp.com/countries/${country}`)
        const data = await apiCovid.json();

        nomePais.innerHTML = `${data.country}`;

        casosDiarios.innerHTML = `${data.todayCases}`;
        casosMilhao.innerHTML = `${data.casesPerOneMillion}`;
        totalCasos.innerHTML = `${data.cases}`;

        mortesDiarias.innerHTML = `${data.todayDeaths}`;
        mortesMilhao.innerHTML = `${data.deathsPerOneMillion}`;
        totalMortes.innerHTML = `${data.deaths}`;

        testesMilhao.innerHTML = `${data.testsPerOneMillion}`;
        totalTestes.innerHTML = `${data.totalTests}`;

        casosAtivos.innerHTML = `${data.active}`;
        casosCriticos.innerHTML = `${data.critical}`;
        casosRecuperados.innerHTML = `${data.recovered}`;
    
    }catch(error){
        console.log(error);
    }
}

/**
 * Responsável por selecionar o país para a consulta de informações.
 * @function
 * @name informarPais
 */
function informarPais() {
  const url = 'http://coronavirus-19-api.herokuapp.com/countries';
  fetch(url)
    .then((res) => res.json())
    .then((countries) => {
      for (const country of countries) {
        selecionarPais.innerHTML += `<option value = ${country.country}>${country.country}</option>`;
      }
      selecionarPais.onchange = function () {
        let value = selecionarPais.value;
        carregarDados(value);
      };
    })
    .catch((error) => console.error(error));
}

/**
 * Responsável por recarregar página no click do botão cancelar.
 * @function
 * @name recarregarPagina
 */
function recarregarPagina() {
    window.location.reload();
}

carregarDados(inicio);
informarPais();