var date=new Date(2018,0,1)
var now=new Date()
var day=Math.floor((now.getTime()-date.getTime())/(1000*60*60*24));  
console.log(day) 
console.log(date.getMonth())
var lrc=`[00:19.33]最最最亲爱的宝贝儿\n[00:26.37]这里有${day}颗星星\n[00:33.10]代表我们在一起的${day}天\n[00:40.08]并且每再过一天 就会多一颗星星\n[00:46.74]这四张照片\n[00:54.48]是用我们在一起以来的点点滴滴拼成的\n[01:02.91]这些是我们的见证\n[01:06.51]我把这片星空送给你\n[01:12.43]满天繁星\n[01:15.43]你在我心\n[01:19.71]还要多远才能进入你的心\n[01:26.43]还要多久才能和你接近\n[01:33.31]咫尺远近却无法靠近的那个人\n[01:42.35]也等着和你相遇\n[01:47.48]环游的行星 怎么可以\n[01:55.31]拥有你\n[02:12.15]这瞬眼的光景 最亲密的距离\n[02:20.32]沿着你皮肤纹理 走过曲折手臂\n[02:28.25]做个梦给你 做个梦给你\n[02:34.84]等到看你银色满际\n[02:39.73]等到分不清季节更替\n[02:44.16]才敢说沉溺\n[02:53.21]还要多远才能进入你的心\n[02:59.34]还要多久才能和你接近\n[03:06.68]咫尺远近却无法靠近的那个人\n[03:15.47]也等着和你相遇\n[03:20.64]环游的行星 怎么可以\n[03:28.44]拥有你\n[03:31.93]还要多远才能进入你的心\n[04:11.42]还要多久才能和你接近\n[04:18.08]咫尺远近却无法靠近的那个人\n[04:27.03]要怎么探寻 要多么幸运\n[04:34.04]才敢让你发觉你并不孤寂\n[04:40.14]当我还可以再跟你飞行\n[04:46.64]环游是无趣 至少可以\n[04:54.08]陪着你\n[04:56.08]宝贝儿 我爱你\n`
function parseLyric(text) {
//将文本分隔成一行一行，存入数组
var lines = text.split('\n'),
    //用于匹配时间的正则表达式，匹配的结果类似[xx:xx.xx]
    pattern = /\[\d{2}:\d{2}.\d{2}\]/g,
    //保存最终结果的数组
    result = [];
//去掉不含时间的行
while (!pattern.test(lines[0])) {
    lines = lines.slice(1);
};
//上面用'\n'生成生成数组时，结果中最后一个为空元素，这里将去掉
lines[lines.length - 1].length === 0 && lines.pop();
lines.forEach(function(v /*数组元素值*/ , i /*元素索引*/ , a /*数组本身*/ ) {
    //提取出时间[xx:xx.xx]
    var time = v.match(pattern),
        //提取歌词
        value = v.replace(pattern, '');
    //因为一行里面可能有多个时间，所以time有可能是[xx:xx.xx][xx:xx.xx][xx:xx.xx]的形式，需要进一步分隔
    time.forEach(function(v1, i1, a1) {
        //去掉时间里的中括号得到xx:xx.xx
        var t = v1.slice(1, -1).split(':');
        //将结果压入最终数组
        result.push([parseInt(t[0], 10) * 60 + parseFloat(t[1]), value]);
    });
});
//最后将结果数组中的元素按时间大小排序，以便保存之后正常显示歌词
result.sort(function(a, b) {
    return a[0] - b[0];
});
return result;
}
var lyric=parseLyric(lrc)
console.log(lyric)
//获取页面上的audio标签
var audio = document.getElementsByTagName('audio')[0],
//显示歌词的元素
lyricContainer = document.getElementById('lrc');
//监听ontimeupdate事件

audio.ontimeupdate = function(e) {
//遍历所有歌词，看哪句歌词的时间与当然时间吻合
for(let j=0;j<lyric.length;j++){
    if (Math.abs((this.currentTime)-lyric[j][0])<0.3) {
        //显示到页面        
        console.log(`translateY (${-j*30}px)`)
        lyricContainer.style.transform=`translateY(${-j*50}px)`
        
    };
}
    
    

}
for(var i=0;i<lyric.length;i++){
lyricContainer.innerHTML+=(lyric[i][1]+'<br>')
}
export{lyric}