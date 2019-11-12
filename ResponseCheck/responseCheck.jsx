const  React =  require('react');
const {useState, useRef} = React;

const ResponseCheck =()=>{
   
    const [state, setState]=useState('waiting');
    const [message, setMessage] = useState('Click to start');
    const [result, setResult] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef(0);
    const endTime = useRef(0);

    const onReset=()=>{
        setResult([]);
    }
    const renderAverage=()=>{
        return(
            result.length===0?
            null : 
            <div>
               average: {result.reduce((a,c)=>a+c)/result.length}ms
               <button onClick={onReset}>reset</button>
            </div>)
    }

   
    const onClickScreen=(e)=>{

        if(state==='waiting'){
            setState('ready');
            setMessage('click when green')


           timeout.current = setTimeout(()=>{
                    setState('now');
                    setMessage('click!');
                startTime.current = new Date();//

            }, Math.floor(Math.random() *1000)+2000);

        }else if(state==='ready'){//click too fast
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('Too fast, click when green');
        

        }else if(state ==='now'){//check response speed
            endTime.current= new Date();
            
            setState('waiting');
            setMessage('Click to start');
            setResult((prevResult)=>{return [...prevResult, endTime.current - startTime.current]})
        }
    }
    

    
     return(<> 
        <div id='screen' className={state} onClick={onClickScreen}>
        <div>{message}</div></div>
        {renderAverage()} 
        </>);
    
}

module.exports = ResponseCheck;

