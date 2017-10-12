import Vue from 'vue';
import { PluginObject } from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import WithRender from './switch.html?style=./switch.scss';
import { SWITCH_NAME } from '../component-names';
import uuid from '../../utils/uuid/uuid';

export enum MSwitchPosition {
    Left = 'left',
    Right = 'right'
}

@WithRender
@Component
export class MSwitch extends Vue {

    @Prop()
    public value: boolean;
    @Prop({ default: MSwitchPosition.Left })
    public position: string;
    @Prop({ default: true })
    public helperText: boolean;

    public componentName: string = SWITCH_NAME;
    private internalPropChecked: boolean = false;
    private isFocus = false;
    private id: string = `switch${uuid.generate()}`;

    protected get propChecked(): boolean {
        return this.value != undefined ? this.value : this.internalPropChecked;
    }

    protected set propChecked(value: boolean) {
        this.$emit('input', value);
        this.$emit('checked', value);
        this.internalPropChecked = value;
    }

    private onClick(event): void {
        this.$emit('click', event);
        this.$refs['switch']['blur']();
    }

    public get hasSwitchLeft(): boolean {
        return ((this.position == MSwitchPosition.Right) ? false : true);
    }

    public get label(): boolean {
        return !!this.$slots.default;
    }
}

const SwitchPlugin: PluginObject<any> = {
    install(v, options) {
        v.component(SWITCH_NAME, MSwitch);
    }
};

export default SwitchPlugin;
