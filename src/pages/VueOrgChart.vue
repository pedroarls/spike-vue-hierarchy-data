<template>
    <div>
        <vo-basic :data="chartData"></vo-basic>
    </div>
</template>
   
<script>
import { VoBasic } from 'vue-orgchart'
import { ref } from 'vue';
let chartData = ref({
    name: 'JavaScript',
    children: [
        { name: 'Angular' },
        {
            name: 'React',
            children: [{ name: 'Preact' }]
        },
        {
            name: 'Vue',
            children: [{ name: 'Moon' }]
        }
    ]
});
export default {
    components: { VoBasic }
}
</script>