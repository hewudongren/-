
import Highcharts from 'highcharts'

import noDataDisplay from 'highcharts/modules/no-data-to-display'
import exporting from 'highcharts/modules/exporting'

noDataDisplay(Highcharts)
exporting(Highcharts)

// require('highcharts/modules/no-data-to-display')(Highcharts)
// require('highcharts/modules/exporting')(Highcharts)

window.Highcharts = Highcharts;

export default Highcharts;