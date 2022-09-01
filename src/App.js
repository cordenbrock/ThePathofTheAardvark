import './App.css';
import aardvark from './assets/img/AARD.png';
import { useState, useEffect } from 'react';
import thePathofTheJson from './lib/thePathofTheJson.json'
import ReactJson from 'react-json-view';
import { Badge, Label, InputGroup, Input, ListGroup, ListGroupItem } from 'reactstrap';


function App() {
  const [searchLetters, setSearchLetters] = useState('')
  const [thePath, setThePath] = useState([])

  useKeyPress('Escape', () => {
    setSearchLetters('')
    setThePath([])
  });

  useKeyPress('Enter', () => {
    if (searchLetters.length === 2) hAarnessThePower();
  });

  useEffect(() => {
    if (searchLetters.length === 2) hAarnessThePower();
  }, [searchLetters])

  const hAarnessThePower = () => {
    const { thePathOfTheAardvark } = thePathofTheJson[searchLetters] || {};
    setThePath(thePathOfTheAardvark);
    setSearchLetters('');
  }


  return (
    <div>

      <header className="App-header d-flex justify-content-center align-items-center">
        <span>LL<img src={aardvark} height="75" width="75" alt="aardvark" />RDVARK</span>
      </header>

      <main className={`container my-5 ${thePath?.includes('aardvark') && 'aar-gif'}`}>
        <div className='d-flex justify-content-end fs-4 mb-5'>
          <Badge
            className={'text-decoration-none aar-img'}
            color="#3b3bbc"
            href='https://miwaro.github.io/wordvark/'
            target="_blank"
          >
            Wordvark &nbsp;<img src={aardvark} height="28" width="28" alt="aardvark" />
          </Badge>
        </div>
        <div className='row flex-column-reverse flex-md-row'>

          <section className='col-md-6 d-flex justify-content-center'>
            <div className='col-md-9 mt-5 pt-5 mt-md-0 pt-md-0'>
              <h2 className='mb-4 text-light fancy'>
                The Libr.AAR.y
              </h2>
              <ReactJson
                src={thePathofTheJson}
                name={false}
                collapsed={2}
              />
            </div>
          </section>

          <section className='col-md-6 border-start d-flex justify-content-center'>
            <div className='col-md-9 mb-5 pb-5 mb-md-0 pb-md-0'>
              <i class="fa-solid fa-magnifying-glass"></i>
              <Label>
                <h2 className='mb-4 text-light fancy'>
                  H.AAR.ness the Power
                </h2>
              </Label>
              <InputGroup
                className='mb-5'
              >
                <Input
                  className='text-center text-black fs-2'
                  maxLength={2}
                  placeholder='aa'
                  value={searchLetters}
                  onChange={(e) => setSearchLetters(e.target.value.toLowerCase())}
                  onFocus={() => setSearchLetters('')}
                />
              </InputGroup>
              <ListGroup
                className='border rounded'
              >
                {
                  thePath && thePath.map((woord, idx) => {
                    idx++;

                    return (
                      <ListGroupItem
                        className='fs-2 d-inline-flex justify-content-around opacity-75'
                      >
                        <div className='fancy fs-3 col-1'>{idx})</div><div className='fancy fs-3 col-11'>-&nbsp;{woord}</div>
                      </ListGroupItem>
                    )
                  })
                }
              </ListGroup>
            </div>
          </section>

        </div>
      </main>

    </div>
  );
}



export default App;

const useKeyPress = async (key, action) => {

  const onKeyDown = (e) => {
    if (e.code === key) {
      e.preventDefault();
      action();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [action]);
};