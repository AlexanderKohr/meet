import React, { Component } from 'react';

class Event extends Component {
    state = {
        event: {},
        collapsed: true
    };

    handleClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    };

    render () {

        const { event } = this.props;
        const { collapsed } = this.props;
        return (
        <div className="event">
        <h2 className="summary">{event.summary}</h2>
        <p className="start-date">
          {event.start.dateTime} ({event.start.timeZone})
        </p>

        <p className="location">
          @{event.summary} | {event.location}
        </p>

        <button
          variant="outline-info"
          className={`details-button ${collapsed ? "show" : "hide"}-details`}
          onClick={this.handleClick}
        >
          {collapsed ? "Show Details" : "Hide Details"}
        </button>

        {!collapsed && (
          <div
            className={`extra-details ${
              this.state.collapsed ? "hide" : "show"
            }`}
          >
            <h3>About the event:</h3>
            <a href={event.htmlLink} rel="noreferrer" target="_blank">
              See details on Google Calendar
            </a>
            <p className="event-description">{event.description}</p>
          </div>
        )}
      </div>

        /* return <div className='event'>
            <button className='show-details'>Show details</button>
            <button className='hide-details'>Hide details</button>
            <p className='location'>{event.location}</p>
            <p className='start-date'>{event.start.dateTime} {event.start.timeZone}</p>
        </div>; */
        );
    }
}

export default Event;