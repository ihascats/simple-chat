import './App.css';
import Chat from './components/Chat';
import Nav from './components/Nav';

function App() {
  return (
    <div className="wrapper">
      <Nav />
      <Chat />
      <footer>
        MADE BY <a href="https://github.com/ihascats">IHASCATS</a>
      </footer>
    </div>
  );
}

export default App;
