let searchForm = document.querySelector('.search__form form');
let searchInput = document.getElementById('searchInput');

let books = document.querySelectorAll('.grid')[0];

// Форма добавления книги
let formWrap = document.querySelector('.book-editing__form');
let form = document.querySelector('.book-editing__form .form');

let authorInput = document.querySelectorAll('.form__element__input_author')[0];
let titleInput = document.querySelectorAll('.form__element__input_title')[0];
let publishingCityInput = document.querySelectorAll('.form__element__input_publishing-city')[0];
let publishingYearInput = document.querySelectorAll('.form__element__input_publishing-year')[0];
let monthBookCheckbox = document.querySelectorAll('.form__element__label__checkbox_description')[0];
let monthBookDescInput = document.querySelectorAll('.form__element__input_month-book-description')[0];
let priceCheckbox = document.querySelectorAll('.form__element__label__checkbox_price')[0];
let priceInput = document.querySelectorAll('.form__element__input_price')[0];
let bookAddingButton = document.querySelector('.form__element__button_book-adding');

let bookCover = document.querySelectorAll('.book-editing__cover .grid__item')[0];
let bookCoverAuthor = document.querySelectorAll('.grid__item__authortitle__author')[0];
let bookCoverTitle = document.querySelectorAll('.grid__item__authortitle__title')[0];
let bookCoverPublishing = document.querySelectorAll('.grid__item__publishing')[0];
let bookCoverMonthBook = document.querySelectorAll('.month-book')[0];
let bookCoverMonthBookDesc = document.querySelectorAll('.month-book__wrap__description')[0];
let stickerForPrice = document.querySelectorAll('.grid__item__sticker_price')[0];

// Футер
let footerMobile = document.querySelector('.footer_mobile');
if (footerMobile != null) { showMobileFooter(); };

document.addEventListener('DOMContentLoaded', start);

