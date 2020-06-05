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

            MK.authorize()
                .then(res => console.log(res))
                .catch(err => console.log(err))

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
                        this.isPlaying = true;
                        this.currentItem = this.getPlayer().nowPlayingItem;
                        console.log(this.currentItem);
                    });
                })
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
        },
        stop() {
            MK.stop();
            this.isPlaying = false;
        },
        pause() {
            let player: JQuery<HTMLAudioElement> = $('#apple-music-player')
            player[0].pause();
            let playerVanilla:HTMLAudioElement = <HTMLAudioElement>document.getElementById('apple-music-player');
            playerVanilla.pause();
            MK.pause();
        },
        play() {
            MK.play();
        },
    },
});