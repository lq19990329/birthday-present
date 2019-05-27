import {Star,stars} from './star.js'
var re=n=>(n%360+360)%360

window.onload=function()
{   
    var oHeight=window.screen.height;
    var oWidth=window.screen.width;
    var lyric=document.getElementById('lrc')
    console.log(oHeight,oWidth)

    var oBox=document.querySelector('#box');
    var audio=document.getElementById('audio');
    var control=document.querySelector('#control');
  console.log(audio)
    var reg=/\-?[0-9]+\.?[0-9]*/g;
    var sTime;
    var fTime;
    var x;
    var y;
    var rx;
    var ry;
    var rxc;
    var ryc;
    var f=0;
    control.ontouchstart=function(){
        if(control.className=='pause'){
            control.className='play'
            audio.muted=true;
        }else{
            control.className='pause'
            audio.muted=false;
        }
    }
    oBox.ontouchstart=function(ev)
    {	sTime=new Date()
        var r=oBox.style.transform||'0,0';
        var arr=r.match(reg)
        var tx=Number(arr[0]);
        var ty=Number(arr[1]);
        var oEvent=ev||event;
        if(oEvent.target.className=='top'){
            if(control.style.display=='block'){
                control.style.display='none'
                audio.pause()
                lyric.style.display='none'
            }else{
                control.style.display='block';
                control.className='pause'
                lyric.style.display='block'
                audio.play()
                audio.muted=false;
                
            }
            
        }
        
        var StartX=oEvent.touches[0].clientX;
        var StartY=oEvent.touches[0].clientY;
        document.ontouchmove=function(ev)
        {
            
            var oEvent=ev||event;
             y=oEvent.touches[0].clientY-StartY;
             x=oEvent.touches[0].clientX-StartX;
            
                if(tx>90&&tx<270){
                 ry=re(-x+ty);
                
            }else{
                 ry=re(x+ty);
                
            }
             rx=re(tx-y);
             
            for(let u=1;u<stars.length;u++){
                stars[u].randomX=((stars[u].randomX-x/20)%oWidth+oWidth)%oWidth;
                stars[u].randomY=((stars[u].randomY-y/20)%oHeight+oHeight)%oHeight;
                
            }
            oBox.style.transition='none';
            oBox.style.transform=` rotateX(${rx}deg) rotateY(${ry}deg) `;
            // oCanvas.style.transform=` rotateX(${-rx}deg) rotateY(${-ry}deg) `;
            
        }
        document.ontouchend=function()
        {	
            
            fTime=new Date();
            var time=sTime.getSeconds()+sTime.getMilliseconds()*0.001-fTime.getSeconds()+fTime.getMilliseconds()*0.001;
            if(time>0.6){
                var vX=x/time*0.128;
            var vY=y/time*0.128;
            console.log(time,rx,ry,vX,vY)
            oBox.style.transition='all ease .4s'
            if(tx>90&&tx<270){
                oBox.style.transform=` rotateX(${rx-vY}deg) rotateY(${ry-vX}deg) `;
            }else{
                oBox.style.transform=` rotateX(${rx-vY}deg) rotateY(${ry+vX}deg) `;
                
            }
            }
            
            
            document.ontouchmove=null;
            document.ontouchend=null;
        };	
        };
        
        return false;
    };