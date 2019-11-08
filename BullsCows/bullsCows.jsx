const React = require('react');
const UserTry = require('./userTry');

class BullsCows extends React.Component{
    state={
        result:'',
        value:'',
        answer: getValue(),
        tries:[],
        over:false,
    }
    
    onSubmit=(e)=>{
        e.preventDefault();
        
        if(!this.state.over){
        const answer = this.state.answer;
        const value  = this.state.value;
        
        //1. check input length is 4
        if(value.length!==4){ 
            this.setState({result:'Enter "four" digits!'}) 
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
                this.setState({result:'Enter "unique" four digits!'});
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

        this.setState((prevState)=>{
            return{
                tries: [...prevState.tries, t],
                value:'',
            }});

        if(strike===4){      
        this.setState(()=>{ 
            return{
                result: this.state.answer.join('') + ' is answer. Congratulations! reset game.',
                over:true,
        }})}else{
            this.setState({result: `you have ${10 - this.state.tries.length -1} more tries!` });
        }
       
        if(this.state.tries.length>=9){
            this.setState(()=>{
                return{
                    over: true,
                    result:'Woops! game over. Anser is '+this.state.answer.join('') +' reset to try again.'
                }
            });
        }

        }
    this.input.focus();
       return;
    }

    onRefInput=(c)=>{
        this.input=c;
    }

    onChange=(e)=>{
    
        this.setState({value: e.target.value})
    }

    input;

    onReset=(e)=>{
        this.setState(()=>{ 
            return{
                value:'',
                tries:[],
                answer:getValue(),
                result:'',
                over:false,
            }
        } )
    }




    render(){


        const t = this.state.tries.map((t,i)=>{
            return <div key={'try'+i}>
                <li><b>{t.value}</b> :  {t.ball} ball(s)  | {t.strike} strike(s)</li>

            </div>
        })

        



        return(
            <>
           <h2>Enter 4 different digits between 0 ~ 9, then click "ok"</h2>
           
            <form onSubmit={this.onSubmit}>    
                
                <input type="number"  value={this.state.value} onChange={this.onChange}
                 ref={this.onRefInput}/>
                    <button>ok</button>
                   <h3>{this.state.result}</h3>
            </form>
           
            <div><UserTry value={t}></UserTry> </div>
               <button onClick={this.onReset}>reset</button>

        </>

    )
    }
    }

const getValue =()=>{
    var arr = [];
    for(var i =0; arr.length<4 ; i++){
        const e= Math.ceil(Math.random()*9);
        if(!arr.find((element)=>{ return element ===e})){
            arr.push(e);
        }
    }
    return arr;
    
}

module.exports = BullsCows;