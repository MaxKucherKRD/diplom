export default class NewsCardList {
    constructor(NewsCard, NewsApi) {
        this.NewsApi = (querry) =>  new NewsApi( querry, '2020-04-18', '2020-04-16')       
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
        const Api = this.NewsApi(querry)
        this.renderNews(1);
        Api.getNews()
            .then(data => {
                console.log(data);
                if (data.totalResults === 0) {
                    return Promise.reject(3)
                }
                if (data.totalResults < 3) {
                    this.buttonMore.classList.add('news__button_hidden');
                }
                localStorage.clear();
                data.articles.forEach((item, index) => {
                    localStorage.setItem(index, item.publishedAt);
                    const newCard = this.createCard(item.url, item.urlToImage, item.publishedAt, item.title, item.description, item.source.name);
                    const {cardElement} = newCard;
                    if (index > 2) {
                        cardElement.classList.add('news__item_hidden')
                    } // Рендерим только первые 3, остальные скрываем
                    this.elementContainer.appendChild(cardElement);
                })
            })
            .then(() => {
                this.renderNews(2);
            })
            .catch((status) => {
                console.log(status);
                this.renderNews(status);
            })
    }
    renderNews(status) {
        switch (status) {
            case 1: // кейс 1 идет загрузка
                this.elementPreloader.classList.remove('news__load_hidden')
                this.elementNews.classList.add('news__container_hidden')
                this.elementNotFound.classList.add('news__not-found_hidden')
                this.elementError.classList.add('news__error_hidden');
                break;
            case 2: // кейс 2 новость найденна
                this.elementPreloader.classList.add('news__load_hidden')
                this.elementNews.classList.remove('news__container_hidden')
                this.elementNotFound.classList.add('news__not-found_hidden')
                this.elementError.classList.add('news__error_hidden');
                break;
            case 3: // кейс 3 ничего оне найденно
                this.elementPreloader.classList.add('news__load_hidden')
                this.elementNews.classList.add('news__container_hidden')
                this.elementNotFound.classList.remove('news__not-found_hidden')
                this.elementError.classList.add('news__error_hidden');
                break;
            case 4: // кейс 4 произошла ошибка на стороне сервера
                this.elementPreloader.classList.add('news__load_hidden')
                this.elementNews.classList.add('news__container_hidden')
                this.elementNotFound.classList.add('news__not-found_hidden')
                this.elementError.classList.remove('news__error_hidden');
                break;
        }
    }
    showMore() {     
       
           
        const items = document.getElementsByClassName('news__item_hidden')
      
        for (let i = 0; i < 3; i++) {  // Достаем 3 элемента
           try {    // Если оставшихся элементов осталось меньше 3, пользователь не увидет ошибку.
            items[0].classList.remove('news__item_hidden') 
            console.log(items);
           }
           catch {               
           }
        }
        if (items.length === 0) {
            this.buttonMore.classList.add('news__button_hidden') 
        }
    }

}