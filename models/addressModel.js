class AddressModel {
    constructor(id, lat, lng, isDefault, address, phone, addressType, userId) {
        this.id = id;
        this.lat = lat;
        this.lng = lng;
        this.isDefault = isDefault;
        this.address = address;
        this.phone = phone;
        this.addressType = addressType;
        this.userId = userId;
    }
}

export default AddressModel;