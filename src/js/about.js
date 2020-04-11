import '../pages/about.css';

const Flickity = require('flickity');
const carousel = document.querySelector('.carousel__container');
const flkty = new Flickity( carousel, {
    wrapAround : true 
    
  });