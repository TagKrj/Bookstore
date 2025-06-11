import AddressModel from '../models/addressModel.js';

class AddressViewModel {
    constructor() {
        this.addressModel = [];
    }

    async fetchAddress(token) {
        try {
            const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/address/addreslist/`, {
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