/**
 * 系统种子文件
 * 
 * @author gill
 * @date 2018-05-02
 */

(function () {

  /**
   * 解析页面中的meta标签，获取系统信息
   */    
  function initPageMetas() {
    var metas = document.getElementsByTagName('meta')
    var attr, value, meta, jwMeta
    var metaConfig = {}
    
    for(var i=0,len=metas.length;i<len;i++) {
      meta = metas[i]
      attr = meta.getAttribute('name')
      value = meta.getAttribute('content')
      jwMeta = meta.getAttribute('attr')

      if (jwMeta == "jw_meta" && typeof attr === 'string' && attr.length) {
        metaConfig[attr] = value
      }
    }

    window.Jw = metaConfig
  }

  function loadScript(url,callback) {
    var script = document.createElement('script')

    script.type = "text/javascript";
    script.async = true;
    script.src = url;

    script.onload = function() {
      callback()
    }

    document.body.appendChild(script);
  }

  function loadMultiScripts(scriptUrlArray,callback) {
    var count = 0
    var maxScriptCount = scriptUrlArray.length;
    var allLoadedHandler = function() {
      count++;

      if(maxScriptCount === count) {
        callback && callback()
      }
    }

    for(var i=0;i<maxScriptCount;i++) {
      loadScript(scriptUrlArray[i],allLoadedHandler)
    }
  }

  function loadJs() {
    var script = document.getElementById('__main_script_port__');
    var scriptList = script.getAttribute('script-list');

    scriptList = scriptList.split('|')
    loadMultiScripts(scriptList[0].split(','),function() {
      loadMultiScripts(scriptList[1].split(','),function() {

        if(typeof Jw.start === 'function') {
          Jw.start()
        }else{
          window.location.reload()
        }
      })
    })
  }

  initPageMetas();
  loadJs();
})()
