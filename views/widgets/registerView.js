import RegisterController from '../../controllers/registerController.js';

class RegisterView {
    constructor() {
        this.registerController = new RegisterController();
    }

    // Thiết lập sự kiện cho nút Đăng ký
    setupEventRegister() {
        const registerBtn = document.getElementById('registerBtn');
        registerBtn.addEventListener('click', async (event) => {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của form

            const email = document.getElementById('email').value;
            const username = document.getElementById('usernameRegister').value;
            const password = document.getElementById('passwordRegister').value;

            if (!email || !username || !password) {
                alert('Vui lòng điền đủ thông tin đăng ký.');
                return;
            }
            try {
                const accountModel = { email, username, password };
                await this.registerController.registerFetch(accountModel);
                window.location.href = '/views/pages/login.html';
            } catch (error) {
                console.error('Đăng ký thất bại:', error);
                alert('Đăng ký thất bại. Vui lòng kiểm tra thông tin và thử lại.');
            }
        });
    }
}

const view = new RegisterView();
view.setupEventRegister();
export default RegisterView;