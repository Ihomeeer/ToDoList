import weekendPlans from './utils/weekendPlans.js';

const elementsList = document.querySelector('.list__items');
const textInput = document.querySelector('.input__field');
const createBtn = document.querySelector('.input__create-button');

const deleteAllBtn = document.querySelector('.footer__delete-button');

const gaveUpBtn = document.querySelector('.footer__gave-up-button');

const checkbox = document.querySelector('input[name=theme]');


//---------Функции---------


//  получить разметку
const getItem = () => {
  const bulkItem = document.querySelector('.list__template')
  .content
  .cloneNode(true);

  return bulkItem;
}

//  Создать новый элемент в списке
const createNewItem = (inp) => {
  const element = getItem();
  const elementText = element.querySelector('.list__item-name');
  const elementBody = element.querySelector('.list__item');
  addTextToItem(elementText, inp);
  makeDeleteItemBtn(elementBody);
  addElementToList(element, elementsList);
}

//  Функция, создающая новый элемент в списке и очищающая инпут
function addNewItem (inp) {
  if (inp.value) {
    createNewItem(inp.value);
    clearTextInput(inp);
  } else {

    return
  };
}

//  Функция очищения инпута
const clearTextInput = (input) => {
  input.value = '';
}

//  Передача текста из инпута в жлемент списка
const addTextToItem = (elem, source) => {
  elem.textContent = source;
}

//  Добавление элемента в список
const addElementToList = (elem, list) => {
  list.prepend(elem);
}

//  Задает функционал кнопкам удаления на каждом итеме
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

//  Удаление всех пунктов по нажатию на кнопку "Очистить"
const deleteAllItems = () => {
  const items = document.querySelectorAll('.list__item');
  items.forEach(function(item, index) {
    setTimeout(
      () => {
        item.remove(item);
      }, 100 * index
    );
  });
  deleteAllBtn.classList.add('footer__delete-button_disabled');
  deleteAllBtn.disabled = true;
  if (gaveUpBtn.disabled = true) {
    gaveUpBtn.classList.remove('footer__gave-up-button_disabled');
    gaveUpBtn.disabled = false;
  }
}

//  Добавление пунктов для прокрастинации для кнопки "Забить"
const makeWeekend = () => {
  deleteAllItems();
  for (let i=0; i<4; i++) {
    setTimeout(() => {
      createNewItem(weekendPlans[i]);
    }, 200 * (i + 1))
  }
  gaveUpBtn.disabled = true;
  gaveUpBtn.classList.add('footer__gave-up-button_disabled');
}

//  Отключение кнопки "Очистить" при отсутствии объектов в списке дел
const disableDeleteBtn = () => {
  const elementsCount = document.getElementsByClassName('list__item');
  if (elementsCount.length == 0) {
    deleteAllBtn.classList.add('footer__delete-button_disabled');
    deleteAllBtn.disabled = true;
  } else {
    deleteAllBtn.classList.remove('footer__delete-button_disabled');
    deleteAllBtn.disabled = false;
  }
}



//---------Работа с темами---------

const makeTransition = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
      document.documentElement.classList.remove('transition')
  }, 1000)
}


//---------Слушатели---------
createBtn.addEventListener('click', () => {
  addNewItem(textInput);
});

deleteAllBtn.addEventListener('click', deleteAllItems);

gaveUpBtn.addEventListener('click', makeWeekend);

document.querySelector('body').addEventListener('click', disableDeleteBtn);

checkbox.addEventListener('change', function() {
  if(this.checked) {
    makeTransition()
      document.documentElement.setAttribute('theme', 'dark')
  } else {
    makeTransition()
      document.documentElement.setAttribute('theme', 'light')
  }
});

