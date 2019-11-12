const React = require('react');
const {memo,PureComponent} = React;

//hooks, memo 
const userTry = memo((tryInfo)=>{
    return(<>
    <li><b>{tryInfo.value} </b>
         ball:{tryInfo.ball}
        strike: {tryInfo.strike}
        </li>
    </>)
});

//class
// class userTry extends PureComponent{
//     render(){

//         return(
//             <>  
//            <li><b>{this.props.value} </b>
//             ball:{this.props.ball}
//             strike: {this.props.strike}
//             </li>
//             </>
//         )
     
//     }
// }

module.exports=userTry; 