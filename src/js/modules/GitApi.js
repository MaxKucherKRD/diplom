export default class GitApi {
    constructor(){
        this.options = "https://api.github.com/repos/MaxKucherKRD/diplom/commits";
    }
    getCommits(){
        this.request = new Request(this.options)
        return  fetch(this.request)
        .then(res => {
            if (!res.ok) {                           
                return  Promise.reject(res.status);
              }
              else {
               return res.json();
              }
        })
    }
};