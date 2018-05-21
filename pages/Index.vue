<template>
    <div>
        <div class="content py-4 px-2">
            <!-- <uploadFiles/> -->
            <v-subheader class="">2018-03-01</v-subheader>
            <ImgWall/>
              
        </div>
    </div>
</template>

<script>
import {mapActions} from 'vuex';
import uploadFiles from '../components/uploadFiles'
import ImgWall from '../components/ImgWall'
function setState(store) {
    store.dispatch('appShell/appHeader/setAppHeader', {
        show: false,
        title: 'Lavas',
        showMenu: false,
        showBack: false,
        showLogo: false,
        actions: [
            {
                icon: 'search',
                route: '/search'
            }
        ]
    });
}

export default {
    name: 'index',
    metaInfo: {
        title: '照片墙',
        titleTemplate: '%s - imgWall',
        meta: [
            {name: 'keywords', content: 'lavas PWA'},
            {name: 'description', content: '基于 Vue 的 PWA 解决方案，帮助开发者快速搭建 PWA 应用，解决接入 PWA 的各种问题'}
        ]
    },
    components:{
        uploadFiles,ImgWall
    },
    async asyncData({store, route}) {
        setState(store);
    },
    activated() {
        setState(this.$store);
    }
};
</script>

<style lang="stylus" scoped>
.content
    min-height 100%
</style>
