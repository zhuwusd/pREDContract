/* export function deepCopy(source) {
    var result = [];
    //var result = {}
    for (var key in source) {
        if (source[key] instanceof Array) {
            if (source[key].length > 0) {
                result[key] =
                    typeof source[key] === "object" ? deepCopy(source[key]) : source[key];
            }
        } else {
            if (source[key]) {
                result[key] =
                    typeof source[key] === "object" ? deepCopy(source[key]) : source[key];
            }
        }
    }
    return result;
}
 */
import axiosInstance from './export'

export default {
    get_location() {
        return axiosInstance.get('/sys/masterdata/location')
    }
}