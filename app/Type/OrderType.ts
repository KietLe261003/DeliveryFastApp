export interface Order {
    id: string;
    userId: string;
    orderCode: string;
    senderAddress: string;
    reciverName: string;
    reciverPhone: string;
    receiverAddress: string;
    note?: string | null;
    weight: number;
    deliveryFee: number;
    imageUrls: string[];
    status: string;
    createAt: string;
    updatedAt: string;
}

export interface OrderResponse{
    code: number,
    message: string,
    data: Order[]
}
interface GeoPoint{
    latitude: number, 
    longitude: number
}
export interface WareHouse{
    id: string,
    name: string,
    type: string,
    location: GeoPoint
}
export interface WareHouseResponse{
    code: number,
    message: string,
    data: WareHouse[]
}