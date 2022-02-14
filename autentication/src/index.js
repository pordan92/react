import ReactDOM from 'react-dom';

import './index.css';
import App from './App';
import { AccountContextProvider } from './storage/dataBase';

ReactDOM.render(<AccountContextProvider><App/></AccountContextProvider>, document.getElementById('root'));
