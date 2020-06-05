import Vue from 'vue';
import MusicKit from "./class/MusicKit";
import { vm } from './modules/albums';

document.addEventListener('musickitloaded', function(){
    const MK = new MusicKit();

    MK.authorize()
        .then(res => console.log(res))
        .catch(err => console.log(err))

    // get albums
    MK.searchAlbum('相対性理論', 10)
        .then(res => Vue.set(vm, 'albums', res.albums.data))
})

document.addEventListener('musickitplaybackTimeDidChange',function(){
    console.log('playbackChange')
    console.log(new Date())
})
