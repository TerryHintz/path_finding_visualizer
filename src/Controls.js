import React, {Component} from 'react';
import './Path.css';

import Button from '@material-ui/core/Button';

const speeds = ['Slowest', 'Slow', 'Medium', 'Fast', 'Fastest'];

class Controls extends Component{

    render() {
        return (
            <div className="path-control-panel">
                {speeds.map((speed) => {
                    return(
                        <Button
                            key={speed}
                            className={'header-button'}
                            disabled={this.props.animating}
                            style={{backgroundColor: this.props.animating ? 'grey' : this.props.speed === speed ? 'rgb(220, 0, 78)' : '#3f51b5'}}
                            variant='contained'
                            onClick={() => this.props.handleSpeed(speed)}
                        >
                            {speed}
                        </Button>
                    )
                })}
            </div>
        )
    }
}

export default Controls;