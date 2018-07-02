<script>

export default {
  props: {
    type: String,
    data: {},
    action: {
      type: String,
      required: true
    },
    name: {
      type: String,
      default: 'file'
    },
    withCredentials: Boolean,
    accept: String,
    onStart: Function,
    onProgress: Function,
    onSuccess: Function,
    onError: Function,
    beforeUpload: Function,
    onPreview: {
      type: Function,
      default: function() {}
    },
    onRemove: {
      type: Function,
      default: function() {}
    },
    headers: Object,
    drag: Boolean,
    listType: String,
    disabled: Boolean,
    limit: Number,
    onExceed: Function
  },

  data() {
    return {
      mouseover: false,
      domain: '',
      file: null,
      submitting: false
    };
  },

  methods: {
    onload(data) {
      let iframe = this.$refs.iframe;

      try {
        let doc = iframe.contentDocument? iframe.contentDocument : frame.document;
        let response = doc.body && doc.body.innerHTML;
        let result = JSON.parse(response);

        if(_.isArray(result) && result.length) {
           this.onSuccess({ result }, this.file);
        }else{
          this.onError({ result },this.file);
        }
        this.submitting = false;
        this.file = null;
      }catch(err) {
        //console.log(err)
      } 
    },
    isImage(str) {
      return str.indexOf('image') !== -1;
    },
    handleClick(e) {
      if (this.disabled) {
        e.preventDefault();
      }
    },
    handleChange(ev) {
      const file = ev.target.value;
      if (file) {
        if(_.isFunction(this.beforeUpload)) {
          if(this.beforeUpload(file)) {
            this.uploadFiles(file);
          }
        }else{
          this.uploadFiles(file);
        }
      }
    },
    uploadFiles(file) {
      if (this.limit && this.$parent.uploadFiles.length + 1 > this.limit) {
        this.onExceed && this.onExceed(this.fileList);
        return;
      }

      if (this.submitting) return;
      this.submitting = true;
      this.file = file;
      this.onStart(file);

      const formNode = this.getFormNode();
      const dataSpan = this.getFormDataNode();
      let data = this.data;
      if (typeof data === 'function') {
        data = data(file);
      }
      const inputs = [];
      for (const key in data) {
        if (data.hasOwnProperty(key)) {
          inputs.push(`<input name="${key}" value="${data[key]}"/>`);
        }
      }
      dataSpan.innerHTML = inputs.join('');
      formNode.submit();
      dataSpan.innerHTML = '';
    },
    getFormNode() {
      return this.$refs.form;
    },
    getFormDataNode() {
      return this.$refs.data;
    },
    formatAction() {
      let headers = this.headers
      let argusArr = []

      _.each(headers,(val,attr)=>{
        argusArr.push(`${attr}=${val}`)
      })

      return this.action + '?' + argusArr.join('&')
    }
  },

  created() {
    this.frameName = 'frame-' + Date.now();
    this.uploadId = 'upload-' + Date.now();
  },

  render(h) {
    const {
      //drag,
      uploadFiles,
      listType,
      frameName,
      disabled
    } = this;
    const oClass = { 'el-upload': true, 'ie-fix': true };
    oClass[`el-upload--${listType}`] = true;

    return (
      <div class={oClass}>
        <iframe
          src={ /^https/i.test(window.location.href || '') ? 'javascript:false' : 'about:blank' }
          on-load={this.onload}
          ref="iframe"
          name={frameName}>
        </iframe>
        <form ref="form" action={this.formatAction()} target={frameName} enctype="multipart/form-data" method="POST">
          <input
            class="el-upload__input"
            type="file"
            ref="input"
            name="file"
            id={this.uploadId}
            on-change={this.handleChange}
            accept={this.accept}>
          </input>
          <span ref="data"></span>
        </form>
        <label class="upload-btn" onClick={this.handleClick} for={this.uploadId}>
        { this.$slots.default }
        </label>
      </div>
    );
  }
};
</script>

