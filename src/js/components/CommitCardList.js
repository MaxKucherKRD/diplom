export default class CommitCardList {
    constructor(CommitCard, GitApi, Flickity) {
        this.Flickity = Flickity;
        this.containerElements = document.querySelector('.carousel__container')
        this.sectionCarousel = document.querySelector('.carousel')
        this.GitApi = new GitApi;
        this.CommitCard = (date, name, email, commit, url) => new CommitCard(date, name, email, commit, url);
    }
    addCard() {
        this.GitApi.getCommits()
            .then(data => {
                data.forEach((element,index) => {
                    if (index > (data.length-20)){ // Последние 20 коммитов
                    const newCard = this.CommitCard(element.commit.committer.date, element.commit.committer.name, element.commit.committer.email, element.commit.message, element.author.avatar_url)
                    const {
                        cardElement
                    } = newCard;
                    this.containerElements.appendChild(cardElement);
                }
                });
            })
            .then(() => {
                new this.Flickity(
                    this.containerElements, {
                        wrapAround: true,
                        freeScroll: true,
                        autoPlay: '1'
                    }
                )
            })
            .catch((err) => {
                this.sectionCarousel.style.textAlign = 'center'
                this.sectionCarousel.innerHTML = `
         <h4 class='content-title'>Упс! Произошла ошибка ${err}<h4>
         <p class = 'content-subtitle'>Здесь должен был быт слайдер :( </p>
         `
            })
    }
}