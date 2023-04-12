export interface SlotsResponse {
    slots: Slots[];
}
interface Slots {
    startTime: Date;
    endTime: Date;
    date: Date;
}
