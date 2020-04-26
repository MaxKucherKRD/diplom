export default class NewsCard {
    constructor(link, imageLink, date, title, description, author) {

        this.cardElement = this.createCard(link, imageLink, date, title, description, author);

    }

    createCard(link, imageLink, date, title, description, author) {      
        const transDate = this._transformDate(date);     
        const clearDesciption = description === null ? '' :description.replace(/<.*?>/g, "");// Некоторые новости приходят, в тегах или null, чистим их.    
        const NewsMarkup =
            `
     <a href="${link}" target="_blank" class='news__link'>
     <img src="${imageLink}" alt="Фото новости" onerror = "this.src = './images/no.jpg'" class="news__img"> 
     <div class="news__content">
       <p class="news__date">${transDate}</p>
       <h4 class="news__title">${title}</h4>
       <p class="news__text">${clearDesciption}</p>
       <p class="news__author"> ${author} </p>
     </div>
     </a>   
     `       
        this.card = document.createElement('div')
        this.card.classList.add('news__item');
        this.card.insertAdjacentHTML("afterbegin", NewsMarkup);     
        
        return this.card;
    }
    _transformDate(date) {
        let day = date.match(/\d\dT/g)
        day = parseInt(day[0]);
        let mounth = date.match(/-\d\d\-/g);
        mounth = parseInt(mounth[0].substr(1));
        switch(mounth) {
            case 1 : mounth = 'января'; break;
            case 2 : mounth = 'февраля'; break;
            case 3 : mounth = 'марта'; break;
            case 4 : mounth = 'апреля'; break;
            case 5 : mounth = 'мая'; break;
            case 6 : mounth = 'июня'; break;
            case 7 : mounth = 'июля'; break;
            case 8 : mounth = 'августа'; break;
            case 9 : mounth = 'сентября'; break;
            case 10 : mounth = 'октября'; break;
            case 11 : mounth = 'ноября'; break;
            case 12 : mounth = 'декабря'; break;
            }
        let year = date.match(/\d\d\d\d/g)     
            const transDate = `${day} ${mounth}, ${year}`           
      return    transDate
    } 
}