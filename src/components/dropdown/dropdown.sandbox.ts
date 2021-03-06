import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';

import { DROPDOWN_NAME } from '../component-names';
import WithRender from './dropdown.sandbox.html';

@WithRender
@Component
export class MDropdownSandbox extends Vue {
    // tslint:disable-next-line:no-null-keyword
    public nullValue1: null = null;
    // tslint:disable-next-line:no-null-keyword
    public nullValue2: null = null;
    // tslint:disable-next-line:no-null-keyword
    public nullValue3: null = null;
    public undefinedValue1: undefined = undefined;
    public undefinedValue2: undefined = undefined;
    public undefinedValue3: undefined = undefined;

    public numItems: number[] = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007];
}

const DropdownSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(`${DROPDOWN_NAME}-sandbox`, MDropdownSandbox);
    }
};

export default DropdownSandboxPlugin;
