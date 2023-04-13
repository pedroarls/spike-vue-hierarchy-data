<template>
    <p class="q-mb-md">{{ selectedNode || 'Nenhum nó selecionado' }}</p>
    <v-chart class="chart" :option="option" autoresize @click="handleNodeClick" />
</template>
  
<script setup>
import { use } from 'echarts/core';
import { SVGRenderer } from 'echarts/renderers';
import { TreeChart } from 'echarts/charts';
import {
    TooltipComponent
} from 'echarts/components';
import VChart, { THEME_KEY } from 'vue-echarts';
import { ref, provide } from 'vue';

use([
    SVGRenderer,
    TreeChart,
    TooltipComponent
]);

provide(THEME_KEY, 'dark');


const option = ref(getSeriesOption());
const selectedNode = ref('');


function getStyledNode(name, iconUrl) {
    const icon = iconUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9EOuF1zhRCNpCjaAJm1DKinOdhPEGC8aHIw&usqp=CAU';
    return {
        name: name,
        symbol: 'rect',
        symbolSize: 100,
        itemStyle: {
            borderWidth: 1,
            borderColor: 'black'
        },

        label: {
            show: true,
            formatter: function () {
                return '{title|' + name + '}\n{icon|}'
            },
            color: 'white',
            fontSize: 14,
            fontWeight: 'bold',
            verticalAlign: 'middle',
            align: 'center',
            padding: [10, 0],
            backgroundColor: 'transparent',
            borderWidth: 0,
            rich: {
                'title': {
                    'padding': [0, 0, 10, 0],
                    'fontSize': 16
                },
                'icon': {
                    'backgroundColor': {
                        'image': icon
                    },
                    'width': 30,
                    'height': 30,
                    'align': 'center',
                    'verticalAlign': 'middle'
                }
            }
        },
    }
}
function getData() {
    return [
        {
            ...getStyledNode('Node1'),
            children: [
                {
                    ...getStyledNode('Child1'),
                    children: [
                        {
                            ...getStyledNode('Grandchild 1'),
                        },
                        {
                            ...getStyledNode('Grandchild 2'),
                        },
                    ],
                },
                {
                    ...getStyledNode('Child 2'),
                },
            ],
        },
        {
            ...getStyledNode('Parent 2'),
        },
    ];
}

function getSeriesOption(orientation) {
    return {
        series: [{
            type: 'tree',
            edgeShape: 'polyline',
            orient: orientation || 'vertical',
            data: getData(),
            expandAndCollapse: true,
            animationDuration: 550,
            animationDurationUpdate: 750
        }],

    }
}


function toggleVisualizaton() {
    if (visualization.value === 'horizontal') {
        option.value = getSeriesOption('vertical');
    }
    else {
        visualization.value = 'horizontal'
    }
}

function handleNodeClick(params) {
    console.log('Node clicked:', params.data.name)
    const node = params.data;
    selectedNode.value = params.data.name;
    console.log(params.data.name, selectedNode.value)

    if (node) {
        const child = getStyledNode('New Child');
        if (!node.children) {
            node.children = [];
        }
        node.children.push(child);
    }
}

</script>
  
<style scoped>
.chart {
    height: 100vh;
}
</style>
  