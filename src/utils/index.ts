
function getPreurl(path: string = '') {
    var href = window.location.href;
    if (href.indexOf('/#') > 0) {
        let first_href = href.split('/#')[0]
        let second_href = first_href.split('://')[1]
        let sub_dire = second_href.split('/')[1];
        if (sub_dire) {
            return '/'+sub_dire+'/#/'+path
        } else {
            return '/#/'+path
        }
    } else {
        return '/'+path
    }
}

export {
    getPreurl
}