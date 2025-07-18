import React, {useState, Suspense, lazy} from 'react'
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { Route, Routes, BrowserRouter, useLocation, } from "react-router-dom";
const Main = lazy(() => import("./pages/main/Main"))
const Test = lazy(() => import("./pages/test/Test"))
function App() {
	return (
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route path='/' element={<Main/>}/>
					<Route path='/test' element={<Test/>}/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
