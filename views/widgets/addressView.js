import AddressViewModel from '../../controllers/addressListController.js';
import AddressDefaultViewModel from '../../controllers/addressDefaultController.js';
import EditAddressDefaultViewModel from '../../controllers/editAddressController.js';
import DeleteAddressViewModel from '../../controllers/deleteAddressController.js';
import AddAddressViewModel from '../../controllers/addAddressController.js';

class AddressViews {
    constructor() {
        this.addressViewModel = new AddressViewModel();
        this.addressDefaultViewModel = new AddressDefaultViewModel();
        this.editAddressDefaultViewModel = new EditAddressDefaultViewModel();
        this.deleteAddressViewModel = new DeleteAddressViewModel();
        this.addAddressViewModel = new AddAddressViewModel();
        this.isAddedType = null;
    }

    async render() {
        try {
            const token = localStorage.getItem('authToken');
            await this.addressViewModel.fetchAddress(token);
            await this.addressDefaultViewModel.fetchAddressDefault(token);

            const addressHtml = this.addressViewModel.addressModel.map(address => {
                const isDefault = this.addressDefaultViewModel.addressModel &&
                    this.addressDefaultViewModel.addressModel.id === address.id;

                return `
                  <div class="item" data-id="${address.id}">
                        <div class="address">
                            <p class="address-title">${address.address}</p>
                            <p class="address-phone">${address.phone}</p>
                            <p class="address-type">${address.addressType}</p>
                        </div>
                        <div class="action">
                            <a href="#" class="has-before default" style="background-color: ${isDefault ? '#EDBFFF' : ''};" data-id="${address.id}">Mặc định</a>
                            <a href="#" class="has-before delete" data-id="${address.id}">Xóa</a>
                        </div>
                    </div>
                `;
            }).join('');
            document.querySelector('.addressContainer').innerHTML = addressHtml;

            this.setupEventListeners(token);
        } catch (error) {
            console.error("Có lỗi xảy ra trong quá trình render:", error);
        }
    }

    setupEventListeners(token) {
        // Chỉnh địa chỉ mặc định
        document.querySelectorAll('.default').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                const id = event.target.getAttribute('data-id');
                await this.editAddress(token, id);
            });
        });

        // Xóa địa chỉ
        document.querySelectorAll('.delete').forEach(button => {
            button.addEventListener('click', async (event) => {
                event.preventDefault();
                const id = event.target.getAttribute('data-id');
                await this.deleteAddress(token, id);
            });
        });

        // Thêm địa chỉ
        const addAddressBtn = document.getElementById('addAddressBtn');
        addAddressBtn.addEventListener('click', async (event) => {
            event.preventDefault();
            await this.addAddress(token);
        });
    }

    // Cập nhật địa chỉ mặc định
    async editAddress(token, id) {
        try {
            const responseStatus = await this.editAddressDefaultViewModel.fetchEditAddressDefault(token, id);
            if (responseStatus === 200) {
                console.log(`Cập nhật địa chỉ mặc định thành công`);
                this.render();
            } else {
                console.error('Không tìm thấy địa chỉ hoặc lỗi khác');
            }
        } catch (error) {
            console.error('Lỗi khi cập nhật địa chỉ mặc định:', error);
        }
    }

    // Xóa địa chỉ
    async deleteAddress(token, id) {
        try {
            const responseStatus = await this.deleteAddressViewModel.fetchDeleteAddress(token, id);
            if (responseStatus === 200) {
                console.log(`Xóa thành công`);
                this.render();
            } else {
                console.error('Không tìm thấy địa chỉ hoặc lỗi khác');
            }
        } catch (error) {
            console.error('Lỗi khi xóa địa chỉ:', error);
            alert(`Không thể xóa vì địa chỉ đang sử dụng cho một số đơn hàng`);
            window.location.reload();
        }
    }

    // Thêm địa chỉ
    async addAddress(token) {
        try {
            const address = document.getElementById('address').value.trim();
            const addressType = document.getElementById('type').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const lat = 0;
            const lng = 0;
            const isDefault = false;
            if (!address || !addressType || !phone) {
                alert('Vui lòng nhập đầy đủ thông tin');
                return;
            }
            await this.addAddressViewModel.fetchAddAddress(token, lat, lng, isDefault, address, phone, addressType);
            this.render();
        } catch (error) {
            console.error('Lỗi khi thêm địa chỉ:', error);
        }
    }
}

const view = new AddressViews();
view.render();

export default AddressViews;