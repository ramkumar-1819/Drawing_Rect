import React, { useRef } from 'react';
import './App.css';

function App() {
  const rect=useRef();
  let clicked=false;
  let initialX=0;
  let initialY=0;
  let parentOffsetX;
  let parentOffsetY;
  const startDrawing=(e)=>{
    console.log(e.offsetTop)
    e.stopPropagation();
    clicked=true;
    rect.current.style.display='block';
    rect.current.style.left=`${e.nativeEvent.offsetX}px`;
    rect.current.style.top=`${e.nativeEvent.offsetY}px`;
    parentOffsetX=e.nativeEvent.offsetX;
    parentOffsetY=e.nativeEvent.offsetY;
    initialX=e.pageX;
    initialY=e.pageY;
  }
  const cursorMove=(e)=>{
    if(clicked){
      if(initialX<e.pageX && initialY<e.pageY){
        rect.current.style.width=`${e.pageX-initialX}px`;
        rect.current.style.height=`${e.pageY-initialY}px`;
      }
      else if(initialX>e.pageX && initialY<e.pageY){
        const parent=document.getElementsByClassName('App')[0];
        if(e.target===parent){
          rect.current.style.left=`${e.nativeEvent.offsetX}px`;
        }
        else{
          console.log('Move',e.nativeEvent.offsetX)
          rect.current.style.left=`${parentOffsetX-e.nativeEvent.offsetX}px`;
        }
        rect.current.style.width=`${initialX-e.pageX}px`;
        rect.current.style.height=`${e.pageY-initialY}px`;
      }
    }
  }
  const stopDrawing=(e)=>{
    e.stopPropagation();
    clicked=false;
  }
  return (
    <div className="App" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={cursorMove}>
      <div className='rect' ref={rect}></div>
    </div>
  );
}

export default App;
