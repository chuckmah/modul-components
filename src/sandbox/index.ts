import Vue, { PluginObject } from 'vue';

import AccordionGroupSandboxPlugin from '../components/accordion-group/accordion-group.sandbox';
import AccordionSandboxPlugin from '../components/accordion/accordion.sandbox';
import ButtonGroupSandboxPlugin from '../components/button-group/button-group.sandbox';
import ButtonSandboxPlugin from '../components/button/button.sandbox';
import CarouselItemSandboxPlugin from '../components/carousel-item/carousel-item.sandbox';
import CarouselSandboxPlugin from '../components/carousel/carousel.sandbox';
import CheckboxSandboxPlugin from '../components/checkbox/checkbox.sandbox';
import DatefieldsSandboxPlugin from '../components/datefields/datefields.sandbox';
import DatepickerSandboxPlugin from '../components/datepicker/datepicker.sandbox';
import DialogSandboxPlugin from '../components/dialog/dialog.sandbox';
import DropdownGroupSandboxPlugin from '../components/dropdown-group/dropdown-group.sandbox';
import DropdownItemSandboxPlugin from '../components/dropdown-item/dropdown-item.sandbox';
import DropdownSandboxPlugin from '../components/dropdown/dropdown.sandbox';
import DynamicTemplateSandboxPlugin from '../components/dynamic-template/dynamic-template.sandbox';
import ErrorAccessDeniedSandboxPlugin from '../components/error-access-denied/error-access-denied.sandbox';
import ErrorBrowserNotSupportedSandboxPlugin from '../components/error-browser-not-supported/error-browser-not-supported.sandbox';
import ErrorConfigNotSupportedSandboxPlugin from '../components/error-config-not-supported/error-config-not-supported.sandbox';
import ErrorCookiesNotSupportedSandboxPlugin from '../components/error-cookies-not-supported/error-cookies-not-supported.sandbox';
import ErrorMessageSandboxPlugin from '../components/error-message/error-message.sandbox';
import ErrorPageNotFoundSandboxPlugin from '../components/error-page-not-found/error-page-not-found.sandbox';
import ErrorTechnicalDifficultySandboxPlugin from '../components/error-technical-difficulty/error-technical-difficulty.sandbox';
import ErrorTemplateSandBoxPlugin from '../components/error-template/error-template.sandbox';
import FileSelectSandboxPlugin from '../components/file-select/file-select.sandbox';
import FileUploadSandboxPlugin from '../components/file-upload/file-upload.sandbox';
import FlexTemplateSandboxPlugin from '../components/flex-template/flex-template.sandbox';
import I18nSandboxPlugin from '../components/i18n/i18n.sandbox';
import IconButtonSandboxPlugin from '../components/icon-button/icon-button.sandbox';
import IconFileSandboxPlugin from '../components/icon-file/icon-file.sandbox';
import IconSandboxPlugin from '../components/icon/icon.sandbox';
import InplaceEditSandboxPlugin from '../components/inplace-edit/inplace-edit.sandbox';
import InputStyleSandboxPlugin from '../components/input-style/input-style.sandbox';
import LimitTextSandboxPlugin from '../components/limit-text/limit-text.sandbox';
import LinkSandboxPlugin from '../components/link/link.sandbox';
import ListItemSandboxPlugin from '../components/list-item/list-item.sandbox';
import MenuSandboxPlugin from '../components/menu/menu.sandbox';
import MessageSandboxPlugin from '../components/message/message.sandbox';
import ModalSandboxPlugin from '../components/modal/modal.sandbox';
import NavbarItemSandboxPlugin from '../components/navbar-item/navbar-item.sandbox';
import NavbarSandboxPlugin from '../components/navbar/navbar.sandbox';
import OptionSandboxPlugin from '../components/option/option.sandbox';
import PageNotFoundSandboxPlugin from '../components/page-not-found/page-not-found.sandbox';
import PanelSandboxPlugin from '../components/panel/panel.sandbox';
import PhoneNumberSandboxPlugin from '../components/phone-number/phone-number.sandbox';
import PopperSandboxPlugin from '../components/popper/popper.sandbox';
import PopupSandboxPlugin from '../components/popup/popup.sandbox';
import ProgressSandboxPlugin from '../components/progress/progress.sandbox';
import RadioGroupSandboxPlugin from '../components/radio-group/radio-group.sandbox';
import RadioStyleSandboxPlugin from '../components/radio-style/radio-style.sandbox';
import RadioSandboxPlugin from '../components/radio/radio.sandbox';
import RichTextSandBoxPlugin from '../components/rich-text/rich-text.sandbox';
import ScrollTopSandboxPlugin from '../components/scroll-top/scroll-top.sandbox';
import SessionExpiredSandboxPlugin from '../components/session-expired/session-expired.sandbox';
import SidebarSandboxPlugin from '../components/sidebar/sidebar.sandbox';
import SliderSandboxPlugin from '../components/slider/slider.sandbox';
import SpinnerSandboxPlugin from '../components/spinner/spinner.sandbox';
import StatusSandboxPlugin from '../components/status/status.sandbox';
import StepSandboxPlugin from '../components/step/step.sandbox';
import SteppersItemSandboxPlugin from '../components/steppers-item/steppers-item.sandbox';
import SteppersSandboxPlugin from '../components/steppers/steppers.sandbox';
import SwitchSandboxPlugin from '../components/switch/switch.sandbox';
import TabPanelSandboxPlugin from '../components/tab-panel/tab-panel.sandbox';
import TabsSandboxPlugin from '../components/tabs/tabs.sandbox';
import TemplateSandboxPlugin from '../components/template/template.sandbox';
import TextareaSandboxPlugin from '../components/textarea/textarea.sandbox';
import TextfieldSandboxPlugin from '../components/textfield/textfield.sandbox';
import TimepickerSandboxPlugin from '../components/timepicker/timepicker.sandbox';
import TooltipSandboxPlugin from '../components/tooltip/tooltip.sandbox';
import ValidationMessageSandboxPlugin from '../components/validation-message/validation-message.sandbox';

