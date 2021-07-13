      (function(){

        const   k                     = [["y","top","Y"],["x","left","X"],["top","top","Y"],["left","left","X"],["bottom","bottom","Y"],["right","right","X"],["height","height"],["width","width"]];

        window.InView                 = (function InView(){

          return InView;

          function InView(idStr,act,lpse){
            var target                = document.getElementById(idStr),
                action                = act!=="play"?"play":act,
                lapse                 = typeof lpse === "number" ? lpse : 60000,
                lastPlayed            = (new Date()).getTime()-lapse-1,
                isOffScreen           = true;
            if(target){$(window).scroll(check)}

            function check(){
              var now                 = (new Date()).getTime();
              if(objInView(target)){
                if(isOffScreen){
                  isOffScreen         = false;
                  if(now-lastPlayed>lapse){
                    lastPlayed        = now;
                    target[action]()
                  }
                }
              }else{
                isOffScreen           = true
              }
            }
          }
          function objInView(obj){
            var coord                 = getCoord(obj),
                middle                = coord.middle;
            return middle>100&&middle<window.innerHeight-100
          }
        })();

        window.Rejigger3Columns       = (function Rejigger3Columns(){

          return Rejigger3Columns;

          function Rejigger3Columns(idStrg,idCol){
            var otherCol              = idCol===0?1:0,
                anotherCol            = idCol===2?1:2,
                video                 = document.getElementById(idStrg+"-video"+idCol),
                videoDiv              = document.getElementById(idStrg+"-video"+idCol+"-div"),
                container             = document.getElementById(idStrg+"-video"+idCol+"-column"),
                oppoV1                = document.getElementById(idStrg+"-video"+otherCol),
                oppoV2                = document.getElementById(idStrg+"-video"+anotherCol),
                oppoC1                = document.getElementById(idStrg+"-video"+otherCol+"-column"),
                oppoC2                = document.getElementById(idStrg+"-video"+anotherCol+"-column");
            var containerWidth,initWidth,initHeight,compressedWidth,compressedHeight,playWidth,playHeight;

            if(video&&videoDiv&&container&&oppoC1&&oppoC2){
              video.addEventListener("click",playVideo);
              video.addEventListener("play", expandVideo);
              video.addEventListener("pause",contractVideo);
              video.addEventListener("ended",contractVideo);
            }
            function playVideo(){
              video.removeEventListener("click",playVideo);
              console.log("play");
              if(window.innerWidth>768){
                calibrate();
                video.style.width     = ""+initWidth+"px";
                video.style.height    = ""+initHeight+"px"
              }
              video.play();
            }
            function expandVideo(){
              video.setAttribute("controls","");
              if(window.innerWidth>768){
                console.log("expandVideo");
                calibrate();
                if(oppoV1){
                  oppoV1.style.width  = ""+compressedWidth+"px";
                  oppoV1.style.height = ""+compressedHeight+"px";
                }
                if(oppoV2){
                  oppoV2.style.width  = ""+compressedWidth+"px";
                  oppoV2.style.height = ""+compressedHeight+"px";
                }
                oppoC1.style.opacity  = "0.35";
                oppoC1.className      = "entry col-md-2 contracted";
                oppoC2.style.opacity  = "0.35";
                oppoC2.className      = "entry col-md-2 contracted";
                container.className   = "col-md-8";
                video.style.width     = ""+playWidth+"px";
                video.style.height    = ""+playHeight+"px"
              }
            }
            function contractVideo(){
              if(window.innerWidth>768){
                console.log("contractVideo");
                calibrate();
                video.style.width     = ""+initWidth+"px";
                video.style.height    = ""+initHeight+"px";
                setTimeout(contractVideoB,650)
              }
            }
            function contractVideoB(){
              oppoC1.style.opacity  = "1.00";
              oppoC1.className      = "entry col-md-4";
              oppoC2.style.opacity  = "1.00";
              oppoC2.className      = "entry col-md-4";
              if(oppoV1){
                oppoV1.style.width  = ""+initWidth+"px";
                oppoV1.style.height = ""+initHeight+"px";
              }
              if(oppoV2){
                oppoV2.style.width  = ""+initWidth+"px";
                oppoV2.style.height = ""+initHeight+"px";
              }
              container.className   = "entry col-md-4"
            }
            function calibrate(){
              containerWidth        = 720;
              initWidth             = 208;              // off 210
              initHeight            = 117;
              compressedWidth       =  80;              // off  90
              compressedHeight      =  45;
              playWidth             = 448;              // off 450
              playHeight            = 252;
              if(window.innerWidth>992){
                if(window.innerWidth>1200){
                  containerWidth    = 1140;
                  initWidth         = 336;              // off 350
                  initHeight        = 189;
                  compressedWidth   = 160;              // off 160
                  compressedHeight  =  90;
                  playWidth         = 720;              // off 720
                  playHeight        = 405
                }else{
                  containerWidth    = 960;
                  initWidth         = 288;              // off 290
                  initHeight        = 162;
                  compressedWidth   = 128;              // off 130
                  compressedHeight  =  72;
                  playWidth         = 640;              // off 640
                  playHeight        = 360
                }
              }
            }
          }
        })();

        videoPlayer0                = new InView("colored-lights");
        videoExpander0              = new Rejigger3Columns("piglets",0);
        videoExpander1              = new Rejigger3Columns("piglets",1);

        function getCoord(HTMLobj,noWinOffset_){
          var noWinOffset           = true,
              v                     = null,r;
          if(Boolean(HTMLobj)&&Boolean(r=HTMLobj.getBoundingClientRect())){
            v                       = {};
            k.forEach(function(d){
              if ( typeof r[d[0]] === "number" ) {
                v[d[1]]=Math.floor(r[d[0]]+(Boolean(d[2])&&!noWinOffset?window["page"+d[2]+"Offset"]:0)+0.5)
              } 
            });
            v.center=Math.floor(0.5+(v.left+v.right)/2);
            v.middle=Math.floor(0.5+(v.top+v.bottom)/2)
          }
          return v;
        }
      })()
