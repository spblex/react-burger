import {TFeedOrderStatus, TFeedOrderText} from "../types/stores";

const orderStatusMap: {[key in TFeedOrderStatus] : TFeedOrderText} = {
    done: TFeedOrderText.DONE,
    pending: TFeedOrderText.PENDING,
    created: TFeedOrderText.CREATED
}

export const getOrderStatusText = (status: TFeedOrderStatus): TFeedOrderText => {
    return orderStatusMap[status];
}