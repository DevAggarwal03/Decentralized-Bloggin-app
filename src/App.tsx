import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './Pages/HomePage'
import Home from './Pages/Home'
import CreatePosts from './Pages/CreatePosts'
import GetPosts from './Pages/GetPosts'

function App() {

  return (
    <div>
      <Routes>
        <Route path = '/' element= {<HomePage/>}>
        <Route index element = {<Home/>}/>
        <Route path='/createPost' element = {<CreatePosts/>}/>
        <Route path='/getPosts' element = {<GetPosts/>}/>
        </Route>
      </Routes>
    </div>
  )
}

export default App
