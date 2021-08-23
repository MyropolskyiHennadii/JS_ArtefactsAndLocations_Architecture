import React from 'react';
//import './App.css';
import MainPaneComponent from './components/MainPaneComponent';

function App() {
  document.body.style.backgroundColor = "rgb(70, 68, 92)";
  //"rgb(179, 181, 255)";
  //"rgb(70, 68, 92)";
  return (
    <div className="App">
      <MainPaneComponent/>
    </div>
  );
}

export default App;
