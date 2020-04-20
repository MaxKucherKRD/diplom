

export default class CommitCardList {
    constructor(CommitCard,GitApi,Flickity){
        this.Flickity = Flickity;
        this.containerElements = document.querySelector('.carousel__container')               
        this.GitApi = new GitApi;
        this.CommitCard = (date,name,email,commit,url) =>   new CommitCard(date,name,email,commit,url) ;
    }
    addCard(){        
        this.GitApi.getCommits()
        .then(data => {
            data.forEach(element => {
            
               const newCard = this.CommitCard(element.commit.committer.date,element.commit.committer.name,element.commit.committer.email,element.commit.message,element.author.avatar_url)
               const {cardElement} = newCard;              
               this.containerElements.appendChild(cardElement); 
             
            });
        })
        .then(() => 
            {
                new this.Flickity(
                    this.containerElements,{
                        wrapAround : true
                    }
                )
            }  
        )
    }
}