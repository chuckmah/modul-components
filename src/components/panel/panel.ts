import Vue from 'vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './panel.html?style=./panel.scss';
import { PANEL_NAME } from '../component-names';
import ElementQueries from 'css-element-queries/src/ElementQueries';

export enum MPanelSkin {
    Primary = 'primary',
    Secondary = 'secondary'
}

const HEADER_RIGHT_CONTENT: string = 'header-right-content';

@WithRender
@Component
export class MPanel extends Vue {
    @Prop({
        default: MPanelSkin.Primary,
        validator: value =>
            value == MPanelSkin.Primary ||
            value == MPanelSkin.Secondary
    })
    public skin: MPanelSkin;
    @Prop({ default: true })
    public shadow: boolean;
    @Prop({ default: true })
    public border: boolean;
    @Prop({ default: true })
    public padding: boolean;
    @Prop({ default: true })
    public paddingHeader: boolean;
    @Prop({ default: true })
    public paddingBody: boolean;
    @Prop({ default: true })
    public paddingFooter: boolean;

    protected mounted(): void {
        ElementQueries.init();
    }

    protected beforeDestroy(): void {
        ElementQueries.detach(this.$el);
    }

    private get hasHeader(): boolean {
        if (this.$slots.header || this.$slots[HEADER_RIGHT_CONTENT]) {
            return true;
        }
        return false;
    }

    private get hasHeaderRightContentSlot(): boolean {
        return !!this.$slots[HEADER_RIGHT_CONTENT];
    }

    private get hasHeaderSlot(): boolean {
        return !!this.$slots.header;
    }

    private get hasDefaultSlot(): boolean {
        return !!this.$slots.default;
    }

    private get hasFooterSlot(): boolean {
        return !!this.$slots.footer;
    }

    private get hasPaddingHeader(): boolean {
        return this.paddingHeader && this.padding;
    }

    private get hasPaddingBody(): boolean {
        return this.paddingBody && this.padding;
    }

    private get hasPaddingFooter(): boolean {
        return this.paddingFooter && this.padding;
    }
}

const PanelPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(PANEL_NAME, MPanel);
    }
};

export default PanelPlugin;
