<template>
  <v-container v-bind="{ [`grid-list-xs`]: true }" fluid>
    <v-layout row wrap>
      <v-flex v-for="(n,index) in imgList" :key="index" xs4 sm6>
        <v-card flat tile class="">
          <v-card-media :src="n.url" height="100px" @click="showImgView(imgList,index)">
          </v-card-media>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import co from "co";

import ImageView from "./imageview";
let SingleImgView;
function getFilePath(filePath) {
  return `${filePath}?x-oss-process=style/shrtcut`;
}
function getRealImg(filePath) {
  return `${filePath}`;
}
export default {
  name: "ImgWall",
  data() {
    return {
      imgList: []
    };
  },
  computed: {
    slides() {
      return this.imgList.map(item => {
        return {
          src: item.hight,
          msrc: item.url,
          alt: "",
          title: "",
          w: 1200,
          h: 1200
        };
      });
    }
  },
  created() {
    this.listDir("test/");
  },
  methods: {
    handleClose() {
      console.log("close");
    },
    listDir(dir) {
      let self = this;
      co(function*() {
        var result = yield self.$client.list({
          prefix: dir,
          delimiter: "/"
        });
        console.log(result);
        let imgArr = [];
        result.objects.forEach(function(obj, index) {
          if (index === 0) {
            return;
          }
          console.log("Object: %s", obj.name);
          imgArr.push({
            url: getFilePath(obj.url),
            hight: obj.url
          });
        });
        self.imgList = imgArr;
      });
    },
    showImgView(imagelist, current) {
      SingleImgView = new ImageView({
        imagelist: imagelist.map(item => item.hight),
        current,
        disableDoubleTap: false,
        close: e => {
          if (e.target.className === "imagelist-item") {
            let imgObj = document.getElementById("imageview");
            if (imgObj !== null) {
              imgObj.parentNode.removeChild(imgObj);
            }
          }
        }
      });
      SingleImgView.show();
    }
  }
};
</script>
<style scoped>
</style>

