import Vue from 'vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import WithRender from './dropdown.html?style=./dropdown.scss';
import { DROPDOWN_NAME } from '../component-names';
import { normalizeString } from '../../utils/str/str';
import { KeyCode } from '../../utils/keycode/keycode';
import { MDropDownItemInterface, BaseDropdown } from '../dropdown-item/dropdown-item';
import { InputState, InputStateMixin } from '../../mixins/input-state/input-state';
import { MediaQueries, MediaQueriesMixin } from '../../mixins/media-queries/media-queries';

const PAGE_STEP: number = 3;
const DROPDOWN_MAX_HEIGHT: number = 220;
const DROPDOWN_STYLE_TRANSITION: string = 'max-height 0.3s ease';

export interface MDropdownInterface extends Vue {
    model: any;
    items: Vue[];
    inactive: boolean;
    nbItemsVisible: number;
    setFocus(item: Vue): void;
    toggleDropdown(open: boolean): void;
    setModel(value: any, label: string | undefined): void;
    emitChange(value: any, action: boolean);
}

@WithRender
@Component({
    mixins: [
        InputState,
        MediaQueries
    ]
})
export class MDropdown extends BaseDropdown implements MDropdownInterface {
    @Prop()
    public value: any;
    @Prop()
    public label: string;
    @Prop()
    public defaultText: string;
    @Prop({ default: false })
    public disabled: boolean;
    @Prop({ default: false })
    public waiting: boolean;
    @Prop({ default: false })
    public open: boolean;
    @Prop({ default: true })
    public editable: boolean;
    // @Prop({ default: false })
    // public multiple: boolean;
    @Prop({ default: '100%' })
    public width: string;
    @Prop({ default: '288px' })
    public maxWidth: string;
    @Prop()
    public textNoData: string;
    @Prop()
    public textNoMatch: string;

    public componentName: string = DROPDOWN_NAME;
    public items: Vue[] = [];
    public nbItemsVisible: number = 0;

    private selectedValue: string = '';
    private hasModel: boolean = true;
    private internalOpen: boolean = false;
    private noItemsLabel: string;

    private textFieldLabelEl: HTMLElement;
    private textFieldInputValueEl: HTMLElement;

    public setFocus(elementFocus: Vue): void {
        for (let item of this.items) {
            if (item === elementFocus) {
                (item as MDropDownItemInterface).hasFocus = true;
            } else {
                (item as MDropDownItemInterface).hasFocus = false;
            }
        }
    }

    public getFocus(): MDropDownItemInterface | undefined {
        let elementFocus: MDropDownItemInterface | undefined = undefined;

        for (let item of this.items) {
            if ((item as MDropDownItemInterface).hasFocus) {
                elementFocus = (item as MDropDownItemInterface);
                break;
            }
        }

        return elementFocus;
    }

    public setModel(value: any, label: string | undefined): void {
        if (label) {
            this.selectedValue = label;
        }

        this.$emit('filter'); // Clear filter
        this.$emit('input', value);
    }

    public emitChange(value: any, selected: boolean) {
        this.$emit('change', value, selected);
    }

    public toggleDropdown(open: boolean): void {
        this.propOpen = open;
    }

    protected mounted(): void {
        this.propOpen = this.open;
    }

    @Watch('value')
    private valueChanged(value: any): void {
        this.selectedValue = '';
        this.$emit('valueChanged', value);
    }

    @Watch('open')
    private openChanged(open: boolean): void {
        this.propOpen = open;
    }

    private onFocus(): void {
        if (!this.as<InputStateMixin>().isDisabled && !this.propOpen && !this.emptyValue) {
            this.propOpen = true;
        }
    }

    private onClick() {
        if (!this.as<InputStateMixin>().isDisabled && (this.propEditable || (!this.propEditable && !this.propOpen))) {
            this.propOpen = true;
        } else {
            this.propOpen = false;
        }
    }

