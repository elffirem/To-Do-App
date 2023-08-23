import List from "./components/List";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="app-container">
      <Header />
      <List></List>
      <Footer />
    </div>
  );
};

export default App;
