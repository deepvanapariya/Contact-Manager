import React from "react";
import SpinnerImg from '../../assets/img/spinner-icon-gif-23.jpg'

let Spinner = () => {

    return (

        <React.Fragment>
            <div>
                <img src={SpinnerImg} alt="" className="d-block m-auto" style={{
                    width:
                        '100px'
                }} />
            </div>
        </React.Fragment>
    )
}
export default Spinner;