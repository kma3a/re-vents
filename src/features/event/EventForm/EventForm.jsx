import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Segment, Form, Button } from 'semantic-ui-react';
import {createEvent, updateEvent} from '../eventActions';
import cuid from 'cuid';

const mapState = (state, ownProps) => {
  const eventId = ownProps.match.params.id;

  let event = {
    title: '',
    city: '',
    date: '',
    venue: '',
    hostedBy: ''
  };

  if(eventId && state.events.length > 0 ) {
    event = state.events.filter(event => event.id === eventId)[0];
  }
  return {
    event
  }
}

const actions = {
  createEvent,
  updateEvent
};

class EventForm extends Component {
  state = {
    event: Object.assign({}, this.props.event)
  }
  onFormSubmit = (evt) => {
    evt.preventDefault();
    if(this.state.event.id) {
      this.props.updateEvent(this.state.event);
      this.props.history.goBack();
    } else {
      const newEvent = {
        ...this.state.event,
        id: cuid(),
        hostPhotoURL : '/assets/user.png'
      };
      this.props.createEvent(newEvent);
      this.props.history.push('/events');
    }
  }

   onInputChange = (evt) => {
    const newEvent = this.state.event;
    newEvent[evt.target.name] = evt.target.value;
    this.setState({
      event: newEvent
    });
  }

  render() {
    const {handleCancel} = this.props;
    const {event} = this.state;
    return (
      <Segment>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Event Title</label>
            <input onChange={this.onInputChange} name='title' value={event.title}placeholder="First Name" />
          </Form.Field>
          <Form.Field>
            <label>Event Date</label>
            <input name='date' onChange={this.onInputChange} type="date" placeholder="Event Date" value={event.date} />
          </Form.Field>
          <Form.Field>
            <label>City</label>
            <input onChange={this.onInputChange} name='city' placeholder="City event is taking place" value={event.city} />
          </Form.Field>
          <Form.Field>
            <label>Venue</label>
            <input onChange={this.onInputChange} name='venue' placeholder="Enter the Venue of the event" value={event.venue}/>
          </Form.Field>
          <Form.Field>
            <label>Hosted By</label>
            <input onChange={this.onInputChange} name='hostedBy' placeholder="Enter the name of person hosting" value={event.hostedBy}/>
          </Form.Field>
          <Button positive type="submit">
            Submit
          </Button>
          <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
        </Form>
      </Segment>
    );
  }
}

export default connect(mapState,actions)(EventForm);

