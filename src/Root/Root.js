import React from 'react';
import './Root.scss';
import Volume from "../Volume/Volume";
import Origin_Books from '../Origin/Origin_books'
import Paraphrase_Books from '../Paraphrase/Paraphrase_books'
import Notes from '../Notes/Notes'

function Root() {
  return (
   <div className={'root'}>
       <Volume items={Origin_Books} />
       
       {/*<div className={'notes'}>
           {Notes.map(x => <div>{x.text}</div>)}
       </div>*/}
       
       <Volume items={Paraphrase_Books} />
   </div>
  );
}

export default Root;
