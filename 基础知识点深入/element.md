

# 基本组件

### checkbox

```vue
<el-checkbox-group v-model="treeSelectedDataK" class="content-row">
  <el-checkbox
    v-for="item in groupData"
    :key="item.id"
    :label="item.id"
    @change="is => choosePerson(item, is)"
  >{{ item.userName }}</el-checkbox>
</el-checkbox-group>
```

自带默认选中，取消逻辑(v-model)

但也可以在 `el-checkbox`中改变

