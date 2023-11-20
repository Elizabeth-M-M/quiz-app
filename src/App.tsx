import Main from "./Main";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import { GlobalStyle } from "./App.styles";


const App: React.FC=()=>{
  return(
    <div>
      <GlobalStyle/>
      <BrowserRouter>
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="quiz" element={<Main />} />
		</Routes>
	</BrowserRouter>
    </div>
  )
}



export default App;
