import React from 'react';
import './App.scss'
import { Terminal } from './components/terminal';
import { Splashscreen } from './components/splashscreen';

function App() {

  const [page, setPage] = React.useState(0);

  const callbackFn = () => {
    setPage(1);
  }

  return (
    <div className="wrapper">
      {page === 0 && <Splashscreen callbackFn={callbackFn}/>}
      {page === 1 && <Terminal/>}
    </div>
  )
}

export default App
