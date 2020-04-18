export default class NewsApi {
    constructor(querry,todayDate,weekAgoDate){
        this.querry = querry;
        this.todayDate= todayDate;
        this.weekAgoDate= weekAgoDate;         

        this.url =  'http://newsapi.org/v2/everything?'+
                    `q=${this.querry}&` +
                    `from=${this.weekAgoDate}&` +
                    `to=${this.todayDate}&` +       
                    'sortBy=popularity&' +
                    'pageSize=100&' +
                    `apiKey=d77d576b2bdc4d2eaa1e47eadc9b9428`;     
       
        
    }

    getNews() {
        this.request = new Request(this.url);
        return fetch(this.request)
        .then(res=> {                              
           if (!res.ok) {                           
             return  Promise.reject(4)
           }
           else {
            return res.json();
           }
        })              
    }

}