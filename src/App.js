import './App.css';
import Grid from "./components/Grid";

function App() {
  return (
    <div className="App">
      <h1>Falling Rain Grid</h1>
      <div className="centerApp">
      <Grid rows={20} cols={15} />

      </div>
      
   
    </div>
  );
}

export default App;