    private arrowOnClick(event): void {
        if (this.propEditable && this.propOpen) {
            this.propOpen = false;
            event.stopPropagation();
        }
    }

    public get model(): any {
        this.hasModel = !!this.value;
        return this.value;
    }

    public get emptyValue(): boolean {
        return (this.selectedValue == undefined || this.selectedValue == '') && ((!this.propOpen && this.propEditable) || !this.propEditable);
    }

    public get propOpen(): boolean {
        return this.internalOpen;
    }

    public set propOpen(open: boolean) {
        this.internalOpen = open != undefined ? open : false;
        this.$nextTick(() => {
            if (open) {
                this.$emit('open');
                (this.$refs.input as HTMLElement).focus();
            } else {
                this.$emit('close');
            }
        });
    }

    private get propEditable(): boolean {
        return this.editable && !this.hasModel;
    }

    private get propTextNoData(): string {
        return (this.textNoData ? this.textNoData : this.$i18n.translate('m-dropdown:no-data'));
    }

    private get propTextNoMatch(): string {
        return (this.textNoMatch ? this.textNoMatch : this.$i18n.translate('m-dropdown:no-result'));
    }

    private get noItems(): boolean {
        let show: boolean = false;

        if (this.nbItemsVisible == 0) {
            this.noItemsLabel = this.items.length == 0 ? this.propTextNoData : this.propTextNoMatch;
            show = true;
        }

        return show;
    }

    public get inactive(): boolean {
        return this.disabled || this.waiting;
    }

    private get hasLabel(): boolean {
        return this.label != undefined && this.label != '';
    }

    private filterDropdown(): void {
        // Can be filter only when there nothing in model
        if (!this.hasModel) {
            this.$emit('filter', normalizeString(this.selectedValue.trim()));
            // for (let item of this.items) {
            //     if (!(item as MDropDownItemInterface).inactif) {
            //         (item as MDropDownItemInterface).filter = ;
            //     }
            // }
        }
    }

    private onKeyup($event): void {
        if (!this.propOpen) {
            this.propOpen = true;
        }

        this.filterDropdown();

        if (!this.propOpen && ($event.keyCode == KeyCode.M_DOWN || $event.keyCode == KeyCode.M_SPACE)) {
            $event.preventDefault();
            (this.$refs.mDropdownValue as Vue).$el.click();
        }

        if (this.propOpen && ($event.keyCode == KeyCode.M_DOWN || $event.keyCode == KeyCode.M_END || $event.keyCode == KeyCode.M_PAGE_DOWN)) {
            $event.preventDefault();
            // console.log('ok');
            let htmlElement: HTMLElement = this.$el.querySelector(`[data-index='0']`) as HTMLElement;
            if (htmlElement) {
                htmlElement.focus();
            }

            // console.log('htmlElement', htmlElement);
        }
    }

    private clearField(): void {
        this.$emit('input');
    }

    // private keyupReference($event): void {
    //     if (!this.propOpen && ($event.keyCode == KeyCode.M_DOWN || $event.keyCode == KeyCode.M_SPACE)) {
    //         $event.preventDefault();
    //         (this.$refs.mDropdownValue as Vue).$el.click();
    //     }

    //     if (this.propOpen && ($event.keyCode == KeyCode.M_DOWN || $event.keyCode == KeyCode.M_END || $event.keyCode == KeyCode.M_PAGE_DOWN)) {
    //         $event.preventDefault();
    //         let htmlElement: HTMLElement = this.$el.querySelector(`[data-index='0']`) as HTMLElement;
    //         if (htmlElement) {
    //             htmlElement.focus();
    //         }
    //     }
    // }

