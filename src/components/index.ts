import Vue from 'vue';
import { PluginObject } from 'vue';

import AccordionGroupPlugin from './accordion-group/accordion-group';
import AccordionPlugin from './accordion/accordion';
import BulletListPlugin from './bullet-list/bullet-list';
import ButtonPlugin from './button/button';
import ButtonGroupPlugin from './button-group/button-group';
import CheckboxPlugin from './checkbox/checkbox';
import DatepickerPlugin from './datepicker/datepicker';
import DialogPlugin from './dialog/dialog';
import DropdownPlugin from './dropdown/dropdown';
import DropdownItemPlugin from './dropdown-item/dropdown-item';
import DynamicTemplatePlugin from './dynamic-template/dynamic-template';
import I18nPlugin from './i18n/i18n';
import IconPlugin from './icon/icon';
import LimitTextPlugin from './limit-text/limit-text';
import LinkPlugin from './link/link';
import MessagePlugin from './message/message';
import ModalPlugin from './modal/modal';
import NavBarPlugin from './nav-bar/nav-bar';
import NavBarItemPlugin from './nav-bar-item/nav-bar-item';
import OptionsMenuPlugin from './options-menu/options-menu';
import OptionsMenuItemPlugin from './options-menu-item/options-menu-item';
import PanelPlugin from './panel/panel';
import PopperPlugin from './popper/popper';
import RadioPlugin from './radio/radio';
import RadioGroupPlugin from './radio-group/radio-group';
import SelectPlugin from './select/select';
import SidebarPlugin from './sidebar/sidebar';
import SliderPlugin from './slider/slider';
import SpinnerPlugin from './spinner/spinner';
import StatusList from './status-list/status-list';
import StepPlugin from './step/step';
import SwitchPlugin from './switch/switch';
import TabPanePlugin from './tab-pane/tab-pane';
import TablePlugin from './table/table';
import TabsPlugin from './tabs/tabs';
import Template from './template/template';
import TextFieldPlugin from './text-field/text-field';
import TimepickerPlugin from './timepicker/timepicker';
import UploadPlugin from './upload/upload';
import UploadInputPlugin from './upload-input/upload-input';
import UploadDragdropPlugin from './upload-dragdrop/upload-dragdrop';
import UploadFileslistPlugin from './upload-fileslist/upload-fileslist';
import ValidationMessagePlugin from './validation-message/validation-message';

const ComponentsPlugin: PluginObject<any> = {
    install(v, options) {
        Vue.use(AccordionGroupPlugin);
        Vue.use(AccordionPlugin);
        Vue.use(ButtonPlugin);
        Vue.use(ButtonGroupPlugin);
        Vue.use(CheckboxPlugin);
        Vue.use(DatepickerPlugin);
        Vue.use(DialogPlugin);
        Vue.use(DropdownPlugin);
        Vue.use(DropdownItemPlugin);
        Vue.use(DynamicTemplatePlugin);
        Vue.use(I18nPlugin);
        Vue.use(IconPlugin);
        Vue.use(LimitTextPlugin);
        Vue.use(LinkPlugin);
        Vue.use(BulletListPlugin);
        Vue.use(MessagePlugin);
        Vue.use(ModalPlugin);
        Vue.use(NavBarPlugin);
        Vue.use(NavBarItemPlugin);
        Vue.use(OptionsMenuPlugin);
        Vue.use(OptionsMenuItemPlugin);
        Vue.use(PanelPlugin);
        Vue.use(PopperPlugin);
        Vue.use(RadioPlugin);
        Vue.use(RadioGroupPlugin);
        Vue.use(SelectPlugin);
        Vue.use(SidebarPlugin);
        Vue.use(SliderPlugin);
        Vue.use(SpinnerPlugin);
        Vue.use(StatusList);
        Vue.use(StepPlugin);
        Vue.use(SwitchPlugin);
        Vue.use(TabPanePlugin);
        Vue.use(TablePlugin);
        Vue.use(TabsPlugin);
        Vue.use(Template);
        Vue.use(TextFieldPlugin);
        Vue.use(TimepickerPlugin);
        Vue.use(UploadPlugin);
        Vue.use(UploadInputPlugin);
        Vue.use(UploadDragdropPlugin);
        Vue.use(UploadFileslistPlugin);
        Vue.use(ValidationMessagePlugin);
    }
};

export default ComponentsPlugin;
