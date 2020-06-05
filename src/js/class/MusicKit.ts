
export default class MK {
    music: any;

    constructor() {
        MusicKit.configure({
            developerToken: 'eyJhbGciOiJFUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjZLTjlVNlFYWVkifQ.eyJpc3MiOiI2VzdTODRRNjlNIiwiaWF0IjoxNTkxMzIzNDk1LCJleHAiOjE1OTE0MDk4OTV9.O3TWL6KYqwnQmxS0Es44n8L8IxZPJr0jFWfSvyz6E_gEckAdX4DrGEGqGtk43pKikPC_q91mtwktAMK8iecytw',
            app: {
                name: 'MusicKitTest',
                build: '2020.06.04'
            }
        });

        this.music = MusicKit.getInstance();
    }

    authorize() {
        return this.music.authorize(); // Returns a promise that resolves with a 「musicUserToken」.
    }

    play() {
        return this.music.player.play();
    }

    pause() {
        this.music.player.pause();
    }

    stop() {
        this.music.player.stop();
    }

    getPlayer () {
        return this.music.player;
    }

    searchAlbum(keyword: string, limit: number, types:string = 'artist, albums' ) {
        return this.music.api.search(
            keyword,
            {limit: limit, types: types}
        );
    }

    setQueue(id: string) {
        return this.music.setQueue({ album: id });
    }

    skipToNext() {
        return this.music.player.skipToNextItem()
    }

    skipToPrev() {
        return this.music.player.skipToPreviousItem()
    }
}