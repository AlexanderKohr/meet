import React, { Component } from 'react';
import NumberOfEvents from './NumberOfEvents';
import { InfoAlert } from './Alert';

class CitySearch extends Component {
    state = {
        query: '',
        suggestions: [],
        showSuggestions: false,
        infoText: ''
    }

    handleInputChanged = (event) => {
        const value = event.target.value;
        this.setState({showSuggestions:true});
        const suggestions = this.props.locations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        });
        if (suggestions.length === 0) {
            this.setState({
                query: value,
                infoText: 'We can not find the city you are looking for. Please try another city.',
            });
        } else {
            return this.setState({
                query: value,
                suggestions,
                infoText: ''
            });
        }
    };

    handleItemClicked = (suggestion) => {
        this.setState({
            query: suggestion,
            showSuggestions: false
        });

        this.props.updateEvents(suggestion);
    }

    render () {
        const { query } = this.state;
        return (
            <div className='CitySearch'>
                <div className='CitySearchAlert'>
                <InfoAlert text={this.state.infoText} />
                </div>
                <form>
                    <label className='citysearch-label'>Search for your nearest city</label>
                <input
                    type='text'
                    className='city'
                    placeholder='Search for a city'
                    value={query}
                    onChange={this.handleInputChanged}
                    onFocus={() => { this.setState({ showSuggestions: true }) }}
                />
                </form>
                
                <ul className='suggestions'
                    style={this.state.showSuggestions ? {}: { display: 'none' }}
                >
                    {this.state.suggestions.map((suggestion) => (
                        <li 
                        key={suggestion}
                        onClick={() => this.handleItemClicked(suggestion)}>
                            {suggestion}
                        </li>
                    ))}
                    <li onClick={() => this.handleItemClicked('all')}>
                        <b>See all cities</b>
                    </li>
                </ul>
            </div>
        );
    }
}

export default CitySearch;