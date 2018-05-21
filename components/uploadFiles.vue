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

    <v-dialog v-model="loading" persistent max-width="290">
      <v-card>
        <v-card-text>
          <v-progress-circular :size="100" :width="4" indeterminate :value="progress.completed/progress.total" color="green" class="my-4">
            {{progress.completed}}/{{progress.total}}
          </v-progress-circular>
          <p class="text-xs-center">上传中</p>
        </v-card-text>

      </v-card>

    </v-dialog>
  </div>

</template>
<script>
var co = require("co");
export default {
  name: "uplaodFiles",
  data() {
    return {
      loading: false,
      progress: {
        completed: 0,
        total: 0
      },
      headers: [
        {
          text: "图片预览",
          align: "center",
          sortable: false,
          value: "imgUrl"
        },
        {
          text: "文件路径",
          value: "name",
          sortable: false,
          align: "left"
        }
        // { text: "拍摄时间", value: "picDt" }
      ],
      fileItems: []
    };
  },
  mounted() {},
  methods: {
    changInput(e) {
      console.log(e.target.files);
      console.log(e.target.files.length);
      this.openLoading(e.target.files.length);
      for (let i = 0; i < e.target.files.length; i++) {
        this.upload(e.target.files[i], i, e.target.files.length);
      }
    },
    openLoading(total) {
      this.progress.completed=0;
      this.loading = true;
      this.progress.total = total;
    },
    closeLoading() {
      this.loading = false;
    },
    async upload(file, i, length) {
      let self = this;
      co(function*() {
        var result = yield self.$client.put(`test/${file.name}`, file);
        self.progress.completed += 1;
        if (self.progress.completed >= length) {
          self.closeLoading();
        }
        self.addItem(result);
        console.log(result);
      }).catch(function(err) {
        console.log(err);
      });
      // this.$client.multipartUpload(`test/${file.name}`, file).then(resp=>{
      //   console.log(resp);
      //   this.openLoading(i+1,length);
      // });

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

