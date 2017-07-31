import Vue from 'vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';
import WithRender from './checkbox.html?style=./checkbox.scss';
import { CHECKBOX_NAME } from '../component-names';
import uuid from '../../utils/uuid/uuid';

const POSITION_LEFT: string = 'left';

@WithRender
@Component
export class MCheckbox extends Vue {

    @Prop({ default: false })
    public checked: boolean;
    @Prop({ default: POSITION_LEFT })
    public position: string;

    public componentName: string = CHECKBOX_NAME;
    private propChecked: boolean = false;
    private isFocus = false;
    private id: string = `mCheckbox-${uuid.generate()}`;

    protected mounted(): void {
        this.propChecked = this.checked;
    }
    @Watch('propChecked')
    private propCheckedChanged(value: boolean): void {
        this.$emit('checked', value);
    }

    private onClick(event): void {
        this.$emit('click');
        this.$refs['checkbox']['blur']();
    }

    private setFocus(value: boolean): void {
        this.isFocus = value;
    }

    private get hasCheckboxLeft(): boolean {
        return this.position == POSITION_LEFT;
    }

    private get hasLabelSlot(): boolean {
        return !!this.$slots.default;
    }
}

const CheckboxPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(CHECKBOX_NAME, MCheckbox);
    }
};

export default CheckboxPlugin;
