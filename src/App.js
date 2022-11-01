import './App.css';
import { Routes,Route } from 'react-router-dom';
import Pagina from './pagina/pagina';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="container">
          <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-custom-2">
            <div class="container-fluid">
              <a class="navbar-brand" href="#">Redes</a>
            </div>
          </nav>
        </div>
        <br/>
        <Routes>
          <Route exact path='/' element={<Pagina />} />
        </Routes>
      </header>
    </div>
  );
}

export default App;
