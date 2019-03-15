<template>
    <div class="app-container"><!--角色管理-->
      <div class="button_role">
        <el-row>
          <el-col :xs="9" :sm="6" :md="6" :lg="4"><p class="button_role_title_p"><span class="role_input_span_name">角色名称：</span><el-input  v-model="listQuery.title" class="filter-item" placeholder="请输入登录名" /></p></el-col>
          <el-col :xs="9" :sm="6" :md="6" :lg="4"><p class="button_role_title_p"><span class="role_input_span_name">权限名称：</span><el-input  v-model="listQuery.title" class="filter-item" placeholder="请输入登录名" /></p></el-col>
          <el-col :xs="9" :sm="6" :md="6" :lg="4"><p class="button_role_title_p"><span class="role_input_span_date">创建日期：</span><el-date-picker v-model="value1" format="yyyy/ MM / dd" type="date" placeholder="年/月/日"></el-date-picker></p></el-col>
          <el-col :xs="9" :sm="6" :md="6" :lg="4"><p class="button_role_title_p"><span class="role_input_span_name">启用状态：</span><el-input  v-model="listQuery.title" class="filter-item" placeholder="请输入登录名" /></p></el-col>
          <el-col :xs="0" :sm="0" :md="0" :lg="9"> </el-col>
        </el-row>
      </div>
      <div class="button_title">
        <el-button type="primary" class="role_button"  size="mini" >查询</el-button><!--icon="el-icon-search"icon="el-icon-edit" 查看角色详情-->
        <el-button type="primary" class="role_button"  size="mini"  @click="showroleDialogpv('startUsing')">启用</el-button>
        <el-button type="primary" class="role_button"  size="mini"  @click="showroleDialogpv('standUsing')">禁用</el-button>
        <el-button type="primary" class="role_button"  size="mini"  @click="roleAdd">新增</el-button>
        <el-button type="primary" class="role_button"  @click="roleUpdata" size="mini">修改</el-button>
        <el-button type="primary" class="role_button"  @click="roleAccredit" size="mini">授权</el-button>
        <el-button type="primary" class="role_button"  @click="roleAssigningUsers" size="mini">分配用户</el-button>
        <el-button type="primary" class="role_button"  size="mini" >查看角色详情</el-button>
      </div>  
      <div class="role_table">
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
          <el-table-column  width="50" type="index">
            <template slot-scope="scope">
              <el-radio :label="scope.row.id" v-model="role_table_rowDataId" class="textRadio">&nbsp;</el-radio>
            </template>
          </el-table-column>
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
           <el-table-column :label="table.LandingIp" property="LandingIp" align="center" :show-overflow-tooltip="true">          
          </el-table-column>  
           <el-table-column :label="table.startUsing" property="startUsing" width="80" align="center" :show-overflow-tooltip="true">          
          </el-table-column>  
           <el-table-column :label="table.remark" property="remark" align="center" :show-overflow-tooltip="true">          
          </el-table-column>  
        </el-table>    
      </div>
      <div class="role_pagination">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[25, 50, 100, 200]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="50">
        </el-pagination>
      </div>
<!--启用与禁用-->
      <el-dialog :visible.sync="startUsing_standUsing" :title="start.title_Name" width="24%" class="role_dialog">
          <div  class="el-dialog__body">    
           <p>是否确定{{start.title_Name}}角色<span style="color:red">“风控管理员”</span>？</p>   
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="startUsing_standUsing = false" size="mini" >确 定</el-button>
            <el-button @click="startUsing_standUsing = false" size="mini" >取 消</el-button>
        </span>
      </el-dialog>
 <!--新增-->
      <el-dialog :visible.sync="diialogAdd" title="新增" width="24%" class="role_dialog">
         <div  class="el-dialog__body">
          <p><span class="role_dialog_input_span_name"><span style="color:red">* </span> 角色名称：</span><el-input  v-model="listQuery.title" style="width: 170px;" class="filter-item" /> </p>
          <p style="padding: 6px 0px;"> <span class="role_dialog_input_span_name">启用状态：</span><el-input disabled="disabled" v-model="listQuery.title" style="width: 170px;" class="filter-item"/> </p>     
          <p> <span class="role_dialog_input_span_name">备注说明：</span><el-input  type="textarea"   :autosize="{ minRows: 2}"  v-model="listQuery.title" style="width: 170px;" class="filter-item" /></p>   
         
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="diialogAdd = false" size="mini" >确 定</el-button>
            <el-button @click="diialogAdd = false" size="mini" >取 消</el-button>
        </span>
      </el-dialog>
