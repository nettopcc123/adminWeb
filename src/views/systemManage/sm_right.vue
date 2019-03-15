
<template>
<div class="app-container">

  <el-table
    :data="tableData"
    :row-style="tableRowStyle"
    :cell-style="tableCell"
    :cell-class-name="cellSet"
    :header-cell-style="tableHeaderColor">
    <el-table-column
      property="name"
      label="姓名"
      width="120">
    </el-table-column>
    <el-table-column
      property="age"
      label="年龄"
      width="120">
    </el-table-column>
    <el-table-column
      property="sex"
      label="性别"
      width="120">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
  name: 'ComplexTable',
  data() {
    return {
      tableData: [
        {
          name: 'Cindy',
          age: 20,
          sex: '女'
        },
        {
          name: 'Mila',
          age: 22,
          sex: '女'
        },
        {
          name: 'Bob',
          age: 23,
          sex: '男'
        }
      ]
    }
  },
  created() {},
  methods: {
    cellSet(rowIndex, columnIndex, row, column){
      console.log(JSON.stringify(rowIndex) + '---a')
    },
    tableCell(rowIndex, columnIndex, row, column){
      console.log(rowIndex.rowIndex)
      return 'background-color: #000; padding:0px'
  
    },
    // 修改table tr行的背景色
    tableRowStyle({ row, rowIndex }) {
      if(rowIndex == 1){
        return 'background-color: #f00'
      }else{
      return 'background-color: pink'
      }
    },
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return 'background-color: lightblue;color: #fff;font-weight: 500;'
      }
    }
  }
}
</script>
