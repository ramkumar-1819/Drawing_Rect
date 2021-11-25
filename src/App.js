import React, { useRef } from 'react';
import './App.css';

function App() {
  const rect=useRef();
  let clicked=false;
  let left;
  let top; 
  let initialX;
  let initialY;
  let parent;
  let child;

  const startDrawing=(e)=>{
    parent=e.target.getBoundingClientRect();
    rect.current.style.display='block';
    child=rect.current.getBoundingClientRect();
    console.log(parent,child)
    left=e.nativeEvent.offsetX;
    top=e.nativeEvent.offsetY;
    rect.current.style.top=`${top}px`;
    rect.current.style.left=`${left}px`;
    initialX=e.pageX;
    initialY=e.pageY;
    clicked=true;
  }
  const cursorMove=(e)=>{
    
    if(clicked){
      if(initialX<e.pageX && initialY<e.pageY){
        console.log('1')
        rect.current.style.width=`${e.pageX-initialX}px`;
        rect.current.style.height=`${e.pageY-initialY}px`;
      }
      else if(initialX>e.pageX && initialY<e.pageY){
        console.log('2')
        rect.current.style.left=`${e.pageX-parent.left}px`;
        rect.current.style.width=`${initialX-e.pageX}px`;
        rect.current.style.height=`${e.pageY-initialY}px`;
      }
      else if(initialX<e.pageX && initialY>e.pageY){
        console.log('3')
        rect.current.style.top=`${e.pageY-parent.top}px`;
        rect.current.style.width=`${e.pageX-initialX}px`;
        rect.current.style.height=`${initialY-e.pageY}px`;
      }
      else if(initialX>e.pageX && initialY>e.pageY){
        console.log('4')
        rect.current.style.top=`${e.pageY-parent.top}px`;
        rect.current.style.left=`${e.pageX-parent.left}px`;
        rect.current.style.width=`${initialX-e.pageX}px`;
        rect.current.style.height=`${initialY-e.pageY}px`;
      }
    }
  }
  const stopDrawing=(e)=>{
    e.stopPropagation();
    clicked=false;
  }
  return (
    <div className="App" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={cursorMove}>
      <div className='rect' ref={rect}>
        <span className='left'></span>
      </div>
    </div>
  );
}

export default App;
