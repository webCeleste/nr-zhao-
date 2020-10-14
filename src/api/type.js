// 导入模块
import axios from 'axios'
// import qs from 'qs'


// 列表 
const get = params => { // params = {pagenum,pagesize}
    return axios.get('goods/type/index.php', { params: params }).then(res => res.data)
}

export default {
    get,
}