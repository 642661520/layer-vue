<template>
  <div>
    <layer-vue :visible.sync="visible1" :resizing="resizing" id="reloadAutoArea" :resize="[0,0]" :minarea="[100,100]" :anim="0">
      <el-tabs style="width: 700px;" v-model="activeName" @tab-click="handleClick">
    <el-tab-pane :lazy="true" label="用户管理" name="first">用户管理
      <el-table
      :data="tableData"
      style="width: 100%;height: 300px;">
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
    </el-table>
    </el-tab-pane>
    <el-tab-pane :lazy="true" label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane :lazy="true" label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane :lazy="true" label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs></layer-vue>
    <h2>全局方法</h2>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="open1">$layer.open</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="close1">$layer.close({{layer1?layer1:''}})</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="visible1=true">打开一个标签页</el-button>
      </el-col>
      <!-- <el-col :span="3">
        <el-button type="primary" @click="open4">reloadAutoArea</el-button>
      </el-col> -->
      <el-col :span="3">
        <el-button type="primary" @click="open5">resizeEnd</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="open6">full/min/restore</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="visible1 = !visible1">resizing</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      width: 300,
      height: 200,
      visible1: false,
      layer1:undefined,
      activeName: 'first',
      tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }]
    };
  },
  methods: {
    resizing(e, w, h) {
      this.width = w;
      this.height = h;
    },
    open1() {
    this.layer1=this.$layer({
      id:'this.layer1',
      destroyOnClose :true,
      closeBtn:0,
        success: (el,index) => {
          this.$layer.setContent(index,`点击$layer.close(${index})关闭窗口`)
          this.$message.success("窗口编号:"+index);
        },
      });
    },
   async close1(){
     await this.$layer.close(this.layer1)
     this.layer1=undefined
    },
    open2() {
      this.$layer({
        id: 2,
        destroyOnClose: false,
        content: `id:'layerxxx',
        destroyOnClose:false,
        窗口不销毁的情况下关闭后，只执行cancel，不执行end
        `,
        cancel: () => {
          this.$message.success("窗口隐藏了！");
        },
        end: () => {
          setTimeout(() => {
            this.$message.success("窗口销毁了！");
          }, 0);
        },
      });
    },
    open3() {
      this.$layer({
        content: `窗口销毁的情况下关闭后，cancel和end同时执行`,
        cancel: () => {
          this.$message.success("窗口隐藏了！");
        },
        end: () => {
          setTimeout(() => {
            this.$message.success("窗口销毁了！");
          }, 0);
        },
      });
    },
    handleClick() {
      this.$nextTick(()=>{
this.$layer.reloadAutoArea('reloadAutoArea');
      })
      
    },
    open5() {
      this.$layer({
        content: "停止拉伸窗口后执行",
        resizeEnd: () => {
          this.$message.success("拉伸结束");
        },
      });
    },
    open6() {
      this.$layer({
        maxmin: [1, 1],
        content: "窗口最大化、最小化、还原后执行",
        full: () => {
          this.$message.success("窗口全屏了");
        },
        min: () => {
          this.$message.success("窗口最小化了");
        },
        restore: () => {
          this.$message.success("窗口还原了");
        },
      });
    },
  },
};
</script>
