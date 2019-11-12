const  React =  require('react');

class ResponseCheck extends React.Component{
   
    state = {
        state:'waiting',
        message:'Click to start',
        result:[],

    }

    onReset=()=>{
        this.setState({
            result:[],
        });
    }
    renderAverage=()=>{
        const result= this.state.result;
        return(
            result.length===0?
            null : 
            <div>
               average: {result.reduce((a,c)=>a+c)/result.length}ms
               <button onClick={this.onReset}>reset</button>
            </div>)

    }

    timeout;
    startTime;
    endTime;

    onClickScreen=(e)=>{
        const {state, message, result} = this.state;

        if(state==='waiting'){
           
            this.setState({
                state:'ready',
                message:'click when green'
            });

           this.setTimeout = setTimeout(()=>{
                this.setState({
                    state:'now',
                    message:'click!'
                });
                this.startTime = new Date();//

            }, Math.floor(Math.random() *1000)+2000);

        }else if(state==='ready'){//click too fast
            clearTimeout(this.timeout);
            this.setState({ 
            state:'waiting',
            message:'Too fast, click when green',
            });

        }else if(state ==='now'){//check response speed
            this.endTime= new Date();
            this.setState((prevState)=>{
                return{
                    state:'waiting',
                    message:'Click to start',
                    result: [...prevState.result, this.endTime - this.startTime], 
                }
            })
                
            
        }
    }
    

    render(){
        return(<> 
        <div id='screen' className={this.state.state} onClick={this.onClickScreen}>
        <div>{this.state.message}</div></div>
        {this.renderAverage()} 
        </>);
    }
}

module.exports = ResponseCheck;

