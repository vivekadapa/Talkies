import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login'
import SignUp from './pages/SignUp';
import Home from './pages/Home';
import Layout from './components/Layout';
import Tv from './pages/Tv';
import Movies from './pages/Movies';
import Bookmark from './pages/Bookmark';
import Profile from './pages/Profile'
import Details from './pages/Details';

function App() {
  return (
    <Router>
      <div className="App min-w-screen min-h-screen">
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<Home />} />
            <Route path='tv' element={<Tv />} />
            <Route path='movies' element={<Movies />} />
            <Route path='bookmarks' element={<Bookmark />} />
            <Route path='profile' element={<Profile />} />
            <Route path='/:id' element={< Details />} />
            <Route path='tv/:id' element={< Details />} />
            <Route path='movies/:id' element={< Details />} />
          </Route>

          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
