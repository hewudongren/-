/**
 *兼容IE9的upload
 *
 *@author gill gong
 */

import { Upload } from "element-ui";
import FrameUpload from "./iframe-upload.vue";

//兼容IE9
if(_.isUndefined(window.FormData)) {
  Upload.components.Upload = FrameUpload;
}

export default {

  mixins: [Upload],

  methods: {

    abort(file) {

      if(_.isFunction(this.$refs['upload-inner'].abort)) {
        this.$refs['upload-inner'].abort(file);
      }
    },

    getFile(rawFile) {
      let fileList = this.uploadFiles;
      let target;

      _.each(fileList,item => {
        if(typeof rawFile == "string") {
          target = rawFile === item.raw ? item : null
        }else{
          target = rawFile.uid === item.uid ? item : null;
        }

        return !target;
      });
      
      return target;
    },

    handleStart(rawFile) {
      let file
      let uid = Date.now() + this.tempIndex++;
      
      rawFile.uid = uid
      if (_.isString(rawFile)) {
        
        file = {
          status: "ready",
          name: rawFile,
          size: null,
          percentage: 0,
          uid: uid,
          raw: rawFile,
          url: ''
        }
      } else {
        
        file = {
          status: "ready",
          name: rawFile.name,
          size: rawFile.size,
          percentage: 0,
          uid: uid,
          raw: rawFile,
          url: URL.createObjectURL(rawFile)
        };
      }

      this.uploadFiles.push(file);
      this.onChange(file, this.uploadFiles);
    }
  }
};
