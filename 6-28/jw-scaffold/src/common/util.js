/**
 * 工具箱
 * 
 * @author gill
 * @date 2018-05-08
 */

import cookie from 'jw_common/cookie'
import lodash from 'lodash'
import dayjs from 'dayjs'

let cascade = function(arr,idField,parentField,rootNodeValue) {
  let children = _.filter(arr,(n) => { 
    return n[parentField] === rootNodeValue 
  })
  
  _.each(children,(n) => {
    n.children = cascade(arr, idField, parentField, n[idField])
  })
  
  return children
}

export default {
  
  dayjs,
  cascade,
  isIE9() {
    
    return /MSIE 9.0;/.test(window.navigator.userAgent)
  },

  jumpToLogin() {

    window.location.href = `${Jw.login}/index.html?redirect_url=${window.location.href}`
  },

  download(url,query) {
    let queryArr = []
    let frmDownloadDom = document.querySelector('#frm-download')

    query = query || {}
    query.access_token = cookie.getAuth()
    _.each(query,(val,attr)=>{
      queryArr.push(`${attr}=${val}`)
    })

    frmDownloadDom.setAttribute('src', `${url}?${queryArr.join('&')}`)
    frmDownloadDom.onload = function() {
      try {
        let doc = frmDownloadDom.contentDocument? frmDownloadDom.contentDocument : frmDownloadDom.document
        let response = doc.body && doc.body.innerHTML
        let result = JSON.parse(response)
  
        if( result && result.message && result.code !== 0) {
          Vue.prototype.$error(result.message)
        }
      }catch(e) {

        console.log('download fail')
      }
    }
  },

  getUrlHash() {

    let hash = window.location.hash
    return hash.replace('#/','')
  },

  copy(value) {
    let copyState
    let input = document.createElement("input")

    input.setAttribute('value', value)
    input.setAttribute('class', 'out-of-body')

    document.body.appendChild(input)
    input.select()
    copyState = document.execCommand('copy')
    document.body.removeChild(input)
    return copyState
  },

  getPanelTitle(code,menu) {
    let title = []
    let path = ''

    _.each(menu,(menuItem)=>{

      if(menuItem.code === code) {
        title.push(menuItem.name)
        path = menuItem.path
      }else{

        if(_.isArray(menuItem.children) && menuItem.children.length) {
          _.each(menuItem.children,(menuItemChild)=>{
            if(menuItemChild.code === code) {
              title = title.concat([menuItem.name, menuItemChild.name])
              path = menuItemChild.path
            }
          })
        }
      }
    })

    return { title,path }
  }
}
