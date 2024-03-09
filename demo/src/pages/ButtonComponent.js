import React from 'react';

const ButtonComponent = ({ handleButtonClick }) => {
    return (
        <button style={{ margin: "0 auto", display: "block" }} onClick={handleButtonClick}>Store Current Time</button>
    );
};

export default ButtonComponent;



