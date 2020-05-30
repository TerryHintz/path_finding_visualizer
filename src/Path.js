import React, {Component} from 'react';
import './Path.css'
import Header from './header'

import StartIcon from '@material-ui/icons/PlayArrow';
import TargetIcon from '@material-ui/icons/FilterTiltShift';

import {dfs} from './Algorithms'

class Path extends Component {
    state = {
        grid: [],
        start: {},
        end: {},
    }

    componentDidMount(){
        this.createGrid();
    }

    handleButton = (method) => {
        switch (method){
            case 'animate':
                dfs(this.state.grid, this.state.start, this.state.end);
                break;
        }

    }

    createGrid = () => {
        const width = Math.floor(window.innerWidth / 32);
        let height = Math.floor(window.innerHeight / 39);
        if(height < 20){
            height = 20;
        }
        let grid = [];
        for(let i=0; i<height; i++){
            let row = [];
            for(let j=0; j<width; j++){
                const random = Math.floor(Math.random() * 4);
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
        this.setState({grid, start, end});
    }

    render () {
        return (
            <div className='path-root'>
                <Header
                    handleButton = {this.handleButton}
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
                                            {square === 0 ? '' : square === 1 ? '' : square === 's' ? <StartIcon className='path-icon'/> : <TargetIcon className='path-icon'/>}
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
