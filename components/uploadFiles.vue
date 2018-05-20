<template>
  <div>
    <v-data-table :headers="headers" :items="fileItems" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td class="text-xs-center img-container py-2 px-1"><img :src="props.item.imgUrl" alt=""></td>
        <td class="text-xs-left">{{ props.item.name }}</td>
      </template>
    </v-data-table>

    <v-btn class="white--text fileInputBtn" color="primary">
      <v-icon left dark>add_a_photo</v-icon>上传图片
      <input type="file" name="file" id="file" accept="image/png,image/jpeg,image/webp" multiple="multiple" class="fileInput" @change="changInput">
    </v-btn>
  </div>

</template>
<script>
var co = require("co");
export default {
  name: "uplaodFiles",
  data() {
    return {
      headers: [
        {
          text: "imgUrl",
          align: "center",
          sortable: false,
          value: "imgUrl"
        },
        {
          text: "文件名",
          value: "name",
          align: "left"
        }
        // { text: "拍摄时间", value: "picDt" }
      ],
      fileItems: []
    };
  },
  methods: {
    changInput(e) {
      console.log(e.target.files);
      console.log(e.target.files.length);
      for (let i = 0; i < e.target.files.length; i++) {
        this.upload(e.target.files[i]);
      }
    },
    upload(file) {
      let self = this;
      co(function*() {
        var result = yield self.$client.put(`test/${file.name}`, file);
        self.addItem(result);
        console.log(result);
      }).catch(function(err) {
        console.log(err);
      });
      //     co(async ()=> {
      //     var result = await client.multipartUpload('object-key', 'local-file', {
      //         progress: function (p) {
      //           console.log('Progress: ' + p);
      //         },
      //         file,
      // });
      // console.log(result);
      // var head = await client.head('object-key');
      // console.log(head);
      //     }).catch(function(err) {
      //       console.log(err);
      //     });
    },
    addItem(result) {
      let { name, res, url } = result;
      this.fileItems.push({
        imgUrl: url + "?x-oss-process=style/shrtcut",
        name
      });
    }
  }
};
</script>
<style lang="css" scoped>
.fileInputBtn {
  position: relative;
}
.fileInput {
  opacity: 0;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
}
.img-container {
}
.img-container img {
  display: inline-block;
  vertical-align: middle;
  width: 100px;
}
</style>

