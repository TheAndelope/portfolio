import {Routes, Route} from 'react-router-dom'
import Home from "./pages/Home/Home.tsx"
function App() {


  return (
    <>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/Home" element={<Home/>}/>

        </Routes>
      
      
    </>
  )
}

export default App
