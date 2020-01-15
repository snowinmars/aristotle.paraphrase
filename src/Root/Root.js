import React from 'react';
import './Root.css';
import Volume from "../Volume/Volume";
import Origin_Books from '../Origin/Origin_books'
import Paraphrase_Books from '../Paraphrase/Paraphrase_books'

function Root() {
  return (
   <div className={'root'}>
       <Volume items={Origin_Books} />
       <Volume items={Paraphrase_Books} />
   </div>
  );
}

export default Root;
