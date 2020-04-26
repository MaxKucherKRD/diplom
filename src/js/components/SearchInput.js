
export default class SearchInput {
    constructor(NewsCardList){
        this.NewsCardList = NewsCardList        
        this.form = document.querySelector('.header__search-field');
        this.elementContainer = document.querySelector('.news__items');
        this.formInput = document.querySelector('.header__input');
        this.formButton = document.querySelector('.header__button');
        this.formError = document.querySelector('.header__error');
        this.form.addEventListener('submit',()=>{
            this.getKeyWord(event);
        });
        this.form.addEventListener('input', () => {
            this._validate();
        } )
    }
    getKeyWord(event){       
        event.preventDefault() 
       if (this._validate()){         
        this.NewsCardList.addCard(this.form.input.value.replace(/<.*?>/g, "")); // replace - Защита от XSS
       } 
     
    }
    _validate(){
        if (this.form.checkValidity()){
            this.formError.style.opacity = '0'
            this.formButton.removeAttribute('disabled');
            this.formButton.classList.remove('header__button_inactive')            
            return true
        }
        else {
            this.formError.style.opacity = '1'            
            this.formButton.setAttribute('disabled','true');    
            this.formButton.classList.add('header__button_inactive')
            return false
        }

    }
   

}