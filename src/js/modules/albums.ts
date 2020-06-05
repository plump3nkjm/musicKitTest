import Vue from 'vue';
import Modal from '../components/Modal.vue';
import MusicKit from "../class/MusicKit";
Vue.component('modal-component', Modal);

let MK: any;

export const vm = new Vue({
    el: '#app',
    data: {
        albums:[],
        artistName:'',
        isPlaying: false,
        currentItem: {},
    },
    mounted:() => {
        document.addEventListener('musickitloaded', function(){
            MK = new MusicKit();

            MK.music.addEventListener('mediaItemDidChange',()=> {
                console.log('media item did change.')
            })
        })
    },
    methods: {
        searchAlbum(keyword) {
            MK.searchAlbum(keyword, 10)
                .then(res => this.albums = res.albums.data)
                .catch(err => console.log(err));
        },
        playSong(id) {
            MK.setQueue(id)
                .then(queue => {
                    console.log(queue)
                    MK.play().then(pos => {
                        console.log(pos)
                        this.isPlaying = !this.isPlaying;
                        this.currentItem = this.getPlayer().nowPlayingItem;
                        console.log(this.currentItem);
                    });
                })
        },
        stopSong() {
          MK.stop();
        },
        getPlayer() {
            const player = MK.getPlayer()
            console.log(
                '再生時間:', player.currentPlaybackTime,
                '再生している曲:', `${player.nowPlayingItem.title} / ${player.nowPlayingItem.artistName} / ${player.nowPlayingItem.albumName}`,
            )
            return player;
        },
        skipToPrev() {
            console.log('skip to prev')
            MK.skipToPrev()
                .then(res => this.currentItem = this.getPlayer().nowPlayingItem);
        },
        skipToNext() {
            console.log('skip to next')
            MK.skipToNext()
                .then(res => this.currentItem = this.getPlayer().nowPlayingItem);
        }
    },
});