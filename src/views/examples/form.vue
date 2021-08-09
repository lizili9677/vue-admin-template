<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="120px">
      <el-row>
        <el-col :span="12">
          <el-form-item label="企业名称" prop="corpName">
            <el-input
              v-model.trim="form.corpName"
              placeholder="请输入"
              style="width: 280px"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="社会信用代码" prop="corpCode">
            <el-input v-model.trim="form.corpCode" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="单位类型" prop="corpType">
            <el-select v-model="form.corpType" clearable style="width: 280px">
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="营业地址" prop="address">
            <el-input v-model.trim="form.address" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="注册地区" prop="areaCode">
            <el-select
              v-model="form.areaCode"
              clearable
              filterable
              style="width: 280px"
            >
              <el-option
                v-for="item in areaOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册日期" prop="registerDate">
            <el-date-picker
              v-model="form.registerDate"
              type="date"
              placeholder="选择日期"
              style="width: 280px"
              value-format="timestamp"
            />
          </el-form-item>
        </el-col>
        <el-col :span="12" />
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="法人姓名" prop="legalMan">
            <el-input v-model.trim="form.legalMan" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="注册资本(万元)" prop="regCapital">
            <el-input v-model.trim="form.regCapital" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row />
      <el-row>
        <el-col :span="12">
          <el-form-item label="联系人" prop="linkMan">
            <el-input v-model.trim="form.linkMan" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="联系方式" prop="linkPhone">
            <el-input v-model.trim="form.linkPhone" />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="备注" prop="remark">
            <el-input
              v-model="form.remark"
              type="textarea"
              placeholder="最多输入100字"
              :autosize="{ minRows: 2 }"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24" style="text-align: center">
          <el-button @click="handleCancel">取&nbsp;消</el-button>
          <el-button
            type="primary"
            :loading="loading"
            @click="handleSubmit"
          >确&nbsp;定</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import reg from '@/utils/validate'

export default {
  name: 'Demo',
  data() {
    return {
      form: {
        corpName: '',
        corpCode: '',
        corpType: '',
        areaCode: '',
        address: '',
        registerDate: 0,
        legalMan: '',
        regCapital: '',
        linkMan: '',
        linkPhone: '',
        remark: ''
      },
      areaOptions: [],
      typeList: [],
      loading: false,
      rules: {
        corpName: [
          { required: true, message: '请输入企业名称', trigger: 'blur' }
        ],
        areaCode: [
          { required: true, message: '请选择注册地区', trigger: 'blur' }
        ],
        corpCode: [
          { required: true, message: '请输入信用代码', trigger: 'blur' },
          { min: 18, max: 18, message: '请输入正确的信用代码', trigger: 'blur' }
        ],
        corpType: [{ required: true, message: '请选择单位类型' }],
        address: [
          { required: true, message: '请输入企业注册地址', trigger: 'blur' }
        ],
        registerDate: [{ required: true, message: '请选择注册日期' }],
        linkMan: [
          {
            pattern: reg.chineseName,
            message: '含有非法字符(只允许输入汉字和 · )'
          }
        ],
        linkPhone: [{ pattern: reg.mobile, message: '请输入有效的手机号码' }],
        regCapital: [{ pattern: reg.number, message: '请输入数字' }]
      }
    }
  },
  created() {
    const url = '/data.json'
    this.axios.get(url).then(res => {
      this.areaOptions = res.data.locationOptions
      this.typeList = res.data.corpTypeList
    })
  },
  methods: {
    handleSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$api.corp
            .createCorp(this.form)
            .then(res => {
              this.loading = false
              this.$nextTick(() => {
                this.$message({
                  message: '添加成功',
                  type: 'success',
                  duration: 5 * 1000
                })
                this.$refs.form.resetFields()
              })
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          return false
        }
      })
    },
    handleCancel() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped>
.app-container {
  width: 100% !important;
  display: -webkit-flex !important;
  justify-content: center !important;
  align-items: center !important;
}
</style>
