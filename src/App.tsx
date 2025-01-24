import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './pages/Header';
import Footer from './pages/Footer';
import MainPage from './pages/MainPage';
import NewsPage from './pages/NewsPage';
import CurrentNewsPage from './pages/CurrentNewsPage';
import ContactsPage from './pages/ContactsPage';
import DocumentsPage from './pages/DocumentsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import AppealsPage from './pages/AppealsPage';
import CreateAppealPage from './pages/CreateAppealPage';
import AdminPage from './pages/AdminPage';
import AdminLoginPage from './pages/AdminLoginPage';
import CreateNewsPage from './pages/CreateNewsPage';
import ProblemPage from './pages/ProblemPage';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Header />
      <Router>
        <Routes>
          <Route path='/' element={<MainPage />}/>
          <Route path='/contacts' element={<ContactsPage />}/>
          <Route path='/documents' element={<DocumentsPage />}/>
          <Route path='/login' element={<LoginPage />}/>
          <Route path='/profile' element={<ProfilePage />}/>
          <Route path='/appeals' element={<AppealsPage />}/>
          <Route path='/admin' element={<AdminPage />}/>
          <Route path='/admin/login' element={<AdminLoginPage />}/>
          <Route path='/admin/advertisement/*' element={<ProblemPage />}/>
          <Route path='/admin/news/*' element={<CreateNewsPage />}/>
          <Route path='/create/appeal' element={<CreateAppealPage />}/>
          <Route path='/news' element={<NewsPage />}/>
          <Route path='/news/*' element={<CurrentNewsPage />}/>
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
