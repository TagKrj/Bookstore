import AddressModel from '../models/addressModel.js';

class EditAddressDefaultViewModel {
    constructor() {
        this.addressModel = [];
    }

    async fetchEditAddressDefault(token, id) {
        try {
            const response = await fetch(`http://52.175.37.189:8080/api/address/default/?id=${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Lỗi khi gọi API');
            }

            return response.status;
        } catch (error) {
            console.error('Lỗi khi gọi API edit address default:', error);
            throw error;
        }
    }


}

export default EditAddressDefaultViewModel; 