import colors from './utils/colors.js';
import weekendPlans from './utils/weekendPlans.js';

const elementsList = document.querySelector('.list__items');
const textInput = document.querySelector('.input__field');
const createBtn = document.querySelector('.input__create-button');

const deleteAllBtn = document.querySelector('.footer__delete-button');

const gaveUpBtn = document.querySelector('.footer__gave-up-button');


//---------Функции---------


//получить разметку
const getItem = () => {
  const bulkItem = document.querySelector('.list__template')
  .content
  .cloneNode(true);

  return bulkItem;
}

//Создать новый элемент в списке
const createNewItem = (inp) => {
  const element = getItem();
  const elementText = element.querySelector('.list__item-name');
  const elementBody = element.querySelector('.list__item');
  addColorToItem(elementBody);
  addTextToItem(elementText, inp);
  makeDeleteItemBtn(elementBody);
  addElementToList(element, elementsList);
}

//Функция, создающая новый элемент в списке и очищающая инпут
function addNewItem (inp) {
  if (inp.value) {
    createNewItem(inp.value);
    clearTextInput(inp);
  } else {

    return
  };
}

//Функция очищения инпута
const clearTextInput = (input) => {
  input.value = '';
}

//Передача текста из инпута в жлемент списка
const addTextToItem = (elem, source) => {
  elem.textContent = source;
}

//окраска фона элемента
const addColorToItem = (elem) => {
  elem.style.backgroundColor = colors[getRandomFloat(0, 9)];
}

//Добавление элемента в список
const addElementToList = (elem, list) => {
  list.prepend(elem);
}

//Задает функционал кнопкам удаления на каждом итеме
const makeDeleteItemBtn = (elem) => {
  const elementDeleteBtn = elem.querySelector('.list__delete-button');
  elementDeleteBtn.addEventListener('click', () => {
    elementDeleteBtn.closest('.list__item').remove();
  });
}

//Генератор рандомных чисел от 0 до 9 для цветов итемов в списке
const getRandomFloat = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//Удаление всех пунктов по нажатию на кнопку "Очистить"
const deleteAllItems = () => {
  const items = document.querySelectorAll('.list__item');
  items.forEach(function(item, index) {
    setTimeout(
      () => {
        item.remove(item);
      }, 100 * index
    );
  });
}

//Добавление пунктов для прокрастинации для кнопки "Забить"

const makeWeekend = () => {
  deleteAllItems();
  for (let i=0; i<4; i++) {
    setTimeout(() => {
      createNewItem(weekendPlans[i]);
    }, 200 * (i + 1))
  }
}


//---------Слушатели---------
createBtn.addEventListener('click', () => {
  addNewItem(textInput);
});

deleteAllBtn.addEventListener('click', deleteAllItems);

gaveUpBtn.addEventListener('click', makeWeekend);