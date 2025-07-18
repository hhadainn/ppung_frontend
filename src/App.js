import React, {useState, Suspense, lazy} from 'react'
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { Route, Routes, BrowserRouter, useLocation, } from "react-router-dom";
const Main = lazy(() => import("./pages/main/Main"))
function App() {
	return (
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route path='/' element={<Main/>}/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
