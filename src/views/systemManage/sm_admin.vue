<template>
    <div class="app-container"><!--admin管理-->
      <div class="button_admin">
        <p class="button_admin_title_p"><span class="admin_input_span_name">登录名&nbsp;&nbsp;&nbsp;：</span><el-input  v-model="listQuery.title" class="filter-item" placeholder="请输入登录名" /></p>
        <p class="button_admin_title_p"><span class="admin_input_span_date">登录日期：</span><el-date-picker v-model="value1" format="yyyy/ MM / dd" type="date" placeholder="年/月/日"></el-date-picker></p>
      </div>
      <div class="button_title">
       <el-button type="primary" class="admin_button"  size="mini" >查询aa</el-button><!--icon="el-icon-search"icon="el-icon-edit"-->
       <el-button type="primary" class="admin_button"  @click="updatapws" size="mini">修改密码</el-button>
      </div>
      <!-- <el-row>
        <el-col :xs="1" :sm="3" :md="5" :lg="7" :xl="8"> 
          <div class="button_admin">
            <span class="admin_input_span_name">登录名：</span><el-input  v-model="listQuery.title" class="filter-item" placeholder="请输入登录名" /> 
            <span class="admin_input_span_date">登录日期：</span><el-date-picker v-model="value1" type="date" placeholder="选择日期"></el-date-picker>
          </div>
      </el-col>
      </el-row>
       <el-row >
        <el-col :xs="4"  :xl="20">
          <div class="button_title">
            <el-button type="primary" class="admin_button"  size="mini" >查询</el-button><!--icon="el-icon-search"icon="el-icon-edit"-->
            <!-- <el-button type="primary" class="admin_button"  @click="dialogPvVisible = true" size="mini">修改密码</el-button>
          </div>

        </el-col>     
      </el-row> -->
      <div class="admin_table">
        <el-table 
          :header-cell-style="tableHeaderColor"
          :cell-style="rowcellClass"
          :key="tableKey" 
          :data="list"  
          max-height="500"       
          highlight-current-row
           @current-change="ChangesRowData"
          style="width: 100%;" 
          border>     
          <el-table-column :label="table.id" prop="id" align="center" :show-overflow-tooltip="true" width="80">    <!-- sortable="custom"****升序降序-->          
          </el-table-column>
          <el-table-column :label="table.loginName" property="loginName" align="center" :show-overflow-tooltip="true">          
          </el-table-column>
          <el-table-column :label="table.loginIP" property="loginIP" align="center" :show-overflow-tooltip="true">          
          </el-table-column>
          <el-table-column :label="table.IpAttribution" property="IpAttribution" align="center" :show-overflow-tooltip="true">          
          </el-table-column>
          <el-table-column :label="table.IpRemark" property="IpRemark" align="center" :show-overflow-tooltip="true">          
          </el-table-column>
          <el-table-column :label="table.LandingTime" property="LandingTime" align="center" :show-overflow-tooltip="true">          
          </el-table-column>   
        </el-table>    
      </div>
      <div class="admin_pagination">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[25, 50, 100, 200]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="50">
        </el-pagination>
      </div>
       <el-dialog :visible.sync="dialogPvVisible" title="修改密码" width="30%" class="admin_dialog">
         <div  class="el-dialog__body">
          <p><span class="admin_dialog_input_span_name"><span style="color:red">* </span>原密码：</span><el-input  v-model="listQuery.title" style="width: 200px;" class="filter-item" /> </p>
          <p style="padding: 15px 0px;"> <span class="admin_dialog_input_span_name"><span style="color:red">* </span> 新密码：</span><el-input  v-model="listQuery.title" style="width: 200px;" class="filter-item"/> </p>
          <p> <span class="admin_dialog_input_span_name"><span style="color:red">* </span> 确认密码：</span><el-input  v-model="listQuery.title" style="width: 200px;" class="filter-item" /></p>        
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogPvVisible = false" size="mini" >确 定</el-button>
            <el-button @click="dialogPvVisible = false" size="mini" >取 消</el-button>
        </span>
    </el-dialog>
      <!-- <el-dialog  :visible.sync="dialogPvVisible" :show-close="false" width="30%" class="admin_dialog">      
        <div slot="title" >
          <span class="admin_dialog_title">修改密码(admin)</span>
          <span style="">
            <el-button type="primary" @click="dialogPvVisible = false" size="mini" >确 定</el-button>
            <el-button @click="dialogPvVisible = false" size="mini" >取 消</el-button>
          </span>
        </div>
        <div  class="el-dialog__body">
          <p><span class="admin_dialog_input_span_name">* 原密码：</span><el-input  v-model="listQuery.title" style="width: 200px;" class="filter-item" /> </p>
          <p style="padding: 15px 0px;"> <span class="admin_dialog_input_span_name">* 新密码：</span><el-input  v-model="listQuery.title" style="width: 200px;" class="filter-item"/> </p>
          <p> <span class="admin_dialog_input_span_name">* 确认密码：</span><el-input  v-model="listQuery.title" style="width: 200px;" class="filter-item" /></p>        
        </div>
      </el-dialog> -->





    </div>
