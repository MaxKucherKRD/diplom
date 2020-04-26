import '../pages/about.css';
import GitApi from './modules/GitApi.js';
import CommitCard from './components/CommitCard';
import CommitCardList from './components/CommitCardList';
const Flickity = require('flickity');

const test = new CommitCardList(CommitCard,GitApi,Flickity);
test.addCard();

