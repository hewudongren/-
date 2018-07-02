/**
 * 注入项目中引用到element-ui组件
 *
 * @author gill
 * @date 2018-05-09 
 */

import i18nService from 'jw_services/i18n/index'
import Upload from 'jw_components/upload/index.js'
import InputFix from 'jw_components/input-fix.js'
import Switch from 'jw_components/switch'

import {
  Dialog,
  Tree,
  Button,
  Table,
  TableColumn,
  Pagination,
  Menu,
  Submenu,
  MenuItem,
  Header,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Row,
  Col,
  Select,
  Option,
  Steps,
  Step,
  Form,
  FormItem,
  Tabs,
  TabPane,
  Collapse,
  CollapseItem,
  Checkbox,
  Radio,
  Loading,
  Message,
  MessageBox,
  CheckboxGroup,
  Popover,
  
  // Autocomplete,
  // MenuItemGroup,
  // CheckboxButton,
  // InputNumber,
  // RadioGroup,
  // RadioButton,
  // ButtonGroup,
  // OptionGroup,
  DatePicker,
  // TimeSelect,
  // TimePicker,
  // Popover,
  // Tooltip,
  //  Breadcrumb,
  // BreadcrumbItem,
  // Tag,
  // Alert,
  // Slider,
  // Icon,
  // Progress,
  // Badge,
  // Card,
  // Rate,
  // Carousel,
  // CarouselItem,
  // Cascader,
  // ColorPicker,
  // Transfer,
  // Container,
  // Aside,
  // Main,
  // Footer,
  // Message,
  // Notification
} from 'element-ui'

let injectVuePlugin = (vue)=>{

  vue.use(Pagination)
  vue.use(Dialog)
  vue.use(Dropdown)
  vue.use(DropdownMenu)
  vue.use(DropdownItem)

  vue.use(Menu)
  vue.use(Submenu)
  vue.use(MenuItem)

  // Vue.use(Breadcrumb)
  // Vue.use(BreadcrumbItem)
  vue.use(DatePicker);

  //vue.use(Input)
  vue.use(Radio)
  vue.use(Checkbox)
  vue.use(Popover)
  vue.use(Select)
  vue.use(Option)
  vue.use(Button)
  vue.use(Table)
  vue.use(TableColumn)

  vue.use(Form)
  vue.use(FormItem)
  vue.use(Tabs)
  vue.use(TabPane)
  vue.use(Tree)
  vue.use(Row)
  vue.use(Col)
  vue.use(Steps)
  vue.use(Step)
  vue.use(Collapse)
  vue.use(CollapseItem)
  vue.use(Header)
  vue.use(CheckboxGroup)

  vue.component('el-switch',Switch)
  vue.component('el-upload',Upload)
  vue.component('el-input',InputFix)

  vue.use(Loading.directive)

  _.extend(vue.prototype, {
    _,
    $loading: Loading.service,
    
    $alert: (message,title)=>{
      let lang = i18nService.getOtherLanguageMap()

      return MessageBox.alert(message,title,{
        showCancelButton: true,
        confirmButtonText: lang["confirm"],
        cancelButtonText: lang["cancel"]
      })
    },

    $success(message) {
      Message.success(message)
    },

    $warning(message) {
      Message.warning(message)
    },

    $error(message) {
      Message.error(message)
    }
  })
}

export default injectVuePlugin