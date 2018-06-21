<template>
    <v-layout row>
        <v-flex xs12>
            <!-- <uploadFiles/> -->
            <v-toolbar color="red darken-2">
                <v-toolbar-title class="white--text text--darken-4">上传图片</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon light @click="$router.push('wall')">
                    <v-icon color="white darken-2">arrow_forward</v-icon>
                </v-btn>
            </v-toolbar>
            <uploadFiles/>
        </v-flex>
    </v-layout>

</template>
<script>
import uploadFiles from "../components/uploadFiles";

let state = {
  appHeaderState: {
    show: false
  }
};
function setState(store) {
  store.dispatch("appShell/appHeader/setAppHeader", state.appHeaderState);
}
export default {
  name: "upload",
  metaInfo: {
    title: "上传图片",
    titleTemplate: "%s - imgWall",
    meta: []
  },
  components: {
    uploadFiles
  },
  async asyncData({ store, route }) {
    setState(store);
  }
};
</script>
<style>
</style>

