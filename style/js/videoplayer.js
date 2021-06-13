//  VIDEOPLAYER  VIDEOPLAYER  VIDEOPLAYER  VIDEOPLAYER  VIDEOPLAYER  VIDEOPLAYER  VIDEOPLAYER  VIDEOPLAYER  VIDEOPLAYER 
// 
// ffmpeg -i ~/Upload1b.mp4 -c:v libx264 -pix_fmt yuv420p -profile:v high -crf 24 -level 4.1 -preset fast -s 720x1280 -strict -2 ~/Upload1b-ffmpeg24.mp4
// 
(function() {

  if ( typeof module === 'object' && module.exports ) {
    module.exports = VideoPlayer;
  }
  if ( typeof define === 'function' && define.amd ) {
    define ( 'videoplayer' , [], function() { return VideoPlayer } )
  }

  function VideoPlayer(){
    var   player                 = this,
          active                 = false,deactivate,fileName,referenceId,playerDivId;
    player.activate              = function()   {if(!active){deactivate=activate.call(this);active=true}};
    player.reset                 = function(){
      const activate             = player.activate.bind(player);
      if(active){
        setTimeout(deactivate,135);
        setTimeout(activate,650);
        active                   = false
      }
    };
    player.setFileName           = function(id) {if(isString(id)){fileName=id}return fileName};
    player.setPlayerDivId        = function(id) {if(isString(id)){playerDivId=id}return playerDivId};
    player.setReferenceId        = function(id) {if(isString(id)){referenceId=id}return referenceId};
    player.neverPlayed           = function()   {var np=neverPlayed;neverPlayed=false;return np}
    player.getReferenceCoords    = function()   {return getCoord(document.getElementById(referenceId),true)}
  };

  const root                     = this,
        basePath                 = "./style/videoplayer/",
        videoSuffix              = "mp4",
        imageSuffix              = "jpg",
        dot                      = ".",
        facets                   = [["y","top","Y"],["x","left","X"],["top","top","Y"],["left","left","X"],["bottom","bottom","Y"],["right","right","X"],["height","height"],["width","width"]],
        dimensions               = ["left","top","width","height"],
        Γ                        = Math.floor,
        page                     = "page",
        Offset                   = "Offset",
        videoAR                  = 1.77777777;

  var   widthLimit,heightLimit;

  return root.VideoPlayer        = VideoPlayer;

  function activate(){
    var   player                 = this,
          playerDivId            = player.setPlayerDivId(),
          playerReferenceId      = player.setReferenceId(),
          fileName               = player.setFileName(),
          imagePath              = isString(fileName)?basePath+fileName+dot+imageSuffix:false,
          videoPath              = isString(fileName)?basePath+fileName+dot+videoSuffix:false,
          playerReference        = isString(playerReferenceId)?document.getElementById(playerReferenceId):false,
          playerDiv              = isString(playerDivId)?document.getElementById(playerDivId):false,
          hiding                 = false,IH,playerVideo,closeVideo,videoThumbnail;
    if(imagePath&&videoPath&&isObject(playerReference)&&isObject(playerDiv)){
      playerDiv.innerHTML        = makePlayerInnerHTML()
      setTimeout(setEventListeners,135)
    }
    return function deactivate(){
      playerReference.removeEventListener("click",showplayer);
      closeVideo.removeEventListener("click",hideplayer);
      // playerVideo.removeEventListener("ended",hideplayer);
      setTimeout((pd=>()=>pd.innerHTML="&nbsp;")(playerDiv),35)       
    }

    function cyclePlayerInnerHTML(){
      setTimeout(clearPlayerInnerHTML,135);
      setTimeout(makePlayerInnerHTML,350)
    }
    function clearPlayerInnerHTML(){
      return "&nbsp;"
    }
    function makePlayerInnerHTML(){
      var   innerHTML            = '',
            clientWidth          = document.documentElement.clientWidth,
            clientHeight         = document.documentElement.clientHeight,
            limit                = Γ(Math.min(clientHeight*videoAR,clientWidth)/16-2),
            coord                = player.getReferenceCoords();
      widthLimit                 = limit*16,
      heightLimit                = limit*9;
      innerHTML                 += '<video id="v'+fileName+'" class="video-player" controls="true" width="'+(widthLimit)+'px" height="'+(heightLimit)+'px" loop>\n';
      innerHTML                 += '  <source type="video/mp4" src="'+videoPath+'">\n';
      innerHTML                 += '</video>';
      innerHTML                 += '<img id="i'+fileName+'" src="'+imagePath+'" class="video-thumbnail" style="width:'+coord.width+'px;height:'+coord.height+'px;" />\n';
      innerHTML                 += '<div id="x'+fileName+'" style="font-size:42px;color:#00F0F0;margin-top:-'+(heightLimit+4)+'px;margin-left:'+(widthLimit-48+8)+'px;position:absolute;height:48px;width:40px;line-height:48px;cursor:default;">X</div>\n';
      return innerHTML
    }
    function setEventListeners(){
      playerVideo                = document.getElementById("v"+fileName);
      closeVideo                 = document.getElementById("x"+fileName);
      videoThumbnail             = document.getElementById("i"+fileName);
      if(playerVideo&&closeVideo&&videoThumbnail){
        playerReference.addEventListener("click",showplayer);
        closeVideo.addEventListener("click",hideplayer);
        // playerVideo.addEventListener("play",playing);
        // playerVideo.addEventListener("pause",hideplayer);
        // playerVideo.addEventListener("ended",hideplayer)
      }
    }
    function playing(){}
    function showplayer(){
      const coord                = player.getReferenceCoords(),
            divStyle             = playerDiv.style,
            thumbStyle           = videoThumbnail.style,
            playerStyle          = playerVideo.style;
      divStyle.width             = ""+widthLimit+"px";
      divStyle.height            = ""+heightLimit+"px";
      divStyle.top               = ""+coord.top+"px";
      divStyle.left              = ""+coord.left+"px";
      thumbStyle.width           = ""+coord.width+"px";
      thumbStyle.height          = ""+coord.height+"px";
      setTimeout(thenExpand,135);
      playerDiv.style.display    = "block";

      function thenExpand(){
        divStyle.left            = "16px";
        divStyle.top             = "9px";
        thumbStyle.width         = ""+widthLimit+"px";
        thumbStyle.height        = ""+heightLimit+"px";
        setTimeout(thenPlay,650)
      }
      function thenPlay(){
        playerStyle.display      = "block";
        thumbStyle.display       = "none";
        playerVideo.play()
      }
    }
    function hideplayer(){
      const coord                = player.getReferenceCoords(),
            divStyle             = playerDiv.style,
            thumbStyle           = videoThumbnail.style,
            playerStyle          = playerVideo.style;
      hiding                     = true;
      playerVideo.pause();
      playerStyle.display        = "none";
      thumbStyle.display         = "block";
      setTimeout(thenShrink,35);

      function thenShrink(){
        divStyle.width           = ""+widthLimit+"px";
        divStyle.height          = ""+heightLimit+"px";
        divStyle.top             = ""+coord.top+"px";
        divStyle.left            = ""+coord.left+"px";
        thumbStyle.width         = ""+coord.width+"px";
        thumbStyle.height        = ""+coord.height+"px";
        setTimeout(thenHide,650);

        function thenHide(){
          hiding                 = false;
          divStyle.display       = "none";
          player.reset()
        }
      }
    }
  }

  function getCoord(htmlObj,noScrollOffset){
    var r,v=null;
    noScrollOffset               = Boolean(noScrollOffset);
    if(isObject(htmlObj)&&isFunctn(htmlObj.getBoundingClientRect)){
      if(isObject(r=htmlObj.getBoundingClientRect())){
        v                        = {};
        facets.forEach(function(d){
          var o                  = isString(d[2])&&!noScrollOffset?window[page+d[2]+Offset]:0;
          if(isNumber(r[d[0]])){
            v[d[1]]              = Γ(r[d[0]]+o+0.5)
          }
        });
        v.center=Γ(0.5+(v.left+v.right)/2);
        v.middle=Γ(0.5+(v.top+v.bottom)/2);
      }
    }
    return v;
  }
  function isNumber(n)  { return typeof n === "number" && !isNaN(n)     }
  function isNumb(n)    { return typeof n === "number"                  }
  function isObject(o)  { return Boolean(o) && typeof o === "object"    }
  function isArray(a)   { return isObject(a) && a.constructor === Array }
  function isString(s)  { return typeof s === "string" }
  function isFunctn(f)  { return typeof f === "function" }

}).call(this);

