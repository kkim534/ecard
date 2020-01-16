export interface EventsProps {
    events: Event[],
    eventName: Event[]
}


export interface Event {
    EventName: String,
    startDate: Date,
    endDate: Date,
    sendDate: Date
}
