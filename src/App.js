import React, {useState, Suspense, lazy} from 'react'
import logo from './logo.svg';
import axios from 'axios'
import './App.css';
import { Route, Routes, BrowserRouter, useLocation, } from "react-router-dom";
const Main = lazy(() => import("./pages/main/Main"))
const Test = lazy(() => import("./pages/test/Test"))
const Theme = lazy(() => import("./pages/theme/Theme"))
const Playground = lazy(() => import("./pages/playground/Playground"))
function App() {
	return (
		<BrowserRouter>
			<Suspense>
				<Routes>
					<Route path='/' element={<Test/>}/>
					<Route path='/test' element={<Test/>}/>
					<Route path='/playground' element={<Playground/>}/>
					<Route path='/theme' element={<Theme/>}/>
				</Routes>
			</Suspense>
		</BrowserRouter>
	);
}

export default App;
