<template>
    <div class="app-container"><!--IP管理-->
      <div class="button_ipConfig">
        <p class="button_ipConfig_title_p"><span class="ipConfig_input_span_name">IP地址：&nbsp;&nbsp;</span><el-input  v-model="listQuery.title" class="filter-item" placeholder="请输入IP地址" /></p>
        <p class="button_ipConfig_title_p"><span class="ipConfig_input_span_date">&nbsp;&nbsp;创建日期：</span><el-date-picker  format="yyyy/ MM / dd" v-model="value1" type="date" placeholder="年/月/日"></el-date-picker></p>
      </div>
      <div class="button_title">
       <el-button type="primary" class="ipConfig_button"  size="mini" >查询</el-button><!--icon="el-icon-search"icon="el-icon-edit"-->
       <el-button type="primary" class="ipConfig_button"  @click="showdialogpv('add')" size="mini">新增</el-button>
       <el-button type="primary" class="ipConfig_button"  @click="showdialogpv('updata')" size="mini">修改</el-button>
      </div>
      <div class="ipConfig_table">
        <el-table 
          :header-cell-style="tableHeaderColor"
          :cell-style="rowcellClass"
          :key="tableKey" 
          :data="list"  
          max-height="500"       
          highlight-current-row 
          @current-change="radioChanges"
          style="width: 100%;" 
          border>
          <el-table-column  width="50"  type="index">
            <template slot-scope="scope">
              <el-radio @change.native="getCurrentRow(scope.row)" :label="scope.row.id" v-model="radiochang" class="textRadio">&nbsp;</el-radio>
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
        </el-table>    
      </div>
      <div class="ipConfig_pagination">
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[25, 50, 100, 200]"
          :page-size="15"
          layout="total, sizes, prev, pager, next, jumper"
          :total="50">
        </el-pagination>
      </div>
       <el-dialog :visible.sync="dialogPvVisible" :title="textName" width="30%" class="ipConfig_dialog">
         <div  class="el-dialog__body">
          <p><span class="ipConfig_dialog_input_span_name"><span style="color:red">* </span>IP地址：</span><el-input  v-model="listQuery.title" style="width: 200px;" class="filter-item" /> </p>
          <p style="padding: 15px 0px;"> <span class="ipConfig_dialog_input_span_name">IP说明：</span><el-input  v-model="listQuery.title" style="width: 200px;"  type="textarea"   :autosize="{ minRows: 2}" class="filter-item"/></p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="dialogPvVisible = false" size="mini" >确 定</el-button>
            <el-button @click="dialogPvVisible = false" size="mini" >取 消</el-button>
        </span>
    </el-dialog>
    </div>
</template>

<script>
export default {
  name: 'ComplexTable',
  data() {
    return {
      textName:null,
      radiochang:null,
      table:{
        id:"序号",
        loginName:"IP地址",
        loginIP:"IP说明",
        IpAttribution:"修改人",
        IpRemark :"创建时间",
        LandingTime:"修改时间"
      },
      dialogPvVisible: false,
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
    showdialogpv(val){ // 对话框为新增还是修改  
       if(val==="add"){
          this.textName="新增";
       }else if(val==="updata"){
         if(!this.radiochang ||this.radiochang===null){
         this.$message({
          message: '请选择要修改的数据！',
          type: 'warning'
        });
         return
       }
          this.textName="修改";
       }
       this.dialogPvVisible = true
    },
    radioChanges(currentRow){ // 单选方法
      debugger
    //  this.$refs.singleTable.setCurrentRow(row);
      this.radiochang=currentRow.id;
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
    handleSizeChange(val) { // 每页多少条
      debugger
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      debugger
      console.log(`当前页: ${val}`);document
    },
    getCurrentRow(val){ // rideo选中方法
    debugger
      alert(val)
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
.button_ipConfig{
  height: 30px;
}
.button_ipConfig .el-input{
  width: 120px;
}
.button_title {
  width: 100%;
  height: 45px;
  text-align: right;
  line-height: 45px;
}
.ipConfig_input_span_name,.ipConfig_input_span_date{
  opacity: 0.8;font-size: 12px;
}
.button_ipConfig_title_p{
  width: 190px;
  float: left;
  margin-top: 5px;
}
.ipConfig_dialog_title{ // 取消按钮在右上角的样式，
  width: 75%;
  height: 28px;
  float: left;
  padding-left: 10px;
  padding-top: 8px;
}
.ipConfig_table{
  height: calc(100% - 120px);
}
.ipConfig_dialog_input_span_name{
  width: 20%;
  height: 30px;
  display: inline-block;
  text-align: right;
}
.ipConfig_pagination{
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
 .ipConfig_table .el-table td .cell{
  white-space: nowrap;
}
.ipConfig_dialog .el-dialog .el-dialog__header {
  padding: 10px;
  border-bottom: 1px solid #D7D7D7;
}
.button_ipConfig .el-input__icon {
  line-height: 26px !important;
}
.button_ipConfig .el-input__inner {
  height: 26px !important;
  line-height: 26px !important;
}
.ipConfig_dialog .el-dialog{
  margin-top: 30vh !important;
}
.ipConfig_dialog .el-dialog__body {
  text-align: -webkit-center;
  padding: 10px 20px 0px 20px;
}
.ipConfig_dialog .el-dialog__headerbtn{
  top: 12px;
}
.ipConfig_dialog .el-dialog__title{
 font-size: 14px;
}
.ipConfig_pagination .el-pagination__total,.ipConfig_pagination .el-pagination__sizes .el-input .el-input__inner,.ipConfig_pagination .el-pagination__jump{
font-size: 12px !important;
}
</style>

