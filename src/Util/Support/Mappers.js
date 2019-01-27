
const mapItem =(item)=>{

    return {
        key:item['code'],
        text:item['name'],
        value:item['code']+'__'+item['unitPrice']
    }

}
export {mapItem}