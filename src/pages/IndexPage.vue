<template>
  <q-tree :nodes="treeData" :node-key="'id'" :label-key="'name'" @node-click="onNodeClick">
    <template v-slot:header-x="{ node }">
      <div class="row items-center">
        {{ node.name }}
        <div class="q-ml-xl">
          <q-btn icon="add" class="cursor-pointer" @click.stop="addNode(node)" />
          <q-btn icon="edit" class="cursor-pointer" @click.stop="editNode(node)" />
          <q-btn icon="delete" class="cursor-pointer" @click.stop="deleteNode(node)" />
        </div>
      </div>
    </template>
  </q-tree>
</template>

<script>
export default {
  data() {
    return {
      treeData: [
        {
          id: 1,
          name: 'Node 1',
          children: [
            {
              id: 2,
              name: 'Child 1 of Node 1',
            },
            {
              id: 3,
              name: 'Child 2 of Node 1',
              header: 'x'
            },
          ],
        },
        {
          id: 4,
          name: 'Node 2',
        },
      ],
    };
  },
  methods: {
    toggleNode(node) {
      node.__toggle();
    },
    onNodeClick(node) {
      // Handle clicks on nodes here.
      console.log(`Clicked node ${node.id}: ${node.name}`);
    },
    editNode(node) {
      node.name = `novo ${Math.floor(Math.random() * 1000)}`;
    },
    deleteNode(node) {
      const parentNode = this.getParentNode(node);
      if (parentNode) {
        // Remove the node from its parent's children array.
        const index = parentNode.children.indexOf(node);
        if (index !== -1) {
          parentNode.children.splice(index, 1);
        }
        console.log(`Deleting node ${node.id}: ${node.name}`);
      } else {
        // If the node doesn't have a parent, it's a top-level node, so remove it from the treeData array.
        const index = this.treeData.indexOf(node);
        if (index !== -1) {
          this.treeData.splice(index, 1);
        }
        console.log(`Deleting top-level node ${node.id}: ${node.name}`);
      }
    },
    getParentNode(node) {
      // Find the parent node of the given node.
      const queue = [...this.treeData];
      while (queue.length) {
        const parentNode = queue.shift();
        if (parentNode.children && parentNode.children.includes(node)) {
          return parentNode;
        }
        queue.push(...(parentNode.children || []));
      }
      return null;
    },
    addNode(parentNode) {
      const newNode = {
        id: Math.floor(Math.random() * 1000), // Generate a unique ID for the new node.
        name: 'New Node',
        header: 'x'
      };
      if (!parentNode.children) {
        // If the parent node doesn't have children yet, create an empty array for them.
        parentNode.children = [];
      }
      parentNode.children.push(newNode);
    }
  }
};
</script>