const SandboxesPlugin: PluginObject<any> = {
    install(v, options): void {
        Vue.use(AccordionGroupSandboxPlugin);
        Vue.use(AccordionSandboxPlugin);
        Vue.use(ButtonSandboxPlugin);
        Vue.use(ButtonGroupSandboxPlugin);
        Vue.use(CarouselSandboxPlugin);
        Vue.use(CarouselItemSandboxPlugin);
        Vue.use(CheckboxSandboxPlugin);
        Vue.use(DatefieldsSandboxPlugin);
        Vue.use(DatepickerSandboxPlugin);
        Vue.use(DialogSandboxPlugin);
        Vue.use(DropdownSandboxPlugin);
        Vue.use(DropdownItemSandboxPlugin);
        Vue.use(DropdownGroupSandboxPlugin);
        Vue.use(DynamicTemplateSandboxPlugin);
        Vue.use(ErrorAccessDeniedSandboxPlugin);
        Vue.use(ErrorBrowserNotSupportedSandboxPlugin);
        Vue.use(ErrorConfigNotSupportedSandboxPlugin);
        Vue.use(ErrorCookiesNotSupportedSandboxPlugin);
        Vue.use(ErrorMessageSandboxPlugin);
        Vue.use(ErrorPageNotFoundSandboxPlugin);
        Vue.use(ErrorTechnicalDifficultySandboxPlugin);
        Vue.use(ErrorTemplateSandBoxPlugin);
        Vue.use(FileSelectSandboxPlugin);
        Vue.use(FileUploadSandboxPlugin);
        Vue.use(FlexTemplateSandboxPlugin);
        Vue.use(I18nSandboxPlugin);
        Vue.use(IconSandboxPlugin);
        Vue.use(IconFileSandboxPlugin);
        Vue.use(IconButtonSandboxPlugin);
        Vue.use(InplaceEditSandboxPlugin);
        Vue.use(InputStyleSandboxPlugin);
        Vue.use(LimitTextSandboxPlugin);
        Vue.use(LinkSandboxPlugin);
        Vue.use(ListItemSandboxPlugin);
        Vue.use(MessageSandboxPlugin);
        Vue.use(ModalSandboxPlugin);
        Vue.use(NavbarSandboxPlugin);
        Vue.use(NavbarItemSandboxPlugin);
        Vue.use(MenuSandboxPlugin);
        Vue.use(OptionSandboxPlugin);
        Vue.use(PageNotFoundSandboxPlugin);
        Vue.use(PanelSandboxPlugin);
        Vue.use(PhoneNumberSandboxPlugin);
        Vue.use(PopperSandboxPlugin);
        Vue.use(ProgressSandboxPlugin);
        Vue.use(PopupSandboxPlugin);
        Vue.use(RadioSandboxPlugin);
        Vue.use(RadioGroupSandboxPlugin);
        Vue.use(RadioStyleSandboxPlugin);
        Vue.use(RichTextSandBoxPlugin);
        Vue.use(ScrollTopSandboxPlugin);
        Vue.use(SessionExpiredSandboxPlugin);
        Vue.use(SidebarSandboxPlugin);
        Vue.use(SliderSandboxPlugin);
        Vue.use(SpinnerSandboxPlugin);
        Vue.use(StatusSandboxPlugin);
        Vue.use(StepSandboxPlugin);
        Vue.use(SteppersSandboxPlugin);
        Vue.use(SteppersItemSandboxPlugin);
        Vue.use(SwitchSandboxPlugin);
        Vue.use(TabPanelSandboxPlugin);
        Vue.use(TabsSandboxPlugin);
        Vue.use(TemplateSandboxPlugin);
        Vue.use(TextareaSandboxPlugin);
        Vue.use(TextfieldSandboxPlugin);
        Vue.use(TimepickerSandboxPlugin);
        Vue.use(TooltipSandboxPlugin);
        Vue.use(ValidationMessageSandboxPlugin);
    }
};

export default SandboxesPlugin;
