const getTypeNotifiication = (type) => {
    switch (type) {
        case 'LIKE':
            return 'thích';
            break;
        case 'UN_LIKE':
            return 'bỏ thích';
            break;
        case 'COMMENT':
            return 'bình luận';
            break;
        case 'REPLY':
            return 'trả lời bình luận của bạn trong';
            break;
        case 'LIKE_COMMENT':
            return 'thích bình luận';
            break;
        case 'UN_LIKE_COMMENT':
            return 'bỏ thích bình luận';
            break;
        case 'STORE':
            return 'lưu';
            break;
        case 'UN_STORE':
            return 'bỏ lưu';
            break;
    }
};

export default getTypeNotifiication;