</template>

<script>
export default {
  name: 'ComplexTable',
  data() {
    return {
      admin_table_rowData:null, // 一行的数据
      table:{
        id:"序号",
        loginName:"登录名",
        loginIP:"登录IP",
        IpAttribution:"IP归属地",
        IpRemark :"IP备注",
        LandingTime:"登陆时间"
      },
      dialogPvVisible: false,
       tableKey: 0,
        total: 0,
        value1:"",
       listQuery: { // 条件查询字 段 
        page: 1,
        limit: 20,
        importance: undefined,
        title: "aaa",
        type: "bbbtype",
        sort: '+id'
      },
      list:[{
        id:2,
        loginName:"ruffy11",
        loginIP:"150.168.190.115",
        IpAttribution:"山市广东省东省中山市广东省中山山市广东省东省中山市广东省中山市山市广东省东省中山市广东省中山市山市广东省东省中山市广东省中山市市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:3,
        loginName:"ruffy22",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:4,
        loginName:"ruffy33",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:5,
        loginName:"ruffy555",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:6,
        loginName:"ruffy666",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:7,
        loginName:"ruffy7777",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:8,
        loginName:"ruffy888",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:9,
        loginName:"ruffy999",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },{
        id:2,
        loginName:"ruffy11",
        loginIP:"150.168.190.115",
        IpAttribution:"山市广东省东省中山市广东省中山山市广东省东省中山市广东省中山市山市广东省东省中山市广东省中山市山市广东省东省中山市广东省中山市市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:3,
        loginName:"ruffy22",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:4,
        loginName:"ruffy33",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:5,
        loginName:"ruffy555",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:6,
        loginName:"ruffy666",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:7,
        loginName:"ruffy7777",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:8,
        loginName:"ruffy888",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:9,
        loginName:"ruffy999",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },]
    }
  },
   methods: {
    updatapws(val){ // 修改密码方法
      if(!this.admin_table_rowData ||this.admin_table_rowData===null){
        this.$message({
          message: '请选择要修改的数据！',
          type: 'warning'
        });
        return
      }
      this.dialogPvVisible = true
    },
    ChangesRowData(val){ // 选中一行的数据
      this.admin_table_rowData = val;
    },
    tableHeaderColor(){ // 修改row header的背景颜色与内边距
       return 'background-color: #F5F7FA; padding: 4px 0;text-align:center;'
    },
    rowcellClass(){ // 行的cell样式
      return 'padding:0;overflow: hidden !important;white-space: nowrap !important;word-break: keep-all !important;text-overflow: ellipsis !important;'
    },
    getList() { // 分页方法
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.items
        this.total = response.data.total

        // Just to simulate the time of the request
        setTimeout(() => {
          this.listLoading = false
        }, 1.5 * 1000)
      })
    },
    getListInfo () { // 获取列表
      
    },
    handleSizeChange(val) {
       debugger
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
       debugger
      console.log(`当前页: ${val}`);document
    },
   },
  created() {
  },
  mounted(){
  //  this.getdocumentheight() // 浏览器高度
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.button_admin{
  height: 30px;
}
.button_admin .el-input{
  width: 120px;
}
.button_title {
  width: 100%;
  height: 45px;
  text-align: right;
  line-height: 45px;
}
.admin_input_span_name,.admin_input_span_date{
  opacity: 0.8;font-size: 12px;
}
.button_admin_title_p{
  width: 190px;
  float: left;
  margin-top: 5px;
}
.admin_dialog_title{ // 取消按钮在右上角的样式，
  width: 75%;
  height: 28px;
  float: left;
  padding-left: 10px;
  padding-top: 8px;
}
.admin_table{
  height: calc(100% - 120px);
}
.admin_dialog_input_span_name{
  width: 20%;
  height: 30px;
  display: inline-block;
  text-align: right;
}
.admin_pagination{
  width: 100%;
  overflow: hidden;
}
.el-table,.el-pagination,.el-pagination__total,.el-dialog__body{
  font-size: 12px;
}
.el-pagination__sizes .el-input .el-input__inner{
  font-size: 12px;
}
</style>
<style>
.app-container {
  padding:5px 15px;
  height: 100%;
  font-size: 12px !important;
}
 .admin_table .el-table td .cell{
  white-space: nowrap;
}
.admin_dialog .el-dialog .el-dialog__header {
  padding: 10px;
  border-bottom: 1px solid #D7D7D7;
}
.button_admin .el-input__icon {
  line-height: 26px !important;
}
.button_admin .el-input__inner {
  height: 26px !important;
  line-height: 26px !important;
}
.admin_dialog .el-dialog{
  margin-top: 30vh !important;
}
.admin_dialog .el-dialog__body {
  text-align: -webkit-center;
  padding: 10px 20px 20px 20px;
}
.admin_dialog .el-dialog__headerbtn{
  top: 12px;
}
.admin_dialog .el-dialog__title{
 font-size: 14px;
}
.admin_pagination .el-pagination__total,.admin_pagination .el-pagination__sizes .el-input .el-input__inner,.admin_pagination .el-pagination__jump{
font-size: 12px !important;
}

</style>

