import logo from './logo.svg';
import { Header } from './components/Header';
import { PetsCollection } from './components/PetsCollection';
function App() {
  return (
    <div className="container">
      <Header />
      <PetsCollection />
    </div>
  );
}

export default App;
