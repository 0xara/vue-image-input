<template>
  <div
    :style="{border: '2px dashed #E0E0E0','border-radius': '10px','padding':'10px'}"
    @dragover.prevent.stop
    @drop.prevent.stop="onImageChange"
    @click.stop="handleOpenFileSelector($event)"
  >
    <input
      :accept="accept"
      type="file"
      name="image"
      style="display: none"
      @change="onImageChange">
    <img
      :src="imageSrc"
      style="width: 100%;">
  </div>
</template>

<script>

import ImageHandler from './utils/ImageHandler';

export default {

    name: 'ImageInput',

    model: {
        prop: 'value',
        event: 'change'
    },

    props: {
        accept: {},
        src: {},
        placeHolder: {},
        value: ''
    },

    data() {
        return {
            imageSrc: '',
            imageHandler: new ImageHandler(this, 'imageSrc'),
            defaultPlaceHolder: 'data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D\'http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg\'%20xmlns%3Axlink%3D\'http%3A%2F%2Fwww.w3.org%2F1999%2Fxlink\'%20viewBox%3D\'0%200%201400%20933\'%3E%3Cdefs%3E%3Csymbol%20id%3D\'a\'%20viewBox%3D\'0%200%2090%2066\'%20opacity%3D\'0.3\'%3E%3Cpath%20d%3D\'M85%205v56H5V5h80m5-5H0v66h90V0z\'%2F%3E%3Ccircle%20cx%3D\'18\'%20cy%3D\'20\'%20r%3D\'6\'%2F%3E%3Cpath%20d%3D\'M56%2014L37%2039l-8-6-17%2023h67z\'%2F%3E%3C%2Fsymbol%3E%3C%2Fdefs%3E%3Cuse%20xlink%3Ahref%3D\'%23a\'%20width%3D\'20%25\'%20x%3D\'40%25\'%2F%3E%3C%2Fsvg%3E'
        };
    },

    computed: {
        errors() {
            return this.imageHandler.errorsBag;
        }
    },

    watch: {
        src(nVal) {
            if(!nVal) {
                this.$emit('change', '');
                this.imageSrc = this.getPlaceHolder();

                return;
            }

            if(nVal != this.imageSrc) { this.imageSrc = nVal; }
        },

        errors(nVal) {
            if(!nVal.length) return;

            this.$emit('change', '');
            this.$emit('error', nVal);
            this.imageSrc = this.getPlaceHolder();
        },

        value(nVal) {
            if(nVal) return;

            this.imageSrc = this.getPlaceHolder();
        }
    },

    created() {
        this.imageSrc = this.src || this.getPlaceHolder();
    },

    methods: {

        onImageChange(e) {
            const image = this.imageHandler.createImage(e);
            this.$emit('change', image);
        },

        handleOpenFileSelector($e) {
            $(this.$el).find('input[type=file]').trigger('click');
        },

        getPlaceHolder() {
            return this.placeHolder || this.defaultPlaceHolder;
        }
    }

};

</script>
