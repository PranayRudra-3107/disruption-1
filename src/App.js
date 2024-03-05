import { BrowserRouter, Route, Switch } from 'react-router-dom'
import About from './components/About'
import Offers from './components/Offers'
import FileUpload from './components/FileUpload'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Route exact path="/" component={FileUpload} />
          <Route path="/about"><About/></Route>
          <Route path="/offers"><Offers/></Route>
      </BrowserRouter>
    </div>
  )
}

export default App