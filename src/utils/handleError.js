const handleError = (err) => {
    const { status, message } = err.response.data;

    console.log(message);
    // if (message === 'jwt malformed') {
    //     window.location.href = '/login';
    // }

    if (message === 'Unauthorized') {
        alert('Mật khẩu hoặc tài khoản không chính xác');
    } else {
        alert(message);
    }
};

export default handleError;
