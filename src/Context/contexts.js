import React from 'react';
import { useState, createContext } from "react";

export const latexContext = createContext();
export const toggleContext = createContext();

export function ContextProvider(props) {
    const [latex, setLatex] = useState('');
    const [toggle, setToggle] = useState(false);

    return(
        <latexContext.Provider value={{latex, setLatex}}>
            <toggleContext.Provider value={{toggle, setToggle}}>
                {props.children}
            </toggleContext.Provider>
        </latexContext.Provider>
    );
}