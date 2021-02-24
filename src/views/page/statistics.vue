<template>
    <div class="index">
        <!-- 卡片 -->
        <card />
        <tongji />
    </div>
</template>
<script>
import card from '@/components/card.vue';
import tongji from '@/components/tongji.vue';

export default {
  components: {
    card,
    tongji,
  },
};
</script>
