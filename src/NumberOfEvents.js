import React, { Component } from 'react';

class NumberOfEvents extends Component {
    state = {
        numberOfEvents: 18,
    }

    handleInputChanged = (event) => {
        const number = event.target.value;
        if (number <= 0 || number > 18) {
          this.setState({
            message: "Enter number between 1 and 18",
          });
        } else {
          this.setState({
            numberOfEvents: number,
            message: "",
          });
        }
      };

    render () {

        return (
            <div className='numberOfEvents'>
                <input 
                type='number'
                className='inputNumberOfEvents'
                onChange={this.handleInputOnChange}
                value={this.state.numberOfEvents}
                />
            </div>
        )
    }
}

export default NumberOfEvents;