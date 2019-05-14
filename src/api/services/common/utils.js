let utils = {}

utils.curDateTime = function () {
    let date = new Date()
    let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
    let day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    return date.getFullYear() + '-' + month + '-' + day + ' ' + hours + ':' + minutes
}

utils.toTreeData = function (data, attributes) {
    let resData = data;
    let tree = [];

    for (let i = 0; i < resData.length; i++) {
        if (resData[i].resParentId === attributes.rootId) {
            let obj = {
                id: resData[i][attributes.id],
                title: resData[i][attributes.name],
                children: []
            };
            tree.push(obj);
            resData.splice(i, 1);
            i--;
        }
    }
    run(tree);
    function run(chiArr) {
        if (resData.length !== 0) {
            for (let i = 0; i < chiArr.length; i++) {
                for (let j = 0; j < resData.length; j++) {
                    if (chiArr[i].id === resData[j][attributes.parentId]) {
                        let obj = {
                            id: resData[j][attributes.id],
                            title: resData[j][attributes.name],
                            children: []
                        };
                        chiArr[i].children.push(obj);
                        resData.splice(j, 1);
                        j--;
                    }
                }
                run(chiArr[i].children);
            }
        }
    }

    return tree;
}

export default utils