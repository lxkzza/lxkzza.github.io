httprequest = new XMLHttpRequest();
// 彩票开奖号码数据
var json;
//总期数
var sum = 0;
//期号数
var index = 0;
//所有号码集合
var hama = [];
//号码开奖概率，最小出奖期数跨度，最大开奖期数跨度,次数统计的数据结构
function HaoMa() {
    this.no = "";
    this.qh = [];
    this.count = 0;
    this.last = 0;
    this.kuadus = [];
}
HaoMa.prototype.addCount = function(o) {
    // this.no = o.haoma;
    this.qh.push(o.qihao);
    this.count++;
    var kuadu = index - this.last;
    this.kuadus.push(kuadu);
    this.last = index;
};
HaoMa.prototype.getMaxKd= function(){
    var max = 0;
	if(this.qh.length === 0){
        return 0;
    }else{
        this.kuadus.forEach(function (item){
            if(max<item){
                max = item;
            }
        });
        return max;
    }
}
HaoMa.prototype.getMinKd= function(){
    var min = 0;
    if(this.qh.length === 0){
        return 0;
    }else{
        min = this.kuadus[0];
        this.kuadus.forEach(function(item){
            if(min>item){
                min = item;
            }
        });
        return min;
    }
}
HaoMa.prototype.isZL=function() {
    var ge = this.no[2];
    var shi = this.no[1];
    var bai = this.no[0];
    if(ge != shi && ge != bai && shi != bai)
        return true;
    else
        return false;
}
HaoMa.prototype.isZS = function(){
    var ge = this.no[2];
    var shi = this.no[1];
    var bai = this.no[0];
    if(ge == shi && ge == bai){
        return false;
    }
    if(ge == shi || ge == bai || shi == bai){
        return true;
    }
    return false;
}
HaoMa.prototype.isBZ=function() {
    var ge = this.no[2];
    var shi = this.no[1];
    var bai = this.no[0];
    if(ge == shi && ge == bai){
        return true;
    }
}
var zs = 0;
var zl = 0;
var bz = 0;
for (var i = 0; i < 1000; i++) {
    hama[i] = new HaoMa();
    hama[i].no = i<100?i<10?"00"+i:"0"+i:i+"";
}
function setz(count,zl,zs,bz){
    var zcount = document.getElementById("zcount");
    var zlcount = document.getElementById("zlcount");
    var zscount = document.getElementById("zscount");
    var bzcount = document.getElementById("bzcount");
    zcount.innerText = zcount.innerText + count;
    zlcount.innerText = zlcount.innerText + zl;
    zscount.innerText = zscount.innerText + zs;
    bzcount.innerText = bzcount.innerText + bz;
}
httprequest.onreadystatechange = function() {
    if (httprequest.status === 200) {
        var hamas = httprequest.responseText;
        json = JSON.parse(hamas);
        for (var o of json) {
            var i = Number.parseInt(o.haoma);
            hama[i].addCount(o);
            hama[i].isBZ()?bz++:hama[i].isZL()?zl++:zs++;
            index++;
        }
        setz(index,zl,zs,bz);
    }
}
httprequest.open("GET", "https://lxkzza.github.io/lottery/data/lottery.json", true);
httprequest.send(null);