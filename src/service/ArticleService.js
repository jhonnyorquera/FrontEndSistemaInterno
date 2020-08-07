import axios from 'axios';
import GlobarUrlAplli from '../components/GlobalUrlApli';


export class ArticleService {
    urlArticles=GlobarUrlAplli.urlArticulo;
    
    getArticulos() {
        return axios.get('http://localhost:8080/api/Articulo/')
                .then(res => res.articulos);
    }
}