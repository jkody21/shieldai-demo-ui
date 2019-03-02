export interface FlightLog {
    flightLogId: number,
    droneId: number,
    beginOn: Date,
    endOn: Date,
    longitude: number,
    latitude: number,
    mapPath: string
}
