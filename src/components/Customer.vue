<template>
  <div>
    <el-button type="primary" @click="addDialogVisible = true"
      >添加客户</el-button
    >

    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="ID" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.id }}</span>
        </template>
      </el-table-column>

      <el-table-column label="姓名" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.username }}</span>
        </template>
      </el-table-column>

      <el-table-column label="工作" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.jobs }}</span>
        </template>
      </el-table-column>

      <el-table-column label="电话" width="180">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.phone }}</span>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加客户的对话框 -->
    <el-dialog
      title="添加客户"
      :visible.sync="addDialogVisible"
      width="50%"
      @close="addDialogClosed"
    >
      <!-- 内容主体区 -->
      <!-- 
         :model="addForm" 数据绑定对象
         :rules="addFormRules" 表单验证对象
         ref="ruleForm" 引用验证对象
       -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
      >
        <!-- prop="username" 具体校验规则 -->
        <!-- v-model="addForm.username" 数据绑定 -->
        <el-form-item label="id">
          <el-input v-model="addForm.id" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="工作" prop="jobs">
          <el-input v-model="addForm.jobs"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 修改用户的对话框 -->
    <el-dialog
      title="修改客户"
      :visible.sync="editDialogVisible"
      width="50%"
      @close="editDialogClosed"
    >
      <el-form
        :model="editForm"
        :rules="editFormRules"
        ref="editFormRef"
        label-width="70px"
      >
        <el-form-item label="id">
          <el-input v-model="editForm.id" disabled></el-input>
        </el-form-item>

        <el-form-item label="用户名" prop="username">
          <el-input v-model="editForm.username"></el-input>
        </el-form-item>

        <el-form-item label="工作" prop="jobs">
          <el-input v-model="editForm.jobs"></el-input>
        </el-form-item>

        <el-form-item label="手机号" prop="phone">
          <el-input v-model="editForm.phone"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>

        <el-button type="primary" @click="editUserInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 验证手机的规则
    var checkMobile = (rule, value, cb) => {
      // 验证手机号的正则表达式
      const regMobile = /^(?:(?:\+|00)86)?1\d{10}$/;

      if (regMobile.test(value)) {
        return cb();
      }
      cb(new Error("请输入合法手机号"));
    };

    return {
      //控制添加客户对话框的显示与隐藏
      addDialogVisible: false,

      // 添加客户的表单数据对象
      addForm: {
        username: "",
        jobs: "",
        phone: "",
      },

      // 添加客户表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3~10个字符之间",
            trigger: "blur",
          },
        ],
        jobs: [{ required: true, message: "请输入工作", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },



      // 控制修改客户对话框的显示与隐藏
      editDialogVisible: false,

      // 查询到单个客户信息
      editForm: {},

      // 修改单个客户规则
      editFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "用户名长度在3~10个字符之间",
            trigger: "blur",
          },
        ],
        jobs: [{ required: true, message: "请输入工作", trigger: "blur" }],
        phone: [
          { required: true, message: "请输入手机号", trigger: "blur" },
          { validator: checkMobile, trigger: "blur" },
        ],
      },

      // 客户列表数据对象
      tableData: [],
    };
  },

  created() {
    this.gitCustomer();
  },

  methods: {
    // 获取客户列表
    gitCustomer() {
      this.$http({
        url: "/selectall",
        method: "get",
      })
        .then((res) => {
          this.tableData = res.data;
          console.log(res.data);
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 监听修改客户数据对话框关闭事件
    editDialogClosed() {
      this.$refs.editFormRef.resetFields();
    },

    // 通过 ID 展示单个客户信息
    async showEditDialog(id) {
      console.log(id);
      this.$http({
        url: "/info",
        method: "get",
        params: {
          id: id,
        },
      })
        .then((res) => {
          this.editForm = res.data;
          this.editDialogVisible = true;
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },

    editUserInfo() {
      this.$refs.editFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;

        // 发起修改客户信息的数据请求
        this.$http({
          url: "/update",
          method: "put",
          data: this.editForm,
        })
          .then((res) => {
            console.log(res.data);
            // 更新数据
            this.gitCustomer();
          })
          .catch((err) => {
            console.log(err);
          });
        // 关闭对话框
        this.editDialogVisible = false;
      });
    },

    // 修该指定客户信息
    handleEdit(index, row) {
      this.showEditDialog(row.id);
      console.log(row);
    },

    // 删除指定客户
    handleDelete(index, row) {
      this.$http({
        url: "/delete",
        method: "delete",
        data: {
          id: row.id,
        },
      })

        .then((res) => {
          console.log(res.data);
          // 更新数据
          this.gitCustomer();
        })
        .catch((err) => {
          console.log(err);
        });
    },

    // 监听添加客户对话框事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields();
    },

    // 点击按钮添加客户
    addUser() {
      this.$refs.addFormRef.validate(async (valid) => {
        // console.log(valid);
        if (!valid) return;
        // 可以发起网络请求
        this.$http({
          url: "/add",
          method: "post",
          data: this.addForm,
        })
          .then((res) => {
            // 更新数据
            this.gitCustomer();
            console.log(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
        // 关闭对话框
        this.addDialogVisible = false;
      });
    },
  },
};
</script>
