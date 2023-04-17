import {DashBoardPage} from '@/pages/DashBoardPage';
import {ExcelPage} from '@/pages/ExcelPage';
import {Router} from '@core/routes/Router';

import './scss/index.scss';

new Router('#app', {
    dashboard: DashBoardPage,
    excel: ExcelPage
})