const React = require('react');
const {useState, useRef, memo} = React;
const UserTry = require('./userTry');

//change to react hooks with memo
const BullsCows =memo(()=>{

    const [result, setResult] = useState('');
    const [value, setValue] = useState('');
    const [answer, setAnswer] = useState(getValue());
    const [tries, setTries] = useState([]);
    const [over, setOver] = useState(false);
    const inputRef= useRef('');

    const onSubmit=(e)=>{
        e.preventDefault();
        
        if(!over){
        //1. check input length is 4
        if(value.length!==4){ 
            setResult('Enter "four" digits!');
            return; 
        }
        
      // hashtable to check unique values
        var hs = {};
        for(var i=0; i<value.length; i++){
            let c = value.charAt(i);
            hs['hs'+c]===undefined?
            hs['hs'+c]=1 : hs['hs'+c]++;
        }
        
       //2. check if unique characters
        for(let [k,v] of Object.entries(hs)){
            if(v>1){
                setResult('Enter "unique" four digits!');
                return;
            }
        }
        
        //3 ball and strike
        var ball=0;
        var strike=0;
             
        answer.map(a=>{
            let c = a;
            hs['hs'+c]===undefined?
            hs['hs'+c]=1 : hs['hs'+c]--;
        })

        //if 0 -> ball++
        for(let [k,v] of Object.entries(hs)){ if(!v) ball++; }
        //strike
        answer.map((a, i)=>{ if(a ==value.charAt(i)){strike++; ball--;} })
        
        var t= {};
        t.value= value;
        t.ball = ball;
        t.strike = strike;

        setTries((prevTries)=>{return [...prevTries, t]});
        setValue('');
       

        if(strike===4){ 
            setResult(answer.join('') + ' is answer. Congratulations! reset game.');
            setOver(true);
        }else{
            setResult(`you have ${10 - tries.length -1} more tries!` );
        }
       
        if(tries.length>=9){
            setOver(true);
            setResult('Woops! game over. Answer is '+answer.join('') +' reset to try again.');
        };
        }
        inputRef.current.focus();//
         return;
    }

   const onChange=(e)=>{
        setValue(e.target.value);
    }
    
    const onReset=(e)=>{
        setValue('');
        setTries([]);
        setAnswer(getValue());
        setResult('');
        setOver(false);
        
    }

    const t = tries.map((t,i)=>{
        return (
           <UserTry key={'try'+i} value={t.value} ball={t.ball} strike ={t.strike}>
    
           </UserTry>
          
        )
    })


    return(<>

       <h2>Enter 4 different digits between 0 ~ 9, then click "ok"</h2>
           <form onSubmit={onSubmit}>    
               <input type="number"  value={value} onChange={onChange} ref={inputRef}/>
                   <button>ok</button>
                  <h3>{result}</h3>
           </form>
           <div>
               
               <ol>{t}</ol>
               
               </div>
        <button onClick={onReset}>reset</button>
    </>);
})
const getValue =()=>{
    var arr = [];
    for(var i =0; arr.length<4 ; i++){
        const e= Math.ceil(Math.random()*9);
        if(!arr.find((n)=>{ return n ===e})){
            arr.push(e);
        }
    }
    return arr;  
}

module.exports = BullsCows;