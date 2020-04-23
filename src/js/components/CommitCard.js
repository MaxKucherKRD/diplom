export default class CommitCard {
    constructor(date,name,email,commit,url){
        this.cardElement = this.createCard(date,name,email,commit,url)
    }
    createCard(date,name,email,commit,urlImage){
        const transDate = this._transformDate(date);
        const nameCommiter = name === 'unknown' ? "Maxim Kucherenko" : name; // Конфиг гита был не настроен, имя первого коммитера "unknown"
        const markup = `
            <p class="carousel__date">${transDate}</p>
            <div class="carousel__user-container">
              <img src="${urlImage}" alt="" class="carousel__avatar">
              <div class="carousel__user-info">
                <h3 class="carousel__user-name">${nameCommiter}</h3>
                <p class="carousel__user-mail">${email}</p>
              </div>
            </div>
            <p class="carousel__text">${commit}</p>
        `
        this.card = document.createElement('div')
        this.card.classList.add('carousel__cell')
        this.card.insertAdjacentHTML('afterbegin', markup);
        
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
        
            const transDate = `${day} ${mounth}`           
      return  transDate
    } 
}