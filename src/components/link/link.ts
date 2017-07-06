import { ModulVue } from '../../utils/vue/vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './link.html?style=./link.scss';
import { LINK_NAME } from '../component-names';

const MODE_ROUTER_LINK: string = 'router-link';
const MODE_EXTERNAL_LINK: string = 'external-link';
const MODE_LINK: string = 'link';
const MODE_BUTTON: string = 'button';

@WithRender
@Component
export class MLink extends ModulVue {
    @Prop({ default: '/' })
    public url: string;
    @Prop({ default: MODE_ROUTER_LINK })
    public mode: string;
    @Prop({ default: 'default' })
    public state: string;

    public componentName: string = LINK_NAME;

    private propsUrl: string;
    private isRouterLink: boolean = false;
    private isLink: boolean = false;
    private isExternalLink: boolean = false;
    private isButton: boolean = false;
    private hrefAttribute: string;

    private beforeMount(): void {
        this.propsUrl = this.url;
        this.hrefAttribute = this.url;
        switch (this.mode) {
            case MODE_EXTERNAL_LINK:
                this.isExternalLink = true;
                break;
            case MODE_LINK:
                this.isLink = true;
                break;
            case MODE_BUTTON:
                this.propsUrl = '#';
                this.isButton = true;
                break;
            default:
                this.isRouterLink = true;
        }
    }
    private mounted(): void {
        if (this.isExternalLink) {
            this.$refs['link']['setAttribute']('title', this.$i18n.translate('m-link:open-new-tab'));
            this.$refs['link']['setAttribute']('target', '_blank');
        }
    }

    private onClick(event): void {
        this.$emit('click');
        this.$el.blur();
        if (this.isButton) {
            event.preventDefault();
        }
    }

    private get hasIconeLeft(): boolean {
        return !!this.$slots['icon-left'];
    }

    private get hasIconeRight(): boolean {
        return !!this.$slots['icon-right'];
    }
}

const LinkPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(LINK_NAME, MLink);
    }
};

export default LinkPlugin;
