      (function(){

        const k                       = [["y","top","Y"],["x","left","X"],["top","top","Y"],["left","left","X"],["bottom","bottom","Y"],["right","right","X"],["height","height"],["width","width"]];
        var   btn1                    = document.getElementById("see-more"),
              vid1                    = document.getElementById("colored-lights"),
              vid2                    = document.getElementById("two-minute-tale"),
              upcell                  = document.getElementById("upsell"),
              noUpsell                = false;

        window.InView                 = (function InView(){

          return InView;

          function InView(idStr){
            var video                 = document.getElementById(idStr),
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
              oppoC1.style.opacity    = "1.00";
              oppoC1.className        = "entry col-md-4";
              oppoC2.style.opacity    = "1.00";
              oppoC2.className        = "entry col-md-4";
              if(oppoV1){
                oppoV1.style.width    = ""+initWidth+"px";
                oppoV1.style.height   = ""+initHeight+"px";
              }
              if(oppoV2){
                oppoV2.style.width    = ""+initWidth+"px";
                oppoV2.style.height   = ""+initHeight+"px";
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



        window.videoPlayer0           = new InView("colored-lights");
        window.videoExpander0         = new Rejigger3Columns("piglets",0);
        window.videoExpander1         = new Rejigger3Columns("piglets",1);
        window.videoExpander1         = new Rejigger3Columns("piglets",2);
        // videobaiter                 = new Baiter("colored-lights","two-minute-tale","upsell",["upsell1","upsell2"]);

        if(vid1&&vid2&&upcell&&btn1){
          // vid1.addEventListener("click",switchBait);
          btn1.addEventListener("click",switchBait);
          vid1.addEventListener("play",turnOffUpsell);
          vid2.addEventListener("play",turnOffUpsellForever);
          vid1.addEventListener("ended",turnOnUpsell);
          vid2.addEventListener("ended",revert);
          setTimeout((e1=>()=>backToTop(e1))(document.getElementById("top-line-text1")),4000);
          setTimeout((e2=>()=>backToTop(e2))(document.getElementById("top-line-text2")),8000);
        }

        function switchBait(){
          vid1.style.display          = "none";
          vid2.style.display          = "inline";
          vid2.play()
        }
        function revert(){
          vid2.style.display          = "none";
          vid1.style.display          = "inline";
          noUpsell                    = false
          turnOnUpsell()
        }
        function backToTop(e){
          if(e){
            e.style.opacity           = "1";
            e.style.marginTop         = "0px"
          }
        }
        function turnOffUpsellForever(){
          upcell.style.display        = "none";
          noUpsell                    = true
        }
        function turnOffUpsell(){
          upcell.style.display        = "none"
        }
        function turnOnUpsell(){
          if(!noUpsell){
            upcell.style.display      = "block"
          }
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
      })()
