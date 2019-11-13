const  React =  require('react');
const {useState, useRef, useEffect, memo}= React;

const rpsCoords ={
    rock:0,
    siser:'-142px',
    paper:'-284px',
}
const scores={
    siser:1,
    paper:-1,
    rock:0,
}
 
const computerChoice=(imgCoord)=>{
    return Object.entries(rpsCoords).find((rpsCoord)=>rpsCoord[1] ===imgCoord)[0];
}

const RPS=memo(()=>{

    const [result, setResult]= useState('');
    const [imgCoord, setImgCoord]=useState(rpsCoords.rock);
    const [score, setScore]= useState(scores.rock);
    const interval = useRef(null);

    const changeHand=()=>{
        
        if(imgCoord === rpsCoords.siser){
            //console.log('rpsCoords.siser');
            setImgCoord(rpsCoords.rock);

        }else if(imgCoord === rpsCoords.paper){
            //console.log('rpsCoords.paper');
            setImgCoord(rpsCoords.siser);
        }
        else if(imgCoord=== rpsCoords.rock){
            //console.log('rpsCoords.rock');
            setImgCoord(rpsCoords.paper);
        }
    }


    useEffect(()=>{
        //console.log('useEffet start');
        interval.current = setInterval(changeHand, 50);// componentDidMount 
        return ()=>{
            //console.log('finish');
            clearInterval(interval.current); //return works like componentWilUnmount
        } 
    }, [imgCoord]); 

//    const componentDidMount(){//call setInterval asyn request only when it render first
//         this.interval = setInterval(this.changeHand ,50);
//     }
//    const componentWillUnmount(){
//         clearInterval(this.interval);
//     }

   const onClickBtn=(choice)=>{

        clearInterval(interval.current);

        const myScore = scores[choice];
        const computerScore = scores[computerChoice(imgCoord)];
        const diff = myScore - computerScore;

        if(diff===0){
            setResult('tied!');
        }else if([-1,2].includes(diff)){
            setResult('you win!');
            setScore((prevScore)=> prevScore+1)
        }else{
            setResult('you lose!');
            setScore((prevScore)=> prevScore-1)
        }
        
         setTimeout(()=>{ interval.current = setInterval(changeHand, 50)}, 1000);
    }
   
        return(<>   
        {//console.log('return'
        }
        <div id='computer' style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0px`}}></div>
        <div>
            <button id='rock' className='rpsBtn' onClick={()=> onClickBtn('rock')}> rock</button>
            <button id='siser' className='rpsBtn' onClick={()=> onClickBtn('siser')}> siser</button>
            <button id='paper' className='rpsBtn' onClick={()=> onClickBtn('paper')}> paper</button>
        </div>
           <div>{result}</div> 
           <div>score: {score}</div>
          </>)
})
module.exports = RPS;

