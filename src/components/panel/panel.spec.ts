import Vue from 'vue';
import '../../utils/polyfills';
import PanelPlugin, { MPanel, MPanelSkin } from './panel';

const SKIN_PRIMARY_CSS: string = 'm--is-primary';
const SKIN_SECONDARY_CSS: string = 'm--is-secondary';
const NO_SHADOW_CSS: string = 'm--no-shadow';
const NO_BORDER_CSS: string = 'm--no-border';
const NO_PADDING_CSS: string = 'm--no-padding';

let panel: MPanel;

describe('MPanelSkin', () => {
    it('validates enum', () => {
        expect(MPanelSkin.Primary).toEqual('primary');
        expect(MPanelSkin.Secondary).toEqual('secondary');
    });
});

describe('panel', () => {
    beforeEach(() => {
        Vue.use(PanelPlugin);
        panel = new MPanel().$mount();
    });

    it('css class for panel are not present', () => {
        expect(panel.$el.classList.contains(SKIN_SECONDARY_CSS)).toBeFalsy();
        expect(panel.$el.classList.contains(NO_SHADOW_CSS)).toBeFalsy();
        expect(panel.$el.classList.contains(NO_BORDER_CSS)).toBeFalsy();
    });

    it('skin prop', () => {
        expect(panel.$el.classList.contains(SKIN_SECONDARY_CSS)).toBeFalsy();

        panel.skin = MPanelSkin.Secondary;
        Vue.nextTick(() => {
            expect(panel.$el.classList.contains(SKIN_SECONDARY_CSS)).toBeTruthy();
            expect(panel.$el.classList.contains(SKIN_PRIMARY_CSS)).toBeFalsy();

            panel.skin = MPanelSkin.Primary;
            Vue.nextTick(() => {
                expect(panel.$el.classList.contains(SKIN_PRIMARY_CSS)).toBeTruthy();
                expect(panel.$el.classList.contains(SKIN_SECONDARY_CSS)).toBeFalsy();
            });
        });
    });

    it('shadow prop', () => {
        expect(panel.$el.classList.contains(NO_SHADOW_CSS)).toBeFalsy();

        panel.shadow = false;
        Vue.nextTick(() => {
            expect(panel.$el.classList.contains(NO_SHADOW_CSS)).toBeTruthy();

            panel.shadow = true;
            Vue.nextTick(() => {
                expect(panel.$el.classList.contains(NO_SHADOW_CSS)).toBeFalsy();
            });
        });
    });

    it('border prop', () => {
        expect(panel.$el.classList.contains(NO_BORDER_CSS)).toBeFalsy();

        panel.border = false;
        Vue.nextTick(() => {
            expect(panel.$el.classList.contains(NO_BORDER_CSS)).toBeTruthy();

            panel.border = true;
            Vue.nextTick(() => {
                expect(panel.$el.classList.contains(NO_BORDER_CSS)).toBeFalsy();
            });
        });
    });

    it('padding prop', () => {
        let vm = new Vue({
            data: {
                hasPadding: true
            },
            template: `
            <div>
                <m-panel ref="a" :padding="hasPadding">
                <span slot="header">Titre</span>
                aborum exercitation occaecat nulla aliquip.
                <span slot="footer">Aute elit ullamco excepteur veniam</span>
                </m-panel>
            </div>`,
            methods: {
            }
        }).$mount();

        let header: Element | null = (vm.$refs.a as Vue).$el.querySelector('header');
        let body: Element | null = (vm.$refs.a as Vue).$el.querySelector('.m-panel__body');
        let footer: Element | null = (vm.$refs.a as Vue).$el.querySelector('footer');
        if (header) {
            expect(header.classList.contains(NO_PADDING_CSS)).toBeFalsy();
        }
        if (body) {
            expect(body.classList.contains(NO_PADDING_CSS)).toBeFalsy();
        }
        if (footer) {
            expect(footer.classList.contains(NO_PADDING_CSS)).toBeFalsy();
        }

        (vm as any).hasPadding = false;
        Vue.nextTick(() => {
            let header: Element | null = (vm.$refs.a as Vue).$el.querySelector('header');
            let body: Element | null = (vm.$refs.a as Vue).$el.querySelector('.m-panel__body');
            let footer: Element | null = (vm.$refs.a as Vue).$el.querySelector('footer');
            if (header) {
                expect(header.classList.contains(NO_PADDING_CSS)).toBeTruthy();
            }
            if (body) {
                expect(body.classList.contains(NO_PADDING_CSS)).toBeTruthy();
            }
            if (footer) {
                expect(footer.classList.contains(NO_PADDING_CSS)).toBeTruthy();
            }
        });
    });

    it('header padding prop', () => {
        let vm = new Vue({
            data: {
                hasPadding: true
            },
            template: `
            <div>
                <m-panel ref="a" :paddingHeader="hasPadding">
                <span slot="header">Titre</span>
                aborum exercitation occaecat nulla aliquip.
                <span slot="footer">Aute elit ullamco excepteur veniam</span>
                </m-panel>
            </div>`,
            methods: {
            }
        }).$mount();

        let header: Element | null = (vm.$refs.a as Vue).$el.querySelector('header');
        if (header) {
            expect(header.classList.contains(NO_PADDING_CSS)).toBeFalsy();
        }

        (vm as any).hasPadding = false;
        Vue.nextTick(() => {
            let header: Element | null = (vm.$refs.a as Vue).$el.querySelector('header');
            if (header) {
                expect(header.classList.contains(NO_PADDING_CSS)).toBeTruthy();
            }
        });
    });

    it('body padding prop', () => {
        let vm = new Vue({
            data: {
                hasPadding: true
            },
            template: `
            <div>
                <m-panel ref="a" :paddingBody="hasPadding">
                <span slot="header">Titre</span>
                aborum exercitation occaecat nulla aliquip.
                <span slot="footer">Aute elit ullamco excepteur veniam</span>
                </m-panel>
            </div>`,
            methods: {
            }
        }).$mount();

        let body: Element | null = (vm.$refs.a as Vue).$el.querySelector('.m-panel__body');
        if (body) {
            expect(body.classList.contains(NO_PADDING_CSS)).toBeFalsy();
        }

        (vm as any).hasPadding = false;
        Vue.nextTick(() => {
            let body: Element | null = (vm.$refs.a as Vue).$el.querySelector('.m-panel__body');
            if (body) {
                expect(body.classList.contains(NO_PADDING_CSS)).toBeTruthy();
            }
        });
    });

    it('footer padding prop', () => {
        let vm = new Vue({
            data: {
                hasPadding: true
            },
            template: `
            <div>
                <m-panel ref="a" :paddingFooter="hasPadding">
                <span slot="header">Titre</span>
                aborum exercitation occaecat nulla aliquip.
                <span slot="footer">Aute elit ullamco excepteur veniam</span>
                </m-panel>
            </div>`,
            methods: {
            }
        }).$mount();

        let footer: Element | null = (vm.$refs.a as Vue).$el.querySelector('footer');
        if (footer) {
            expect(footer.classList.contains(NO_PADDING_CSS)).toBeFalsy();
        }

        (vm as any).hasPadding = false;
        Vue.nextTick(() => {
            let footer: Element | null = (vm.$refs.a as Vue).$el.querySelector('footer');
            if (footer) {
                expect(footer.classList.contains(NO_PADDING_CSS)).toBeTruthy();
            }
        });
    });

});
