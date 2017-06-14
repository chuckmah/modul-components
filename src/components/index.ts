import Vue from 'vue';
import { PluginObject } from 'vue';

import AccordionGroupPlugin from './accordion-group/accordion-group';
import AccordionPlugin from './accordion/accordion';
import ButtonPlugin from './button/button';
import CheckboxPlugin from './checkbox/checkbox';
import DialogPlugin from './dialog/dialog';
import DynamicTemplatePlugin from './dynamic-template/dynamic-template';
import IconPlugin from './icon/icon';
import I18nPlugin from './i18n/i18n';
import LinkPlugin from './link/link';
import ListBulletPlugin from './list-bullet/list-bullet';
import PanelPlugin from './panel/panel';
import StatusList from './status-list';
import TablePlugin from './table/table';
import TextIconPlugin from './text-icon/text-icon';
import MessagePlugin from './message/message';
import UploadPlugin from './upload/upload';
import PopperPlugin from './popper/popper';
import StepPlugin from './step/step';

const ComponentsPlugin: PluginObject<any> = {
    install(v, options) {
        Vue.use(AccordionGroupPlugin);
        Vue.use(AccordionPlugin);
        Vue.use(ButtonPlugin);
        Vue.use(CheckboxPlugin);
        Vue.use(DialogPlugin);
        Vue.use(DynamicTemplatePlugin);
        Vue.use(IconPlugin);
        Vue.use(I18nPlugin);
        Vue.use(LinkPlugin);
        Vue.use(ListBulletPlugin);
        Vue.use(PanelPlugin);
        Vue.use(StatusList);
        Vue.use(TablePlugin);
        Vue.use(TextIconPlugin);
        Vue.use(MessagePlugin);
        Vue.use(UploadPlugin);
        Vue.use(PopperPlugin);
        Vue.use(StepPlugin);
    }
};

export default ComponentsPlugin;
