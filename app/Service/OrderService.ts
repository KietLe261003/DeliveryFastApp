import { request } from "../Config/Request"
import { UpdateTracking } from "../Type/TrackingType";

export const OrderService = {
    getAllOrder: async()=>{
        const res = await request.get("/orderservice");
        return res.data;
    },
    findOrderById: async(orderId: string)=>{
        const res = await request.get(`/orderservice/${orderId}`);
        return res.data;
    },
    getAllWareHouse: async()=>{
        const res = await request.get("/orderservice/warehouse");
        return res.data;
    },
    getAllTracking: async(orderId:string)=>{
        const res = await request.get(`/orderservice/tracking/getbyorder/${orderId}`);
        return res.data;
    },
    getTrackingByShipeprId: async(userId: string)=>{
        const res = await request.get(`/orderservice/tracking/gettrackingbyshipperid/${userId}`);
        return res.data;
    },
    updateTracking: async(id: string,data: UpdateTracking)=>{
        const res = await request.put(`/orderservice/tracking/${id}`,data);
        return res.data;
    },
    getHistoryShipperTracking: async(shipperId: string)=>{
        const res = await request.get(`/orderservice/tracking/getHistoryShipper/${shipperId}`);
        return res.data;
    },
    checkTrackingShipperAndOrderId: async(shipperId: string,orderId: string)=>{
        const res = await request.get(`/orderservice/tracking/checkshipperIdandorderId/${shipperId}/${orderId}`);
        return res.data;
    }
}