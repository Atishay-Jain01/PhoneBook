import React,{useState} from 'react'

export const ClickCounter = () => {
    const[count,setCount]=useState(0);
    const incrementCount=()=>{
        setCount(count+1)
    };
  return (
    <div>
        <h1>ClickCounter</h1>
        <h3>value of count is {count}</h3>
        <button onClick={incrementCount} className="btn btn-warning">click me!</button>
    </div>
  );
};
export default ClickCounter;