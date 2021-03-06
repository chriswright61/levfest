// import React from 'react'
import React, { useContext } from "react";
import { MainDataContext } from "../../../data/MainDataContext";
import "./EventsAtVenue.css";

import EventCard from "../../../components/EventCard/EventCard";
function EventsAtVenue(props) {
  // props about venue
  // console.log("props", props);

  // state about events
  const events = useContext(MainDataContext).mainState.eventsListData;
  // console.log("events", events);

  if (!events) {
    //   if (events.length === 0) {
    return null;
  } else {
    // filter the data by the venue id
    const venueEvents = events.filter(
      (event) => event.event_venue_id === props.venue_id
    );
    // console.log("venueEvents", venueEvents);
    return (
      <div className="eventsInVenue">
        list events here
        {venueEvents.map((event) => {
          return (
            <EventCard
              key={event.event_id}
              id={event.event_id}
              link={"events"}
              title={event.event_title}
              name={event.event_name}
              date={event.event_date_time}
              introduction={event.event_introduction}
              time={event.event_time_text}
              image_1={event.event_image_1}
            />
          );
        })}
      </div>
    );
  }
}

export default EventsAtVenue;
