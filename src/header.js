import React, {Component} from 'react';
import './Path.css';
import Button from '@material-ui/core/Button';
// import Drawer from '@material-ui/core/Drawer';

const path_algorithms = [
    'Depth First Search',
    'Breadth First Search',
];

class Header extends Component {
    state = {
        drawer: false,
    }

    toggleDrawer = () => {
        this.setState({drawer: !this.state.drawer})
    }

    render() {
        return(
            <div className='header'>
                    <div className='header-section'>
                        {path_algorithms.map((method) => {
                            return (
                                <Button
                                    className={'header-button'}
                                    style={{backgroundColor: this.props.method === method ? 'rgb(220, 0, 78)' : '#3f51b5'}}
                                    key={method}
                                    variant='contained'
                                    onClick={() => this.props.handleButton(method)}
                                >
                                    {method}
                                </Button>
                            )
                        })}
                    </div>
                    <div className='header-section'>
                        <Button
                            disabled={this.props.animating}
                            className={'header-button'}
                            style={{backgroundColor: this.props.animating ? 'grey' : '#3f51b5'}}
                            variant='contained'
                            onClick={() => this.props.handleButton('randomize')}
                        >
                            {'Randomize Grid'}
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