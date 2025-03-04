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