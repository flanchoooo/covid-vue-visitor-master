export default function authHeader() {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    if (user && token) {
        return 'Bearer ' + token;
    } else {
        return {};
    }
}
