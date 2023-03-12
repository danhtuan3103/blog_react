export const isRequire = (value, error) => {
    if (value.trim() === '') {
        return error || 'Vui lòng nhập khung này';
    } else {
        return undefined;
    }
};

export const minLength = (value, min, error) => {
    if (value.length < min) {
        return error || `Vui lòng nhập khung này lớn hơn ${min} kí tự`;
    } else {
        return undefined;
    }
};

export const maxLength = (value, max, error) => {
    if (value.length > max) {
        return error || `Vui lòng nhập khung này nhỏ hơn ${max} kí tự`;
    } else {
        return undefined;
    }
};

export const isEmail = (value, max, error) => {
    var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(value) ? undefined : error || `Vui long nhập email ở khung này`;
};

export const confirmPassword = (value, confirnValue, error) => {
    return value === confirnValue ? undefined : error || `Xác nhận thất bại`;
};
