import React, {Component} from 'react';
import './Path.css';
import Button from '@material-ui/core/Button';
// import CasinoIcon from '@material-ui/icons/Casino';
// import Drawer from '@material-ui/core/Drawer';

const path_algorithms = [
    {full: 'Depth First Search', short: 'DFS'},
    {full: 'Breadth First Search', short: 'BFS'},
];

class Header extends Component {
    state = {
        
    }

    toggleDrawer = () => {
        this.setState({drawer: !this.state.drawer})
    }

    render() {

        const window_width = window.innerWidth;

        return(
            <div className='header'>
                    <div className='header-section'>
                        {path_algorithms.map((method) => {
                            return (
                                <Button
                                    className={'header-button'}
                                    style={{backgroundColor: this.props.method === method.full ? 'rgb(220, 0, 78)' : '#3f51b5'}}
                                    key={method.full}
                                    variant='contained'
                                    onClick={() => this.props.handleButton(method.full)}
                                >
                                    {window_width > 500 ? method.full : method.short}
                                </Button>
                            )
                        })}
                        {window_width > 1000 &&
                            <Button
                                className={'header-button'}
                                color='primary'
                                variant='contained'
                            >
                                {'More algorithms soon!'}
                            </Button>
                        }
                    </div>
                    <div className='header-section'>
                        <Button
                            disabled={this.props.animating}
                            className={'header-button'}
                            style={{backgroundColor: this.props.animating ? 'grey' : '#3f51b5'}}
                            variant='contained'
                            onClick={() => this.props.handleButton('randomize')}
                        >
                            {window_width > 600 ? 'Randomize Grid' : 'Random'}
                        </Button>
                        <Button
                            disabled={this.props.animated}
                            className={'header-button'}
                            style={{backgroundColor: this.props.animated ? 'grey' : this.props.animating ? 'firebrick' : 'limegreen'}}
                            variant='contained'
                            onClick={() => this.props.handleButton(this.props.animating ? 'terminate' : 'animate')}
                        >
                            {this.props.animating ? 'Terminate' : 'Animate'}
                        </Button>
                    </div>
                </div>
        )
    }
}

export default Header;