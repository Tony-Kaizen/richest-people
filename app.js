const main = document.querySelector('#main');
const list = document.querySelector('#list');
const addUserBtn = document.querySelector('#add');
const doubleMoneyBtn = document.querySelector('#double');
const showMillionairesBtn = document.querySelector('#millionaires');
const sortBtn = document.querySelector('#sort');
const calcWealthBtn = document.querySelector('#calc');

let data = [];

getRandomUser();
getRandomUser();
getRandomUser();

//fetch random user and add money
async function getRandomUser() {
  const res = await fetch('https://randomuser.me/api/');
  const data = await res.json();

  const user = data.results[0];

  const newUser = {
    name: `${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000)
  };

  addData(newUser);
}

//Double everyone's money
function doubleMoney() {
  data = data.map(user => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

//Show only millionaires
function showMillionaires() {
  data = data.filter(user => user.money > 1000000);

  updateDOM();
}

//Sort by the richest person
function sortByRichest() {

  // data.sort((a, b) => {
  //   if (a.money > b.money) {
  //     return -1;
  //   } else if (b.money > a.money) {
  //     return 1;
  //   } else {
  //     return 0;
  //   }
  // }); 

  //why does this work?
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

//Calculate aggregate wealth
function calcWealth() {

  const wealth = data.reduce((acc, user) => (acc += user.money), 0);

  const wealthEl = document.createElement('div');
  wealthEl.innerHTML = `<p>Total Wealth:</p> <strong>${formatMoney(wealth)}</strong>`
  wealthEl.classList.add('wealth');

  list.appendChild(wealthEl);
}

//Add new object to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

//update the DOM
function updateDOM(providedData = data) {
  list.innerHTML = '';

  providedData.forEach((item) => {
    const element = document.createElement('li');
    element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
    element.classList.add('person');

    list.appendChild(element);
  });
}

// Format number as money - https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
  return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

//event listeners
addUserBtn.addEventListener('click', getRandomUser);
doubleMoneyBtn.addEventListener('click', doubleMoney);
showMillionairesBtn.addEventListener('click', showMillionaires);
sortBtn.addEventListener('click', sortByRichest);
calcWealthBtn.addEventListener('click', calcWealth);