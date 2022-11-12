/**
 * 捏 过滤器
 */

module.exports = {

    /**
     * 过滤 object 中 undefined
     * @param {Object} origin 
     */
    filterUndefined(origin) {
        let temp = {};
        for (let [key, value] of Object.entries(origin)) {
            if (typeof value == 'object') {
                value = this.filterUndefined(value);
                if (Object.keys(value).length == 0) {
                    console.log(0)
                    continue;
                }
            }
            if (typeof value != 'undefined') {
                temp[key] = value;
            }
        }
        return temp;
    }

}