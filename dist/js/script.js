// add book form 

const body = document.body;
const addSign = document.querySelector('.add__sign');
const form = document.querySelector('.add__form');

addSign.addEventListener('click', addForm);

function addForm(e) {
    if (form.classList.contains('hide')) {
        form.classList.remove('hide');
        body.classList.add('form-overlay');
        body.classList.add('noscroll');
        form.classList.add('scale-up');
        form.classList.remove('scale-down');

    } else {
        form.classList.add('hide');
        body.classList.remove('form-overlay');
        body.classList.remove('noscroll');
        form.classList.remove('scale-up');
        form.classList.add('scale-down');
    }
}

// click outside of form

document.addEventListener('mouseup', function(e) {
    if (!form.contains(e.target)) {
        form.classList.add('hide');
        body.classList.remove('form-overlay');
        body.classList.remove('noscroll');
        form.classList.remove('scale-up');
    }
});

// Library

let myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
    readState() {
        if (this.read === 'false') {
            this.read = 'true';
        } else if (this.read ==='true') {
            this.read = 'false';
        }
    }
}

// let titleValue;
// let authorValue;
// let pagesValue;
// let readValue;

//Submitting values

form.addEventListener('submit', getValues);
function getValues(e) {
    e.preventDefault();
    let titleValue = `${document.getElementById('title').value}`;
    let authorValue = `${document.getElementById('author').value}`;
    let pagesValue = `${document.getElementById('pages').value}`;
    let readValue = `${document.getElementById('read').checked}`;
   
    addBookToLibrary(titleValue, authorValue, pagesValue, readValue);
    display(titleValue, authorValue, pagesValue, readValue);
    form.classList.add('hide');
    body.classList.remove('form-overlay');
    body.classList.remove('noscroll');
    form.classList.remove('scale-up');
    form.classList.add('scale-down');
}
// Add Book To Library

function addBookToLibrary(title, author, pages, read) {
   let obj = new Book(title, author, pages, read);
   console.log(obj);
   myLibrary.push(obj);
}

// Loop through the array and display each book
const submitBtn = document.querySelector('#submit');
const cardsGrid = document.querySelector('.cards-grid');
const addCard = document.querySelector('.add__card');
let i = 0;
function display(titleDis, authorDis, pagesDis, readDis) {
    // while (!cardsGrid.lastElementChild.classList.contains('add__card')) {
    //     cardsGrid.removeChild(cardsGrid.lastChild);
    //     if (cardsGrid.lastElementChild.hasAttribute('data-index')) {
    //     break;
    //     }
    // }
    // for (let i = 0; i < myLibrary.length; i++) {

        let newBook = document.createElement('div');
        // newBook.classList.add('card');
        newBook.classList.add('card');
        // submitBtn.addEventListener('click', function() {
        //     i++;
        // })
        newBook.dataset.index = `${i}`;
        
        cardsGrid.appendChild(newBook);

        let title = document.createElement('h1');
        title.classList.add('card__title');
        title.textContent = titleDis;
        newBook.appendChild(title);

        let content = document.createElement('div');
        content.classList.add('card__content');
        newBook.appendChild(content);
        let contentTitles = document.createElement('div');
        contentTitles.classList.add('card__content--titles');
        content.appendChild(contentTitles);
        let contentDes = document.createElement('div');
        contentDes.classList.add('card__content--des');
        content.appendChild(contentDes);
        let titleOne = document.createElement('h4');
        let titleTwo = document.createElement('h4');
        let titleThree = document.createElement('h4');
        contentTitles.appendChild(titleOne);
        contentTitles.appendChild(titleTwo);
        contentTitles.appendChild(titleThree);
        titleOne.textContent = `Author :`
        titleTwo.textContent = `Pages :`
        titleThree.textContent = `Read :`
        let desOne = document.createElement('p');
        let desTwo = document.createElement('p');
        let desThree = document.createElement('p');
        contentDes.appendChild(desOne);
        contentDes.appendChild(desTwo);
        contentDes.appendChild(desThree);
        desOne.textContent = authorDis;
        desTwo.textContent = pagesDis;
        desThree.textContent = readDis === 'true' ? `Read` : `Not Yet`;
        let buttons = document.createElement('div');
        buttons.classList.add('card__buttons');
        newBook.appendChild(buttons);
        let btnRemove = document.createElement('button');
        btnRemove.classList.add('remove');
        btnRemove.setAttribute('type', 'button');
        let btnRead = document.createElement('button');
        btnRead.classList.add('read');
        btnRead.setAttribute('type', 'button');
        btnRemove.textContent = `Remove`;
        btnRead.textContent = `Read`;
        buttons.appendChild(btnRemove);
        buttons.appendChild(btnRead);

        btnRemove.addEventListener('click', removeCard);
        function removeCard (e) {
            console.log(e.target.parentElement.parentElement);
            let childToRemove = e.target.parentElement.parentElement;
            let childToRemoveDataIndex = childToRemove.getAttribute('data-index');
            console.log(childToRemoveDataIndex);
            myLibrary.splice(childToRemoveDataIndex, 1);
            childToRemove.remove();
        }

        btnRead.addEventListener('click', changeReadState);
        function changeReadState (e) {
            let child = e.target.parentElement.parentElement;
            console.log(child.dataset.index);
            let childObj = myLibrary[child.dataset.index];
            childObj.readState();
            if (childObj.read === 'true') {
                desThree.textContent = 'Read';
            } else if (childObj.read === 'false') {
                desThree.textContent = 'Not Yet';
            }
            console.log(childObj);
        }
        i++;

    // }
}
