<template lang="pug">
  .modal.fade#modal
    .modal-dialog
      .modal-content
        .modal-header
          .modal-title
            h2 {{ currentItem.title }}
            p {{ currentItem.artistName }} --- {{ currentItem.albumInfo }}
        .modal-body
          img(:src="currentItem.artworkURL")
        .modal-footer.justify-content-between
          button.btn.btn-secondary(type="button" @click="$emit('prev', null)") PREV
          time(id="apple-music-current-playback-duration")
          time(id="apple-music-current-playback-time")
          time(id="apple-music-current-playback-progress")
          button.btn.btn-secondary(type="button" @click="$emit('next', null)") NEXT
</template>

<script>
    import 'bootstrap';

    export default {
        name: "Modal",
        props: {
            currentItem: Object,
            isPlaying: Boolean,
        },
        mounted() {
            console.log(this.currentItem)
        },
        watch: {
            isPlaying: function(current, old) {
                $('#modal').modal('toggle');
            }
        },
        methods: {

        }
    }
</script>

<style scoped lang="scss">

</style>