function start() {
    let bookTitle;
    let screen = document.documentElement.clientWidth;
    let h1 = document.querySelector('.h1__link');
    let footer = document.querySelector('.footer');

    editTitle(screen, searchInput, h1);

    let bookEditing = document.querySelector('.book-editing');
    let bookEditingForm = document.querySelector('.book-editing__form');
    let bookEditingCover = document.querySelector('.book-editing__cover');
    let bookEditingMonthBook = document.querySelector('.book-editing__month-book');

    putInPlacelinkToBookAdding(screen, books);

    adaptBookForm(screen, bookEditing, bookEditingForm, bookEditingCover, bookEditingMonthBook);

    window.addEventListener("resize", () => {
        screen = document.documentElement.clientWidth;
        books = document.querySelectorAll('.grid')[0];

        editTitle(screen, searchInput, h1);

        putInPlacelinkToBookAdding(screen, books);

        adaptBookForm(screen, bookEditing, bookEditingForm, bookEditingCover, bookEditingMonthBook);
    });

    if (searchForm != null) {
        searchForm.addEventListener('keydown', () => {
            if (event.keyCode == 13) {
                event.preventDefault();
            }
        });
    }

    // Поиск по началу печати
    if (searchInput != null) {
        window.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.altKey || e.metaKey) return;

            searchInput.focus();
        });

        searchInput.addEventListener('keyup', () => {
            bookTitle = searchInput.value;
            if (bookTitle.length != 1) {
                event.preventDefault();
                searchBook(bookTitle);
            }
        });
    }

    // Футер
    if (footer != null) {
        footer.addEventListener('mouseover', ()=>{
            screen = document.documentElement.clientWidth;

            if (screen < 535) {
                //books.insertBefore(linkToBookAdding, books.firstChild);
            }
            else {
                if (screen < 711) {
                    //books.insertBefore(linkToBookAdding, books.children[2]);
                }
                else {
                    if (screen < 892) {
                        footer.style.animation = 'closeFooterCol5 .35s linear';
                    }
                    else {
                        if (screen < 1060) {
                            footer.style.animation = 'closeFooterCol5 .35s linear';
                        }
                        else {
                            footer.style.animation = 'closeFooter .25s linear';
                        }
                    }
                }
            }
        });
    }

    // Форма входа в админку
    let passwordInput = document.querySelector('.form__element__input_password');
    if (passwordInput != null) {
        passwordInput.focus();

        let enterButton = document.querySelector('.form__element__button_entering');
        enterButton.addEventListener('click', preventDefault);

        passwordInput.addEventListener('keyup', () => {
            if (passwordInput.value != '') {
                passwordInput.classList.remove('form__element__input_invalid');

                enterButton.removeEventListener('click', preventDefault);
                enterButton.classList.remove('form__element__button-disabled');
            }
            else {
                enterButton.addEventListener('click', preventDefault);
                enterButton.classList.add('form__element__button-disabled');
            }
        });
    }

    // Редактирование книги
    let gridItems = document.querySelectorAll('.page.admin .grid__item[data-id]');
    let onHandsCheckbox = document.querySelectorAll('.form__element__label__checkbox_on-hands');
    for (let i = 0; i < gridItems.length; i++) {
        let id = document.querySelectorAll('.grid__item[data-id]')[i].getAttribute('data-id');
        gridItems[i].addEventListener('click', {handleEvent: openEditPage, number: i}, true);

        gridItems[i].addEventListener('mouseover', (e)=> {
            gridItems[i].classList.add('grid__item_hover');

            if (e.target.tagName == 'LABEL' || e.target.tagName == 'SPAN' || e.target.tagName == 'INPUT') {
                gridItems[i].classList.remove('grid__item_hover');
            }
        });
        gridItems[i].addEventListener('mouseout', ()=> {
            gridItems[i].classList.remove('grid__item_hover');
        });

        onHandsCheckbox[i].addEventListener('click', {handleEvent: toggleBookOnHands, number: i, id: id}, true);
    }


    // На мобильном телефоне в портретном режиме не показывается обложка в форме
    if (document.location.pathname === '/+/' || document.location.pathname === '/alterare/') {
        let bookCoverOnMobile = document.querySelector('.page .book-editing__cover');

        let myMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (myMobile.Android() ||
                    myMobile.BlackBerry() ||
                    myMobile.iOS() ||
                    myMobile.Opera() ||
                    myMobile.Windows());
            }
        };

        if (myMobile.any() ) {
            // Это мобильный телефон
            bookCoverOnMobile.style.display = 'none';
            document.querySelector('.page .book-editing__month-book__wrap').style.display = 'none';
        }
    }

    // Форма добавления книги
    if (document.location.pathname === '/+/') {
        titleInput.focus();

        // Подстановка данных
        let urlParams = document.location.search;

        // недобавленной книги
        let newBookTitle = localStorage.getItem('newBookTitle');
        if (newBookTitle !== '') {
            titleInput.value = newBookTitle;
            bookAddingButton.classList.remove('form__element__button-disabled');

            bookCoverTitle.innerHTML = newBookTitle;

            let title = titleInput.value;
            let xhrTypograf = new XMLHttpRequest();
            let params = 'str=' + title;
            xhrTypograf.open('POST', '../php/typograf.php');
            xhrTypograf.onreadystatechange = () => {
                if (xhrTypograf.readyState === 4) {
                    if (xhrTypograf.status === 200) {
                        bookCoverTitle.innerHTML = xhrTypograf.responseText;
                    }
                    else
                        console.log('Ошибка: ' + xhrTypograf.status);
                }
            };
            xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrTypograf.send(params);
        }

        let newBookAuthor = localStorage.getItem('newBookAuthor');
        if (newBookAuthor !== null && newBookAuthor !== '') {
            authorInput.value = newBookAuthor;

            bookCoverAuthor.innerHTML = newBookAuthor;
            bookCoverAuthor.style.display = 'block';

            let author = authorInput.value;
            let xhrTypograf = new XMLHttpRequest();
            let params = 'str=' + author;
            xhrTypograf.open('POST', '../php/typograf.php');
            xhrTypograf.onreadystatechange = () => {
                if (xhrTypograf.readyState === 4) {
                    if (xhrTypograf.status === 200) {
                        bookCoverAuthor.innerHTML = xhrTypograf.responseText;
                    }
                    else
                        console.log('Ошибка: ' + xhrTypograf.status);
                }
            };
            xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrTypograf.send(params);
        }

        let newBookPublishingCity = localStorage.getItem('newBookPublishingCity');
        if (newBookPublishingCity != null) {
            publishingCityInput.value = newBookPublishingCity;
        }

        let newBookPublishingYear = localStorage.getItem('newBookPublishingYear');
        if (newBookPublishingYear != null) {
            publishingYearInput.value = newBookPublishingYear;
        }

        if (newBookPublishingCity != null || newBookPublishingYear != null) {
            if (publishingYearInput.value === '') {
                bookCoverPublishing.innerHTML = publishingCityInput.value;
            }
            else {
                if (publishingCityInput.value === '') {
                    bookCoverPublishing.innerHTML = publishingYearInput.value;
                }
                else {
                    bookCoverPublishing.innerHTML = publishingCityInput.value + ', ' + publishingYearInput.value;
                }
            }
        }

        let newBookMonthBookStatus = localStorage.getItem('newBookMonthBookStatus');
        if (newBookMonthBookStatus !== null) {
            if (newBookMonthBookStatus === '1') {
                if (monthBookCheckbox.checked === false) {
                    monthBookCheckbox.checked = true;
                    toggleAppearingBlock(monthBookCheckbox);
                    bookCover.classList.toggle('grid__item_month-book-color');
                    bookCoverMonthBook.style.display = 'block';
                }
            }
            else {
                if (monthBookCheckbox.checked === true) {
                    monthBookCheckbox.checked = false;
                    toggleAppearingBlock(monthBookCheckbox);
                    bookCover.classList.toggle('grid__item_month-book-color');
                    bookCoverMonthBook.style.display = 'none';
                }
            }

            let newBookMonthBookDesc = localStorage.getItem('newBookMonthBookDesc');
            if (newBookMonthBookDesc != null && newBookMonthBookDesc !== '') {
                monthBookDescInput.value = newBookMonthBookDesc;

                bookCoverMonthBookDesc.innerHTML = newBookMonthBookDesc;

                let description = newBookMonthBookDesc;
                let xhrTypograf = new XMLHttpRequest();
                let params = 'str=' + description;
                xhrTypograf.open('POST', '../php/typograf.php');
                xhrTypograf.onreadystatechange = () => {
                    if (xhrTypograf.readyState === 4) {
                        if (xhrTypograf.status === 200) {
                            bookCoverMonthBookDesc.innerHTML = xhrTypograf.responseText;
                        }
                        else
                            console.log('Ошибка: ' + xhrTypograf.status);
                    }
                };
                xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhrTypograf.send(params);
            }
            else if (newBookMonthBookStatus === '1') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }
        }

        let newBookPriceStatus = localStorage.getItem('newBookPriceStatus');
        let newBookPrice = localStorage.getItem('newBookPrice');
        if (newBookPriceStatus === '1') {
            priceCheckbox.checked = true;
            toggleAppearingBlock(priceCheckbox);
            stickerForPrice.style.display = 'block';

            if (newBookPrice <= 0) {
                bookAddingButton.classList.add('form__element__button-disabled');
            }
            else {
                stickerForPrice.innerHTML = newBookPrice + '&nbsp;€';
            }
        }
        if (newBookPrice > 0) {
            priceInput.value = newBookPrice;
        }


        // из поиска
        if (urlParams !== '') {
            let urlParamsType = urlParams.split('&')[0].replace('?type=', '');
            let urlParamsText = decodeURI(urlParams.split('&')[1].replace('text=', ''));

            if (urlParamsText !== '') {
                switch (urlParamsType) {
                    case 'title':
                        titleInput.value = urlParamsText;
                        localStorage.setItem('newBookTitle', urlParamsText);

                        bookAddingButton.classList.remove('form__element__button-disabled');

                        bookCoverTitle.innerHTML = urlParamsText;

                        let title = titleInput.value;
                        let xhrTypografParamTitle = new XMLHttpRequest();
                        let paramsTitle = 'str=' + title;
                        xhrTypografParamTitle.open('POST', '../php/typograf.php');
                        xhrTypografParamTitle.onreadystatechange = () => {
                            if (xhrTypografParamTitle.readyState === 4) {
                                if (xhrTypografParamTitle.status === 200) {
                                    bookCoverTitle.innerHTML = xhrTypografParamTitle.responseText;
                                }
                                else
                                    console.log('Ошибка: ' + xhrTypografParamTitle.status);
                            }
                        };
                        xhrTypografParamTitle.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhrTypografParamTitle.send(paramsTitle);

                        break;

                    case 'author':
                        authorInput.value = urlParamsText;

                        bookCoverAuthor.innerHTML = urlParamsText;
                        bookCoverAuthor.style.display = 'block';

                        let author = authorInput.value;
                        let xhrTypografParamAuthor = new XMLHttpRequest();
                        let paramsAuthor = 'str=' + author;
                        xhrTypografParamAuthor.open('POST', '../php/typograf.php');
                        xhrTypografParamAuthor.onreadystatechange = () => {
                            if (xhrTypografParamAuthor.readyState === 4) {
                                if (xhrTypografParamAuthor.status === 200) {
                                    bookCoverAuthor.innerHTML = xhrTypografParamAuthor.responseText;
                                }
                                else
                                    console.log('Ошибка: ' + xhrTypografParamAuthor.status);
                            }
                        };
                        xhrTypografParamAuthor.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                        xhrTypografParamAuthor.send(paramsAuthor);

                        break;
                }
            }
        }

        // Обработчики полей
        titleInput.addEventListener('keyup', (e) => {
            if (titleInput.value !== '') {
                titleInput.classList.remove('form__element__input_invalid');
                bookAddingButton.classList.remove('form__element__button-disabled');
            }
            else {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (monthBookCheckbox.checked === true && monthBookDescInput.value === '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (priceCheckbox.checked === true && priceInput.value === '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            let title = titleInput.value;
            let xhr = new XMLHttpRequest();
            let params = 'str=' + title;
            xhr.open('POST', '../php/typograf.php');
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        bookCoverTitle.innerHTML = xhr.responseText;
                    }
                    else
                        console.log('Ошибка: ' + xhr.status);
                }
            };
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);

            localStorage.setItem('newBookTitle', title);

            if (e.keyCode === 13) {
                localStorage.removeItem('newBookTitle');
                localStorage.removeItem('newBookAuthor');
                localStorage.removeItem('newBookPublishingCity');
                localStorage.removeItem('newBookPublishingYear');
                localStorage.removeItem('newBookMonthBookStatus');
                localStorage.removeItem('newBookMonthBookDesc');
                localStorage.removeItem('newBookPrice');
            }
        });

        authorInput.addEventListener('keyup',(e)=>{
            if (authorInput.value !== '') {
                bookCoverAuthor.style.display = 'block';

                let author = authorInput.value;
                let xhr = new XMLHttpRequest();
                let params = 'str=' + author;
                xhr.open('POST', '../php/typograf.php');
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4) {
                        if (xhr.status === 200) {
                            bookCoverAuthor.innerHTML = xhr.responseText;
                        }
                        else
                            console.log('Ошибка: ' + xhr.status);
                    }
                };
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhr.send(params);
            }
            else {
                bookCoverAuthor.style.display = 'none';
            }

            fixTitleHeightWhenLongAuthor();

            let bookCoverAuthorHeight = window.getComputedStyle(bookCoverAuthor).height;
            if (parseInt(bookCoverAuthorHeight) >= 30) {
                bookAddingButton.setAttribute('data-sendToEditor', 'true');
            }
            else {
                bookAddingButton.removeAttribute('data-sendToEditor');
            }

            localStorage.setItem('newBookAuthor', authorInput.value);

            if (e.keyCode === 13) {
                localStorage.removeItem('newBookTitle');
                localStorage.removeItem('newBookAuthor');
                localStorage.removeItem('newBookPublishingCity');
                localStorage.removeItem('newBookPublishingYear');
                localStorage.removeItem('newBookMonthBookStatus');
                localStorage.removeItem('newBookMonthBookDesc');
                localStorage.removeItem('newBookPrice');
            }
        });

        let bookCoverPuslishingData = '';
        publishingCityInput.addEventListener('keyup', (e)=>{
            if (publishingYearInput.value === '') {
                bookCoverPuslishingData = publishingCityInput.value;
            }
            else {
                if (publishingCityInput.value === '') {
                    bookCoverPuslishingData = publishingYearInput.value;
                }
                else {
                    bookCoverPuslishingData = publishingCityInput.value + ', ' + publishingYearInput.value;
                }
            }

            bookCoverPublishing.innerHTML = bookCoverPuslishingData;

            localStorage.setItem('newBookPublishingCity', publishingCityInput.value);

            if (e.keyCode === 13) {
                localStorage.removeItem('newBookTitle');
                localStorage.removeItem('newBookAuthor');
                localStorage.removeItem('newBookPublishingCity');
                localStorage.removeItem('newBookPublishingYear');
                localStorage.removeItem('newBookMonthBookStatus');
                localStorage.removeItem('newBookMonthBookDesc');
                localStorage.removeItem('newBookPrice');
            }
        });

        publishingYearInput.onkeypress = allowDigit;
        publishingYearInput.addEventListener('keyup', (e)=>{
            if (publishingYearInput.value === '') {
                if (publishingCityInput.value === '') {
                    bookCoverPuslishingData = '';
                }
                else {
                    bookCoverPuslishingData = publishingCityInput.value;
                }
            }
            else {
                if (publishingCityInput.value === '') {
                    bookCoverPuslishingData = publishingYearInput.value;
                }
                else {
                    bookCoverPuslishingData = publishingCityInput.value + ', ' + publishingYearInput.value;
                }
            }

            bookCoverPublishing.innerHTML = bookCoverPuslishingData;

            localStorage.setItem('newBookPublishingYear', publishingYearInput.value);

            if (e.keyCode === 13) {
                localStorage.removeItem('newBookTitle');
                localStorage.removeItem('newBookAuthor');
                localStorage.removeItem('newBookPublishingCity');
                localStorage.removeItem('newBookPublishingYear');
                localStorage.removeItem('newBookMonthBookStatus');
                localStorage.removeItem('newBookMonthBookDesc');
                localStorage.removeItem('newBookPrice');
            }
        });

        monthBookCheckbox.addEventListener("click", toggleAppearingBlock);
        monthBookCheckbox.addEventListener("click", ()=>{
            if (titleInput.value !== '') {
                if (monthBookDescInput.value === '') {
                    bookAddingButton.classList.toggle('form__element__button-disabled');
                }
            }

            if (priceCheckbox.checked === true && priceInput.value === '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            bookCover.classList.toggle('grid__item_month-book-color');

            if (bookCoverMonthBook.style.display === 'none') {
                bookCoverMonthBook.style.display = 'block';
            }
            else {
                bookCoverMonthBook.style.display = 'none';
            }

            let monthBookStatus = monthBookCheckbox.checked ? '1': '0';

            // Добавление в локальное хранилище
            localStorage.setItem('newBookMonthBookStatus', monthBookStatus);
        });

        monthBookDescInput.addEventListener('keyup', ()=>{
            if (titleInput.value !== '' && monthBookDescInput.value !== '') {
                monthBookDescInput.classList.remove('form__element__input_invalid');
                bookAddingButton.classList.remove('form__element__button-disabled');
            }
            else {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (priceCheckbox.checked === true && priceInput.value === '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            let description = monthBookDescInput.value;

            let xhr = new XMLHttpRequest();
            let params = 'str=' + description;
            xhr.open('POST', '../php/typograf.php');
            xhr.onreadystatechange=()=>{
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        bookCoverMonthBookDesc.innerHTML = xhr.responseText;
                    }
                    else
                        console.log('Ошибка: ' + xhr.status);
                }
            };
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(params);

            let monthBookStatus = monthBookCheckbox.checked ? '1': '0';

            localStorage.setItem('newBookMonthBookStatus', monthBookStatus);
            localStorage.setItem('newBookMonthBookDesc', description);
        });


        priceCheckbox.addEventListener("click", toggleAppearingBlock);
        priceCheckbox.addEventListener("click", ()=>{
            if (titleInput.value !== '') {
                if (priceInput.value === '') {
                    bookAddingButton.classList.toggle('form__element__button-disabled');
                }
                else {
                    stickerForPrice.innerHTML = priceInput.value + '&thinsp;€';
                }
            }

            if (monthBookCheckbox.checked === true && monthBookDescInput.value === '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (stickerForPrice.style.display === 'none') {
                stickerForPrice.style.display = 'block';
            }
            else {
                stickerForPrice.style.display = 'none';
            }

            let priceStatus = priceCheckbox.checked ? '1': '0';

            // Добавление в локальное хранилище
            localStorage.setItem('newBookPriceStatus', priceStatus);
            localStorage.setItem('newBookPrice', priceInput.value);
        });

        priceInput.onkeypress = allowDigit;
        priceInput.addEventListener('keyup', (e)=>{
            if (titleInput.value !== '' && priceInput.value !== '') {
                priceInput.classList.remove('form__element__input_invalid');
                bookAddingButton.classList.remove('form__element__button-disabled');
            }
            else {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (monthBookCheckbox.checked === true && monthBookDescInput.value === '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (priceInput.value === '') {
                stickerForPrice.innerHTML = '';
            }
            else {
                stickerForPrice.innerHTML = priceInput.value + '&thinsp;€';
            }

            localStorage.setItem('newBookPrice', priceInput.value);

            if (e.keyCode === 13) {
                localStorage.removeItem('newBookTitle');
                localStorage.removeItem('newBookAuthor');
                localStorage.removeItem('newBookPublishingCity');
                localStorage.removeItem('newBookPublishingYear');
                localStorage.removeItem('newBookMonthBookStatus');
                localStorage.removeItem('newBookMonthBookDesc');
                localStorage.removeItem('newBookPrice');
            }
        });

        bookAddingButton.addEventListener("click", ()=>{
            event.preventDefault();

            let sendToEditor = false;

            if (bookAddingButton.hasAttribute('data-sendToEditor')) {
                sendToEditor = true;
            }

            addBook(sendToEditor);

            localStorage.removeItem('newBookTitle');
            localStorage.removeItem('newBookAuthor');
            localStorage.removeItem('newBookPublishingCity');
            localStorage.removeItem('newBookPublishingYear');
            localStorage.removeItem('newBookMonthBookStatus');
            localStorage.removeItem('newBookMonthBookDesc');
            localStorage.removeItem('newBookPrice');
        });
    }

    // Редактирование книги
    if (document.location.pathname === '/alterare/') {
        let url = document.location.search;
        let id = url.replace('?libro=', '');

        authorInput = document.querySelector('.form__element__input_author');
        titleInput = document.querySelector('.form__element__input_title');
        publishingCityInput = document.querySelector('.form__element__input_publishing-city');
        publishingYearInput = document.querySelector('.form__element__input_publishing-year');
        monthBookCheckbox = document.querySelector('.form__element__label__checkbox_description');
        monthBookDescInput = document.querySelector('.form__element__input_month-book-description');
        priceCheckbox = document.querySelector('.form__element__label__checkbox_price');
        priceInput = document.querySelector('.form__element__input_price');
        bookAddingButton = document.querySelector('.form__element__button_book-adding');

        bookCover = document.querySelector('.book-editing__cover .grid__item');
        bookCoverAuthor = document.querySelector('.grid__item__authortitle__author');
        bookCoverTitle = document.querySelector('.grid__item__authortitle__title');
        bookCoverPublishing = document.querySelector('.grid__item__publishing');
        bookCoverMonthBook = document.querySelector('.month-book');
        bookCoverMonthBookDesc = document.querySelector('.month-book__wrap__description');
        stickerForPrice = document.querySelector('.grid__item__sticker_price');

        // Подстановка данных, которые не обновились для читателя
        let titleSaved = localStorage.getItem('title' + id);
        if (titleSaved != null) {
            titleInput.value = titleSaved;

            bookCoverTitle.innerHTML = titleSaved;

            let title = titleInput.value;
            let xhrTypograf = new XMLHttpRequest();
            let params = 'str=' + title;
            xhrTypograf.open('POST', '../php/typograf.php');
            xhrTypograf.onreadystatechange = () => {
                if (xhrTypograf.readyState === 4) {
                    if (xhrTypograf.status === 200) {
                        bookCoverTitle.innerHTML = xhrTypograf.responseText;
                    }
                    else
                        console.log('Ошибка: ' + xhrTypograf.status);
                }
            };
            xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrTypograf.send(params);

            let savingInfo = document.createElement('div');
            savingInfo.className = "form__element__warning-small";
            savingInfo.innerHTML = localStorage.getItem('savingTitleInfo' + id);
            titleInput.parentNode.appendChild(savingInfo);
        }

        let authorSaved = localStorage.getItem('author' + id);
        if (authorSaved != null) {
            authorInput.value = authorSaved;

            let savingInfo = document.createElement('div');
            savingInfo.className = "form__element__warning-small";
            savingInfo.innerHTML = localStorage.getItem('savingAuthorInfo' + id);
            authorInput.parentNode.appendChild(savingInfo);

            if (authorInput.value != '') {
                bookCoverAuthor.style.display = 'block';
                bookCoverAuthor.innerHTML = authorInput.value;

                let author = authorInput.value;
                let xhrTypograf = new XMLHttpRequest();
                let params = 'str=' + author;
                xhrTypograf.open('POST', '../php/typograf.php');
                xhrTypograf.onreadystatechange = () => {
                    if (xhrTypograf.readyState === 4) {
                        if (xhrTypograf.status === 200) {
                            bookCoverAuthor.innerHTML = xhrTypograf.responseText;
                        }
                        else
                            console.log('Ошибка: ' + xhrTypograf.status);
                    }
                };
                xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhrTypograf.send(params);
            }
            else {
                bookCoverAuthor.style.display = 'none';
            }
        }

        let publishingCitySaved = localStorage.getItem('publishingCity' + id);
        if (publishingCitySaved != null) {
            publishingCityInput.value = publishingCitySaved;

            let savingInfo = document.createElement('div');
            savingInfo.className = "form__element__warning-small";
            savingInfo.innerHTML = localStorage.getItem('savingPublishingCityInfo' + id);
            publishingCityInput.parentNode.appendChild(savingInfo);
        }

        let publishingYearSaved = localStorage.getItem('publishingYear' + id);
        if (publishingYearSaved != null) {
            publishingYearInput.value = publishingYearSaved;

            let savingInfo = document.createElement('div');
            savingInfo.className = "form__element__warning-small";
            savingInfo.innerHTML = localStorage.getItem('savingPublishingYearInfo' + id);
            publishingYearInput.parentNode.appendChild(savingInfo);
        }

        if (publishingCitySaved != null || publishingYearSaved != null) {
            if (publishingYearInput.value == '') {
                bookCoverPublishing.innerHTML = publishingCityInput.value;
            }
            else {
                if (publishingCityInput.value == '') {
                    bookCoverPublishing.innerHTML = publishingYearInput.value;
                }
                else {
                    bookCoverPublishing.innerHTML = publishingCityInput.value + ', ' + publishingYearInput.value;
                }
            }
        }

        let monthBookStatusSaved = localStorage.getItem('monthBookStatus' + id);
        if (monthBookStatusSaved != null) {
            if (monthBookStatusSaved === '1') {
                let savingInfo = document.createElement('div');
                savingInfo.className = "form__element__warning-small form__element__warning-small-lower";
                savingInfo.innerHTML = localStorage.getItem('savingMonthBookInfo' + id);
                monthBookDescInput.parentNode.appendChild(savingInfo);

                if (monthBookCheckbox.checked === false) {
                    monthBookCheckbox.checked = true;
                    toggleAppearingBlock(monthBookCheckbox);
                    bookCover.classList.toggle('grid__item_month-book-color');
                    bookCoverMonthBook.style.display = 'block';
                }
            }
            else {
                if (monthBookCheckbox.checked === true) {
                    monthBookCheckbox.checked = false;
                    toggleAppearingBlock(monthBookCheckbox);
                    bookCover.classList.toggle('grid__item_month-book-color');
                    bookCoverMonthBook.style.display = 'none';

                    let savingInfo = document.createElement('div');
                    savingInfo.className = "form__element__warning-small form__element__warning-small-checkbox";
                    savingInfo.innerHTML = localStorage.getItem('savingMonthBookInfo' + id);
                    monthBookCheckbox.parentNode.appendChild(savingInfo);
                }
            }

            let monthBookDescSaved = localStorage.getItem('monthBookDesc' + id);
            if (monthBookDescSaved != null && monthBookDescSaved !== '') {
                bookCoverMonthBookDesc.innerHTML = monthBookDescSaved;
                let description = monthBookDescSaved;
                let xhrTypograf = new XMLHttpRequest();
                let params = 'str=' + description;
                xhrTypograf.open('POST', '../php/typograf.php');
                xhrTypograf.onreadystatechange = () => {
                    if (xhrTypograf.readyState === 4) {
                        if (xhrTypograf.status === 200) {
                            bookCoverMonthBookDesc.innerHTML = xhrTypograf.responseText;
                        }
                        else
                            console.log('Ошибка: ' + xhrTypograf.status);
                    }
                };
                xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhrTypograf.send(params);

                monthBookDescInput.value = monthBookDescSaved;
            }
            else if (monthBookStatusSaved === '1') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }
        }

        let priceStatusSaved = localStorage.getItem('priceStatus' + id);
        let priceSaved = localStorage.getItem('price' + id);
        if (priceStatusSaved != null) {
            if (priceStatusSaved === '1') {
                if (priceCheckbox.checked === false) {
                    priceCheckbox.checked = true;
                    toggleAppearingBlock(priceCheckbox);
                    stickerForPrice.style.display = 'block';
                }

                let savingInfo = document.createElement('div');
                savingInfo.className = "form__element__warning-small";
                savingInfo.innerHTML = localStorage.getItem('savingPriceInfo' + id);
                priceInput.parentNode.appendChild(savingInfo);

                if (priceSaved <= 0) {
                    bookAddingButton.classList.add('form__element__button-disabled');
                }
                else {
                    stickerForPrice.innerHTML = priceSaved + '&nbsp;€';
                }
            }
            else {
                if (priceCheckbox.checked === true) {
                    priceCheckbox.checked = false;
                    toggleAppearingBlock(priceCheckbox);
                    stickerForPrice.style.display = 'none';

                    let savingInfo = document.createElement('div');
                    savingInfo.className = "form__element__warning-small form__element__warning-small-checkbox";
                    savingInfo.style.left = "121px";
                    savingInfo.innerHTML = localStorage.getItem('savingPriceInfo' + id);
                    priceCheckbox.parentNode.appendChild(savingInfo);
                }
            }
        }

        if (priceSaved != null) {
            if (priceSaved > 0) {
                priceInput.value = priceSaved;
            }
            else {
                priceInput.value = '';
                stickerForPrice.innerHTML = '';
            }
        }


        // Обработчики полей
        let date = new Date();
        let day = date.getDate();
        let month = convertMonth(date.getMonth() + 1);
        date = "Salvato il&nbsp;" + day + "&nbsp;" + month;

        titleInput.addEventListener('keyup', (e)=>{
            if (titleInput.value != '') {
                titleInput.classList.remove('form__element__input_invalid');
                bookAddingButton.classList.remove('form__element__button-disabled');
            }
            else {
                titleInput.classList.add('form__element__input_invalid');
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (monthBookCheckbox.checked == true && monthBookDescInput.value == '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (priceCheckbox.checked == true && priceInput.value == '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            let title = titleInput.value;
            let xhrTypograf = new XMLHttpRequest();
            let params = 'str=' + title;
            xhrTypograf.open('POST', '../php/typograf.php');
            xhrTypograf.onreadystatechange = () => {
                if (xhrTypograf.readyState === 4) {
                    if (xhrTypograf.status === 200) {
                        bookCoverTitle.innerHTML = xhrTypograf.responseText;
                    }
                    else
                        console.log('Ошибка: ' + xhrTypograf.status);
                }
            };
            xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrTypograf.send(params);

            // Добавление в локальное хранилище
            localStorage.setItem('title' + id, title);
            localStorage.setItem('savingTitleInfo' + id, date);

            if (e.keyCode === 13) {
                localStorage.removeItem('title' + id);
                localStorage.removeItem('savingTitleInfo' + id);
                localStorage.removeItem('author' + id);
                localStorage.removeItem('savingAuthorInfo' + id);
                localStorage.removeItem('publishingYear' + id);
                localStorage.removeItem('savingPublishingYearInfo' + id);
                localStorage.removeItem('publishingCity' + id);
                localStorage.removeItem('savingPublishingCityInfo' + id);
                localStorage.removeItem('monthBookStatus' + id);
                localStorage.removeItem('monthBookDesc' + id);
                localStorage.removeItem('savingMonthBookInfo' + id);
                localStorage.removeItem('priceStatus' + id);
                localStorage.removeItem('price' + id);
                localStorage.removeItem('savingPriceInfo' + id);
            }
        });

        authorInput.addEventListener('keyup', (e)=>{
            if (authorInput.value != '') {
                bookCoverAuthor.style.display = 'block';

                let author = authorInput.value;
                let xhrTypograf = new XMLHttpRequest();
                let params = 'str=' + author;
                xhrTypograf.open('POST', '../php/typograf.php');
                xhrTypograf.onreadystatechange = () => {
                    if (xhrTypograf.readyState === 4) {
                        if (xhrTypograf.status === 200) {
                            bookCoverAuthor.innerHTML = xhrTypograf.responseText;
                        }
                        else
                            console.log('Ошибка: ' + xhrTypograf.status);
                    }
                };
                xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                xhrTypograf.send(params);
            }
            else {
                bookCoverAuthor.style.display = 'none';
            }

            fixTitleHeightWhenLongAuthor();

            // Добавление в локальное хранилище
            localStorage.setItem('author' + id, authorInput.value);
            localStorage.setItem('savingAuthorInfo' + id, date);

            if (e.keyCode === 13) {
                localStorage.removeItem('title' + id);
                localStorage.removeItem('savingTitleInfo' + id);
                localStorage.removeItem('author' + id);
                localStorage.removeItem('savingAuthorInfo' + id);
                localStorage.removeItem('publishingYear' + id);
                localStorage.removeItem('savingPublishingYearInfo' + id);
                localStorage.removeItem('publishingCity' + id);
                localStorage.removeItem('savingPublishingCityInfo' + id);
                localStorage.removeItem('monthBookStatus' + id);
                localStorage.removeItem('monthBookDesc' + id);
                localStorage.removeItem('savingMonthBookInfo' + id);
                localStorage.removeItem('priceStatus' + id);
                localStorage.removeItem('price' + id);
                localStorage.removeItem('savingPriceInfo' + id);
            }
        });


        let bookCoverPuslishingData = '';
        publishingCityInput.addEventListener('keyup', (e)=>{
            if (publishingYearInput.value == '') {
                bookCoverPuslishingData = publishingCityInput.value;
            }
            else {
                if (publishingCityInput.value == '') {
                    bookCoverPuslishingData = publishingYearInput.value;
                }
                else {
                    bookCoverPuslishingData = publishingCityInput.value + ', ' + publishingYearInput.value;
                }
            }

            bookCoverPublishing.innerHTML = bookCoverPuslishingData;

            // Добавление в локальное хранилище
            localStorage.setItem('publishingCity' + id, publishingCityInput.value);
            localStorage.setItem('savingPublishingCityInfo' + id, date);

            if (e.keyCode === 13) {
                localStorage.removeItem('title' + id);
                localStorage.removeItem('savingTitleInfo' + id);
                localStorage.removeItem('author' + id);
                localStorage.removeItem('savingAuthorInfo' + id);
                localStorage.removeItem('publishingYear' + id);
                localStorage.removeItem('savingPublishingYearInfo' + id);
                localStorage.removeItem('publishingCity' + id);
                localStorage.removeItem('savingPublishingCityInfo' + id);
                localStorage.removeItem('monthBookStatus' + id);
                localStorage.removeItem('monthBookDesc' + id);
                localStorage.removeItem('savingMonthBookInfo' + id);
                localStorage.removeItem('priceStatus' + id);
                localStorage.removeItem('price' + id);
                localStorage.removeItem('savingPriceInfo' + id);
            }
        });

        publishingYearInput.onkeypress = allowDigit;
        publishingYearInput.addEventListener('keyup', (e)=>{
            if (publishingYearInput.value == '') {
                if (publishingCityInput.value == '') {
                    bookCoverPuslishingData = '';
                }
                else {
                    bookCoverPuslishingData = publishingCityInput.value;
                }
            }
            else {
                if (publishingCityInput.value == '') {
                    bookCoverPuslishingData = publishingYearInput.value;
                }
                else {
                    bookCoverPuslishingData = publishingCityInput.value + ', ' + publishingYearInput.value;
                }
            }

            bookCoverPublishing.innerHTML = bookCoverPuslishingData;

            // Добавление в локальное хранилище
            localStorage.setItem('publishingYear' + id, publishingYearInput.value);
            localStorage.setItem('savingPublishingYearInfo' + id, date);

            if (e.keyCode === 13) {
                localStorage.removeItem('title' + id);
                localStorage.removeItem('savingTitleInfo' + id);
                localStorage.removeItem('author' + id);
                localStorage.removeItem('savingAuthorInfo' + id);
                localStorage.removeItem('publishingYear' + id);
                localStorage.removeItem('savingPublishingYearInfo' + id);
                localStorage.removeItem('publishingCity' + id);
                localStorage.removeItem('savingPublishingCityInfo' + id);
                localStorage.removeItem('monthBookStatus' + id);
                localStorage.removeItem('monthBookDesc' + id);
                localStorage.removeItem('savingMonthBookInfo' + id);
                localStorage.removeItem('priceStatus' + id);
                localStorage.removeItem('price' + id);
                localStorage.removeItem('savingPriceInfo' + id);
            }
        });

        monthBookCheckbox.addEventListener("click", toggleAppearingBlock);
        monthBookCheckbox.addEventListener("click", ()=>{
            if (titleInput.value != '') {
                if (monthBookDescInput.value == '') {
                    bookAddingButton.classList.toggle('form__element__button-disabled');
                }
            }

            if (priceCheckbox.checked == true && priceInput.value == '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            bookCover.classList.toggle('grid__item_month-book-color');

            if (bookCoverMonthBook.style.display == 'none') {
                bookCoverMonthBook.style.display = 'block';
            }
            else {
                bookCoverMonthBook.style.display = 'none';
            }

            let monthBookStatus = (monthBookCheckbox.checked) ? '1': '0';
            let description = monthBookDescInput.value;

            // Добавление в локальное хранилище
            localStorage.setItem('monthBookStatus' + id, monthBookStatus);
            localStorage.setItem('monthBookDesc' + id, description);
            localStorage.setItem('savingMonthBookInfo' + id, date);
        });

        monthBookDescInput.addEventListener('keyup', ()=>{
            if (titleInput.value != '' && monthBookDescInput.value != '') {
                monthBookDescInput.classList.remove('form__element__input_invalid');
                bookAddingButton.classList.remove('form__element__button-disabled');
            }
            else {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (priceCheckbox.checked == true && priceInput.value == '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            let description = monthBookDescInput.value;
            let xhrTypograf = new XMLHttpRequest();
            let params = 'str=' + description;
            xhrTypograf.open('POST', '../php/typograf.php');
            xhrTypograf.onreadystatechange = () => {
                if (xhrTypograf.readyState === 4) {
                    if (xhrTypograf.status === 200) {
                        bookCoverMonthBookDesc.innerHTML = xhrTypograf.responseText;
                    }
                    else
                        console.log('Ошибка: ' + xhrTypograf.status);
                }
            };
            xhrTypograf.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhrTypograf.send(params);

            let monthBookStatus = (monthBookCheckbox.checked) ? '1': '0';

            // Добавление в локальное хранилище
            localStorage.setItem('monthBookStatus' + id, monthBookStatus);
            localStorage.setItem('monthBookDesc' + id, description);
            localStorage.setItem('savingMonthBookInfo' + id, date);
        });


        priceCheckbox.addEventListener("click", toggleAppearingBlock);
        priceCheckbox.addEventListener("click", ()=>{
            if (titleInput.value != '') {
                if (priceCheckbox.checked == true && priceInput.value == '') {
                    bookAddingButton.classList.add('form__element__button-disabled');
                }
                else {
                    bookAddingButton.classList.remove('form__element__button-disabled');
                }
            }

            if (monthBookCheckbox.checked == true && monthBookDescInput.value == '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (stickerForPrice.style.display == 'none') {
                stickerForPrice.style.display = 'block';
            }
            else {
                stickerForPrice.style.display = 'none';
            }

            if (priceCheckbox.checked == true && priceInput.value != '') {
                stickerForPrice.innerHTML = priceInput.value + '&thinsp;€';
            }
            else {
                stickerForPrice.innerHTML = '';
            }

            let priceStatus = (priceCheckbox.checked) ? '1': '0';

            let price = 0;
            if (priceInput.value !== '') {
                price = priceInput.value;
            }

            // Добавление в локальное хранилище
            localStorage.setItem('priceStatus' + id, priceStatus);
            localStorage.setItem('price' + id, price);
            localStorage.setItem('savingPriceInfo' + id, date);
        });

        priceInput.onkeypress = allowDigit;
        priceInput.addEventListener('keyup', (e)=>{
            if (titleInput.value != '' && priceInput.value != '') {
                priceInput.classList.remove('form__element__input_invalid');
                bookAddingButton.classList.remove('form__element__button-disabled');
            }
            else {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (monthBookCheckbox.checked == true && monthBookDescInput.value == '') {
                bookAddingButton.classList.add('form__element__button-disabled');
            }

            if (priceInput.value != '') {
                stickerForPrice.innerHTML = priceInput.value + '&thinsp;€';
            }
            else {
                stickerForPrice.innerHTML = '';
            }

            let priceStatus = (priceCheckbox.checked) ? '1': '0';

            let price = 0;
            if (priceInput.value !== '') {
                price = priceInput.value;
            }

            // Добавление в локальное хранилище
            localStorage.setItem('priceStatus' + id, priceStatus);
            localStorage.setItem('price' + id, price);
            localStorage.setItem('savingPriceInfo' + id, date);

            if (e.keyCode === 13) {
                localStorage.removeItem('title' + id);
                localStorage.removeItem('savingTitleInfo' + id);
                localStorage.removeItem('author' + id);
                localStorage.removeItem('savingAuthorInfo' + id);
                localStorage.removeItem('publishingYear' + id);
                localStorage.removeItem('savingPublishingYearInfo' + id);
                localStorage.removeItem('publishingCity' + id);
                localStorage.removeItem('savingPublishingCityInfo' + id);
                localStorage.removeItem('monthBookStatus' + id);
                localStorage.removeItem('monthBookDesc' + id);
                localStorage.removeItem('savingMonthBookInfo' + id);
                localStorage.removeItem('priceStatus' + id);
                localStorage.removeItem('price' + id);
                localStorage.removeItem('savingPriceInfo' + id);
            }
        });

        bookAddingButton.addEventListener("click", ()=>{
            event.preventDefault();
            editBook(id);
        });

        // Удаление книги
        let deleteLink = document.querySelector('.form__element__remove-link');
        deleteLink.addEventListener('click', {handleEvent: removeBook, id: id});
    }

    fixTitleHeightWhenLongAuthor();
}

function searchBook(bookTitle) {
    let xhr = new XMLHttpRequest();
    let params = 'bookTitle=' + bookTitle;

    xhr.open('POST', '../php/search.php');
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                books.innerHTML = xhr.responseText;
                let gridItemCount = books.querySelectorAll('.grid__item').length;
                let screen = document.documentElement.clientWidth;

                putInPlacelinkToBookAdding(screen, books);

                // Если ничего не нашлось, у пользователя — шишка по центру, у админа — плюс по центру
                let linkToBookAdding = document.querySelector('.grid__item_link-to-book-adding');
                switch (xhr.responseText) {
                    case '':
                        books.innerHTML = '<div class="grid__item grid__item_place grid__item_center"><img src="/img/cone_small-size.jpg" class="grid__item_place__cone"></div>';

                        footerMobile.classList.remove('footer_mobile_bordered');
                        break;

                    case '<div class="grid__item grid__item_place grid__item_link-to-book-adding"><a href="+/" class="grid__item_link-to-book-adding__link grid__item_link-to-book-adding__link_desktop"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 74.73 72.82" class="grid__item_link-to-book-adding__link__icon"><defs><style>.a{fill:url(#a);}</style><linearGradient id="a" x1="37.5" y1="1.06" x2="37.5" y2="73.88" gradientUnits="userSpaceOnUse"><stop offset="0" class="grid__item_link-to-book-adding__link__icon__gradient-color grid__item_link-to-book-adding__link__icon__gradient-color_1"/><stop offset="1" class="grid__item_link-to-book-adding__link__icon__gradient-color grid__item_link-to-book-adding__link__icon__gradient-color_2"/></linearGradient></defs><title>Aggiungere un libro</title><path class="a" d="M33.84,40.81H.13V34.13H33.84V1.06h7.31V34.13H74.86v6.68H41.15V73.88H33.84Z" transform="translate(-0.13 -1.06)"/></svg></a><a href="+/" class="grid__item_link-to-book-adding__link grid__item_link-to-book-adding__link_mobile">Aggiungere nuovo libro…</a></div>':
                        if (linkToBookAdding != null && !linkToBookAdding.classList.contains('grid__item_center')) {
                            linkToBookAdding.classList.add('grid__item_center');
                        }

                        footerMobile.classList.remove('footer_mobile_bordered');
                        break;

                    default:
                        if (linkToBookAdding != null && linkToBookAdding.classList.contains('grid__item_center')) {
                            linkToBookAdding.classList.remove('grid__item_center');
                        }

                        if (!footerMobile.classList.contains('footer_mobile_bordered')) {
                            footerMobile.classList.add('footer_mobile_bordered');
                        }
                        break;

                }

                // Редактирование книги
                if (document.querySelector('.admin') != null) {
                    let gridItems = document.querySelectorAll('.page.admin .grid__item[data-id]');
                    let onHandsCheckbox = document.querySelectorAll('.form__element__label__checkbox_on-hands');
                    for (let i = 0; i < gridItems.length; i++) {
                        let id = document.querySelectorAll('.grid__item[data-id]')[i].getAttribute('data-id');
                        gridItems[i].addEventListener('click', {handleEvent: openEditPage, number: i}, true);

                        gridItems[i].addEventListener('mouseover', (e)=> {
                            gridItems[i].classList.add('grid__item_hover');

                            if (e.target.tagName == 'LABEL' || e.target.tagName == 'SPAN' || e.target.tagName == 'INPUT') {
                                gridItems[i].classList.remove('grid__item_hover');
                            }
                        });
                        gridItems[i].addEventListener('mouseout', ()=> {
                            gridItems[i].classList.remove('grid__item_hover');
                        });

                        onHandsCheckbox[i].addEventListener('click', {handleEvent: toggleBookOnHands, number: i, id: id}, true);
                    }
                }

                // Подставление текста из поиска при добавлении книги
                if (bookTitle !== '' && document.querySelector('.admin') != null) {
                    let titles = document.querySelectorAll('.grid__item__authortitle__title');
                    let authors = document.querySelectorAll('.grid__item__authortitle__author');

                    let titlesCoins = 0;
                    let authorsCoins = 0;

                    for (let i = 0; i < titles.length; i++) {
                        if (titles[i].innerHTML.indexOf(bookTitle) !== -1) {
                            titlesCoins++;
                        }
                    }

                    for (let i = 0; i < authors.length; i++) {
                        if (authors[i].innerHTML.indexOf(bookTitle) !== -1) {
                            authorsCoins++;
                        }
                    }

                    let type = '';
                    if (titlesCoins >= authorsCoins) {
                        type = 'title';
                    }
                    else {
                        type = 'author';
                    }

                    let getParams = '?type=' + type + '&text=' + bookTitle;

                    let addingLink = document.querySelectorAll('.grid__item_link-to-book-adding__link');
                    for (let i = 0; i < addingLink.length; i++) {
                        addingLink[i].setAttribute('href', '+/' + getParams);
                    }
                }
                else {
                    if (document.querySelector('.admin') != null) {
                        let addingLink = document.querySelectorAll('.grid__item_link-to-book-adding__link');
                        for (let i = 0; i < addingLink.length; i++) {
                            addingLink[i].setAttribute('href', '+/');
                        }
                    }
                }

                fixTitleHeightWhenLongAuthor();

                // Футер
                showMobileFooter();

                let footer = document.querySelectorAll('.footer')[1];
                if (xhr.responseText === '' || gridItemCount <= 7) {
                    footer.classList.add('footer_bottom-sticked');
                }
                else {
                    if (footer.classList.contains('footer_bottom-sticked')) {
                        footer.classList.remove('footer_bottom-sticked');
                    }
                }
            }
            else
                console.log('Ошибка: ' + xhr.status);
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function toggleAppearingBlock(e) {
    let elementIdentifier;
    if (e.type !== 'checkbox') {
        elementIdentifier = this.classList.value.split("checkbox_")[1]; // e.g. description
    }
    else {
        elementIdentifier = e.classList.value.split("checkbox_")[1]; // e.g. description
    }

    let label = '.form__label_' + elementIdentifier;
    let appearingLabel = document.querySelector(label);

    let inputBlock = '.form__element_' + elementIdentifier;
    let appearingInputBlock = document.querySelector(inputBlock);

    let input = '.form__element_' + elementIdentifier + ' .form__element__input';

    if (appearingInputBlock.style.display === 'none') {
        appearingLabel.style.display = 'block';
        appearingInputBlock.style.display = 'block';
        document.querySelector(input).focus();
    }
    else {
        appearingLabel.style.display = 'none';
        appearingInputBlock.style.display = 'none';
    }
}

function addBook(sendToEditor) {
    // Обязательное поле
    let title = titleInput.value;

    // Если не заполнено поле — у него появляется фокус и обводка
    if (title === '') {
        titleInput.focus();
        titleInput.classList.add('form__element__input_invalid');
        return;
    }
    else {
        titleInput.classList.remove('form__element__input_invalid');
    }

    // Необязательные поля
    let author = authorInput.value;

    let publishingCity = publishingCityInput.value;

    let publishingYear = publishingYearInput.value;

    let publishing = publishingCity;
    if (publishingYear != '') {
        if (publishingCity != '') {
            publishing += ', ';
        }
        publishing += publishingYear;
    }

    let monthBook = monthBookCheckbox.checked;
    let description = monthBookDescInput.value;
    if (monthBook == true) {
        monthBook = 1;

        if (description == '') {
            monthBookDescInput.focus();
            monthBookDescInput.classList.add('form__element__input_invalid');
            return;
        }
        else {
            monthBookDescInput.classList.remove('form__element__input_invalid');
        }
    }
    else {
        monthBook = 0;
        description = '';
    }

    let price = priceInput.value;
    if (priceCheckbox.checked == true) {
        if (price == '') {
            priceInput.focus();
            priceInput.classList.add('form__element__input_invalid');
            return;
        }
        else {
            priceInput.classList.remove('form__element__input_invalid');
        }
    }
    else {
        if (price == '') {
            price = 0;
        }
    }

    let xhr = new XMLHttpRequest();
    let params = 'title=' + title + '&author=' + author + '&publishing=' + publishing + '&price=' + price + '&monthBook=' + monthBook + '&description=' + description;

    xhr.open('POST', '../php/addBook.php');
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                form.style.display = 'none';

                let alertSuccess = document.createElement('div');
                alertSuccess.className = "book-editing__form__success";
                alertSuccess.innerHTML = '<div class="book-editing__form__success__alert">Libro aggiunto al catalogo. <a class="book-editing__form__success__alert__returning pseudolink">Annulla</a></div><div class="book-editing__form__success__clearingWrap"><a class="book-editing__form__success__clearingWrap__link pseudolink">Aggiungere un altro libro…</a></div>';
                formWrap.appendChild(alertSuccess);

                document.querySelector('.book-editing__form__success__alert__returning').addEventListener("click", returnBookAddingForm);
                document.querySelector('.book-editing__form__success__clearingWrap__link').addEventListener("click", clearBookAddingForm);

                if (sendToEditor) {
                    let bookID = xhr.responseText;

                    let xhrSendToEditor = new XMLHttpRequest();
                    let paramsSendToEditor = 'id=' + bookID;

                    xhrSendToEditor.open('POST', '../php/sendToEditor.php');
                    xhrSendToEditor.onreadystatechange=()=>{
                        if (xhrSendToEditor.readyState === 4) {
                            if (xhrSendToEditor.status === 200) {

                            }
                            else {
                                console.log('Ошибка: ' + xhrSendToEditor.status);
                            }
                        }
                    };
                    xhrSendToEditor.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhrSendToEditor.send(paramsSendToEditor);
                }
            }
            else {
                console.log('Ошибка: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function editBook(id) {
    // Обязательное поле
    let title = titleInput.value;

    // Если не заполнено поле — у него появляется фокус и обводка
    if (title == '') {
        titleInput.focus();
        titleInput.classList.add('form__element__input_invalid');
        return;
    }
    else {
        titleInput.classList.remove('form__element__input_invalid');
    }

    // Необязательные поля
    let author = authorInput.value;

    let publishingCity = publishingCityInput.value;

    let publishingYear = publishingYearInput.value;

    let publishing = publishingCity;
    if (publishingYear != '') {
        if (publishingCity != '') {
            publishing += ', ';
        }
        publishing += publishingYear;
    }

    let monthBook = monthBookCheckbox.checked;
    let description = monthBookDescInput.value;
    if (monthBook == true) {
        monthBook = 1;

        if (description == '') {
            monthBookDescInput.focus();
            monthBookDescInput.classList.add('form__element__input_invalid');
            return;
        }
        else {
            monthBookDescInput.classList.remove('form__element__input_invalid');
        }
    }
    else {
        monthBook = 0;
        description = '';
    }

    let price = priceInput.value;
    if (priceCheckbox.checked == true) {
        if (price == '') {
            priceInput.focus();
            priceInput.classList.add('form__element__input_invalid');
            return;
        }
        else {
            priceInput.classList.remove('form__element__input_invalid');
        }
    }
    else {
        price = 0;
    }

    let params = 'id=' + id + '&title=' + title + '&author=' + author + '&publishing=' + publishing + '&price=' + price + '&monthBook=' + monthBook + '&description=' + description;

    let xhr = new XMLHttpRequest();

    xhr.open('POST', '../php/editBook.php');
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                form.style.display = 'none';

                let alertSuccess = document.createElement('div');
                alertSuccess.className = "book-editing__form__success";
                alertSuccess.innerHTML = '<div class="book-editing__form__success__alert">Libro alterato. <a class="book-editing__form__success__alert__returning pseudolink">Annulla</a></div>';
                formWrap.appendChild(alertSuccess);

                document.querySelector('.book-editing__form__success__alert__returning').addEventListener("click", {handleEvent: returnBookEditingForm, id: id});
            }
            else {
                console.log('Ошибка: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);

    localStorage.removeItem('title' + id);
    localStorage.removeItem('savingTitleInfo' + id);
    localStorage.removeItem('author' + id);
    localStorage.removeItem('savingAuthorInfo' + id);
    localStorage.removeItem('publishingYear' + id);
    localStorage.removeItem('savingPublishingYearInfo' + id);
    localStorage.removeItem('publishingCity' + id);
    localStorage.removeItem('savingPublishingCityInfo' + id);
    localStorage.removeItem('monthBookStatus' + id);
    localStorage.removeItem('monthBookDesc' + id);
    localStorage.removeItem('savingMonthBookInfo' + id);
    localStorage.removeItem('priceStatus' + id);
    localStorage.removeItem('price' + id);
    localStorage.removeItem('savingPriceInfo' + id);
}

function returnBookAddingForm() {
    let title = titleInput.value;
    localStorage.setItem('newBookTitle', title);

    let author = authorInput.value;
    localStorage.setItem('newBookAuthor', author);

    let publishingCity = publishingCityInput.value;
    localStorage.setItem('newBookPublishingCity', publishingCity);

    let publishingYear = publishingYearInput.value;
    localStorage.setItem('newBookPublishingYear', publishingYear);

    let publishing = publishingCity;
    if (publishingYear !== '') {
        publishing += ', ' + publishingYear;
    }

    let monthBook = monthBookCheckbox.checked;
    let description = monthBookDescInput.value;
    if (monthBook === true) {
        monthBook = 1;
    }
    else {
        monthBook = 0;
    }

    localStorage.setItem('newBookMonthBookStatus', monthBook);
    localStorage.setItem('newBookMonthBookDesc', description);

    let priceStatus = (priceCheckbox.checked) ? '1': '0';
    let price = priceInput.value;
    if (price === '') {
        price = 0;
    }

    localStorage.setItem('newBookPriceStatus', priceStatus);
    localStorage.setItem('newBookPrice', price);

    let xhr = new XMLHttpRequest();
    let params = 'title=' + title + '&author=' + author + '&publishing=' + publishing + '&price=' + price + '&monthBook=' + monthBook + '&description=' + description;

    xhr.open('POST', '../php/removeBook.php');
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let alertSuccess = document.querySelector('.book-editing__form__success');
                formWrap.removeChild(alertSuccess);

                form.style.display = 'grid';
            }
            else {
                console.log('Ошибка: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function clearBookAddingForm() {
    if (document.location.search !== '') {
        history.pushState(null, null, '/+/');
    }

    authorInput.value = '';
    titleInput.value = '';
    publishingCityInput.value = '';
    publishingYearInput.value = '';

    monthBookCheckbox.checked = false;
    monthBookDescInput.value = '';
    let monthBookDescLabel = document.querySelector('.form__label_description');
    let monthBookDescInputBlock = document.querySelector('.form__element_description');
    if (monthBookDescInputBlock.style.display == 'block') {
        monthBookDescLabel.style.display = 'none';
        monthBookDescInputBlock.style.display = 'none';
    }

    priceCheckbox.checked = false;
    priceInput.value = '';
    let priceLabel = document.querySelector('.form__label_price');
    let priceInputBlock = document.querySelector('.form__element_price');
    if (priceInputBlock.style.display == 'block') {
        priceLabel.style.display = 'none';
        priceInputBlock.style.display = 'none';
    }

    let alertSuccess = document.querySelector('.book-editing__form__success');
    formWrap.removeChild(alertSuccess);

    bookCoverAuthor.innerHTML = '';
    bookCoverTitle.innerHTML = '';
    bookCoverPublishing.innerHTML = '';
    bookCoverMonthBookDesc.innerHTML = '';
    bookCoverMonthBook.style.display = 'none';
    bookCover.classList.remove('grid__item_month-book-color');
    stickerForPrice.innerHTML = '';
    stickerForPrice.style.display = 'none';
    form.style.display = 'grid';

    titleInput.focus();
}

function returnBookEditingForm(id) {
    // Получаем старые значения
    let title = titleInput.getAttribute('data-title');

    let author = authorInput.getAttribute('data-author');
    let publishingCity = publishingCityInput.getAttribute('data-publishingCity');
    let publishingYear = publishingYearInput.getAttribute('data-publishingYear');

    let publishing = publishingCity;
    if (publishingYear != '') {
        publishing += ', ' + publishingYear;
    }

    let monthBook = monthBookCheckbox.getAttribute('data-monthBook');
    let description = monthBookDescInput.getAttribute('data-monthBookDesc');
    if (monthBook === 'checked') {
        monthBook = 1;
    }
    else {
        monthBook = 0;
        description = '';
    }

    let price = priceInput.getAttribute('data-price');
    if (price === '') {
        price = 0;
    }

    let xhr = new XMLHttpRequest();

    let params = 'id=' + this.id + '&title=' + title + '&author=' + author + '&publishing=' + publishing + '&price=' + price + '&monthBook=' + monthBook + '&description=' + description;

    xhr.open('POST', '../php/editBook.php');
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let alertSuccess = document.querySelector('.book-editing__form__success');
                formWrap.removeChild(alertSuccess);

                // Подставление старых значений в форму
                authorInput.value = author;
                titleInput.value = title;
                publishingCityInput.value = publishingCity;
                publishingYearInput.value = publishingYear;

                if (monthBook === 1) {
                    monthBookCheckbox.checked = true;
                }
                else {
                    monthBookCheckbox.checked = false;
                }

                monthBookDescInput.value = description;
                let monthBookDescLabel = document.querySelector('.form__label_description');
                let monthBookDescInputBlock = document.querySelector('.form__element_description');
                let monthBookDisplay = '';
                if (monthBookCheckbox.checked === true) {
                    monthBookDisplay = 'block';
                }
                else {
                    monthBookDisplay = 'none';
                }
                monthBookDescLabel.style.display = monthBookDisplay;
                monthBookDescInputBlock.style.display = monthBookDisplay;

                let priceLabel = document.querySelector('.form__label_price');
                let priceInputBlock = document.querySelector('.form__element_price');
                let priceDisplay = '';
                if (price !== 0) {
                    priceCheckbox.checked = true;
                    priceDisplay = 'block';
                    priceInput.value = price;
                }
                else {
                    priceCheckbox.checked = false;
                    priceDisplay = 'none';
                    priceInput.value = '';
                }
                priceLabel.style.display = priceDisplay;
                priceInputBlock.style.display = priceDisplay;

                // Подставление старых значений в обложку
                bookCoverAuthor.innerHTML = author;
                bookCoverTitle.innerHTML = title;
                bookCoverPublishing.innerHTML = publishing;
                bookCoverMonthBookDesc.innerHTML = description;
                bookCoverMonthBook.style.display = monthBookDisplay;

                if (monthBookCheckbox.checked === true) {
                    bookCover.classList.add('grid__item_month-book-color');
                }
                else {
                    bookCover.classList.remove('grid__item_month-book-color');
                }

                if (price !== 0) {
                    stickerForPrice.innerHTML = price;
                }
                else {
                    stickerForPrice.innerHTML = '';
                }

                stickerForPrice.style.display = priceDisplay;

                form.style.display = 'grid';
            }
            else {
                console.log('Ошибка: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function toggleBookOnHands(e) {
    let onHandsCheckbox = document.querySelectorAll('.form__element__label__checkbox_on-hands')[this.number];

    let onHandsStatus = 1;
    if (onHandsCheckbox.checked == false) {
        onHandsStatus = 0;
    }

    let xhr = new XMLHttpRequest();
    let params = 'id=' + this.id + '&onHandsStatus=' + onHandsStatus;

    xhr.open('POST', '../php/toggleBookOnHands.php');
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {

            }
            else {
                console.log('Ошибка: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function openEditPage(e) {
    let book = document.querySelectorAll('.grid__item[data-id]')[this.number];
    let id = book.getAttribute('data-id');
    if (e.target.tagName == 'LABEL' || e.target.tagName == 'SPAN' || e.target.tagName == 'INPUT') {

    }
    else {
        window.location.replace('http://accademiapigna.sidorchik.ru/alterare/?libro=' + id);
    }
}

function removeBook() {
    let xhr = new XMLHttpRequest();
    let params = 'id=' + this.id;

    xhr.open('POST', '../php/removeBook.php');
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let form = document.querySelector('.form');
                form.style.display = 'none';

                let alertSuccess = document.createElement('div');
                alertSuccess.className = "book-editing__form__success book-editing__form__success-remove";
                alertSuccess.innerHTML = '<div class="book-editing__form__success__alert">Libro eliminato. <a class="book-editing__form__success__alert__removing pseudolink">Annulla</a></div>';
                formWrap.appendChild(alertSuccess);

                let returnLink = document.querySelector('.book-editing__form__success__alert__removing');
                returnLink.addEventListener('click', {handleEvent: returnBook, id: this.id});
            }
            else {
                console.log('Ошибка: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function returnBook() {
    let title = document.querySelector('.grid__item__authortitle__title').innerHTML;

    let author = '';
    let authorBlock = document.querySelector('.grid__item__authortitle__author');
    if (authorBlock != null) {
        author = authorBlock.innerHTML;
    }

    let publishing = document.querySelector('.grid__item__publishing').innerHTML;

    let monthBookBlock = document.querySelector('.month-book');
    let description = '';
    let monthBook = 0;
    if (monthBookBlock.style.display == 'block') {
        monthBook = 1;
        description = document.querySelector('.month-book__wrap__description').innerHTML;
    }

    let price = 0;
    let priceBlock = document.querySelector('.grid__item__sticker_price');
    if (priceBlock.style.display == 'block') {
        price = priceBlock.innerHTML;
    }


    // Добавление удалённой книги в базу данных
    let xhr = new XMLHttpRequest();
    let params = 'id=' + this.id + '&title=' + title + '&author=' + author + '&publishing=' + publishing + '&price=' + price + '&monthBook=' + monthBook + '&description=' + description;
    xhr.open('POST', '../php/addBook.php');
    xhr.onreadystatechange=()=>{
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                let form = document.querySelector('.form');
                form.style.display = 'grid';

                let alertSuccess = document.querySelector('.book-editing__form__success');
                formWrap.removeChild(alertSuccess);
            }
            else {
                console.log('Ошибка: ' + xhr.status);
            }
        }
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(params);
}

function editTitle(screen, searchInput, h1) {
    // Для главной страницы, когда плейсхолдер поискового поля имитирует h1
    if (searchInput != null) {
        if (screen < 711) {
            if (screen < 535) {
                searchInput.placeholder = 'Pigna';
            }
            else {
                searchInput.placeholder = 'Cercare nella biblioteca della Pigna';
            }
        }
        else {
            searchInput.placeholder = 'Cercare libri nella piccola biblioteca della Pigna';
        }
    }

    // Для страниц добавления и редактирования книги
    if (h1 != null) {
        if (screen < 711) {
            if (screen < 535) {
                h1.innerHTML = 'Pigna';
            }
            else {
                h1.innerHTML = 'Cercare nella biblioteca della Pigna';
            }
        }
        else {
            h1.innerHTML = 'Cercare libri nella piccola biblioteca della Pigna';
        }
    }
}

function putInPlacelinkToBookAdding(screen, books) {
    let linkToBookAdding = document.querySelector('.grid__item_link-to-book-adding');

    if (linkToBookAdding != null) {
        books.removeChild(linkToBookAdding);

        if (screen < 535) {
            books.insertBefore(linkToBookAdding, books.firstChild);
        }
        else {
            if (screen < 711) {
                books.insertBefore(linkToBookAdding, books.children[2]);
            }
            else {
                if (screen < 892) {
                    books.insertBefore(linkToBookAdding, books.children[3]);
                }
                else {
                    if (screen < 1060) {
                        books.insertBefore(linkToBookAdding, books.children[4]);
                    }
                    else {
                        if (screen < 1230) {
                            books.insertBefore(linkToBookAdding, books.children[5]);
                        }
                        else {
                            books.insertBefore(linkToBookAdding, books.children[6]);
                        }
                    }
                }
            }
        }
    }
}

function adaptBookForm(screen, bookEditing, bookEditingForm, bookEditingCover, bookEditingMonthBook) {
    if (bookEditing != null && bookEditingForm != null && bookEditingCover != null && bookEditingMonthBook != null) {
        if (screen < 892) {
            bookEditing.insertBefore(bookEditingCover, bookEditingForm);
            bookEditing.insertBefore(bookEditingMonthBook, bookEditingForm);
        }
        else {
            bookEditing.appendChild(bookEditingCover);
            bookEditing.appendChild(bookEditingMonthBook);
        }

        let publishingYearLabel = document.querySelector('.form__label__label_publishing-year');
        if (screen < 535) {
            publishingYearLabel.innerHTML = 'Anno pubblicazione';
        }
        else {
            publishingYearLabel.innerHTML = 'Anno&nbsp;pub-<br>blicazione';
        }

        let descriptionLabel = document.querySelector('.form__label__label_description');
        if (screen < 535) {
            descriptionLabel.innerHTML = 'Descrizione';
        }
        else {
            descriptionLabel.innerHTML = 'Descri-<br>zione';
        }
    }
}

function fixTitleHeightWhenLongAuthor() {
    let booksAuthorTitle = document.querySelectorAll('.grid__item__authortitle');
    let booksAuthor = document.querySelectorAll('.grid__item__authortitle__author');
    let bookCoverAuthorHeight;

    for (let i = 0; i < booksAuthor.length; i++) {
        bookCoverAuthorHeight = window.getComputedStyle(booksAuthor[i]).height;

        switch (bookCoverAuthorHeight) {
            case '30px':
                booksAuthorTitle[i].classList.remove('grid__item__authortitle_author-lines_three');
                booksAuthorTitle[i].classList.add('grid__item__authortitle_author-lines_two');
                break;
            case '58px':
                booksAuthorTitle[i].classList.remove('grid__item__authortitle_author-lines_three');
                booksAuthorTitle[i].classList.add('grid__item__authortitle_author-lines_two');
                break;

            case '45px':
                booksAuthorTitle[i].classList.remove('grid__item__authortitle_author-lines_two');
                booksAuthorTitle[i].classList.add('grid__item__authortitle_author-lines_three');
                break;
            case '87px':
                booksAuthorTitle[i].classList.remove('grid__item__authortitle_author-lines_two');
                booksAuthorTitle[i].classList.add('grid__item__authortitle_author-lines_three');
                break;
        }
    }
}

function showMobileFooter() {
    let screen = document.documentElement.clientWidth;

    if (screen < 535) {
        books.insertBefore(footerMobile, books.children[3]);
    }
    else {
        if (books.querySelector('.footer_mobile')) {
            books.removeChild(footerMobile);
        }
    }

    window.addEventListener("resize", () => {
        if (document.documentElement.clientWidth < 535) {
            books.insertBefore(footerMobile, books.children[3]);
        }
        else {
            if (books.querySelector('.footer_mobile') ) {
                books.removeChild(footerMobile);
            }
        }
    });
}

function preventDefault() {
    event.preventDefault();
}

function getChar(event) {
    if (event.which == null) {
        if (event.keyCode < 32) return null;
        return String.fromCharCode(event.keyCode) // IE
    }

    if (event.which != 0 && event.charCode != 0) {
        if (event.which < 32) return null;
        return String.fromCharCode(event.which) // остальные
    }

    return null; // специальная клавиша
}

function allowDigit(e) {
    e = e || event;

    if (e.ctrlKey || e.altKey || e.metaKey) return;

    var chr = getChar(e);

    // с null надо осторожно в неравенствах,
    // т.к. например null >= '0' => true
    // на всякий случай лучше вынести проверку chr == null отдельно
    if (chr == null) return;

    if (chr < '0' || chr > '9') {
        return false;
    }

    if (publishingYearInput.value == '' && chr == '0') {
        return false;
    }
}

function convertMonth(month) {
    switch (month) {
        case 1:
            return 'gen';
            break;
        case 2:
            return 'feb';
            break;
        case 3:
            return 'mar';
            break;
        case 4:
            return 'apr';
            break;
        case 5:
            return 'mag';
            break;
        case 6:
            return 'giu';
            break;
        case 7:
            return 'lug';
            break;
        case 8:
            return 'ago';
            break;
        case 9:
            return 'set';
            break;
        case 10:
            return 'ott';
            break;
        case 11:
            return 'nov';
            break;
        case 12:
            return 'dic';
            break;
    }
}