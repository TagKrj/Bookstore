import AddressModel from '../models/addressModel.js';

class AddressViewModel {
    constructor() {
        this.addressModel = [];
    }

    async fetchAddress(token) {
        try {
            const response = await fetch(`http://52.175.37.189:8080/api/address/addreslist/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });
            const data = await response.json();

            this.addressModel = data.map(address => new AddressModel(
                address.id,
                address.lat,
                address.lng,
                address.isDefault,
                address.address,
                address.phone,
                address.addressType,
                address.userId
            ));

        } catch (error) {
            console.error(error);
        }
    }
}

export default AddressViewModel;