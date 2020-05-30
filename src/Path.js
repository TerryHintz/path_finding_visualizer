import React, {Component} from 'react';
import './Path.css'

// const HEIGHT = 9;
// const WIDTH = 16;

class Path extends Component {
    state = {
        grid: [],
    }

    componentDidMount(){
        this.createGrid();
    }

    createGrid = () => {
        const width = window.innerWidth / 32;
        const height = window.innerHeight / 40;
        let grid = [];
        for(let i=0; i<height; i++){
            let row = [];
            for(let j=0; j<width; j++){
                row.push(null);
            }
            grid.push(row);
        }
        this.setState({grid});
    }

    render () {
        return (
            <div className='path-root'>
                <div className='path-grid'>
                    {this.state.grid.map((row, index) => {
                        return(
                            <div key={index} className='path-row'>
                                {row.map((square, index) => {
                                    return (
                                        <div key={index} className='path-square'></div>
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
