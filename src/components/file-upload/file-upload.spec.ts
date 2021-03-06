import { mount, Wrapper } from '@vue/test-utils';
import Vue from 'vue';

import { resetModulPlugins } from '../../../tests/helpers/component';
import { createMockFile, createMockFileList } from '../../../tests/helpers/file';
import { addMessages } from '../../../tests/helpers/lang';
import { renderComponent, WrapChildrenStub } from '../../../tests/helpers/render';
import I18nPlugin from '../../components/i18n/i18n';
import FileSizeFilterPlugin from '../../filters/filesize/filesize';
import FilePlugin, { DEFAULT_STORE_NAME, MFile, MFileStatus, MFileValidationOptions } from '../../utils/file/file';
import MediaQueriesPlugin from '../../utils/media-queries/media-queries';
import { ModulVue } from '../../utils/vue/vue';
import ButtonPlugin from '../button/button';
import IconButtonPlugin from '../icon-button/icon-button';
import MessagePlugin from '../message/message';
import { FileService } from './../../utils/file/file';
import FileUploadPlugin, { MFileUpload } from './file-upload';

describe('MFileUpload', () => {
    beforeEach(() => {
        resetModulPlugins();
        Vue.use(FileSizeFilterPlugin);
        Vue.use(FilePlugin);
        Vue.use(I18nPlugin);
        Vue.use(MediaQueriesPlugin);

        addMessages(Vue, ['components/file-upload/file-upload.lang.en.json']);
        addMessages(Vue, ['filters/filesize/filesize.lang.en.json']);
    });

    it('should render correctly', () => {
        const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
            data: {
                isMqMinS: true
            }
        });

        return expect(renderComponent(fupd.vm)).resolves.toMatchSnapshot();
    });

    it('should render correctly in mobile', () => {
        const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
            data: {
                isMqMinS: false
            }
        });

        return expect(renderComponent(fupd.vm)).resolves.toMatchSnapshot();
    });

    it('should support optional $file store name', async () => {
        const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
            propsData: {
                storeName: 'unique-name'
            }
        });

        fupd.vm.$file.add(
            createMockFileList([createMockFile('file')]),
            'unique-name'
        );
        await Vue.nextTick();

        expect(fupd.emitted('files-ready')[0][0]).toHaveLength(1);
    });

    describe('validation', () => {
        const validationOpts: MFileValidationOptions = {
            allowedExtensions: ['jpg', 'png', 'mp4'],
            rejectedExtensions: ['mov'],
            maxSizeKb: 1,
            maxFiles: 5
        };

        it('should pass validation options to $file service when extensions property is modified', async () => {
            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            jest.spyOn(filesvc, 'setValidationOptions');
            const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
                propsData: validationOpts,
                data: {
                    isMqMinS: true
                }
            });
            const newAcceptedExtensions: string[] = ['avi', 'mp3'];
            const newRejectedExtensions: string[] = ['css', 'js'];
            const newValidationOpts: MFileValidationOptions = { ...validationOpts };
            newValidationOpts.allowedExtensions = newAcceptedExtensions;
            newValidationOpts.rejectedExtensions = newRejectedExtensions;

            fupd.vm.allowedExtensions = newAcceptedExtensions;
            fupd.vm.rejectedExtensions = newRejectedExtensions;
            await Vue.nextTick();

            expect(filesvc.setValidationOptions).toHaveBeenCalledWith(
                newValidationOpts,
                DEFAULT_STORE_NAME
            );
        });

        it('should pass validation options to $file service when maxSizeKb property is modified', async () => {
            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            jest.spyOn(filesvc, 'setValidationOptions');

            const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
                propsData: validationOpts,
                data: {
                    isMqMinS: true
                }
            });

            const newMaxSizeKb: number = 100;
            fupd.vm.maxSizeKb = newMaxSizeKb;

            const newValidationOpts: MFileValidationOptions = { ...validationOpts };
            newValidationOpts.maxSizeKb = newMaxSizeKb;

            await Vue.nextTick();
            expect(filesvc.setValidationOptions).toHaveBeenCalledWith(
                newValidationOpts,
                DEFAULT_STORE_NAME
            );
        });

        it('should pass validation options to $file service when extensions property is modified', async () => {
            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            jest.spyOn(filesvc, 'setValidationOptions');

            const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
                propsData: validationOpts,
                data: {
                    isMqMinS: true
                }
            });

            const newMaxFiles: number = 25;
            fupd.vm.maxFiles = newMaxFiles;

            const newValidationOpts: MFileValidationOptions = { ...validationOpts };
            newValidationOpts.maxFiles = newMaxFiles;

            await Vue.nextTick();
            expect(filesvc.setValidationOptions).toHaveBeenCalledWith(
                newValidationOpts,
                DEFAULT_STORE_NAME
            );
        });

        it('should pass validation options to $file service', () => {
            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            jest.spyOn(filesvc, 'setValidationOptions');

            const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
                propsData: validationOpts,
                data: {
                    isMqMinS: true
                }
            });

            expect(filesvc.setValidationOptions).toHaveBeenCalledWith(
                validationOpts,
                DEFAULT_STORE_NAME
            );
        });

        it('should render accepted file extensions', () => {
            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            jest.spyOn(filesvc, 'setValidationOptions');

            const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
                propsData: validationOpts,
                data: {
                    isMqMinS: true
                }
            });

            return expect(renderComponent(fupd.vm)).resolves.toMatchSnapshot();
        });

        describe('validation messages', () => {
            let fupd: Wrapper<MFileUpload>;

            const stubMDialogRefs: (fu: MFileUpload) => void = (fu: MFileUpload) => {
                (fu.$refs.dialog as any) = {
                    $refs: {
                        body: document.createElement('div')
                    }
                };
            };

            beforeEach(() => {
                Vue.use(MessagePlugin);
                addMessages(Vue, ['components/message/message.lang.en.json']);

                fupd = mount(MFileUpload, {
                    propsData: validationOpts,
                    data: {
                        isMqMinS: true
                    }
                });

                stubMDialogRefs(fupd.vm);
            });

            it('should render rejected files in modal', async () => {
                fupd.vm.$file.add(
                    createMockFileList([
                        createMockFile('invalid-extensions'),
                        createMockFile('invalid-size.jpg', 2000),
                        createMockFile('valid1.jpg'),
                        createMockFile('valid2.jpg'),
                        createMockFile('valid3.jpg'),
                        createMockFile('valid4.jpg'),
                        createMockFile('valid5.jpg'),
                        createMockFile('max-files.jpg')
                    ])
                );

                await Vue.nextTick();
                expect(await renderComponent(fupd.vm)).toMatchSnapshot();
            });

            it('should clear rejected files when validation message is closed', async () => {
                fupd.vm.$file.add(
                    createMockFileList([createMockFile('invalid-extensions')])
                );
                await Vue.nextTick();

                fupd.find('.m-message button').trigger('click');

                expect(fupd.vm.$file.files().length).toEqual(0);
            });
        });
    });

    describe('files selection / drop', () => {
        beforeEach(() => {
            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            filesvc.add(createMockFileList([createMockFile('uploading')]));
            filesvc.files()[0].status = MFileStatus.UPLOADING;
        });

        it('should emit files-ready event when $file managed files change', async () => {
            const fupd: Wrapper<MFileUpload> = mount(MFileUpload);

            fupd.vm.$file.add(createMockFileList([createMockFile('new-file')]));
            await Vue.nextTick();

            expect(fupd.emitted('files-ready')[0][0]).toEqual([
                fupd.vm.$file.files()[1]
            ]);
        });
    });

    describe('main actions', () => {
        let fupd: Wrapper<MFileUpload>;
        let completedFile: MFile;

        beforeEach(() => {
            Vue.use(ButtonPlugin);

            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            filesvc.add(
                createMockFileList([
                    createMockFile('ready'),
                    createMockFile('completed')
                ])
            );

            completedFile = filesvc.files()[0];
            Object.assign(completedFile, {
                status: MFileStatus.COMPLETED,
                completeHinted: true
            });

            fupd = mount(MFileUpload);
            fupd.vm.$refs.dialog = { closeDialog: jest.fn() } as any;
        });

        it('should emit done event when add button is clicked', () => {
            fupd
                .find('.m-file-upload__footer-add')
                .trigger('click');

            expect(fupd.emitted('done')[0][0]).toEqual([completedFile]);
        });

        it('should clear all files when add button is clicked', () => {
            jest.spyOn(fupd.vm.$refs.dialog, 'closeDialog');
            fupd
                .find('.m-file-upload__footer-add')
                .trigger('click');

            expect(fupd.vm.$refs.dialog.closeDialog).toHaveBeenCalled();
        });

        it('should emit cancel event when cancel button is clicked', () => {
            fupd
                .find('.m-file-upload__footer-cancel')
                .trigger('click');

            expect(fupd.emitted('cancel')).toBeTruthy();
        });

        it('should clear all files when cancel button is clicked', () => {
            jest.spyOn(fupd.vm.$refs.dialog, 'closeDialog');
            fupd
                .find('.m-file-upload__footer-cancel')
                .trigger('click');

            expect(fupd.vm.$refs.dialog.closeDialog).toHaveBeenCalled();
        });

        it('should emit file-upload-cancel event for each file being uploaded when cancel button is clicked', async () => {
            fupd.vm.$file.add(
                createMockFileList([createMockFile('uploading')])
            );

            jest.spyOn(fupd.vm.$refs.dialog, 'closeDialog');
            const uploadingFile: MFile = fupd.vm.$file.files()[2];
            uploadingFile.status = MFileStatus.UPLOADING;

            fupd
                .find('.m-file-upload__footer-cancel')
                .trigger('click');

            const evt: any = fupd.emitted('file-upload-cancel');
            expect(fupd.vm.$refs.dialog.closeDialog).toHaveBeenCalled();
        });
    });

    describe('uploading', () => {
        let uploadingFileMock: File;

        beforeEach(() => {
            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            uploadingFileMock = createMockFile('uploading-file');
            filesvc.add(createMockFileList([uploadingFileMock]));
            filesvc.files()[0].status = MFileStatus.UPLOADING;
        });

        it('should render uploading files', () => {
            const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
                stubs: {
                    'transition-group': WrapChildrenStub('ul')
                },
                data: {
                    isMqMinS: true
                }
            });

            fupd.vm.$file.files()[0].progress = 33;

            return expect(renderComponent(fupd.vm)).resolves.toMatchSnapshot();
        });

        it('should emit file-upload-cancel when an uploading file cancel button is clicked', () => {
            Vue.use(IconButtonPlugin);
            const fupd: Wrapper<MFileUpload> = mount(MFileUpload);

            fupd.find('button').trigger('click');

            expect(fupd.emitted('file-upload-cancel')[0][0]).toBe(
                fupd.vm.$file.files()[0]
            );
        });
    });

    describe('completed', () => {
        let completedFileMock: File;

        beforeEach(() => {
            const filesvc: FileService = (Vue.prototype as ModulVue).$file;
            completedFileMock = createMockFile('completed-file');
            filesvc.add(createMockFileList([completedFileMock]));
            Object.assign(filesvc.files()[0], {
                status: MFileStatus.COMPLETED,
                progress: 100,
                completeHinted: true
            });
        });

        it('should render completed files', () => {
            const fupd: Wrapper<MFileUpload> = mount(MFileUpload, {
                stubs: {
                    'transition-group': WrapChildrenStub('ul')
                },
                data: {
                    isMqMinS: true
                }
            });

            return expect(renderComponent(fupd.vm)).resolves.toMatchSnapshot();
        });

        it('should emit file-remove when a completed file is deleted', () => {
            Vue.use(IconButtonPlugin);
            const fupd: Wrapper<MFileUpload> = mount(MFileUpload);
            const deletingFile: MFile = fupd.vm.$file.files()[0];

            fupd.find('button').trigger('click');

            expect(fupd.emitted('file-remove')[0][0]).toBe(deletingFile);
        });
    });
});
