<template>
<uploadFiles/>
</template>
<script>
import uploadFiles from '../components/uploadFiles'

let state = {
    appHeaderState: {
        show: false
    }
};
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', state.appHeaderState);
}
export default {
  name: "upload",
  metaInfo: {
    title: "上传图片",
    titleTemplate: "%s - imgWall",
    meta: []
  },
  components:{
      uploadFiles
  },
  async asyncData({ store, route }) {
    setState(store);
  }
};
</script>
<style>
</style>

