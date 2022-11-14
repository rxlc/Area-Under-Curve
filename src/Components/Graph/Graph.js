import React, { useRef, useEffect, useContext } from "react";
import p5 from 'p5';

import { latexContext ,toggleContext } from "../../Context/contexts";

import GraphObj from './graphObj'

let graph;

function sketch(p) {
    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        graph = new GraphObj(p, p.windowWidth, p.windowHeight);
    }

    p.draw = function() {
        p.background(40);
        graph.update();
        graph.render();
    }

    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth,p.windowHeight);
        graph.resize(p.windowWidth,p.windowHeight);
    }

    p.mouseWheel = function(event) {
        graph.zoom(event);
    }
}

function Graph() {
    const p5ContainerRef = useRef();
    const {toggle, setToggle} = useContext(toggleContext);
    const {latex, setLatex} = useContext(latexContext);

    useEffect(() => {
        if (graph) {
            graph.setFunction(latex);
        }
    }, [toggle])

    useEffect(() => {
        const p5Instance = new p5(sketch, p5ContainerRef.current);

        return () => {
            p5Instance.remove();
        }
    }, []);

    return (
        <div className='graph' ref={p5ContainerRef} />
    );
}

export default Graph;