    private keyupItem($event: KeyboardEvent): void {
        let element: Vue | undefined = undefined;
        let focusElement: MDropDownItemInterface | undefined = this.getFocus();
        let itemsEnabled: MDropDownItemInterface[] = (this.items as MDropDownItemInterface[]).filter(item => (item.disabled === false && item.visible === true));

        switch ($event.keyCode) {
            case KeyCode.M_UP:
                if (focusElement) {
                    let index: number = itemsEnabled.indexOf(focusElement);
                    if (index == 0) {
                        element = itemsEnabled[0];
                    } else {
                        element = itemsEnabled[index - 1];
                    }
                } else {
                    element = itemsEnabled[0];
                }
                break;
            case KeyCode.M_HOME:
                element = itemsEnabled[0];
                break;
            case KeyCode.M_PAGE_UP:
                if (focusElement) {
                    let index: number = itemsEnabled.indexOf(focusElement);
                    index -= PAGE_STEP;

                    if (index < 0) {
                        element = itemsEnabled[0];
                    } else {
                        element = itemsEnabled[index];
                    }
                } else {
                    element = itemsEnabled[0];
                }
                break;
            case KeyCode.M_DOWN:
                if (focusElement) {
                    let index: number = itemsEnabled.indexOf(focusElement);
                    if (index == itemsEnabled.length - 1) {
                        element = itemsEnabled[itemsEnabled.length - 1];
                    } else {
                        element = itemsEnabled[index + 1];
                    }
                } else {
                    element = itemsEnabled[0];
                }
                break;

            case KeyCode.M_END:
                element = itemsEnabled[itemsEnabled.length - 1];
                break;
            case KeyCode.M_PAGE_DOWN:
                if (focusElement) {
                    let index: number = itemsEnabled.indexOf(focusElement);
                    index += PAGE_STEP;

                    if (index > itemsEnabled.length - 1) {
                        element = itemsEnabled[itemsEnabled.length - 1];
                    } else {
                        element = itemsEnabled[index];
                    }
                } else {
                    let index: number = (PAGE_STEP < itemsEnabled.length ? PAGE_STEP - 1 : itemsEnabled.length - 1);
                    element = itemsEnabled[index];
                }
                break;
            case KeyCode.M_ENTER:
            case KeyCode.M_RETURN:
                if (focusElement) {
                    // (focusElement as MDropDownItemInterface).onSelectElement();
                }
                return;
        }

        if (element) {
            element.$el.focus();
        }
    }

    private focusOnResearchInput(): void {
        (this.$refs.researchInput as HTMLElement).focus();
    }

    private transitionEnter(el: HTMLElement, done: any): void {
        this.$nextTick(() => {
            if (this.as<MediaQueriesMixin>().isMqMinS) {
                let height: number = el.clientHeight > DROPDOWN_MAX_HEIGHT ? DROPDOWN_MAX_HEIGHT : el.clientHeight;
                el.style.webkitTransition = DROPDOWN_STYLE_TRANSITION;
                el.style.transition = DROPDOWN_STYLE_TRANSITION;
                el.style.overflowY = 'hidden';
                el.style.maxHeight = '0';
                el.style.width = (this.$el.clientWidth) + 'px';
                setTimeout(() => {
                    el.style.maxHeight = height + 'px';
                    done();
                }, 0);
            } else {
                done();
            }
        });
    }

    private transitionAfterEnter(el: HTMLElement): void {
        if (this.as<MediaQueriesMixin>().isMqMinS) {
            setTimeout(() => {
                el.style.maxHeight = DROPDOWN_MAX_HEIGHT + 'px';
                el.style.overflowY = 'auto';
            }, 300);
        }
    }

    private transitionLeave(el: HTMLElement, done: any): void {
        this.$nextTick(() => {
            if (this.as<MediaQueriesMixin>().isMqMinS) {
                let height: number = el.clientHeight;
                el.style.width = (this.$el.clientWidth) + 'px';
                el.style.maxHeight = height + 'px';
                el.style.overflowY = 'hidden';
                el.style.maxHeight = '0';
                setTimeout(() => {
                    el.style.maxHeight = 'none';
                    done();
                }, 300);
            } else {
                done();
            }
        });
    }
}

const DropdownPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(DROPDOWN_NAME, MDropdown);
    }
};

export default DropdownPlugin;
