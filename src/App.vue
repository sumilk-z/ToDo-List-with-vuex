<template>
  <div id="app">
    <a-input
      placeholder="请输入任务"
      class="my_ipt"
      :value="inputValue"
      @change="handleInputChange"
    />
    <a-button type="primary" @click="addItem">添加事项</a-button>

    <a-list bordered :dataSource="getListByKey" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="cbStatusChanged($event, item.id)"
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{ notDoneCount }}条剩余</span>
        <a-button-group>
          <a-button
            :type="viewKey === 'all' ? 'primary' : 'default'"
            @click="changeList('all')"
            >全部</a-button
          >
          <a-button
            :type="viewKey === 'notDone' ? 'primary' : 'default'"
            @click="changeList('notDone')"
            >未完成</a-button
          >
          <a-button
            :type="viewKey === 'done' ? 'primary' : 'default'"
            @click="changeList('done')"
            >已完成</a-button
          >
        </a-button-group>
        <a @click="cleanDone">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapGetters, mapState } from 'vuex'
export default {
  name: 'app',
  data() {
    return {}
  },
  methods: {
    addItem() {
      // 判断数据是否为空
      if (this.inputValue.trim().length <= 0) {
        // 弹出请输入数据
        return this.$message.warning('文本框的内容不能为空！')
      }
      // 否则提交数据
      this.$store.commit('addItem')
    },
    handleInputChange(e) {
      this.$store.commit('setInputValue', e.target.value)
    },
    cbStatusChanged(e, id) {
      // 通过e.target.checked可以接收到最新的选中状态
      const param = {
        val: e.target.checked,
        id: id
      }
      this.$store.commit('changeStatusById', param)
    },
    removeById(id) {
      this.$store.commit('removeById', id)
    },
    cleanDone() {
      this.$store.commit('cleanDone')
    },
    changeList(key) {
      this.$store.commit('changeViewKey', key)
    }
  },
  computed: {
    ...mapState(['inputValue', 'viewKey']),
    ...mapGetters(['notDoneCount', 'getListByKey'])
  },
  created() {
    // 触发请求数据的action
    this.$store.dispatch('getList')
  }
}
</script>
<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 300px;
  margin-right: 10px;
}
.dt_list {
  width: 400px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
