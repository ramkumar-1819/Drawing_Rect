import React, { useRef, useEffect, useState} from 'react';

function Component2({leftt,topp,width,height,details}) {
  const [coords,setCoords] = useState({leftt,topp,width,height});
  const [parent,setParent] = useState(null);
  const [child,setChild] = useState(null);
  const [dimensions,setDimensions] = useState(null);
  const [drawn,setDrawn] = useState(details ? true :false);
  const [type,setType] = useState('initial');
  const [dragDirection,setDragDirection]=useState('');
  const [initialPosition,setInitialPosition] = useState({initialX:'',initialY:''});
  const[drawingInitiated,setDrawingInitiated]=useState(false);
  const [dragRect,setDragRect] = useState({startX:'',startY:''})

  //console.log(boundary)
  //console.log(coords)
  const parentt = useRef();
  const rect=useRef();
  const east=useRef();
  const west=useRef();
  const north=useRef();
  const south=useRef();
  const northWest=useRef();
  const northEast=useRef();
  const southWest=useRef();
  const southEast=useRef();

  //let mouse_leaved=false;
  //let clicked=false;
  //let drawn=details ? true :false;
  let left;
  let top; 
  //let initialX;
  //let initialY;
  //let parent;
  //let child={};
  //let dimensions={};
  //let type= details ? '':'initial';

  //let dragRect={child:'',parent:'',startX:'',startY:''}

  useEffect(()=>{
    const newParent = parentt.current.getBoundingClientRect();
    const x={}
    for(let orgin in newParent){
      x[orgin]=newParent[orgin]
    }
    setParent({...x})
    setInitialDimensions({...x})
  },[coords])
  
  useEffect(()=>{
    setCoords({leftt,topp,width,height})
  },[leftt,topp,width,height])

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
    }
  },[])

  const restoreDimensions = () =>{
    rect.current.style.display='none';
    rect.current.style.width='0px';
    rect.current.style.height='0px';
  }

  const restoreDefault = () =>{
    //clicked=false;
    //drawn=false;
    left=null;
    top=null; 
    setInitialPosition({initialX:'',initialY:''})
    setChild({});
    setDimensions(null);
    //type='initial';
    setDragDirection('')
    restoreDimensions();
    setType('initial');
    //setDrawn(false)
  }
  const mouseRelease=()=>{
    stopDrawing()
  }
  const setInitialDimensions = ()=>{
    //console.log(rect)
    let copyChild=rect.current.getBoundingClientRect();
    let newChild ={}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    let newDimensions = {};
    //console.log(rect.current.offsetLeft)
    newDimensions['x1']=rect.current.offsetLeft;
    newDimensions['y1']=rect.current.offsetTop;
    newDimensions['x2']=newChild.width + rect.current.offsetLeft;
    newDimensions['y2']=newChild.height + rect.current.offsetTop;
    setChild({...newChild})
    setDimensions({...newDimensions})
  }
  //Initiate Drawing
  const startDrawing=(e)=>{
    const initiateDraw = () =>{
      rect.current.style.display='block';
      let copyChild=rect.current.getBoundingClientRect();
      let newChild ={}
      let params;
      for(params in copyChild){
        newChild[params]=copyChild[params]-1;
      }
      setChild({...newChild})
      left=e.nativeEvent.offsetX;
      top=e.nativeEvent.offsetY;
      rect.current.style.top=`${top}px`;
      rect.current.style.left=`${left}px`;
      setInitialPosition({initialX:e.clientX,initialY:e.clientY})
      setDrawingInitiated(true)
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
    console.log(type)
    switch(type){
      case 'initial':
        if(drawingInitiated){
          if(boundaryCondition(e)){
            initialDrawing(e);
          }
        }
        break;
      case 'east':
        if(dragDirection.eastDrag){
          if(boundaryCondition(e)){
            eastFunction(e);
          }
        }
        break;
      case 'west':
        if(dragDirection.westDrag){
          if(boundaryCondition(e)){
            westFunction(e)
          }
        }
        break;
      case 'north':
        if (dragDirection.northDrag){
          if(boundaryCondition(e)){
            northFunction(e)
          }
        }
        break;
      case 'south':
        if (dragDirection.southDrag){
          if(boundaryCondition(e)){
            southFunction(e)
          }
        }
        break;
      case 'northWest':
        if(dragDirection.northWestDrag){
          if(boundaryCondition(e)){
            northFunction(e)
            westFunction(e)
          }
        }
        break;
      case 'northEast':
        if(dragDirection.northEastDrag){
          if(boundaryCondition(e)){
            northFunction(e)
            eastFunction(e)
          }
        }
        break;
      case 'southEast':
        if(dragDirection.southEastDrag){
          if(boundaryCondition(e)){
            southFunction(e)
            eastFunction(e)
          }
        }
        break; 
      case 'southWest':
        if(dragDirection.southWestDrag){
          if(boundaryCondition(e)){
            southFunction(e)
            westFunction(e)
          }
        }
        break; 
      case 'dragging':
        if(dragDirection.dragging){
          dragRectangle(e)
        }
        break;
      default:
        break;
    }
  }
  
  //Finish Drawing.
  const stopDrawing=(e)=>{
    //console.log(type)
    if(type==='initial'){
        initialStop()
    }
    else if(type && type!=='initial'){
      setDragDirection('')
    }
    setInitialDimensions(parent);
  }

  const initialDrawing=(e)=>{
    if(initialPosition.initialX<e.clientX && initialPosition.initialY<e.clientY){
      rect.current.style.width=`${e.clientX-initialPosition.initialX}px`;
      rect.current.style.height=`${e.clientY-initialPosition.initialY}px`;
    }
    else if(initialPosition.initialX>e.clientX && initialPosition.initialY<e.clientY){
      rect.current.style.left=`${e.clientX-parent.left}px`;
      rect.current.style.width=`${initialPosition.initialX-e.clientX}px`;
      rect.current.style.height=`${e.clientY-initialPosition.initialY}px`;
    }
    else if(initialPosition.initialX<e.clientX && initialPosition.initialY>e.clientY){
      rect.current.style.top=`${e.clientY-parent.top}px`;
      rect.current.style.width=`${e.clientX-initialPosition.initialX}px`;
      rect.current.style.height=`${initialPosition.initialY-e.clientY}px`;
    }
    else if(initialPosition.initialX>e.clientX && initialPosition.initialY>e.clientY){
      rect.current.style.top=`${e.clientY-parent.top}px`;
      rect.current.style.left=`${e.clientX-parent.left}px`;
      rect.current.style.width=`${initialPosition.initialX-e.clientX}px`;
      rect.current.style.height=`${initialPosition.initialY-e.clientY}px`;
    }
  }
  const boundaryCondition=(e)=>{
    return Math.ceil(parent['left'])<e.clientX+1 && Math.ceil(parent['right'])>e.clientX+1 && Math.ceil(parent['bottom'])>e.clientY+1 && Math.ceil(parent['top'])<e.clientY+1
  }
  const initialStop=()=>{
    if(rect.current.style.width && rect.current.style.width!=='0px' && rect.current.style.height && rect.current.style.height!=='0px'){
      //drawn=true;
      east.current.style.display='block';
      west.current.style.display='block';
      north.current.style.display='block';
      south.current.style.display='block';
      northWest.current.style.display='block';
      northEast.current.style.display='block';
      southEast.current.style.display='block';
      southWest.current.style.display='block';
      setDrawingInitiated(false)
      setDrawn(true)
      setType('')
      let copyChild=rect.current.getBoundingClientRect();
      let newChild ={}
      let params;
      //console.log(type)
      for(params in copyChild){
        newChild[params]=copyChild[params]-1;
      }

      setChild({...newChild})
    }
    else{
      restoreDefault();
    }
  }

  const northFunction=(e)=>{
    if(e.clientY>child['top']){
      if(e.clientY>=child['bottom']){
        rect.current.style.top=`${dimensions['y2']}px`
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
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({eastDrag:true});
    setType('east');
  }
  //West Side Dragging.
  const westDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({westDrag:true});
    //westDrag=true;
    setType('west');
  }
  //North Side Dragging.
  const northDragggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({northDrag:true});
    //northDrag=true;
    setType('north');
  }
  //South Side Dragging.
  const southDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({southDrag:true});
    //southDrag=true;
    setType('south');
  }
  //North-West Dragging.
  const northWestDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({northWestDrag:true});
    //northWestDrag=true;
    setType('northWest');
  }
  //North-East Dragging.
  const northEastDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({northEastDrag:true});
    //northEastDrag=true;
    setType('northEast');
  }
  //South-West Dragging.
  const southWestDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({southWestDrag:true});
    //southWestDrag=true;
    setType('southWest');
  }
  //South-East Dragging.
  const southEastDraggingStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({southEastDrag:true});
    //southEastDrag=true;
    setType('southEast');
  }
  /*const dragRectangleStart = (e) =>{
    if(drawn){
      e.stopPropagation();
    }
  }
  const changeAllCoords =(e)=>{
    e.stopPropagation();
    console.log(rect.current.getBoundingClientRect())
    setInitialDimensions(parent)
  }*/
  const preventDrag= (e)=>{
    e.preventDefault();
    e.stopPropagation();
  }

  const dragRectangleStart = (e) =>{
    if(drawn){
      e.stopPropagation();
      e.preventDefault();
    }
  }

  const dragRectangle = (e) =>{
    if(dragRect.startX || dragRect.startY){
      if(e.clientX>dragRect.startX){
        if(checkRectBoundary(e,dragRect)){
          if(rect.current.getBoundingClientRect().right<parentt.current.getBoundingClientRect().right){
            rect.current.style.left=`${dimensions['x1']+(e.clientX-dragRect.startX)}px`;
            console.log(drag.current.getBoundingClientRect().width)
            
          }
        }
      }
      if(e.clientX<dragRect.startX){
        if(checkRectBoundary(e,dragRect)){
          if(rect.current.getBoundingClientRect().left>parentt.current.getBoundingClientRect().left){
            rect.current.style.left=`${dimensions['x1']-(dragRect.startX-e.clientX)}px`
          }
        }
      }
      if(e.clientY>dragRect.startY){
        if(checkRectBoundary(e,dragRect)){
          if(rect.current.getBoundingClientRect().bottom<parentt.current.getBoundingClientRect().bottom){
            rect.current.style.top=`${dimensions['y1']+(e.clientY - dragRect.startY)}px`
          }
        }
      }
      if(e.clientY<dragRect.startY){
        if(checkRectBoundary(e,dragRect)){
          if(rect.current.getBoundingClientRect().top>parentt.current.getBoundingClientRect().top){
            rect.current.style.top=`${dimensions['y1']-(dragRect.startY - e.clientY)}px`
          }
        }
      }
    }
  }

  const checkRectBoundary =(e,dragRect)=>{
    //return( &&  && >0 && rect.current.offsetTop>0)
    const result = e.clientX+(child.right-dragRect.startX)<parent.right && e.clientX+1-(dragRect.offsetX+7)>parent.left && parent.bottom>e.clientY+(child.height-dragRect.offsetY-7) && parent.top<e.clientY-(dragRect.offsetY+7);
    return result;
  }

  const dragRectangleStop =(e)=>{
    e.stopPropagation()
    setInitialDimensions();
    setDragRect({startX:'',startY:''});
  }

  const dragRectStart=(e)=>{
    e.stopPropagation()
    let copyChild=rect.current.getBoundingClientRect();
    let newChild = {}
    let params;
    for(params in copyChild){
      newChild[params]=copyChild[params]-1;
    }
    setChild({...newChild})
    setDragDirection({dragging:true});
    setType('dragging');
    setDragRect({startX:e.clientX,startY:e.clientY,offsetX:e.nativeEvent.offsetX,offsetY:e.nativeEvent.offsetY});
  }

  const drop=(e)=>{
    e.preventDefault()
    console.log('drop')
  }
  const leave =(e)=>{
    console.log('Leave')
  }
  const haveDimensions = details ? 'block' : 'none';
  const drag = useRef();

  return (
    <div className='main'>
    <div className="App" draggable={false} ref={parentt} onMouseDown={startDrawing} onMouseUp={stopDrawing} onMouseMove={cursorMove}>
    <div className='rect'ref={rect} onMouseDown={dragRectangleStart}  style={{left:coords.leftt,top:coords.topp,width:coords.width,height:coords.height,display:haveDimensions}}>
      <div className='draggable' ref={drag} draggable={false} onDragStart={preventDrag} onMouseDown={dragRectStart} onMouseUp={dragRectangleStop}></div>
      <span className='east' ref={east} draggable={false} onDragStart={preventDrag}  onMouseDown={eastDraggingStart} style={{display:haveDimensions}}></span>
      <span className='west' ref={west} draggable={false} onDragStart={preventDrag} onMouseDown={westDraggingStart} style={{display:haveDimensions}}></span>
      <span className='north' ref={north} draggable={false} onDragStart={preventDrag} onMouseDown={northDragggingStart} style={{display:haveDimensions}}></span>
      <span className='south' ref={south} draggable={false} onDragStart={preventDrag} onMouseDown={southDraggingStart} style={{display:haveDimensions}}></span>
      <span className='northWest' ref={northWest} draggable={false} onDragStart={preventDrag} onMouseDown={northWestDraggingStart} style={{display:haveDimensions}}></span>
      <span className='northEast' ref={northEast} draggable={false} onDragStart={preventDrag} onMouseDown={northEastDraggingStart} style={{display:haveDimensions}}></span>
      <span className='southWest' ref={southWest} draggable={false} onDragStart={preventDrag} onMouseDown={southWestDraggingStart} style={{display:haveDimensions}}></span>
      <span className='southEast' ref={southEast} draggable={false} onDragStart={preventDrag} onMouseDown={southEastDraggingStart} style={{display:haveDimensions}}></span>
    </div>
    </div>
    </div>
  );
}

export default Component2;

/*/*else if (
      rect.current.offsetLeft + child['width'] + 2 >=
      parentDimension.width
    ) {
      //console.log()
      rect.current.style.left = `${parentDimension.width - child['width']}px`;
      setDragRect({
        ...dragRect,
        startX: e.clientX,
      });
    } */
  /*const checkRectBoundary = (e, dragRect) => {
    //console.log(parentDimension);
    const result1 =
      rect.current.offsetLeft > 0 &&
      rect.current.offsetLeft + child['width'] + 2 < parentDimension.width &&
      rect.current.offsetTop > 0 &&
      parentDimension['height'] > rect.current.offsetTop + child['height'] + 2;
    console.log(result1);
    const result =
      e.clientX + 2 + (child.right - dragRect.startX) < parent.right &&
      e.clientX + 1 - (dragRect.offsetX + 7) > parent.left &&
      parent.bottom > e.clientY + (child.height - dragRect.offsetY - 7) &&
      parent.top < e.clientY - (dragRect.offsetY + 7);
    return result1;
  };*/