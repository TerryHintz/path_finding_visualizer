import React, {Component} from 'react';
import './Path.css'
import Header from './header'

import StartIcon from '@material-ui/icons/PlayArrow';
import TargetIcon from '@material-ui/icons/FilterTiltShift';

import {dfs} from './Algorithms'

var timeouts = [];

class Path extends Component {
    state = {
        grid: [],
        start: {},
        end: {},
        method: 'Depth First Search',
        animated: false,
    }

    componentDidMount(){
        this.createGrid();
    }

    handleButton = (method) => {
        switch (method){
            case 'animate':
                let res;
                const copy = this.state.grid.slice(0);
                if(this.state.method === 'Depth First Search'){
                    res = dfs(copy, this.state.start, this.state.end);
                }
                if(res){
                    this.setState({animated: true});
                    this.animate(res);
                }
                break;
            case 'terminate':
                this.terminate();
                break;
            case 'randomize':
                this.createGrid();
                break;
            case 'Depth First Search':
                this.setState({method: 'Depth First Search'});
                break;
            case 'Breadth First Search':
                this.setState({method: 'Breadth First Search'});
                break;
            default:
                console.warn('Case not found');
                break;
        }

    }

    terminate = () => {
        for (var i=0; i<timeouts.length; i++) {
            clearTimeout(timeouts[i]);
        }
        this.setState({animated: false});
    }

    animate = (res) => {
        const SPEED = 20;
        const trail = res[0];
        const search = res[1];
        const trailLen = trail.length;
        const searchLen = search.length;
        const width = res[2];

        const squares = document.getElementsByClassName('path-square');

        let i = 0;
        for(i; i<searchLen; i++){
            const index = search[i].y * width + search[i].x;
            timeouts.push(window.setTimeout(() => {
                squares[index].style.backgroundColor = 'red';
            }, i * SPEED));
            timeouts.push(window.setTimeout(() => {
                squares[index].style.backgroundColor = 'firebrick';
            }, i * SPEED + SPEED));
        }
        let j = 0;
        for(j; j<trailLen; j++){
            const index2 = trail[j].y * width + trail[j].x;
            timeouts.push(window.setTimeout(() => {
                squares[index2].style.backgroundColor = 'forestgreen';
            }, j * SPEED + i * SPEED));
        }
        timeouts.push(window.setTimeout(() => {
            this.setState({animated: false});
        }, j * SPEED + i * SPEED));
    }

    createGrid = () => {
        let width = Math.floor(window.innerWidth / 32);
        let height = Math.floor(window.innerHeight / 39);
        if(height < 20){
            height = 20;
        }
        // height = 10;
        // width = 10;
        let grid = [];
        for(let i=0; i<height; i++){
            let row = [];
            for(let j=0; j<width; j++){
                const random = Math.floor(Math.random() * 3);
                row.push(random === 0 ? 1 : 0);
            }
            grid.push(row);
        }
        const startX = Math.floor(Math.random() * width);
        let startY = Math.floor(Math.random() * height);
        const endX = Math.floor(Math.random() * width);
        let endY = Math.floor(Math.random() * height);
        while(startY === endY){
            startY = Math.floor(Math.random() * height);
            endY = Math.floor(Math.random() * height);
        }
        grid[startY][startX] = 's';
        grid[endY][endX] = 'e';
        const start = {startX, startY};
        const end = {endX, endY};
        this.resetColor();
        this.setState({grid, start, end});
    }

    resetColor = () => {
        const squares = document.getElementsByClassName('path-square');
        const nums = squares.length;
        for(let i=0; i<nums; i++){
            const square = squares[i].style.backgroundColor;
            if(square === 'firebrick' || square === 'forestgreen'){
                squares[i].style.backgroundColor = 'white';
            }
        }
    }

    render () {
        return (
            <div className='path-root'>
                <Header
                    handleButton = {this.handleButton}
                    method = {this.state.method}
                    animated = {this.state.animated}
                />
                <div className='path-grid'>
                    {this.state.grid.map((row, index) => {
                        return(
                            <div key={index} className='path-row'>
                                {row.map((square, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className='path-square'
                                            style={{backgroundColor: square === 0 ? 'white' : square === 1 ? 'cornflowerblue' : 'white'}}
                                        >
                                            {square === 0 ? '' : square === 1 ? '' : square === 's' ? <StartIcon className='path-icon'/> : square === 'e' ? <TargetIcon className='path-icon'/> : ''}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default Path;
