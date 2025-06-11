import AddressModel from '../models/addressModel.js';

class AddAddressViewModel {
    constructor() {
        this.addressModel = [];
    }

    async fetchAddAddress(token, lat, lng, isDefault, address, phone, addressType) {
        try {
            const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/address/add/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
                body: JSON.stringify({ lat, lng, isDefault, address, phone, addressType }),
            });
            const data = await response.json();

            if (data && typeof data === 'object') {
                this.addressModel = [new AddressModel(
                    data.id,
                    data.lat,
                    data.lng,
                    data.isDefault,
                    data.address,
                    data.phone,
                    data.addressType,
                    data.userId
                )
                ];
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export default AddAddressViewModel;