import { ModulVue } from '../../utils/vue/vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import uuid from '../../utils/uuid/uuid';
import { MediaQueries } from '../../mixins/media-queries/media-queries';

const MODE_PRIMARY: string = 'primary';
const MODE_SECONDARY: string = 'secondary';
const MODE_PANEL: string = 'panel';

const DIALOG_ID: string = 'mDialog';
const TRANSITION_DURATION: number = 300;
const TRANSITION_DURATION_LONG: number = 600;

export interface DialogTemplateMixin {
    mode: string;
    componentName: string;
}

@Component({
    mixins: [MediaQueries]
})
export class DialogTemplate extends ModulVue implements DialogTemplateMixin {

    @Prop({ default: DIALOG_ID })
    public id: string;
    @Prop({ default: false })
    public open: boolean;
    @Prop({ default: false })
    public disabled: boolean;
    @Prop()
    public closeOnBackdrop: boolean;
    @Prop({ default: '' })
    public title: string;
    @Prop()
    public className: string;
    @Prop({ default: true })
    public padding: boolean;
    @Prop({ default: true })
    public paddingHeader: boolean;
    @Prop({ default: true })
    public paddingBody: boolean;
    @Prop({ default: true })
    public paddingFooter: boolean;

    public mode: string;
    public componentName: string;

    private propOpen: boolean = false;
    private propId: string = DIALOG_ID;
    private propCloseOnBackdrop: boolean;
    private bodyElement: HTMLElement = document.body;
    private portalTargetElement: HTMLElement = document.createElement('div');
    private isVisible: boolean = false;
    private isAnimActive: boolean = false;
    private isScreenMaxS: boolean;
    private transitionDuration: number = TRANSITION_DURATION;

    protected beforeMount(): void {
        if (this.open) {
            this.openDialog();
        }
    }

    protected destroyed(): void {
        if (this.propOpen) {
            this.deleteDialog();
        }
    }

    @Watch('open')
    private isOpenChanged(value: boolean): void {
        this.propOpen = value;
        if (this.propOpen) {
            this.openDialog();
        } else {
            this.closeDialog();
        }
    }

    private openDialog(event = undefined): void {
        if (!this.isAnimActive && !this.disabled && !this.isVisible) {
            this.createDialog();
            this.propOpen = true;
            this.isAnimActive = true;
            setTimeout(() => {
                this.isVisible = true;
            }, 2);
            setTimeout(() => {
                this.isAnimActive = false;
            }, this.transitionDuration);
            ModulVue.nextTick(() => {
                this.$refs.dialogWrap['setAttribute']('tabindex', '0');
                this.$refs.dialogWrap['focus']();
                this.$refs.dialogWrap['removeAttribute']('tabindex');
            });
            this.$emit('open');
        }
    }

    private closeDialog(event = undefined): void {
        if (!this.isAnimActive && this.isVisible) {
            this.isVisible = false;
            this.isAnimActive = true;
            this.$mWindow.backdropElement.style.zIndex = String(this.$mWindow.windowZIndex - 1);
            if (this.$mWindow.windowCount == 1 && this.$mWindow.hasBackdrop) {
                this.$mWindow.backdropElement.style.opacity = '0';
            }
            setTimeout(() => {
                this.propOpen = false;
                this.deleteDialog();
                this.isAnimActive = false;
                this.$emit('close');
                ModulVue.nextTick(() => {
                    this.$refs.dialogButton['setAttribute']('tabindex', '0');
                    this.$refs.dialogButton['focus']();
                    this.$refs.dialogButton['removeAttribute']('tabindex');
                });
            }, this.transitionDuration);
        }
    }

    private createDialog() {
        this.propId = this.id + '-' + uuid.generate();
        this.portalTargetElement.setAttribute('id', this.propId);
        this.portalTargetElement.setAttribute('class', 'm-dialog-popover');
        this.portalTargetElement.style.position = 'relative';

        this.$mWindow.addWindow(this.propId);
        this.portalTargetElement.style.zIndex = String(this.$mWindow.windowZIndex);

        this.$mWindow.createBackdrop(this.bodyElement);
        this.bodyElement.appendChild(this.portalTargetElement);
    }

    private deleteDialog() {
        console.log('deleteDialog');
        let portalTargetElement: HTMLElement = this.bodyElement.querySelector('#' + this.propId) as HTMLElement;
        if (portalTargetElement) {
            this.bodyElement.removeChild(portalTargetElement);
        }
        this.$mWindow.deleteWindow(this.propId);
    }

    private backdropClick(event): void {
        if (this.propCloseOnBackdrop) {
            this.closeDialog(event);
        }
    }

    private get propMode(): string {
        let mode: string = this.mode == MODE_SECONDARY || this.mode == MODE_PANEL ? this.mode : MODE_PRIMARY;
        switch (mode) {
            case MODE_SECONDARY:
                this.propCloseOnBackdrop = this.closeOnBackdrop == undefined ? true : this.closeOnBackdrop;
                this.transitionDuration = this.isScreenMaxS ? TRANSITION_DURATION_LONG : TRANSITION_DURATION;
                break;
            case MODE_PANEL:
                this.propCloseOnBackdrop = this.closeOnBackdrop == undefined ? true : this.closeOnBackdrop;
                this.transitionDuration = TRANSITION_DURATION_LONG;
                break;
            default:
                this.propCloseOnBackdrop = this.closeOnBackdrop == undefined ? false : this.closeOnBackdrop;
                this.transitionDuration = TRANSITION_DURATION;
        }
        return mode;
    }

    private get hasTitle(): boolean {
        return this.title == '' ? false : true;
    }

    private get hasDefaultSlots(): boolean {
        return !!this.$slots.default;
    }
    private get hasHeaderSlot(): boolean {
        return !!this.$slots.header;
    }

    private get hasFooterSlot(): boolean {
        return !!this.$slots.footer;
    }

    private get hasContentSlot(): boolean {
        return !!this.$slots.content;
    }
}