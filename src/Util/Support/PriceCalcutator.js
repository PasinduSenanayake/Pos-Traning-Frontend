const totalAmountCalculater = (orderItems)=>{
    let totalPrice = 0.00;
    orderItems.forEach((item)=>totalPrice+= item['quantity']*item['unitPrice'])
    return parseFloat(totalPrice).toFixed(2);

};

const unitAmountCalculater = (orderItem)=>{

    return parseFloat( parseFloat(orderItem['quantity'])*parseFloat(orderItem['unitPrice'])).toFixed(2)

};

export {totalAmountCalculater,unitAmountCalculater}