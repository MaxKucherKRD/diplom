import '../pages/index.css';
import '../images/no.jpg';
import NewsApi from './modules/NewsApi.js';
import NewsCard from './components/NewsCard.js';
import NewsCardList from './components/NewsCardList.js';
import SearchInput from './components/SearchInput.js';
import calcDate from './utils/calcDate';

let newsCardList = new NewsCardList(NewsCard,NewsApi,calcDate);
new SearchInput(newsCardList);








