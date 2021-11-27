import React, { useRef, useEffect } from 'react';
import './App.css';

function App() {
  const rect=useRef();
  const east=useRef();
  const west=useRef();
  const north=useRef();
  const south=useRef();
  const northWest=useRef();
  const northEast=useRef();
  const southWest=useRef();
  const southEast=useRef();

  useEffect(()=>{
    window.addEventListener('mouseup',mouseRelease);
    return ()=>window.removeEventListener('mouseup',mouseRelease);
  },[])
  
  let rect_progress=false;
  let mouse_leaved=false;
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
  let southDrag=false;
  let northWestDrag=false;
  let northEastDrag=false;
  let southWestDrag=false;
  let southEastDrag=false;
  
  const mouseRelease=()=>{
    if(rect_progress==='initial' && mouse_leaved){
      initialStop()
    }
    mouse_leaved=false;
    rect_progress="";
  }
  //Initiate Drawing
  const startDrawing=(e)=>{
    if(!drawn){
      parent=e.target.getBoundingClientRect();
      rect.current.style.display='block';
      child=rect.current.getBoundingClientRect();
      left=e.nativeEvent.offsetX;
      top=e.nativeEvent.offsetY;
      rect.current.style.top=`${top}px`;
      rect.current.style.left=`${left}px`;
      initialX=e.clientX;
      initialY=e.clientY;
      clicked=true;
    }
  }
  //Continue Drawing.
  const cursorMove=(e)=>{
    switch(type){
      case 'initial':
        if(clicked){
          initialDrawing(e);
        }
        break;
      case 'east':
        if(eastDrag){
         eastFunction(e)
        }
        break;
      case 'west':
        if(westDrag){
          westFunction(e)
        }
        break;
      case 'north':
        if (northDrag){
          northFunction(e)
        }
        break;
      case 'south':
        if (southDrag){
            southFunction(e)
        }
        break;
      case 'northWest':
        if(northWestDrag){
          northFunction(e)
          westFunction(e)
        }
        break;
      case 'northEast':
        if(northEastDrag){
          northFunction(e)
          eastFunction(e)
        }
        break;
      case 'southEast':
        if(southEastDrag){
          southFunction(e)
          eastFunction(e)
        }
        break; 
      case 'southWest':
        if(southWestDrag){
          southFunction(e)
          westFunction(e)
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
         initialStop();
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
      case 'north':
        if(northDrag){
          northDrag=false;
        }
        break;
      case 'south':
        if(southDrag){
          southDrag=false;
        }
        break;
      case 'northWest':
        if(northWestDrag){
          northWestDrag=false;
        }
        break;
      case 'northEast':
        if(northEastDrag){
          northEastDrag=false;
        }
        break;
      case 'southWest':
        if(southWestDrag){
          southWestDrag=false;
        }
        break;
      case 'southEast':
      if(southEastDrag){
        southEastDrag=false;
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
    rect_progress="";
  }

  const initialDrawing=(e)=>{
    rect_progress='initial';
    if(initialX<e.clientX && initialY<e.clientY){
      if(Math.floor(parent['left'])<e.clientX && Math.floor(parent['right'])>e.clientX && Math.floor(parent['bottom'])>e.clientY && Math.floor(parent['top'])<e.clientY){
        console.log('1')
        rect.current.style.width=`${e.clientX-initialX}px`;
        rect.current.style.height=`${e.clientY-initialY}px`;
      }
    }
    else if(initialX>e.clientX && initialY<e.clientY){
      if(Math.floor(parent['left'])<e.clientX && Math.floor(parent['right'])>e.clientX && Math.floor(parent['bottom'])>e.clientY && Math.floor(parent['top'])<e.clientY){
        console.log('2')
        rect.current.style.left=`${e.clientX-parent.left}px`;
        rect.current.style.width=`${initialX-e.clientX}px`;
        rect.current.style.height=`${e.clientY-initialY}px`;
      }
    }
    else if(initialX<e.clientX && initialY>e.clientY){
      if(Math.floor(parent['left'])<e.clientX && Math.floor(parent['right'])>e.clientX && Math.floor(parent['bottom'])>e.clientY && Math.floor(parent['top'])<e.clientY){
        console.log('3')
        rect.current.style.top=`${e.clientY-parent.top}px`;
        rect.current.style.width=`${e.clientX-initialX}px`;
        rect.current.style.height=`${initialY-e.clientY}px`;
      }
    }
    else if(initialX>e.clientX && initialY>e.clientY){
      if(Math.floor(parent['left'])<e.clientX && Math.floor(parent['right'])>e.clientX && Math.floor(parent['bottom'])>e.clientY && Math.floor(parent['top'])<e.clientY){
        console.log('4')
        rect.current.style.top=`${e.clientY-parent.top}px`;
        rect.current.style.left=`${e.clientX-parent.left}px`;
        rect.current.style.width=`${initialX-e.clientX}px`;
        rect.current.style.height=`${initialY-e.clientY}px`;
      }
    }
  }

  const initialStop=()=>{
    drawn=true;
    clicked=false;
    rect_progress="";
    east.current.style.display='block';
    west.current.style.display='block';
    north.current.style.display='block';
    south.current.style.display='block';
    northWest.current.style.display='block';
    northEast.current.style.display='block';
    southEast.current.style.display='block';
    southWest.current.style.display='block';
  }

  const northFunction=(e)=>{
    if(e.clientY>child['top']){
      if(e.clientY>=child['bottom']){
        rect.current.style.top=`${dimensions['y3']}px`
        rect.current.style.height=`${e.clientY-child['bottom']}px`
      }
      else{
        rect.current.style.top=`${dimensions['y1']+(e.clientY-child['top'])}px`
        rect.current.style.height=`${child['height']-(e.clientY-child['top'])}px`
      }
    }
    else{
      rect.current.style.top=`${dimensions['y1']+(e.clientY-child['top'])}px`
      rect.current.style.height=`${(child['top']-e.clientY)+child['height']}px`
    }
  }
  const southFunction=(e)=>{
    if(e.clientY>child['top']){
      if(e.clientY>=child['bottom']){
        rect.current.style.height=`${child['height']+(e.clientY-child['bottom'])}px`
      }
      else{
        if(rect.current.style.top.split('px')[1]!==dimensions['y1']){
          rect.current.style.top=dimensions['y1']+'px';
        }
        rect.current.style.height=`${child['height']-(child['bottom']-e.clientY)}px`
      }
    }
    else{
      rect.current.style.top=`${dimensions['y1']-(child['top']-e.clientY)}px`
      rect.current.style.height=`${(child['top']-e.clientY)}px`
    }
  }
  const eastFunction=(e)=>{
    if(e.clientX<child['right']){
      if(e.clientX<=child['left']){
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
  const westFunction=(e)=>{
    if(e.clientX>child['left']){
      if(e.clientX>=child['right']){
        rect.current.style.left=`${dimensions['x2']}px`
        rect.current.style.width=`${e.clientX-child['right']}px`
      }
      else{
        rect.current.style.left=`${dimensions['x1']+(e.clientX-child['left'])}px`
        rect.current.style.width=`${child['width']-(e.clientX-child['left'])}px`
      }
    }
    else if(e.clientX<child['left']){
      rect.current.style.left=`${dimensions['x1']-(child['left']-e.clientX)}px`
      rect.current.style.width=`${(child['left']-e.clientX)+child['width']}px`;
    }
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
  //North Side Dragging.
  const northDragggingStart=(e)=>{
    child=rect.current.getBoundingClientRect();
    northDrag=true;
    type='north';
  }
  //South Side Dragging.
  const southDraggingStart=(e)=>{
    child=rect.current.getBoundingClientRect();
    southDrag=true;
    type='south';
  }
  //North-West Dragging.
  const northWestDraggingStart=(e)=>{
    child=rect.current.getBoundingClientRect();
    northWestDrag=true;
    type='northWest';
  }
  //North-East Dragging.
  const northEastDraggingStart=(e)=>{
    child=rect.current.getBoundingClientRect();
    northEastDrag=true;
    type='northEast';
  }
  //South-West Dragging.
  const southWestDraggingStart=(e)=>{
    child=rect.current.getBoundingClientRect();
    southWestDrag=true;
    type='southWest';
  }
  //South-East Dragging.
  const southEastDraggingStart=(e)=>{
    child=rect.current.getBoundingClientRect();
    southEastDrag=true;
    type='southEast';
  }
  const leave=(e)=>{
    console.log('Leave')
   mouse_leaved=true;
  }
  return (
    <div className="App" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={cursorMove} onMouseLeave={leave}>
      <div className='rect' ref={rect}>
        <span className='east' ref={east} onMouseDown={eastDraggingStart}></span>
        <span className='west' ref={west} onMouseDown={westDraggingStart}></span>
        <span className='north' ref={north} onMouseDown={northDragggingStart}></span>
        <span className='south' ref={south} onMouseDown={southDraggingStart}></span>
        <span className='northWest' ref={northWest} onMouseDown={northWestDraggingStart}></span>
        <span className='northEast' ref={northEast} onMouseDown={northEastDraggingStart}></span>
        <span className='southWest' ref={southWest} onMouseDown={southWestDraggingStart}></span>
        <span className='southEast' ref={southEast} onMouseDown={southEastDraggingStart}></span>
      </div>
    </div>
  );
}

export default App;
