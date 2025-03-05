import { request } from "../Config/Request"

export const OrderService = {
    getAllOrder: async()=>{
        const res = await request.get("/orderservice");
        return res.data;
    },
    getAllWareHouse: async()=>{
        const res = await request.get("/orderservice/warehouse");
        return res.data;
    }
}