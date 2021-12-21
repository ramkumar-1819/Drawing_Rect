import './App.css';
import { useEffect,useRef,useState } from 'react';
import Component1 from './Component1';
import Component2 from './Component2';
import Draggable from 'react-draggable';
import { Stage, Layer, Rect, Transformer } from "react-konva";

function App() {
  const [coords,setCoords] = useState({top:0,left:0,right:0,bottom:0})
    return(<>
    <Component2 leftt={`${coords.left}px`} topp={`${coords.top}px`} width={`${coords.right-coords.left}px`} height={`${coords.bottom - coords.top}px`} details={false}/>
    <button type='button' onClick={()=>setCoords({top:50,left:50,right:120,bottom:120})}>Clicke</button>
    </>)
}
export default App;
//
/*useEffect(()=>{
    trRef.current.setNode(shapeRef.current);
    console.log(shapeRef);
    document.querySelector('canvas').style.border='1px solid red';
  },[])
  
  function getTotalBox(boxes) {
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;

    boxes.forEach((box) => {
      minX = Math.min(minX, box.x);
      minY = Math.min(minY, box.y);
      maxX = Math.max(maxX, box.x + box.width);
      maxY = Math.max(maxY, box.y + box.height);
    });
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  const dm =()=>{
    const boxes = trRef.current.nodes().map((node) =>{ return(node.getClientRect())});
        const box = getTotalBox(boxes);
        console.log(box);
        console.log(stage.current.width())
        trRef.current.nodes().forEach((shape) => {
        
          const absPos = shape.getAbsolutePosition();
          // where are shapes inside bounding box of all shapes?        
          //console.log(shape)
          const offsetX = box.x - absPos.x;
          const offsetY = box.y - absPos.y;
          //console.log('b',box)

          // we total box goes outside of viewport, we need to move absolute position of shape
          const newAbsPos = { ...absPos };
          if (box.x < 0) {
            newAbsPos.x = -box.x;
          }
          if (box.y < 0) {
            newAbsPos.y = -box.y;
          }
          if (box.x + box.width > stage.current.width()) {
            newAbsPos.x = stage.current.width() - box.width - offsetX;
          }
          if (box.y + box.height > stage.current.height()) {
            newAbsPos.y = stage.current.height() - box.height - offsetY;
          }
          shape.setAbsolutePosition(newAbsPos);
        });
  }

  const stage = useRef();
  const shapeRef = useRef();
  const trRef = useRef();
  
  function getCorner(pivotX, pivotY, diffX, diffY, angle) {
    const distance = Math.sqrt(diffX * diffX + diffY * diffY);
    /// find angle from pivot to corner
    angle += Math.atan2(diffY, diffX);
    /// get new x and y and round it off to integer
    const x = pivotX + distance * Math.cos(angle);
    const y = pivotY + distance * Math.sin(angle);
    return { x: x, y: y };
  }

  function getClientRect(rotatedBox) {
    const { x, y, width, height } = rotatedBox;
    const rad = rotatedBox.rotation;

    const p1 = getCorner(x, y, 0, 0, rad);
    const p2 = getCorner(x, y, width, 0, rad);
    const p3 = getCorner(x, y, width, height, rad);
    const p4 = getCorner(x, y, 0, height, rad);

    const minX = Math.min(p1.x, p2.x, p3.x, p4.x);
    const minY = Math.min(p1.y, p2.y, p3.y, p4.y);
    const maxX = Math.max(p1.x, p2.x, p3.x, p4.x);
    const maxY = Math.max(p1.y, p2.y, p3.y, p4.y);

    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  return(<Stage width={500} height={500} ref={stage}>
    <Layer>
      <Rect
        x={20}
        y={50}
        width={100}
        height={100}
        fill="red"
        draggable
        onDragMove={dm}
        ref={shapeRef}
      />
      <Transformer
      ref={trRef}
       rotateEnabled={false}
       anchorSize={5}
       boundBoxFunc={ (oldBox, newBox) => {
        const box = getClientRect(newBox);
        console.log(box);
        const isOut =
          box.x < 0 ||
          box.y < 0 ||
          box.x + box.width > stage.current.width() ||
          box.y + box.height > stage.current.height();

        // if new bounding box is out of visible viewport, let's just skip transforming
        // this logic can be improved by still allow some transforming if we have small available space
        if (isOut) {
          return oldBox;
        }
        return newBox;
      }}
      />
    </Layer>
  </Stage>) */