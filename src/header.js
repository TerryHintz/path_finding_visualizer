import React, {Component} from 'react';
import './Path.css';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';

const path_algorithms = [
    
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
                        {/* <span className='header-text'>{'Numbers:'}</span> */}
                        
                        {/* <Button
                            color='primary'
                            variant="contained"
                            className={this.props.working ? 'disable-button header-button' : 'header-button'}
                            disabled={this.props.working}
                            onClick={() => this.props.randomizeArray(this.state.numsInput, true)}
                        >
                            {'Random'}
                        </Button> */}
                    </div>
                    <div className='header-section'>
                        <Button
                            className={'header-button'}
                            style={{backgroundColor: this.props.working ? 'red' : 'limegreen'}}
                            variant='contained'
                            onClick={() => this.props.handleButton('animate')}
                        >
                            {this.props.working ? 'Terminate' : 'Animate'}
                        </Button>
                        {path_algorithms.map((method) => {
                            return (
                                <Button
                                    // disabled={this.props.working}
                                    className={'header-button'}
                                    // style={{backgroundColor: this.props.selected === method ? 'rgb(220, 0, 78)' : '#3f51b5'}}
                                    key={method}
                                    variant='contained'
                                    // onClick={() => this.props.handleSort(method, [], 0)}
                                >
                                    {method}
                                </Button>
                            )
                        })}
                        {/* <Button
                            className={this.props.working ? 'mobile-sort disable-button header-button' : 'mobile-sort header-button'}
                            style={{backgroundColor: '#3f51b5'}}
                            onClick={() => this.toggleDrawer()}
                        >
                            {'Algorithms'}
                        </Button> */}
                    </div>
                    {/* <Drawer anchor={'bottom'} open={this.state.drawer} onClose={() => this.toggleDrawer()}>
                        {sorting_methods.map((method) => {
                            return (
                                <div
                                    key={method + ' mobile'}
                                    onClick={() => this.props.handleSort(method, [], 0)}
                                    style={{backgroundColor: this.props.selected === method ? 'salmon' : 'white'}}
                                    className='mobile-button'
                                >
                                    {method}
                                </div>
                            )
                        })}
                    </Drawer> */}
                </div>
        )
    }
}

export default Header;