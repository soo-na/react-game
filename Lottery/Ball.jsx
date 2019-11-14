const React = require('react');
const {memo} = React;

const Ball =(props)=>{

        if(props.number <10){
            background='red';
        }
        else if(props.number <20){
            background='orange';
    
        }else if(props.number <30){
            background='blue';
        }
        else if(props.number<40){
            background='green';
        }
        else {
            background='yellow';
        }

     return(
            <><div className='ball' style={{background}}>{props.number}</div></>
              )

}

module.exports = memo(Ball);