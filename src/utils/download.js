// import axios from 'axios';
//
// // 导出Excel公用方法
// export const exportMethod = (data, url) => {
//     axios({
//         method: 'get',
//         url: url,
//         responseType: 'blob'
//     }).then((res) => {
//         const link = document.createElement('a');
//         let blob = new Blob([res], {type: 'application/vnd.ms-excel'});
//         link.style.display = 'none';
//         link.href = URL.createObjectURL(blob);
//
//         // link.download = res.headers['content-disposition'] //下载后文件名
//         link.download = "员工详情"; //下载的文件名
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link)
//     }).catch(error => {
//         this.$Notice.error({
//             title: '错误',
//             desc: '网络连接错误'
//         });
//     })
// };


export function exportExcel(data, name) {
    const blob = new Blob([data], {
        type: "application/vnd.ms-excel",
    });
    if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob);
    } else {
        let elink = document.createElement('a');
        elink.download = name + ".xlsx";
        elink.style.display = 'none';
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        document.body.removeChild(elink);
    }
}
