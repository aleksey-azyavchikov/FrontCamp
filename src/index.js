import { Storage }  from './components/storage';
import { ValidationFactory }  from './components/validation';
import { Constants }   from './components/consts';
import { HomePage }  from './pages/home/home';
import { NewsPage }  from './pages/news/news';

$(document).ready(() => {
    let storage = new Storage(localStorage);
    let apiKey = storage.getItem(Constants.key);
    if(apiKey !== null) {
        new NewsPage({
        key: Constants.key,
        storage: storage,
        content: "./pages/news/news.html",
        validationFactory: new ValidationFactory()

        }).buildPage();
    } else {
        new HomePage({
            key: Constants.key,
            storage: storage,
            content: "./pages/home/home.html",
            validationFactory: new ValidationFactory()
        }).buildPage();
    }
});