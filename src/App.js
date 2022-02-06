import About from './components/About';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Missing from './components/Missing';
import Nav from './components/Nav';
import NewPost from './components/NewPost';
import PostPage from './components/PostPage';
import EditPost from './components/EditPost';

import { Routes, Route } from 'react-router-dom';
import { DataProvider } from './context/DataContext';

function App() {
	return (
		<div className="App">
			<Header title="React JS Blog" />
			<DataProvider>
				<Nav />
				<Routes>
					<Route exact path="/" element={<Home />} />
					<Route exact path="/post" element={<NewPost />} />
					<Route path="/edit/:id" element={<EditPost />} />
					<Route path="/post/:id" element={<PostPage />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<Missing />} />
				</Routes>
			</DataProvider>
			<Footer />
		</div>
	);
}

export default App;
