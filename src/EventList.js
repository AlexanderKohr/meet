import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import Event from './Event';

class EventList extends Component {
    render() {
        const { events } = this.props;
        return (
            <Row className='EventList'>
                {events.map((event) => (
                    <Col key={event.id}>
                        <Event event={event} />
                    </Col>
                    ))}
            </Row>
        );
    }
}

export default EventList;