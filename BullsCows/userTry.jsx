const React = require('react');

class userTry extends React.Component{
    render(){
        return(
            <>  
            <ol> {this.props.value}</ol>
            </>
        )
     
    }


}

module.exports=userTry; 