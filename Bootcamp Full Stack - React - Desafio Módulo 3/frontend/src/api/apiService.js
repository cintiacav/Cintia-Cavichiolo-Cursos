import axios from 'axios';
const API_URL = 'http://localhost:3001/todos';
const YEARS = [2019, 2020, 2021];
const MONTHS = [
  { id: 1, name: 'JAN' },
  { id: 2, name: 'FEV' },
  { id: 3, name: 'MAR' },
  { id: 4, name: 'ABR' },
  { id: 5, name: 'MAI' },
  { id: 6, name: 'JUN' },
  { id: 7, name: 'JUL' },
  { id: 8, name: 'AGO' },
  { id: 9, name: 'SET' },
  { id: 10, name: 'OUT' },
  { id: 11, name: 'NOV' },
  { id: 12, name: 'DEZ' },
];

async function getTodosFilterByYearAndMonth(year, month) {
  const url = `${API_URL}?year=${year}&month=${month}`;
  return await axios.get(url); //axios já vem em JSON
}
async function getTodos() {
  return await axios.get(API_URL);
}

async function updateTodo(todo) {
  const url = `${API_URL}/${todo.id}`;
  const response = await axios.put(url, todo);
  return response.statusText;
}

function getMonths() {
  return MONTHS.map((month) => {
    return month.name;
  });
}
function findMonth(monthFind) {
  return MONTHS.find((newMonth) => {
    return newMonth.name === monthFind;
  });
}
function convertData(date) {
  return date.split('-').reverse().join('/');
}

function getYears() {
  return YEARS;
}
export {
  getTodos,
  updateTodo,
  getMonths,
  getYears,
  findMonth,
  getTodosFilterByYearAndMonth,
  convertData,
};
