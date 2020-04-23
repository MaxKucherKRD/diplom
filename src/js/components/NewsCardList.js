export default class NewsCardList {
    constructor(NewsCard, NewsApi,calcTime) {
        this.today = 0
        this.weekAgo = 6 // количество дней назад (отсчет с 0)
        this.calcTime = calcTime;        
        this.today = calcTime(this.today); // сегодняшняя дата
        this.calcDay = calcTime(this.weekAgo); // неделя назад 
        this.NewsApi = (querry) =>  new NewsApi( querry,            
            `${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`,  // получаем дату в нужном формате ГГГГ-ММ-ДД
            `${this.calcDay.getFullYear()}-${this.calcDay.getMonth() + 1}-${this.calcDay.getDate()}`
            )       
        this.createCard = (link, imageLink, date, title, description, author) => new NewsCard(link, imageLink, date, title, description, author)
        this.elementContainer = document.querySelector('.news__items');
        this.elementPreloader = document.querySelector('.news__load');
        this.elementNotFound = document.querySelector('.news__not-found');
        this.elementNews = document.querySelector('.news__container');
        this.elementError = document.querySelector('.news__error');
        this.buttonMore = document.querySelector('.news__button')
        this.buttonMore.addEventListener('click', ()=>{this.showMore()});    
    }

    addCard(querry) {         
        const api = this.NewsApi(querry)
        this._renderNews("load");
        localStorage.clear();  
        while (this.elementContainer.firstChild) {
           this.elementContainer.removeChild(this.elementContainer.firstChild);
        }
        api.getNews()
            .then(news => {
                localStorage.setItem('querryResult',JSON.stringify(news))                
                localStorage.setItem('querry',querry) 
                if (news.totalResults === 0) {
                    return Promise.reject("notFound")
                }
                if (news.totalResults <= 3) {
                    this.buttonMore.classList.add('news__button_hidden');
                }                           
                news.articles.forEach((item, index) => {   
                                
                    const newCard = this.createCard(item.url, item.urlToImage, item.publishedAt, item.title, item.description, item.source.name);
                    const {cardElement} = newCard;                                          
                    if (index > 2) {
                        cardElement.classList.add('news__item_hidden')// Рендерим только первые 3, остальные скрываем
                    } 
                    this.elementContainer.appendChild(cardElement);
                })
            })
            .then(() => {               
                this._renderNews("newsReady");
            })
            .catch((status) => {               
                this._renderNews(status);
            })
           
         
    }
    _renderNews(status) {
        switch (status) {
            case "load": // кейс 1 идет загрузка
                this.elementPreloader.classList.remove('news__load_hidden')
                this.elementNews.classList.add('news__container_hidden')
                this.elementNotFound.classList.add('news__not-found_hidden')
                this.elementError.classList.add('news__error_hidden');
                break;
            case "newsReady": // кейс 2 новость найденна
                this.elementPreloader.classList.add('news__load_hidden')
                this.elementNews.classList.remove('news__container_hidden')
                this.elementNotFound.classList.add('news__not-found_hidden')
                this.elementError.classList.add('news__error_hidden');
                break;
            case "notFound": // кейс 3 ничего оне найденно
                this.elementPreloader.classList.add('news__load_hidden')
                this.elementNews.classList.add('news__container_hidden')
                this.elementNotFound.classList.remove('news__not-found_hidden')
                this.elementError.classList.add('news__error_hidden');
                break;
            case "err": // кейс 4 произошла ошибка на стороне сервера
                this.elementPreloader.classList.add('news__load_hidden')
                this.elementNews.classList.add('news__container_hidden')
                this.elementNotFound.classList.add('news__not-found_hidden')
                this.elementError.classList.remove('news__error_hidden');
                break;
        }
    }
    showMore() {  
       
           
        this.items = document.querySelectorAll('.news__item_hidden')
        const cardLimit = 3
        for (let i = 0; i < cardLimit; i++) {  // Достаем 3 элемента
           try {    // Если оставшихся элементов осталось меньше 3, пользователь не увидет ошибку.
            this.items[i].classList.remove('news__item_hidden')            
           }
           catch {               
           }     
        }
        if (this.items.length <= cardLimit) { // скрываем кнопку, если нет скрытых карточек.
            this.buttonMore.classList.add('news__button_hidden') 
        }
    }

}