import { PluginObject } from 'vue';
import { ModulVue } from '../../utils/vue/vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './options-menu.html?style=./options-menu.scss';
import { OPTIONS_MENU_NAME } from '../component-names';
import PopupPlugin from '../popup/popup';
import I18nPlugin from '../i18n/i18n';
import { MPopperPlacement } from '../popper/popper';
import IconButtonPlugin from '../icon-button/icon-button';

export enum MOptionsMenuSkin {
    Light = 'light',
    Dark = 'dark'
}

@WithRender
@Component
export class MOptionsMenu extends ModulVue {

    @Prop({ default: MPopperPlacement.BottomStart })
    public placement: MPopperPlacement;
    @Prop({
        default: MOptionsMenuSkin.Light,
        validator: value => value == MOptionsMenuSkin.Light || value == MOptionsMenuSkin.Dark
    })
    public skin: MOptionsMenuSkin;
    @Prop()
    public disabled: boolean;
    @Prop({ default: '44px' })
    public size: string;

    private open = false;

    public close(): void {
        this.open = false;
    }

    protected mounted(): void {
        let containsIcon: boolean = false;
        let containsText: boolean = false;
        this.$children[0].$children.forEach((child) => {
            if (child.$refs['m-options-menu-item']) {
                containsIcon = child['hasIcon'];
                containsText = child['hasSlot'];
            }
        });
        // add classes for padding right of icon or left of text
        if (containsIcon ? !containsText : containsText) {
            this.$children[0].$children.forEach((child) => {
                if (child.$refs['m-options-menu-item']) {
                    if (!containsIcon) {
                        child.$refs['icon']['className'] += ' is-empty';
                    } else {
                        child.$refs['text']['className'] += ' is-empty';
                    }
                }
            });
        }
    }

    private onFocus(): void {
        console.log('focus');
    }

    private onBlur(): void {
        console.log('blur');
    }

    private onOpen(): void {
        this.$emit('open');
    }

    private onClose(): void {
        this.$emit('close');
    }
}

const MenuPlugin: PluginObject<any> = {
    install(v, options) {
        v.use(PopupPlugin);
        v.use(I18nPlugin);
        v.use(IconButtonPlugin);
        v.component(OPTIONS_MENU_NAME, MOptionsMenu);
    }
};

export default MenuPlugin;
