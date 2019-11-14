const  React =  require('react');
const Ball = require('./Ball');
const {PureComponent} = React;

const getWinNumbers=()=>{
    console.log('getWinNumbers');
    
    const candidate = Array(49).fill().map((v,i)=> i+1);
  
    const shuffle =[];

    while(candidate.length>0){
        const random =Math.floor(Math.random()*candidate.length);
        shuffle.push(candidate.splice(random, 1)[0]);//array.splice returning the deleted array
    }
    const bonusNumber = shuffle[shuffle.length-1];
    const winNumbers= shuffle.slice(0,6).sort((a, b)=>a-b);
     return [...winNumbers, bonusNumber];
}
class Lottery extends PureComponent{
    state={
        winNumbers:getWinNumbers(),
        winBalls:[],
        bonus:null,
        redo:false,
        
    }
    onClickRedo=()=>{
        this.setState(()=>{
            return{
                winNumbers: getWinNumbers(),
                winBalls:[],
                bonus:null,
                redo:false,
            }
        })
        this.timeouts=[];
    }
    timeouts=[];
    
    runSetTimeouts=()=>{

        const {winNumbers} = this.state;
        const len = winNumbers.length;
    
        for(let i= 0; i< len -1; i++){
          
         this.timeouts[i] =setTimeout(()=>{
                this.setState((prevState)=>{
                    return{
                        winBalls:[...prevState.winBalls, winNumbers[i]]
                    }
                });
            }, (i+1)*1000);  
    
        }
       this.timeouts[len-1] = setTimeout(() => {
           
            this.setState({
                bonus: winNumbers[len-1],
                redo:true,
            })
        }, len*1000);
    }

    componentDidMount(){

        this.runSetTimeouts();
    }

    componentWillUnmount(){

        this.timeouts.forEach((t)=> clearTimeout(t));
    }

    componentDidUpdate(prevProps, prevState){

        if(this.state.winBalls.length===0){
            this.runSetTimeouts();
        }

    }

    render(){

        const {winBalls, bonus, redo} = this.state;
        let balls = winBalls.map((v)=>{
        return( <Ball key={v} number={v}/>)});

     return(<>
            <h3 id='result'> Lottery number:</h3>
                {balls}
            <h3>bonus!</h3>
            {bonus && <Ball number={bonus}/>}
            <div>
            {redo&& <button onClick={this.onClickRedo}>on more</button>}
              </div>
        </>)
    }
}
module.exports = Lottery;

