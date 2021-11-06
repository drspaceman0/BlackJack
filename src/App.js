import ReactDOM from "react-dom";
import Game from "./Game";

const App = () => {
  return (
    <div className="main">
      <header>BlackJack</header>
      <Game />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
