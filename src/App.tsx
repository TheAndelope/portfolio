import {Routes, Route} from 'react-router-dom'
import Portfolio from "./pages/Home/Portfolio"
function App() {


  return (
    <>
        <Routes>
          <Route path="/" element={<div className="font-sans"> <Portfolio/> </div>}/>
          <Route path="/Home" element={<div className="font-sans"> <Portfolio/> </div>}/>

        </Routes>
      
      
    </>
  )
}

export default App
