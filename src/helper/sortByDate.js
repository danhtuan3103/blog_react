const sortByDate = (arr) => {
    const sortArr = arr?.sort((a, b) => {
        const ad = new Date(a.createdAt);
        const bd = new Date(b.createdAt);

        return bd - ad;
    });

    return sortArr;
};

export default sortByDate;
