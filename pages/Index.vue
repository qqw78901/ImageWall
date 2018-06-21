<template>
    <!-- <div class="link"> -->
    <!-- <Slider/> -->
    <!-- <v-layout fluid> -->
    <!-- </v-layout> -->

    <!-- <div class="content py-4 px-2"> -->
    <!-- <uploadFiles/> -->
    <!-- <v-subheader class="">2018-03-01</v-subheader> -->
    <!-- <ImgWall/> -->
    <!-- </div> -->
    <!-- </div> -->
    <v-layout column wrap  @click="goWall">
        <v-flex xs-12 class="link">
            <v-btn color="error" dark class="enter" @click="goWall">进入照片墙</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
import { mapActions } from "vuex";
import uploadFiles from "../components/uploadFiles";
import ImgWall from "../components/ImgWall";
import Slider from "../components/Slider";
function setState(store) {
  store.dispatch("appShell/appHeader/setAppHeader", {
    show: false,
    title: "Lavas",
    showMenu: false,
    showBack: false,
    showLogo: false,
    actions: [
      {
        icon: "search",
        route: "/search"
      }
    ]
  });
}

export default {
  name: "index",
  metaInfo: {
    title: "照片墙",
    titleTemplate: "%s - imgWall",
    meta: [
      { name: "keywords", content: "lavas PWA" },
      {
        name: "description",
        content:
          "基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题"
      }
    ]
  },
  components: {
    uploadFiles,
    ImgWall,
    Slider
  },
  async asyncData({ store, route }) {
    setState(store);
  },
  activated() {
    setState(this.$store);
  },
  mounted() {},
  methods: {
    goWall() {
        console.log(this.$route);
        
      this.$router.push({
        name: "wall",
        query: this.$route.query||{}
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.content {
    min-height: 100%;
}
</style>
<style>
.link {
  display: block;
  width: 100%;
  height: 100%;
  background-image: url(https://gdutzuo1.oss-cn-qingdao.aliyuncs.com/test/mmexport1526535627264.jpg);
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: cover;
  position: relative;
}
.enter {
  position: absolute !important;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
}
</style>

