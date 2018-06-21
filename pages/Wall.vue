<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <!-- <uploadFiles/> -->
        <v-toolbar color="red darken-2">
          <v-toolbar-title class="white--text text--darken-4">图片墙</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn light @click="goup" color="transparent" depressed class="white--text">
            <v-icon color="white darken-2">add</v-icon>
            上传
          </v-btn>
        </v-toolbar>
        <v-progress-circular :width="2" :size="110" indeterminate color="red" v-if="loading">加载中</v-progress-circular>
        <template v-for="(item,index) in wallGroups">
          <v-subheader :key="index">{{index}}</v-subheader>
          <ImgWall :itemData="item" :key="index+'i'" />
        </template>
      </v-card>
    </v-flex>
  </v-layout>

</template>
<script>
import ImgWall from "../components/imgWall";
import co from "co";
import axios from "axios";
import moment from "moment";
moment.locale("zh-cn");
function getFilePath(filePath) {
  return `${filePath}?x-oss-process=style/shrtcut`;
}
let state = {
  appHeaderState: {
    show: false
  }
};
function setState(store) {
  store.dispatch("appShell/appHeader/setAppHeader", state.appHeaderState);
}
export default {
  name: "wall",
  metaInfo: {
    title: "图片墙",
    titleTemplate: "%s - imgWall",
    meta: []
  },
  components: {
    ImgWall
  },
  computed:{
    loading(){
      return Object.keys(this.wallGroups).length===0;
    }
  },
  mounted() {
    const { g } = this.$route.query;
    let folder = "2018052501";
    if (g) {
      folder = g;
    }
    this.listDir(`${folder}/`);
  },
  data() {
    return {
      wallGroups: {}
    };
  },
  methods: {
    goup() {
      this.$router.push({
        name: "upload",
        query: this.$route.query || {}
      });
    },
    listDir(dir) {
      let self = this;
      co(function*() {
        var result = yield self.$client.list({
          prefix: dir,
          delimiter: "/",
          'max-keys':1000,
          'maxKeys':1000,
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
        let promiseArr = [];
        imgArr.forEach(item => {
          let onePromise = axios
            .get(item.hight + "?x-oss-process=image/info")
            .then(resp => {
              const { DateTime } = resp.data;
              if (DateTime) {
                //
                let time = moment(DateTime.value, "YYYY:MM:DD HH:mm:ss");
                item.realTime = time.format('x');
                item.formatTime = time.format("M月DD日HH时");
                item.imageHour = time.hour();
              }
              return item;
            });
          promiseArr.push(onePromise);
        });
        Promise.all(promiseArr).then(resp => {
          let tempObj = {};
          imgArr.sort((x, y) => x.realTime*1 < y.realTime*1);
          imgArr.forEach(item => {
            let { imageHour, formatTime } = item;
            if (formatTime === null || formatTime === undefined) {
              if (typeof tempObj["未知时间"] === "undefined") {
                tempObj["未知时间"] = [];
              }
              tempObj["未知时间"].push(item);
              return;
            }
            if (typeof tempObj[`${formatTime}`] === "undefined") {
              tempObj[`${formatTime}`] = [];
            }
            tempObj[`${formatTime}`].push(item);
          });
          self.wallGroups = tempObj;
        });
      });
    }
  },
  async asyncData({ store, route }) {
    setState(store);
  }
};
</script>
<style>
</style>

