class LoginController {
    constructor() {
        this.baseUrl = 'https://javelin-advanced-daily.ngrok-free.app/auth/token/login/';
    }

    async loginFetch(accountModel) {
        try {
            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(accountModel), // { username, password }
            });

            if (!response.ok) {
                throw new Error(`Đăng nhập thất bại: ${response.status}`);
            }

            const data = await response.json();
            // Lưu token vào Local Storage
            if (data.auth_token) {
                localStorage.setItem('authToken', data.auth_token);
            }
            return data;
        } catch (error) {
            console.error('Lỗi khi đăng nhập:', error);
            throw error;
        }
    }
}

export default LoginController;