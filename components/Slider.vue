<template>
    <section>
        <div id="iSlider-wrapper" ref="wrapper"></div>
        <div id="iSlider-arrow"></div>
        <audio src="//be-fe.github.io/static/audios/YouGotMe.mp3" autoplay="autoplay" loop="loop" id="autoplay"></audio>
    </section>
</template>
<script>
import iSlider from "islider.js";
import "islider.js/build/iSlider.min.css";
export default {
  name: "Slider",
  mounted() {
    // var islider = new iSlider({
    //   dom: document.getElementById("iSlider-wrapper"),
    //   data: [
    //     "https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526535627264.jpg",
    //     "https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526872278752.jpg",
    //     "https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526878197805.jpg",
    //     "https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526878200231.jpg"
    //   ]
    // });
    console.log(this.$refs.wrapper)
    var islider = new iSlider({
      data: [
        // {content:"https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526535627264.jpg"},
        // {content:"https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526878197805.jpg"},
        // {content:"https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526878200231.jpg"},
        // {content:"https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526872278752.jpg"},
        {content:"https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526535627264.jpg"},
        
        // {content:`<a href="#/wall" class="link"></a>`},
      ],
      dom:this.$refs.wrapper,
      isOverspread: false,
      isVertical: true,
      isLooping: false,
      animateType: "card",
      onslidechange: function(idx) {
        if (this.isLooping === false) {
          if (idx === this.data.length - 1) {
            document.getElementById("iSlider-arrow").style.display = "none";
          } else {
            document.getElementById("iSlider-arrow").style.display = "block";
          }
        }
      }
    });

    var audio = document.getElementById("autoplay");
    var controller = document.getElementById("musicBtn");
    var controllerHint = document.getElementById("musicBtnTxt");

    document.getElementById("musicBtn").addEventListener(
      "touchstart",
      function() {
        controllerHint.style.display = "";
        if (audio.paused) {
          audio.play();
          controller.className = "music-btn on";
          controllerHint.innerHTML = "开始";
        } else {
          audio.pause();
          controller.className = "music-btn";
          controllerHint.innerHTML = "关闭";
        }

        setTimeout(function() {
          controllerHint.style.display = "none";
        }, 1000);
      },
      false
    );
  }
};
</script>
<style>
/*ul wrapper*/
#iSlider-wrapper {
  height: 100%;
  width: 100%;
  overflow: hidden;
  position: absolute;
}

#iSlider-wrapper ul {
  list-style: none;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
}

#iSlider-wrapper li {
  position: absolute;
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;
  list-style: none;
}

#iSlider-wrapper li img {
  max-width: 100%;
  max-height: 100%;
}

.music-btn {
  float: right;
  width: 1.8333333333333rem;
  height: 1.8333333333333rem;
  background: url("//be-fe.github.io/static/images/iSlider-card/music-icon.png");
  background-size: cover;
}

.music-btn.on {
  -webkit-animation: reverseRotataZ 1.2s linear infinite;
}

.media-wrap {
  overflow: hidden;
  position: fixed;
  top: 2.9166666666667rem;
  right: 1.375rem;
  z-index: 10000;
  width: 6.5em;
  height: 6.5em;
  font-size: 16px;
}

.media-wrap span {
  float: left;
  height: 4em;
  width: 4em;
  line-height: 3rem;
  color: #fff;
  font-size: 1em;
}

.media-wrap i {
  width: 2.5em;
  height: 2.5em;
}

@-webkit-keyframes reverseRotataZ {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  100% {
    -webkit-transform: rotateZ(-360deg);
  }
}

/* Arrow */
#iSlider-arrow {
  position: absolute;
  width: 3em;
  height: 3em;
  left: 0;
  right: 0;
  bottom: 5%;
  margin: 0 auto;
  border-top: 2px solid #fff;
  border-right: 2px solid #fff;
  z-index: 10000;
  opacity: 0.8;
  -webkit-animation: nextPage 1.2s linear infinite;
}

@-webkit-keyframes nextPage {
  0% {
    -webkit-transform: translateY(40px) rotate(-45deg);
    opacity: 0.8;
  }
  50% {
    -webkit-transform: translateY(20px) rotate(-45deg);
    opacity: 0.4;
  }
  100% {
    -webkit-transform: translateY(10px) rotate(-45deg);
    opacity: 0;
  }
}
.link{
    display: block;
    width: 100%;
    height: 100%;
    background-image: url(https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526535627264.jpg);
        background-repeat: no-repeat;
    background-position: 50% 50%;
    background-size: cover;
}
</style>

