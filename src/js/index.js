import '../pages/index.css';
import NewsApi from './modules/NewsApi.js';
import NewsCard from './components/NewsCard.js';
import NewsCardList from './components/NewsCardList.js';
import SearchInput from './components/SearchInput.js';

let newsCardList = new NewsCardList(NewsCard,NewsApi);
new SearchInput(newsCardList);





