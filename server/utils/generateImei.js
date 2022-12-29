Date.prototype.today = function () { 
    return ((this.getDate() < 10)?"0":"") + this.getDate() +"/"+(((this.getMonth()+1) < 10)?"0":"") + (this.getMonth()+1) +"/"+ this.getFullYear();
}
Date.prototype.timeNow = function () {
     return ((this.getHours() < 10)?"0":"") + this.getHours() +":"+ ((this.getMinutes() < 10)?"0":"") + this.getMinutes() +":"+ ((this.getSeconds() < 10)?"0":"") + this.getSeconds();
}

var newDate = new Date();
var date = newDate.today().split('/');
var time = newDate.timeNow().split(':');

const generateImei = (code, warehouseCode, index) => {
    let i = index.toString();
    return code + (parseInt(warehouseCode) < 10 ? '0' + warehouseCode : warehouseCode) 
                + time[0] + time[1] + time[2] + date[0] + date[1]
                + date[2].slice(2) + (index < 10 ? '00' + i : index < 100 ? '0' + i : i);
}

module.exports = generateImei;