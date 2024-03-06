import { useCallback, useState,useEffect,useRef } from 'react'


function App() {
  const [length, setlength] = useState(8);
  const [numberAllowed,setNumberAllowed]=useState(false);
  const [charAllowed,setCharAllowed]=useState(false);
  const[password,setPassword]=useState("");


  // useRef user feel optimisation select particular length, pata chala select hua hai ki nhi
  // line 62 comunnicate with line 15
  const passwordRef=useRef(null);




// useCallback for optimisng keeping in cache
  const passwordGenerator=useCallback( ()=>{
    let pass="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if(numberAllowed){
      str+="0123456789";
    }
    if(charAllowed){
      str+="!@#$%^&*()";
    }
    for(let i=1;i<=length;i++)
    {
      // index value
      let index= Math.floor(Math.random()* str.length + 1);
      pass+=str.charAt(index);

    }
    setPassword(pass)
  },[length,numberAllowed,charAllowed,setPassword] )

// also keep or optimise the function in  case of dependencies
  const copyPasswordToClipboard=useCallback( ()=>{
    passwordRef.current?.select();
    passwordRef.current.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password)
  }, [password,passwordRef])

  //useEffect for calling whenever there is any change
  useEffect(()=>{
    passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator])

  return (
    <>
    <div className='w-full max-w-xl mx-auto shadow-md rounded-lg px-4 my-40 py-4 text-xl  text-orange-500 bg-gray-800'>
      <h1 className='text-white text-xl text-center py-2'>PASSWORD GENERATOR</h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input
        type="text"
        value={password}
        className='outline-none w-full px-1 py-3'
        placeholder="password"
        readOnly
        ref={passwordRef}
        />
        <button onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>copy
        </button>
      </div>
      <div className='flex text-m gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
          type="range"
          min={6}
          max={100}
          value={length}
          className='cursor-pointer'
          onChange={(e)=>{setlength(e.target.value)}}
          />
          <label>Length: {length}</label>
        </div>
        <div className='flex items-center gap-x-3'>
        <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={(e)=>{setNumberAllowed(prev=>!prev)}}
          />
          <label htmlFor='numberInput'>Numbers</label>
        </div>
        <div className='flex items-center gap-x-1'>
        <input
          type="checkbox"
          defaultChecked={charAllowed}
          id="charInput"
          onChange={(e)=>{setCharAllowed(prev=>!prev)}}
          />
          <label htmlFor='charInput'>Chararacters</label>
        </div>
      </div>
 </div>

  </>
      
  )
}

export default App
