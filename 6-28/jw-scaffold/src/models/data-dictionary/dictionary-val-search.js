import languageSetModel from 'jw_models/header/language-set'
import AbstractModel from 'jw_models/abstract'
import inhert from 'jw_common/inherit'
import staticData from 'jw_common/data'

const URL = `${Jw.dict}/dictValueDefinition/searchByDictCode/`

let DictionaryValSearchModel = inhert(AbstractModel,{

  initialization() {
    this.type = 'get'
    this.query = {
      skip: 0,
      take: staticData.tablePageSize
    }
  },

  dataFormat(result) {
    let languageSet = languageSetModel.getResult()
    let rows = result.data

    _.each(rows,(row)=>{

      row.multiLanguageValue = _.filter(row.multiLanguageValue,(item)=>{

        return _.find(languageSet,(language,index)=>{

          if(item.languageCode === language.code) {
            row[`valueText_${index}`] = item.valueText
            return true
          }
        })
      })
    })

    return {
      rows,
      count: rows.length
    }
  },

  execute(urlSuffix,pageIndex) {

    if(_.isEmpty(urlSuffix)) {

      return Promise.resolve([])
    }

    this.url = URL + urlSuffix
    this.query.skip = (pageIndex - 1) * staticData.tablePageSize
    return this.exec()
  }
})

export default new DictionaryValSearchModel()