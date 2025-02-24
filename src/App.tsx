import React from 'react';
import { BrowserRouter as Router,
  //  Route, Routes, useNavigate 
} from 'react-router-dom';
// import Home from './components/Home';
// import About from './components/About';
// import Contact from './components/Contact';
import ApiTester from './components/ApiTester.tsx';
import './App.css';

// const Navigation: React.FC = () => {
//     const navigate = useNavigate();

//     return (
//         <nav>
//             <ul>
//                 <li><button onClick={() => navigate('/')}>Home</button></li>
//                 <li><button onClick={() => navigate('/about')}>About</button></li>
//                 <li><button onClick={() => navigate('/contact')}>Contact</button></li>
//             </ul>
//         </nav>
//     );
// };

const App: React.FC = () => {
    return (
        <Router>
            <div>
                {/* <Navigation /> */}
                {/* <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                </Routes> */}
                <ApiTester />
            </div>
        </Router>
    );
};

export default App;
