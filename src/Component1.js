import React, { useRef, useEffect} from 'react';
import { useState } from 'react/cjs/react.development';

function Component1({leftt,topp,width,height,details}) {
  const coords = {leftt,topp,width,height};
  const [state,setState]=useState(false)
  const rect=useRef();
  const east=useRef();
  const west=useRef();
  const north=useRef();
  const south=useRef();
  const northWest=useRef();
  const northEast=useRef();
  const southWest=useRef();
  const southEast=useRef();

  let mouse_leaved=false;
  let clicked=false;
  let drawn=false;
  let left;
  let top; 
  let initialX;
  let initialY;
  let parent;
  let child={};
  let dimensions={};
  let type='initial';

  let dragRect={child:'',parent:'',startX:'',startY:''}

  let eastDrag=false;
  let westDrag=false;
  let northDrag=false;
  let southDrag=false;
  let northWestDrag=false;
  let northEastDrag=false;
  let southWestDrag=false;
  let southEastDrag=false;

  useEffect(()=>{
    window.addEventListener('mouseup',mouseRelease);
    return ()=>window.removeEventListener('mouseup',mouseRelease);
  },[])
  
  useEffect(()=>{
    if(details){
      east.current.style.display='block';
      west.current.style.display='block';
      north.current.style.display='block';
      south.current.style.display='block';
      northWest.current.style.display='block';
      northEast.current.style.display='block';
      southEast.current.style.display='block';
      southWest.current.style.display='block';
      setInitialDimensions();
      parent=document.getElementsByClassName('App')[0].getBoundingClientRect();
      type='initial';
      drawn=true;
    }
  },[])

  const restoreDimensions = () =>{
    rect.current.style.display='none';
    rect.current.style.width='0px';
    rect.current.style.height='0px';
  }

  const restoreDefault = () =>{
    clicked=false;
    drawn=false;
    left=null;
    top=null; 
    initialX=null;
    initialY=null;
    parent=null;
    child={};
    dimensions={};
    type='initial';

    eastDrag=false;
    westDrag=false;
    northDrag=false;
    southDrag=false;
    northWestDrag=false;
    northEastDrag=false;
    southWestDrag=false;
    southEastDrag=false;
    restoreDimensions();
  }
  
  const mouseRelease=()=>{
    console.log(mouse_leaved)
    if(mouse_leaved){
      stopDrawing()
      }
    mouse_leaved=false;
  }
  const setInitialDimensions = ()=>{
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    dimensions['x1']=rect.current.offsetLeft;
    dimensions['y1']=rect.current.offsetTop;
    dimensions['x2']=child.width + rect.current.offsetLeft;
    dimensions['y2']=rect.current.offsetTop;
    dimensions['x3']=rect.current.offsetLeft;
    dimensions['y3']=child.height + rect.current.offsetTop;
    dimensions['x4']=child.width + rect.current.offsetLeft;
    dimensions['y4']=child.height + rect.current.offsetTop;
    type='initial'
  }
  //Initiate Drawing
  const startDrawing=(e)=>{
    console.log(drawn,details);
    const initiateDraw = () =>{
      parent=e.target.getBoundingClientRect();
      rect.current.style.display='block';
      let copyChild=rect.current.getBoundingClientRect();
      let params;
      for(params in copyChild){
        child[params]=copyChild[params]-1;
      }
      left=e.nativeEvent.offsetX;
      top=e.nativeEvent.offsetY;
      rect.current.style.top=`${top}px`;
      rect.current.style.left=`${left}px`;
      initialX=e.clientX;
      initialY=e.clientY;
      clicked=true;
    }
    if(!drawn){
      initiateDraw();
    }
    else if(drawn){
      restoreDefault();
      initiateDraw();
    }
  }
  //Continue Drawing.
  const cursorMove=(e)=>{
    switch(type){
      case 'initial':
        if(clicked){
          if(boundaryCondition(e)){
            initialDrawing(e);
          }
        }
        break;
      case 'east':
        if(eastDrag){
          if(boundaryCondition(e)){
            eastFunction(e);
          }
        }
        break;
      case 'west':
        if(westDrag){
          if(boundaryCondition(e)){
            westFunction(e)
          }
        }
        break;
      case 'north':
        if (northDrag){
          if(boundaryCondition(e)){
            northFunction(e)
          }
        }
        break;
      case 'south':
        if (southDrag){
          if(boundaryCondition(e)){
            southFunction(e)
          }
        }
        break;
      case 'northWest':
        if(northWestDrag){
          if(boundaryCondition(e)){
            northFunction(e)
            westFunction(e)
          }
        }
        break;
      case 'northEast':
        if(northEastDrag){
          if(boundaryCondition(e)){
            northFunction(e)
            eastFunction(e)
          }
        }
        break;
      case 'southEast':
        if(southEastDrag){
          if(boundaryCondition(e)){
            southFunction(e)
            eastFunction(e)
          }
        }
        break; 
      case 'southWest':
        if(southWestDrag){
          if(boundaryCondition(e)){
            southFunction(e)
            westFunction(e)
          }
        }
        break; 
      default:
        break;
    }
  }
  
  //Finish Drawing.
  const stopDrawing=(e)=>{
    console.log(type);
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
    setInitialDimensions();
  }

  const initialDrawing=(e)=>{
    if(initialX<e.clientX && initialY<e.clientY){
      rect.current.style.width=`${e.clientX-initialX}px`;
      rect.current.style.height=`${e.clientY-initialY}px`;
    }
    else if(initialX>e.clientX && initialY<e.clientY){
      rect.current.style.left=`${e.clientX-parent.left}px`;
      rect.current.style.width=`${initialX-e.clientX}px`;
      rect.current.style.height=`${e.clientY-initialY}px`;
    }
    else if(initialX<e.clientX && initialY>e.clientY){
      rect.current.style.top=`${e.clientY-parent.top}px`;
      rect.current.style.width=`${e.clientX-initialX}px`;
      rect.current.style.height=`${initialY-e.clientY}px`;
    }
    else if(initialX>e.clientX && initialY>e.clientY){
      rect.current.style.top=`${e.clientY-parent.top}px`;
      rect.current.style.left=`${e.clientX-parent.left}px`;
      rect.current.style.width=`${initialX-e.clientX}px`;
      rect.current.style.height=`${initialY-e.clientY}px`;
    }
  }
  const boundaryCondition=(e)=>{
    //console.log(Math.ceil(parent['left'])<e.clientX+1 && Math.ceil(parent['right'])>e.clientX+1 && Math.ceil(parent['bottom'])>e.clientY+1 && Math.ceil(parent['top'])<e.clientY+1)
    return Math.ceil(parent['left'])<e.clientX+1 && Math.ceil(parent['right'])>e.clientX+1 && Math.ceil(parent['bottom'])>e.clientY+1 && Math.ceil(parent['top'])<e.clientY+1
  }
  const initialStop=()=>{
    console.log(rect.current.style.width)
    if(rect.current.style.width && rect.current.style.width!=='0px' && rect.current.style.height && rect.current.style.height!=='0px'){
      drawn=true;
      clicked=false;
      east.current.style.display='block';
      west.current.style.display='block';
      north.current.style.display='block';
      south.current.style.display='block';
      northWest.current.style.display='block';
      northEast.current.style.display='block';
      southEast.current.style.display='block';
      southWest.current.style.display='block';
    }
    else{
      restoreDefault();
    }
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
    console.log(child);
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
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    eastDrag=true;
    type='east';
  }
  //West Side Dragging.
  const westDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    westDrag=true;
    type='west';
  }
  //North Side Dragging.
  const northDragggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    northDrag=true;
    type='north';
  }
  //South Side Dragging.
  const southDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    southDrag=true;
    type='south';
  }
  //North-West Dragging.
  const northWestDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    northWestDrag=true;
    type='northWest';
  }
  //North-East Dragging.
  const northEastDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    northEastDrag=true;
    type='northEast';
  }
  //South-West Dragging.
  const southWestDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    southWestDrag=true;
    type='southWest';
  }
  //South-East Dragging.
  const southEastDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let params;
    for(params in copyChild){
      child[params]=copyChild[params]-1;
    }
    southEastDrag=true;
    type='southEast';
  }
  const dragRectangleStart = (e) =>{
    console.log(child,parent,e.clientX)
    dragRect={child,parent,startX:e.clientX,startY:e.clientY};
    if(drawn){
      e.stopPropagation();
    }
  }
  const dragRectangle = (e) =>{
    if(dragRect.startX || dragRect.startY){
      if(e.clientX>dragRect.startX){
        if(checkRectBoundary(e,dragRect)){
          console.log(e.clientX+(dragRect.child.right-dragRect.startX),parent.right)
          rect.current.style.left=`${dimensions['x1']+(e.clientX-dragRect.startX)}px`;
        }
      }
    }
  }
  const dragRectangleStop =(e)=>{
    setInitialDimensions();
    dragRect={...dragRect,startX:'',startY:''}
  }
  const checkRectBoundary =(e,dragRect)=>{
    const result = e.clientX+1+(dragRect.child.right-dragRect.startX)<parent.right;
    return result;
  }
  const preventDrag= (e)=>{
    e.preventDefault();
    e.stopPropagation();
  }
  const leave=(e)=>{
   mouse_leaved=true;
  }
  const rectMouseLeaving =(e)=>{
    //dragRectangleStop()
  }
  const haveDimensions = details ? 'block' : 'none';
  console.log(state)
  return (
    <div className="App" onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={cursorMove} onMouseLeave={leave}>
      <div className='rect' ref={rect} onMouseLeave={rectMouseLeaving}  onMouseDown={dragRectangleStart} onMouseMove={dragRectangle} onMouseUp={dragRectangleStop} style={{left:coords.leftt,top:coords.topp,width:coords.width,height:coords.height,display:haveDimensions}}>
        <span className='east' ref={east} draggable={false} onDragStart={preventDrag} onMouseDown={eastDraggingStart} style={{display:haveDimensions}}></span>
        <span className='west' ref={west}  onDragStart={preventDrag} onMouseDown={westDraggingStart} style={{display:haveDimensions}}></span>
        <span className='north' ref={north}  onDragStart={preventDrag} onMouseDown={northDragggingStart} style={{display:haveDimensions}}></span>
        <span className='south' ref={south}  onDragStart={preventDrag} onMouseDown={southDraggingStart} style={{display:haveDimensions}}></span>
        <span className='northWest' ref={northWest}  onDragStart={preventDrag} onMouseDown={northWestDraggingStart} style={{display:haveDimensions}}></span>
        <span className='northEast' ref={northEast}  onDragStart={preventDrag} onMouseDown={northEastDraggingStart} style={{display:haveDimensions}}></span>
        <span className='southWest' ref={southWest}  onDragStart={preventDrag} onMouseDown={southWestDraggingStart} style={{display:haveDimensions}}></span>
        <span className='southEast' ref={southEast}  onDragStart={preventDrag} onMouseDown={southEastDraggingStart} style={{display:haveDimensions}}></span>
      </div>
      <button type='button' onClick={()=>setState(!state)}>Change</button>
    </div>
  );
}

export default Component1;