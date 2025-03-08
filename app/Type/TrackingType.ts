import { GeoPoint } from "./OrderType"

export interface Tracking{
    id: string,
    orderId: string,
    description: string,
    status: string,
    location: GeoPoint,
    timeStamp: string
}
export interface TrackingResponse{
    code: number,
    message: string,
    data: Tracking[]
}