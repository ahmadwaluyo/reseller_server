function rupiahMaker(nominal) {
    let separator = '';
    let number_string = nominal.toString();
    let rest = number_string.length % 3;
    let rupias = number_string.substr(0, rest);
    let thousands = number_string.substr(rest).match(/\d{3}/g);
    if(thousands) {
        separator = rest ? '.' : '';
        rupias += separator + thousands.join('.')
    }
    return `Rp. ${rupias}`
}

module.exports = rupiahMaker;