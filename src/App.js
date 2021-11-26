import React, { useRef } from 'react';
import './App.css';

function App() {
  const rect=useRef();
  const east=useRef();
  const west=useRef();
  const north=useRef();
  const south=useRef();

  let clicked=false;
  let drawn=false;
  let left;
  let top; 
  let initialX;
  let initialY;
  let parent;
  let child;
  let dimensions={};
  let type='initial';

  let eastDrag=false;
  let westDrag=false;
  let northDrag=false;

  //Initiate Drawing
  const startDrawing=(e)=>{
    if(!drawn){
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
  }
  //Continue Drawing.
  const cursorMove=(e)=>{
    switch(type){
      case 'initial':
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
        break;
      case 'east':
        if(eastDrag){
          if(e.clientX<child['right']){
            if(e.clientX<=child['left']){
              console.log('D',dimensions['x1'])
              console.log(e.clientX,parseInt(child['left']))
              rect.current.style.left=`${dimensions['x1']-(child['left']-e.clientX)}px`
              rect.current.style.width=`${child['left']-e.clientX}px`
            }
            else{
              if(rect.current.style.left.split('px')[1]!==dimensions['x1']){
                rect.current.style.left=dimensions['x1']+'px';
              }
              rect.current.style.width=`${child['width']-(child['right']- e.clientX)}px`;
            }
          }
          else if(e.clientX>child['right']){
            rect.current.style.width=`${(e.clientX-child['right'])+child['width']}px`;
          }
        }
        break;
      case 'west':
        if(westDrag){
          if(e.clientX>child['left']){
            if(e.clientX>=child['right']){
              rect.current.style.left=`${child.right-parent.left}px`
              rect.current.style.width=`${e.clientX-child['right']}px`
            }
            else{
              rect.current.style.left=`${dimensions['x1']+(e.clientX-child['left'])}px`
              rect.current.style.width=`${child['width']-(e.clientX-child['left'])}px`
            }
          }
          //move left position
          else if(e.clientX<child['left']){
            rect.current.style.left=`${dimensions['x1']-(child['left']-e.clientX)}px`
            rect.current.style.width=`${(child['left']-e.clientX)+child['width']}px`;
          }
        }
        break;
    
      default:
        break;
    }
  }
  //Finish Drawing.
  const stopDrawing=(e)=>{
    switch(type){
      case 'initial':
        if(clicked){
          drawn=true;
          clicked=false;
          east.current.style.display='block';
          west.current.style.display='block';
          north.current.style.display='block';
          south.current.style.display='block';
        }
        break;
      case 'east':
        if(eastDrag){
          eastDrag=false;
        }
        break;
      case 'west':
        if(westDrag){
          westDrag=false;
        }
        break;
      default:
        break;
    }
    child=rect.current.getBoundingClientRect();
    dimensions['x1']=rect.current.offsetLeft;
    dimensions['y1']=rect.current.offsetTop;
    dimensions['x2']=child.width + rect.current.offsetLeft;
    dimensions['y2']=rect.current.offsetTop;
    dimensions['x3']=rect.current.offsetLeft;
    dimensions['y3']=child.height + rect.current.offsetTop;
    dimensions['x4']=child.width + rect.current.offsetLeft;
    dimensions['y4']=child.height + rect.current.offsetTop;
    console.log(child,dimensions)
  }
  //East Side Dragging
  const eastDraggingStart=(e)=>{
    child=rect.current.getBoundingClientRect();
    eastDrag=true;
    type='east';
  }
  //West Side Dragging.
  const westDraggingStart=(e)=>{
    child=rect.current.getBoundingClientRect();
    westDrag=true;
    type='west';
  }
  return (
    <div className="App" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={cursorMove}>
      <div className='rect' ref={rect}>
        <span className='east' ref={east} onMouseDown={eastDraggingStart}></span>
        <span className='west' ref={west} onMouseDown={westDraggingStart}></span>
        <span className='north' ref={north}></span>
        <span className='south' ref={south}></span>
      </div>
    </div>
  );
}

export default App;
