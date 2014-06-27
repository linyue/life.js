/**
 * 数组对象扩充方法
 * Created by adam[linyue@live.cn] on 14-2-11.
 */

/*将数组随机排列*/
Array.prototype.shuffle = function () {
    for (var rnd, tmp, i = this.length; i; rnd = parseInt(Math.random() * i), tmp = this[--i], this[i] = this[rnd], this[rnd] = tmp);
};

/**
 * 删除数组中的某一项
 * @param index 删除项的index,从0开始
 * @returns {Array} 删除后的数组
 */
Array.prototype.del = function(index){
    if(isNaN(index) || index > this.length || index < 0){
        return false;
    }
    this.splice(index,1);
}