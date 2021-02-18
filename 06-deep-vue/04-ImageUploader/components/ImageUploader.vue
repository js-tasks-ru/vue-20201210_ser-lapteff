<template>
  <div class="image-uploader">
    <label
      class="image-uploader__preview"
      :style="imageUrl"
      :class="{'image-uploader__preview-loading' : isLoading}">
      <span>{{ stateText }}</span>
      <input
        @change="handleChange($event.target.files[0])"
        @click="handleRemoveImage($event)"
        type="file"
        accept="image/*"
        class="form-control-file"
        :disabled="isLoading"
      />
    </label>
  </div>
</template>

<script>
import { ImageService } from '../image-service';

export default {
  name: 'ImageUploader',
  data() {
    return {
      isLoading: false
    }
  },

  props: {
    imageId: {
      default: null
    }
  },
  model: {
    prop: 'imageId',
    event: 'change'
  },
  computed: {
    imageUrl() {
      return this.imageId
        ? {
          '--bg-image': `url('${ImageService.getImageURL(this.imageId)}')`,
        }
        : {}
    },
    stateText() {
      if (this.isLoading) {
        return 'Загрузка...'
      } else {
        return this.imageId === null ? 'Загрузить изображение' : 'Удалить изображение';
      }
    }
  },
  methods: {
    async handleChange(pathImage) {
      if (this.imageId === null) {
        this.isLoading = true;
        const {id} = await ImageService.uploadImage(pathImage);
        this.isLoading = false;
        return this.$emit("change", id);
      }
    },
    handleRemoveImage(event) {
      if (this.imageId !== null) {
        event.preventDefault();
        this.$emit("change", event.target.value = null)
      }
    },
  }
};
</script>

<style scoped>
.image-uploader .form-control-file {
  opacity: 0;
  height: 0;
}

.image-uploader .image-uploader__preview {
  --bg-image: var(--default-cover);
  background-size: cover;
  background-position: center;
  background-image: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    var(--bg-image);
  border: 2px solid var(--blue-light);
  border-radius: 8px;
  transition: 0.2s border-color;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: 512px;
  height: 228px;
}

.image-uploader .image-uploader__preview > span {
  color: var(--white);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
}

.image-uploader .image-uploader__preview:hover {
  border-color: var(--blue);
}

.image-uploader .image-uploader__preview.image-uploader__preview-loading {
  cursor: no-drop;
}
</style>
