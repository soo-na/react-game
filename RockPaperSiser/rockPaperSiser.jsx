const  React =  require('react');
const {PureComponent}= React;
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
        return Object.entries(rpsCoords).find((rpsCoord)=>
        rpsCoord[1] ===imgCoord)[0];
}
class RPS extends PureComponent{
    state={
        result:'',
        imgCoord:0,
        score:0,
    }

    interval;


    changeHand=()=>{
            
        const {imgCoord} = this.state;
        if(imgCoord === rpsCoords.siser){

            this.setState({imgCoord:rpsCoords.rock});

        }else if(imgCoord === rpsCoords.paper){


            this.setState({imgCoord:rpsCoords.siser});
        }
        else if(imgCoord=== rpsCoords.rock){

            this.setState({imgCoord:rpsCoords.paper});
        }
    }
    componentDidMount(){//call setInterval asyn request only when it render first
        
        this.interval = setInterval(this.changeHand ,50)
    }

    componentWillUnmount(){
        clearInterval(this.interval);

    }

    onClickBtn=(choice)=>()=>{

        const  {imgCoord} =this.state;

        clearInterval(this.interval);
        
        //siser:1, paper:-1, rock:0
        // lose: siser-rock//1, paper-siser//-2, rock-paper//1
        // win: siser-paper//2, paper-rock//-1, rock-siser//-1
        const myScore = scores[choice];
        const computerScore = scores[computerChoice(imgCoord)];
        const diff = myScore - computerScore;

        if(diff===0){
            this.setState({
                result:'tied!'
            })
        }else if([-1,2].includes(diff)){
                this.setState((prevState)=>{return{
                    result:'you won!',
                    score: prevState.score +1,
                } });

        }else{
            this.setState((prevState)=>{return{
                result:'you lose!',
                score: prevState.score -1,
            } });

        }

        this.interval = setInterval(this.changeHand, 50)

    }
    render(){

        const {result, imgCoord, score } =this.state;

        return(<>
        <div id='computer' style={{background:`url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0px`}}>
        </div>
        <div>
        <button id='rock' className='rpsBtn' onClick={this.onClickBtn('rock')}> rock</button>
        <button id='siser' className='rpsBtn' onClick={this.onClickBtn('siser')}> siser</button>
        <button id='paper' className='rpsBtn' onClick={this.onClickBtn('paper')}> paper</button>
        </div>
           <div>{result}</div> 
           <div>score: {score}</div>
          </>)
    }
}

module.exports = RPS;

