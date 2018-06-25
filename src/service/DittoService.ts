import Base from './Base';


export default class extends Base {

    // fetch the file list with path
    fetchList(path: string): any{
        // TODO

        return [
            {
                name : 'abc',
                type : 'dir',
                meta : {}
            },
            {
                name : 'def',
                type : 'dir'
            },
            {
                name : 'readme.md',
                type : 'file',
                ext : 'md'
            },
            {
                name : 'film.avi',
                type : 'file',
                ext : 'avi'
            }
        ];
    }

    // create dir with path
    createFoler(path: string): any{
        // TODO

        return [
            {
                name : 'new_folder',
                type : 'dir'
            },
            ...this.fetchList('dir')
        ];
    }

    // rename a folder or file
    rename(path: string, newName: string): any{
        // TODO 

        return true;
    }

    // upload a new file to ditto
    uploadFile(path: string, file: any): any{
        // TODO

        return true;
    }

    // change a file metadata
    changeMeta(path: string, fileMeta: any): any{
        // TODO

        return true;
    }

    // fetch a file
    fetchFile(path: string): any{
        // TODO

        return {
            name : 'readme.md',
            type : 'file',
            ext : 'md',
            content : 'abc'
        };
    }

    // fetch a file, return stream
    fetchFileByStream(path: string): any{
        // TODO

        const arr = new ArrayBuffer(32);
        const dv = new DataView(arr);
        dv.setUint8(0, 10);

        return dv.getUint8(0);
    }

    // delete a folder or file
    delete(path: string): any{
        // TODO

        return true;
    }
}