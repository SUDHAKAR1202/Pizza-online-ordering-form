import './App.css';
import UserRegistration from "./components/UserRegistration";
import PizzaOrderform from './components/PizzaOrderform';

export default function App() {
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

   <UserRegistration/>
   <PizzaOrderform />

    </div>
  
  );
}



