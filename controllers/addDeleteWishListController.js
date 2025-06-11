class AddDeleteWishlistController {
    constructor() {
        this.product = [];
    }

    async toggleWishlistItem(token, id) {
        try {
            const response = await fetch(`https://javelin-advanced-daily.ngrok-free.app/api/wishlist/toggle/?id=${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${token}`,
                },
                credentials: 'include',
            });

            if (!response.ok) {
                throw new Error('Lỗi khi gọi API');
            }
            if (response.status === 201) {

            } else if (response.status === 204) {

            }
            return response.status;
        } catch (error) {
            console.error('Lỗi khi gọi API toggle wishlist:', error);
            throw error;
        }
    }


}

export default AddDeleteWishlistController; 