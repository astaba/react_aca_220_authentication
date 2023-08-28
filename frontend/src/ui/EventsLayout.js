import React from 'react'
import { Outlet } from 'react-router-dom'

import EventsNavigation from '../components/EventsNavigation'

const EventsLayout = () => {
  return (
    <React.Fragment>
      <EventsNavigation />
      <Outlet />
    </React.Fragment>
  )
}

export default EventsLayout