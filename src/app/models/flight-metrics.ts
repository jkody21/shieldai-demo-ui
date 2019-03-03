export interface FlightMetrics {
    flightCount: number,
    hightestDuration: number,
    lowestDuration: number,
    firstFlight: Date,
    mostRecentFlight: Date,
    laziestDroneName: string,
    laziestDroneId: number,
    laziestDroneMissions: number,
    busiestDroneName: string,
    busiestDroneId: number,
    busiestDroneMissions: number,
    busiestGeneration: number,
    busiestGenerationMissions: number
}