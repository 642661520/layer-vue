<template>
  <div>
    <layer-vue
      :visible.sync="visible1"
      :destroyOnClose="true"
      title="切换标签页触发reloadAutoArea"
      :resizing="resizing"
      id="reloadAutoArea"
      :anim="0"
      key="reloadAutoArea"
      :zindex="2"
    >
      <el-tabs
        style="width: 700px"
        v-model="activeName"
        @tab-click="handleClick"
      >
        <el-tab-pane
          :lazy="true"
          style="height: 300px"
          label="用户管理"
          name="first"
          >用户管理
          <el-table :data="tableData" style="width: 100%; height: 100%">
            <el-table-column prop="date" label="日期" width="180">
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="address" label="地址"> </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane :lazy="true" label="配置管理" name="second"
          >配置管理</el-tab-pane
        >
      </el-tabs></layer-vue
    >
    <h2>全局方法</h2>
    <el-row>
      <el-col :span="3">
        <el-button type="primary" @click="open1">open</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="full">full</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="min">min</el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="primary" @click="close1"
          >close({{ layer1 ? layer1 : "" }})</el-button
        >
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="visible1 = true"
          >reloadAutoArea</el-button
        >
      </el-col>
      <el-col :span="5">
        <el-input-number
          v-model="index"
          controls-position="right"
          :min="1"
          placeholder="请输入窗口编号"
        ></el-input-number>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="openAgain">openAgain</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <el-button type="primary" @click="setTitle">setTitle</el-button>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="setContent">setContent</el-button>
      </el-col>
    </el-row>
    <show-code codename="Globalmethod" />
  </div>
</template>

<script>
import showCode from '../../components/show-code.vue';
export default {
  components: { showCode },
  data() {
    return {
      width: 300,
      height: 200,
      visible1: false,
      layer1: undefined,
      activeName: "first",
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄",
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄",
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄",
        },
      ],
      index: 1,
    };
  },
  methods: {
    resizing(e, w, h) {
      this.width = w;
      this.height = h;
    },
    open1() {
      this.layer1 = this.$layer({
        id: "this.layer1",
        settop:true,
        maxmin: [1, 1],
        destroyOnClose: true,
        success: (el, index) => {
          this.$layer.setContent(index, `点击close(${index})关闭窗口`);
          this.$message.success("窗口编号:" + index);
        },
        cancel: () => {
          this.layer1 = undefined;
        },
      });
    },
    async close1() {
      if (this.layer1) {
        await this.$layer.close(this.layer1);
      } else {
        this.$message.error("窗口不存在");
      }
    },
    handleClick() {
      this.$nextTick(() => {
        this.$layer.reloadAutoArea("reloadAutoArea");
      });
    },
    async full() {
      await this.open1();
      this.$layer.full("this.layer1");
    },
    async min() {
      await this.open1();
      this.$layer.min("this.layer1");
    },
    async openAgain() {
      if (this.index<0 || this.index >= this.$layer.o.instances.length) {
        this.$message.error(this.index+ "号窗口不存在");
      } else {
        const a = await this.$layer.openAgain(this.index);
        if (!a) {
          this.$message.error(this.index+ "号窗口已经打开");
        }
      }
    },
    setTitle() {
      const title = "秒后关闭";
      let num = 5;
      this.$layer({
        title: num + title,
        success: (_, index) => {
          this.timer1 = setInterval(() => {
            num--;
            this.$layer.setTitle(index, num + title);
            if (num === 0) {
              this.$layer.close(index);
            }
          }, 1000);
        },
        end: () => {
          clearInterval(this.timer1);
        },
      });
    },
    setContent() {
      const title = "秒后关闭";
      let num = 5;
      this.$layer({
        content: num + title,
        success: (_, index) => {
          this.timer2 = setInterval(() => {
            num--;
            if (num < 1) {
              this.$layer.close(index);
            } else {
              this.$layer.setContent(index, num + title);
            }
          }, 1000);
        },
        end: () => {
          clearInterval(this.timer2);
        },
      });
    },
  },
};
</script>

<style></style>
