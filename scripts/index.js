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
function addNewItem(inp) {
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

//  Передача текста из инпута в элемент списка
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
    disableDeleteBtn();
  });
}

//---------Работа с кнопками---------
const deleteButtonDisabling = () => {
  deleteAllBtn.classList.add('footer__delete-button_disabled');
  deleteAllBtn.disabled = true;
}

const deleteButtonEnabling = () => {
  deleteAllBtn.classList.remove('footer__delete-button_disabled');
  deleteAllBtn.disabled = false;
}

const gaveUpButtonDisabling = () => {
  gaveUpBtn.classList.add('footer__gave-up-button_disabled');
  gaveUpBtn.disabled = true;
}

const gaveUpButtonEnabling = () => {
  gaveUpBtn.classList.remove('footer__gave-up-button_disabled');
  gaveUpBtn.disabled = false;
}

//  Удаление всех пунктов по нажатию на кнопку "Очистить"
const deleteAllItems = () => {
  const items = document.querySelectorAll('.list__item');
  items.forEach(function (item, index) {
    setTimeout(
      () => {
        item.remove(item);
      }, 100 * index
    );
  });
  if (gaveUpBtn.disabled = true) {
gaveUpButtonEnabling();
  }
}

//  Добавление пунктов для прокрастинации для кнопки "Забить"
const makeWeekend = () => {
  deleteAllItems();
  for (let i = 0; i < 4; i++) {
    setTimeout(() => {
      createNewItem(weekendPlans[i]);
    }, 200 * (i + 1))
  }
gaveUpButtonDisabling();
  deleteButtonEnabling();
}

//  Отключение кнопки "Очистить" при отсутствии объектов в списке дел
const disableDeleteBtn = () => {
  const elementsCount = document.getElementsByClassName('list__item');
  if (elementsCount.length === 0) {
    deleteButtonDisabling();
  } else {
    deleteButtonEnabling();
  }
}

//---------Работа с темами---------

const makeTransition = () => {
  document.documentElement.classList.add('transition');
  window.setTimeout(() => {
    document.documentElement.classList.remove('transition')
  }, 1000)
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
  } else if (localStorage.getItem('theme') == 'light') {
    localStorage.setItem('theme', 'dark');
  } else if (localStorage.getItem('theme') == 'dark') {
    localStorage.setItem('theme', 'light');
  }
}

const checkingCheckBox = () => {
  if (localStorage.getItem('theme') == 'light') {
    checkbox.setAttribute('checked', false);
    document.documentElement.setAttribute('theme', 'light')
  } else if (localStorage.getItem('theme') == 'dark') {
    checkbox.setAttribute('checked', true);
    document.documentElement.setAttribute('theme', 'dark')
  }
}

//---------Слушатели---------

createBtn.addEventListener('click', () => {
  addNewItem(textInput);
});

deleteAllBtn.addEventListener('click', () => {
  deleteButtonDisabling();
  deleteAllItems();
});

gaveUpBtn.addEventListener('click', makeWeekend);

createBtn.addEventListener('click', disableDeleteBtn);

checkbox.addEventListener('change', function () {
  if (this.checked) {
    makeTransition()
    document.documentElement.setAttribute('theme', 'dark')
  } else {
    makeTransition()
    document.documentElement.setAttribute('theme', 'light')
  }
});

document.addEventListener('DOMContentLoaded', checkingCheckBox);