import './nprogress.css';
import './App.css';
import React, { Component } from 'react';
import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import CitySearch from './CitySearch';
import EventList from './EventList';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';
import WelcomeScreen from './WelcomeScreen';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
    showWelcomeScreen: undefined
  }

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get('code');
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }

    if (!navigator.onLine) {
      this.setState({
        offlineText:
        'Your are currently offline. The displayed events might not be up to date.'
      });
    } else {
      this.setState({
        offlineText: ''
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateNumberOfEvents = (numberOfEvents) => {
    this.setState(
      {
        numberOfEvents,
      },
      this.updateEvents(this.state.locations, numberOfEvents)
    );
  };

  /* updateEvents = (location)  => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
      events : 
      events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents
      });
    });
  }; */

  updateEvents = (location, eventCount) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      if (this.mounted) {
        this.setState({
          events: locationEvents.slice(0, this.state.numberOfEvents),
          currentLocation: location,
        });
      }
    });
  };

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className='App' />

    return (
      <div className='App'>
        <OfflineAlert text={this.state.offlineText} />
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents numberOfEvents={this.state.numberOfEvents} 
            updateNumberOfEvents={this.updateNumberOfEvents}/>
        <EventList events={this.state.events} numberOfEvents={this.state.numberOfEvents}/>
        <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={()=> { getAccessToken() }} />
      </div>
    );
  }
}


export default App;
