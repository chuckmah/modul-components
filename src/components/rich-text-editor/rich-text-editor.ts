import 'font-awesome/css/font-awesome.css';
import 'froala-editor/css/froala_editor.min.css';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/froala_editor.pkgd.min';

import { PluginObject } from 'vue';
import Component from 'vue-class-component';

import { ModulVue } from '../../utils/vue/vue';
import { RICH_TEXT_EDITOR } from '../component-names';
import WithRender from './rich-text-editor.html';

// Require Froala Editor js file.
declare var require: any;

// Require Froala Editor css files.
const $: any = require('jquery');

require('froala-editor/js/froala_editor.pkgd.min');
const opts: any = {
    full: {
        toolbarButtons: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', 'insertImage', 'insertVideo', 'insertFile', '|', 'undo', 'redo', 'clearFormatting', 'fullscreen', '|', 'html'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html']
    },
    text: {
        toolbarButtons: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'paragraphFormat', 'align', 'formatOL', 'formatUL', 'insertTable', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
        height: 300
    },
    mini: {
        toolbarButtons: ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
        toolbarButtonsMD: ['bold', 'italic', 'underline', '|', 'insertLink', '|', 'undo', 'redo', 'clearFormatting', '|', 'html'],
        height: 200
    }
};

@WithRender
@Component
export class MRichTextEditor extends ModulVue {
    protected mounted(): void {
        // (this.$refs.textElement as any).froalaEditor();
        (this.$refs.textElement as HTMLElement).addEventListener('froalaEditor.initialized', (e: Event) => {
            // tslint:disable-next-line:no-console
            console.log('hehe');
            // return this.$refs.textElement.$editor = editor;
        });

        // tslint:disable-next-line:no-console
        let options: any = {
            toolbarButtons: opts['full'].toolbarButtons,
            toolbarButtonsMD: opts['full'].toolbarButtonsMD,
            height: 300,
            fileUploadURL: '',
            imageUploadURL: '',
            theme: ''
        };
        setTimeout(() => {
            $(this.$refs.textElement).froalaEditor(options);
        }, 200);
    }
}

const RichTextEditorPlugin: PluginObject<any> = {
    install(v, options): void {
        v.component(RICH_TEXT_EDITOR, MRichTextEditor);
    }
};

export default RichTextEditorPlugin;
