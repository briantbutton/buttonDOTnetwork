      (function(){

        const k                       = [["y","top","Y"],["x","left","X"],["top","top","Y"],["left","left","X"],["bottom","bottom","Y"],["right","right","X"],["height","height"],["width","width"]],
              oneHundred              = "1.00",
              thirtyFive              = "0.35";
        var   btn1                    = getEl("see-more-intro"),
              btn2                    = getEl("see-more-usage"),
              vid1                    = getEl("colored-lights"),
              vid2                    = getEl("two-minute-tale"),
              vid3                    = getEl("eight-minute-tale"),
              evo                     = getEl("exit-video-overlay"),
              evx                     = getEl("exit-video-x"),
              upcell                  = getEl("upsell"),
              noUpsell                = false;

        window.InView                 = (function InView(){

          return InView;

          function InView(idStr){
            var video                 = getEl(idStr),
                lapse                 = typeof lpse === "number" ? lpse : 60000,
                lastPlayed            = (new Date()).getTime()-lapse-1,
                isOffScreen           = true;
            if(video){
              $(window).scroll(check)
            }

            function check(){
              var now                 = (new Date()).getTime();
              if(objInView(video)){
                if(isOffScreen){
                  isOffScreen         = false;
                  if(now-lastPlayed>lapse){
                    lastPlayed        = now;
                    video.play()
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
                idPrefix              = idStrg+"-video",
                video                 = getEl(idPrefix+idCol),
                videoDiv              = getEl(idPrefix+idCol+"-div"),
                container             = getEl(idPrefix+idCol+"-column"),
                oppoV1                = getEl(idPrefix+otherCol),
                oppoV2                = getEl(idPrefix+anotherCol),
                oppoC1                = getEl(idPrefix+otherCol+"-column"),
                oppoC2                = getEl(idPrefix+anotherCol+"-column");
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
                video.style.width     = px(initWidth);
                video.style.height    = px(initHeight)
              }
              video.play();
            }
            function expandVideo(){
              video.setAttribute("controls","");
              if(window.innerWidth>768){
                console.log("expandVideo");
                calibrate();
                if(oppoV1){
                  oppoV1.style.width  = px(compressedWidth);
                  oppoV1.style.height = px(compressedHeight)
                }
                if(oppoV2){
                  oppoV2.style.width  = px(compressedWidth);
                  oppoV2.style.height = px(compressedHeight)
                }
                oppoC1.style.opacity  = thirtyFive;
                oppoC1.className      = "entry col-md-2 contracted";
                oppoC2.style.opacity  = thirtyFive;
                oppoC2.className      = "entry col-md-2 contracted";
                container.className   = "col-md-8";
                video.style.width     = px(playWidth);
                video.style.height    = px(playHeight)
              }
            }
            function contractVideo(){
              if(window.innerWidth>768){
                console.log("contractVideo");
                calibrate();
                video.style.width     = px(initWidth);
                video.style.height    = px(initHeight);
                setTimeout(contractVideoB,650)
              }
            }
            function contractVideoB(){
              oppoC1.style.opacity    = oneHundred;
              oppoC1.className        = "entry col-md-4";
              oppoC2.style.opacity    = oneHundred;
              oppoC2.className        = "entry col-md-4";
              if(oppoV1){
                oppoV1.style.width    = px(initWidth);
                oppoV1.style.height   = px(initHeight)
              }
              if(oppoV2){
                oppoV2.style.width    = px(initWidth);
                oppoV2.style.height   = px(initHeight)
              }
              container.className     = "entry col-md-4"
            }
            function calibrate(){
              containerWidth          = 720;
              initWidth               = 208;              // off 210
              initHeight              = 117;
              compressedWidth         =  80;              // off  90
              compressedHeight        =  45;
              playWidth               = 448;              // off 450
              playHeight              = 252;
              if(window.innerWidth>992){
                if(window.innerWidth>1200){
                  containerWidth      = 1140;
                  initWidth           = 336;              // off 350
                  initHeight          = 189;
                  compressedWidth     = 160;              // off 160
                  compressedHeight    =  90;
                  playWidth           = 720;              // off 720
                  playHeight          = 405
                }else{
                  containerWidth      = 960;
                  initWidth           = 288;              // off 290
                  initHeight          = 162;
                  compressedWidth     = 128;              // off 130
                  compressedHeight    =  72;
                  playWidth           = 640;              // off 640
                  playHeight          = 360
                }
              }
            }
          }
        })();


        window.Rejigger2Columns       = (function Rejigger2Columns(){

          return Rejigger2Columns;

          function Rejigger2Columns(idStrg){
            var idPrefix              = idStrg+"-video",
                video                 = getEl(idPrefix),
                videoDiv              = getEl(idPrefix+"-div"),
                container             = getEl(idPrefix+"-column"),
                oppoC                 = getEl(idPrefix+"-opposite");
            var containerWidth,initWidth,initHeight,compressedWidth,compressedHeight,playWidth,playHeight;

            if(video&&videoDiv&&container&&oppoC){
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
                video.style.width     = px(initWidth);
                video.style.height    = px(initHeight)
              }
              video.play();
            }
            function expandVideo(){
              setTimeout(expand,35);
              function expand(){
                setTimeout(function(){video.setAttribute("controls","")},65);
                if(window.innerWidth>768){
                  console.log("expandVideo");
                  calibrate();
                  oppoC.style.opacity = thirtyFive;
                  oppoC.className     = "entry col-md-3 contracted";
                  container.className = "col-md-9";
                  video.style.width   = px(playWidth)
                  video.style.height  = px(playHeight)
                }
              }
            }
            function contractVideo(){
              if(window.innerWidth>768){
                console.log("contractVideo");
                calibrate();
                video.style.width     = px(initWidth);
                video.style.height    = px(initHeight);
                setTimeout(contractVideoB,650)
              }
            }
            function contractVideoB(){
              oppoC.style.opacity     = oneHundred;
              oppoC.className         = "entry col-md-6";
              container.className     = "entry col-md-6"
            }
            function calibrate(){
              containerWidth          = 720;
              initWidth               = 320;              // off 330
              initHeight              = 180;
              compressedWidth         =  80;              // off  90
              compressedHeight        =  45;
              playWidth               = 496;              // off 510
              playHeight              = 279;
              if(window.innerWidth>992){
                if(window.innerWidth>1200){
                  containerWidth      = 1140;
                  initWidth           = 528;              // off 350
                  initHeight          = 297;
                  compressedWidth     = 240;              // off 255
                  compressedHeight    = 135;
                  playWidth           = 816;              // off 825
                  playHeight          = 459
                }else{
                  containerWidth      = 960;
                  initWidth           = 448;              // off 450
                  initHeight          = 252;
                  compressedWidth     = 208;              // off 210
                  compressedHeight    = 117;
                  playWidth           = 688;              // off 690
                  playHeight          = 387
                }
              }
            }
          }
        })();



        window.videoPlayer0           = new InView("colored-lights");
        window.videoExpander0         = new Rejigger3Columns("piglets",0);
        window.videoExpander1         = new Rejigger3Columns("piglets",1);
        window.videoExpander1         = new Rejigger3Columns("piglets",2);
        window.videoExpander10        = new Rejigger2Columns("album");

        if(vid1&&vid2&&vid3&&upcell&&(btn1||btn2)&&evo&&evx){
          if(btn1){btn1.addEventListener("click",switchBait2)}
          if(btn2){btn2.addEventListener("click",switchBait3)}
          evx.addEventListener("click",revert);
          vid1.addEventListener("play",turnOffUpsell);
          vid2.addEventListener("play",turnOffUpsellForever);
          vid3.addEventListener("play",turnOffUpsellForever);
          vid2.addEventListener("pause",turnOnOverlay);
          vid3.addEventListener("pause",turnOnOverlay);
          vid1.addEventListener("ended",turnOnUpsell);
          vid2.addEventListener("ended",revert);
          vid3.addEventListener("ended",revert);
          window.addEventListener('load',addPretty)
        }
        function switchBait2(){
          displayNonne(vid1);
          displayInlyn(vid2);
          displayNonne(vid3)
          vid2.play()
        }
        function switchBait3(){
          vid1.style.display          = "none";
          vid2.style.display          = "none";
          vid3.style.display          = "inline";
          vid3.play()
        }
        function revert(){
          vid3.style.display          = "none";
          vid2.style.display          = "none";
          vid1.style.display          = "inline";
          noUpsell                    = false;
          turnOnUpsell()
        }
        function backToTop(e){
          if(e){
            e.style.opacity           = "1";
            e.style.marginTop         = "0px"
          }
        }
        function turnOffUpsellForever(){
          turnOffUpsell();
          noUpsell                    = true
        }
        function turnOffUpsell(){
          displayNonne(upcell);
          turnOffOverlay()
        }
        function turnOnUpsell(){
          if(!noUpsell){displayBlock(upcell)}
          turnOffOverlay()
        }
        function turnOnOverlay(){
          displayBlock(evo)
        }
        function turnOffOverlay(){
          displayNonne(evo)
        }
        function getCoord(HTMLobj,noWinOffset_){
          var noWinOffset             = true,
              v                       = null,r;
          if(Boolean(HTMLobj)&&Boolean(r=HTMLobj.getBoundingClientRect())){
            v                         = {};
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
        function addPretty(event){
          setTimeout((e1=>()=>backToTop(e1))(getEl("top-line-text1")),1000);
          setTimeout((e2=>()=>backToTop(e2))(getEl("top-line-text2")),4000);
          setTimeout((v2=>()=>v2.setAttribute("preload","auto"))(vid2),20000);
          setTimeout((v3=>()=>v3.setAttribute("preload","auto"))(vid3),30000)
        }
        function getEl(str){return document.getElementById(str)}
        function displayNonne(el){
          el.style.display            = "none"
        }
        function displayBlock(el){
          el.style.display            = "block"
        }
        function displayInlyn(el){
          el.style.display            = "inline"
        }
        function px(n){
          return ""+n+"px"
        }
      })()
