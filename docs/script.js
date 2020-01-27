let data;

async function fetchData() {
  const res = await fetch("data.json");
  const data = await res.json();
  return data;
}

function renderTable(data) {
  const table = document.createElement("table");
  table.className = "table table-dark table-striped";


  const tableHead = document.createElement("thead");
  tableHead.className = "thead-light"
  const headerRow = document.createElement("tr");

  const titleHeader = document.createElement("th");
  const titleHeaderText = document.createTextNode("Name");
  titleHeader.appendChild(titleHeaderText);
  headerRow.appendChild(titleHeader);

  const countryHeader = document.createElement("th");
  const countryHeaderText = document.createTextNode("Country");
  countryHeader.appendChild(countryHeaderText);
  headerRow.appendChild(countryHeader);

  const cityHeader = document.createElement("th");
  const cityHeaderText = document.createTextNode("City");
  cityHeader.appendChild(cityHeaderText);
  headerRow.appendChild(cityHeader);

  const startDateHeader = document.createElement("th");
  const startDateHeaderText = document.createTextNode("Start");
  startDateHeader.appendChild(startDateHeaderText);
  headerRow.appendChild(startDateHeader);

  const endDateHeader = document.createElement("th");
  const endDateHeaderText = document.createTextNode("End");
  endDateHeader.appendChild(endDateHeaderText);
  headerRow.appendChild(endDateHeader);

  const cfpHeader = document.createElement("th");
  const cfpHeaderText = document.createTextNode("CFP deadline");
  cfpHeader.appendChild(cfpHeaderText);
  headerRow.appendChild(cfpHeader);

  const tagsHeader = document.createElement("th");
  const tagsHeaderText = document.createTextNode("Tags");
  tagsHeader.appendChild(tagsHeaderText);
  headerRow.appendChild(tagsHeader);

  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);

  const tbody = document.createElement("tbody");

  for (const item of data) {

    const row = document.createElement("tr");

    const title = document.createElement("td");
    const a = document.createElement("a");
    const link = document.createTextNode(item.name);
    a.appendChild(link);
    a.title = item.name;
    a.href = item.url;
    title.appendChild(a);

    const country = document.createElement("td");
    country.textContent = item.country;

    const city = document.createElement("td");
    city.textContent = item.city;

    const startDate = document.createElement("td");
    startDate.textContent = item.startDate;

    const endDate = document.createElement("td");
    endDate.textContent = item.endDate;

    const cfpDate = document.createElement("td");
    cfpDate.textContent = item.cfpDate;

    const tags = document.createElement("td");
    tags.textContent = item.tags;

    row.appendChild(title);
    row.appendChild(country);
    row.appendChild(city);
    row.appendChild(startDate);
    row.appendChild(endDate);
    row.appendChild(cfpDate);
    row.appendChild(tags);

    tbody.appendChild(row);

  }
  table.appendChild(tbody);

  const currentTable = document.querySelector("table");

  document.body.replaceChild(table, currentTable);
}

function onFilterChange(evt) {
  const term = evt.target.value;
  if (term === "") {
    renderTable(data);
  } else {
    const filtered = data.filter(item => {
      var cloud = item.name + item.city + item.country + item.tags;
      return cloud.toLowerCase().includes(term.toLowerCase());
    });
    renderTable(filtered);
  }
}

async function main() {
  data = await fetchData();
  console.log(data);
  renderTable(data);

  const input = document.getElementById("filter");

  input.addEventListener("keyup", onFilterChange);
}

window.addEventListener("load", main);

