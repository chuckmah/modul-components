import Vue, { PluginObject } from 'vue';
import { Component } from 'vue-property-decorator';

import { NAVBAR_NAME } from '../component-names';
import WithRender from './navbar.sandbox.html?style=./navbar.sandbox.scss';

@WithRender
@Component
export class MNavbarSandbox extends Vue {
    private selectedItem: string = 'item6';
    private selectedItemMainMenu: string = 'item2';
    private navOpen: boolean = false;
    private multiline: boolean = true;

    private toggleMultiline(): void {
        this.multiline = !this.multiline;
    }

    private toggleNav(): void {
        this.navOpen = !this.navOpen;
    }
}

const NavbarSandboxPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(`${NAVBAR_NAME}-sandbox`, MNavbarSandbox);
    }
};

export default NavbarSandboxPlugin;
