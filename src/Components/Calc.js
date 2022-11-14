import React, { useState, useContext } from "react";
import { addStyles, EditableMathField } from "react-mathquill";

import { latexContext, toggleContext } from "../Context/contexts";

addStyles();

function Calc() {
    const {latex, setLatex} = useContext(latexContext);
    const {toggle, setToggle} = useContext(toggleContext);

    function evaluate() {
        setToggle((current) => {
            if (current) {
                return false;
            } else {
                return true;
            }
        });
        console.log(latex);
    }

    return (
        <div className='calc'>
            <EditableMathField latex={latex} onChange={(mathField) => {
                setLatex(mathField.latex());
            }}/>
            <button onClick={evaluate}>Evaluate</button>
        </div>
    );
};

export default Calc;