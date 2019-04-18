import React, { Component } from 'react';

class Nav extends Component {
    render() {
        return(
            <div>
                nav component
                {this.props.children}
            </div>
        )
    }
}

export default Nav;