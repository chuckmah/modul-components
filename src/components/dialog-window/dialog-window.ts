import { ModulVue } from '../../utils/vue/vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import WithRender from './dialog-window.html?style=../../mixins/base-window/base-window.scss';
import { Prop, Watch } from 'vue-property-decorator';
import { DIALOG_NAME } from '../component-names';
import { OpenTrigger, OpenTriggerMixin, OpenTriggerMixinImpl } from '../../mixins/open-trigger/open-trigger';
import { OpenTriggerHook, OpenTriggerHookMixin } from '../../mixins/open-trigger/open-trigger-hook';
import { MediaQueries, MediaQueriesMixin } from '../../mixins/media-queries/media-queries';
import uuid from '../../utils/uuid/uuid';

export enum MDialogSize {
    FullSize = 'full-size',
    Large = 'large',
    Default = 'default',
    Small = 'small'
}

@WithRender
@Component({
    mixins: [OpenTrigger, OpenTriggerHook, MediaQueries]
})
export class MDialog extends ModulVue implements OpenTriggerMixinImpl {
    @Prop({
        default: MDialogSize.Default,
        validator: value =>
            value == MDialogSize.Default ||
            value == MDialogSize.FullSize ||
            value == MDialogSize.Large ||
            value == MDialogSize.Small
    })
    public size: MDialogSize;

    @Prop({ default: true })
    public closeOnBackdrop: boolean;

    @Prop()
    public title: string;

    public handlesFocus(): boolean {
        return true;
    }

    public doCustomPropOpen(value: boolean): boolean {
        return false;
    }

    public hasBackdrop(): boolean {
        return true;
    }

    public getPortalElement(): HTMLElement {
        return this.$refs.article as HTMLElement;
    }

    private get hasDefaultSlot(): boolean {
        // todo: header or title?
        return !!this.$slots.default;
    }

    private get hasHeader(): boolean {
        return this.hasTitle || !!this.$slots.header;
    }

    private get hasTitle(): boolean {
        return !!this.title;
    }

    private backdropClick(): void {
        if (this.closeOnBackdrop) {
            this.as<OpenTriggerMixin>().tryClose();
        }
    }

    private closeDialog(): void {
        this.as<OpenTriggerMixin>().tryClose();
    }
}

const DialogPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(DIALOG_NAME, MDialog);
    }
};

export default DialogPlugin;
