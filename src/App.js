import Navbar from './components/Navbar';
import SignIn from './components/Signin';
import './style/App.css';
import { useAuth } from './firebase/AuthContext'; 
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import User from './pages/User';
import MovieSearch from './pages/Movie';
import Homepage from './pages/homepage';
import Anime from './pages/Anime';


const App = () => {
  const { currentUser } = useAuth();

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes> 
          <Route path="/" element={<>{currentUser ? <Homepage /> : <SignIn />}</>} />
          <Route path="/test" element={<User />} /> 
          <Route path="/movie" element={<MovieSearch />} /> 
          <Route path="/anime" element={<Anime />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
