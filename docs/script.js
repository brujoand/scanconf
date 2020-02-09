let data;

const countries = {
  dk: 'Denmark',
  fi: 'Finland',
  no: 'Norway',
  se: 'Sweden',
};

const tagIcons = {
  backend: 'fas fa-coffee fa-fw',
  frontend: 'fab fa-js-square fa-fw',
  security: 'fas fa-user-secret fa-fw',
  devops: 'fas fa-cloud fa-fw',
  ux: 'fas fa-bug fa-fw',
  functional: 'fas fa-rocket fa-fw',
  mobile: 'fas fa-mobile-alt fa-fw',
  game: 'fas fa-gamepad fa-fw',
  microsoft: 'fab fa-windows fa-fw',
};

const dateFormatter = new Intl.DateTimeFormat('default', {});

async function fetchData() {
  const res = await fetch('data.json');
  const data = await res.json();
  return data;
}

function formatDate(isoDate) {
  return dateFormatter.format(new Date(isoDate));
}

function addTableHeader(row, text, classes = '') {
  const header = document.createElement('th');
  header.textContent = text;
  header.className = classes;
  row.appendChild(header);
}

function addTableCell(row, textOrNode, classes = '') {
  const cell = document.createElement('td');
  if (typeof textOrNode === 'string') {
    cell.textContent = textOrNode;
  } else {
    cell.appendChild(textOrNode);
  }
  cell.className = classes;
  row.appendChild(cell);
}

function dateEle(isoDate) {
  if (isoDate.match(/\d\d\d\d-\d\d-\d\d/)) {
    const ele = document.createElement('time');
    ele.textContent = formatDate(isoDate);
    ele.setAttribute('datetime', isoDate);
    return ele;
  } else {
    return isoDate;
  }
}

function renderTable(data) {
  const table = document.createElement('table');
  table.className = 'f6 mw8';
  table.cellSpacing = '0';

  const tableHead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  headerRow.className = "stripe-dark"

  addTableHeader(headerRow, 'Name', 'fw6 tl pa3 white-90 bg-black-60');
  addTableHeader(headerRow, 'Country', 'fw6 tl pa3 white-90 bg-black-60');
  addTableHeader(headerRow, 'City', 'fw6 tl pa3 white-90 bg-black-60');
  addTableHeader(headerRow, 'Start', 'fw6 tl pa3 white-90 bg-black-60');
  addTableHeader(headerRow, 'End', 'fw6 tl pa3 white-90 bg-black-60');
  addTableHeader(headerRow, 'CFP deadline', 'fw6 tl pa3 white-90 bg-black-60');
  addTableHeader(headerRow, 'Tags', 'fw6 tl pa3 white-90 bg-black-60');

  tableHead.appendChild(headerRow);
  table.appendChild(tableHead);
  const tbody = document.createElement('tbody');
  tbody.className = 'lh-copy';

  for (const item of data) {
    const row = document.createElement('tr');
    row.className = 'stripe-dark';

    const a = document.createElement('a');
    a.textContent = item.name;
    a.title = item.name;
    a.href = item.url;

    addTableCell(row, a, 'pa3');
    addTableCell(row, countries[item.country], 'pa3');
    addTableCell(row, item.city, 'pa3');
    addTableCell(row, dateEle(item.startDate) , 'pa3');
    addTableCell(row, dateEle(item.endDate), 'pa3');
    addTableCell(row, dateEle(item.cfpDate), 'pa3');
    const tagCell = document.createElement('div');
    for (const tag of item.tags) {
      const i = document.createElement('i');
      i.className = tagIcons[tag];
      i.title = tag;
      tagCell.appendChild(i);
    }
    addTableCell(row, tagCell, 'pa3');

    tbody.appendChild(row);
  }

  table.appendChild(tbody);
  const currentTable = document.querySelector('table');

  currentTable.parentNode.replaceChild(table, currentTable);
}

function onFilterChange(evt) {
  const term = evt.target.value;
  if (term === '') {
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
  renderTable(data);
  const input = document.getElementById('filter');
  input.addEventListener('keyup', onFilterChange);
}

window.addEventListener('load', main);