<!--修改-->
       <el-dialog :visible.sync="diialogUpdata" title="修改" width="24%" class="role_dialog">
         <div  class="el-dialog__body">
          <p><span class="role_dialog_input_span_name">&nbsp;角色ID：</span><el-input disabled="disabled"  v-model="listQuery.title" style="width: 170px;" class="filter-item" /> </p>
         <p><span class="role_dialog_input_span_name"><span style="color:red">* </span> 角色名称：</span><el-input  v-model="listQuery.title" style="width: 170px;" class="filter-item" /> </p>
         <p> <span class="role_dialog_input_span_name">备注说明：</span><el-input  type="textarea"   :autosize="{ minRows: 2}"  v-model="listQuery.title" style="width: 170px;" class="filter-item" /></p>   
         
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="diialogUpdata = false" size="mini" >确 定</el-button>
            <el-button @click="diialogUpdata = false" size="mini" >取 消</el-button>
        </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ComplexTable',
  data() {
    return {
      role_table_rowData:null, // 一行的数据
      role_table_rowDataId:null, // 单选选中的按钮id
      table:{
        id:"序号",
        loginName:"角色ID",
        loginIP:"角色名",
        IpAttribution:"人数",
        IpRemark :"是否启用",
        LandingTime:"创建时间",
        LandingIp:"修改时间",
        remark:"备注"
      },
      start:{
        title_Name:null,
        data_Name:null
      },
      startUsing_standUsing:false,// 弹框启用与禁用
      diialogAdd: false,// 弹框新增
      diialogUpdata: false,//弹框修改
       tableKey: 0,
        total: 0,
        value1:"",
       listQuery: { // 条件查询字段
        page: 1,
        limit: 20,
        importance: undefined,
        title: "aaa",
        type: "bbbtype",
        sort: '+id'
      },
      list:[
        {
        id:1,
        loginName:"boly",
        loginIP:"202.168.190.115",
        IpAttribution:"广东省广州市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 19:05:05",
      
      },
      {
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
      
      },
      {
        id:10,
        loginName:"ruffy10",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:11,
        loginName:"ruffy11",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:23,
        loginName:"ruffy23",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      },
      {
        id:24,
        loginName:"ruffy24",
        loginIP:"150.168.190.115",
        IpAttribution:"广东省中山市",
        IpRemark:"ddd",
        LandingTime:"2019-03-10 21:05:05",
      
      }
      ]
    }
  },
   methods: {
     showroleDialogpv(val){ // 对话框为新增还是修改  
        if(!this.role_table_rowDataId ||this.role_table_rowDataId===null){
         this.$message({
          message: '请选择一行数据！',
          type: 'warning'
        });
         return
       }

       if(val==="startUsing"){
          this.start.title_Name="启用";
       }else if(val==="standUsing"){
          this.start.title_Name="禁用";
       }
       this.start.data_Name =this.role_table_rowData.loginName;
       this.startUsing_standUsing = true
    },
     roleAdd(val){ // 新增的方法
     
      this.diialogAdd = true
    },
    roleUpdata(val){ // 修改的方法
      if(!this.role_table_rowDataId ||this.role_table_rowDataId===null){
        this.$message({
          message: '请选择要修改的数据！',
          type: 'warning'
        });
        return
      }
      this.diialogUpdata = true
    },
    roleAccredit(val){ // 授权的方法
      
    },
    roleAssigningUsers(val){ // 分配用户的方法
      
    },
    ChangesRowData(val){ // 选中一行数据的方法
      this.role_table_rowData = val;
      this.role_table_rowDataId=val.id;
      debugger
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
  
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.button_role{
  height: 30px; width:70%;
}
@media (min-width:700px) and (max-width:1400px){ // 1366*768的响应式布局
  .button_role{
    width:100%;
    height: auto;
  }
  .role_dialog_input_span_name{
    width: 30% !important;
  }
}

.button_role .el-input{
  width: 120px;
}
.button_title {
  width: 100%;
  height: 45px;
  text-align: right;
  line-height: 45px;
}
.role_input_span_name,.role_input_span_date{
  opacity: 0.8;font-size: 12px;
}
.button_role_title_p{
  width: 190px;
  float: left;
  margin-top: 5px;
}
.role_table{
  height: calc(100% - 120px);
}
.role_dialog_input_span_name{
  width: 20%;
  height: 30px;
  display: inline-block;
  text-align: right;
}
.role_pagination{
  width: 100%;
  overflow: hidden;
}
.el-table,.el-pagination,.el-pagination__total,.el-dialog__body{
  font-size: 12px;
}
.el-pagination__sizes .el-input .el-input__inner{
  font-size: 12px;
}
.el-button {
    margin-left: 3px;
}
</style>
<style>
.app-container {
  padding:5px 15px;
  height: 100%;
  font-size: 12px !important;
}
 .role_table .el-table td .cell{
  white-space: nowrap;
}
.role_dialog .el-dialog .el-dialog__header {
  padding: 10px;
  border-bottom: 1px solid #D7D7D7;
}
.button_role .el-input__icon {
  line-height: 26px !important;
}
.button_role .el-input__inner {
  height: 26px !important;
  line-height: 26px !important;
}
.role_dialog .el-dialog{
  margin-top: 30vh !important;
}
.role_dialog .el-dialog__body {
  text-align: -webkit-center;
  padding: 10px 20px;
}
.role_dialog .el-dialog__headerbtn{
  top: 12px;
}
.role_dialog .el-dialog__title{
 font-size: 14px;
}
.role_pagination .el-pagination__total,.role_pagination .el-pagination__sizes .el-input .el-input__inner,.role_pagination .el-pagination__jump{
font-size: 12px !important;
}
.el-table{
  z-index: 999;
}
</style>

