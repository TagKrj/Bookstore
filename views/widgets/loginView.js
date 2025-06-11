import LoginController from '../../controllers/loginController.js';

class LoginView {
    constructor() {
        this.loginController = new LoginController();
    }

    // Thiết lập sự kiện cho nút Đăng nhập
    setupEventLogin() {
        const loginBtn = document.getElementById('loginBtn');
        loginBtn.addEventListener('click', async (event) => {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của form

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (!username || !password) {
                alert('Vui lòng điền đủ thông tin đăng nhập.');
                return;
            }
            try {
                const accountModel = { username, password };
                await this.loginController.loginFetch(accountModel);
                // Chuyển hướng đến trang chủ
                window.location.replace('/views/pages/index.html');
            } catch (error) {
                console.error('Đăng nhập thất bại:', error);
                alert('Đăng nhập thất bại. Vui lòng kiểm tra thông tin và thử lại.');
            }
        });
    }
}

const view = new LoginView();
view.setupEventLogin();
export default LoginView;