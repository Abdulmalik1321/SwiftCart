import { Filters } from "./components/Filters";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <main className="h-screen flex flex-col items-center">
      <NavBar />
      <Filters />
    </main>
  );
}

export default App;
