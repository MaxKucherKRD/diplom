export default class Statistics {
    constructor(calcDate) {
        this.calcDate = calcDate;
        this.querry = localStorage.getItem('querry');
        this.tittleElement = document.querySelector('.numbers__title');
        this.NewsForWeekElement = document.querySelector('#NewsForWeek');
        this.MatchTitle = document.querySelector('#MatchTitle')
        this.datesContainer = document.querySelector('.charts__dates')
        this.querryResult = JSON.parse(localStorage.getItem('querryResult'));
        this.chartsCount = document.querySelectorAll('.charts__count');
        this.dates = document.querySelectorAll('.charts__date');
        this.regexp = new RegExp(`${this.querry}`, 'gmi') //        
        this._setTittle();
        this._setNewsForWeek();
        this._setMatchTitle();
        this._setDates();
        this._setCharts();
    }

    countMatchTittle() {

    }
    _setTittle() {
        this.tittleElement.textContent = `Вы спросили: «${this.querry}»`;
    }
    _setNewsForWeek() {
        this.NewsForWeekElement.textContent = this.querryResult.totalResults;
    }
    _setMatchTitle() {
        this.arrMatchTitle = this.querryResult.articles.filter((item) => {                   
            if (item.title !== null){                
                return item.title.match(this.regexp)
            };
        })
        this.MatchTitle.textContent = this.arrMatchTitle.length


    }
    _setCharts() {
        
        this.results = {}
        this.querryResult.articles.forEach((item) => {          
            if (item.title === null) { return 0}
            let count = 0;
            const itemWithoutHour = item.publishedAt.substr(8, 2)
            count = item.title.match(this.regexp) === null ? 0 : item.title.match(this.regexp).length
            count = item.description.match(this.regexp) === null ? count : count + item.description.match(this.regexp).length
            this.results[itemWithoutHour] = this.results[itemWithoutHour] + count || 1

        });
      
        this.keysResult = Object.keys(this.results)
        this.keysResult.forEach((item) => {
            for (let i = 0; i < this.dates.length; i++) {               
                if (parseInt(this.dates[i].textContent.substr(0, 2)) === parseInt(item)) {                   
                    const dataId = this.dates[i].dataset.day
                    const chartElement = document.querySelector(`.charts__count[data-chart = "${dataId}"]`)
                    chartElement.style.width = `${this.results[item]}%`
                    chartElement.textContent = this.results[item]
                }
            }
        })

    }
    _setDates() {
        for (let i = 0, b = this.dates.length - 1; i < this.dates.length; i++, b--) {
            const date = this.calcDate(i).getDate();
            const dayOfWeek = this._transDayOfWekk(this.calcDate(i).getDay());
            this.dates[b].textContent = `${date},${dayOfWeek}`

        }
    }
    _transDayOfWekk(x) {
        switch (x) {
            case 0:
                return 'пн'
            case 1:
                return 'вт'
            case 2:
                return 'ср'
            case 3:
                return 'чт'
            case 4:
                return 'пт'
            case 5:
                return 'сб'
            case 6:
                return 'вс'

        }
    }
}