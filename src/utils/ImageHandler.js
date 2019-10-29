import FileHandler from './FileHandler';

class ImageHandler extends FileHandler{

    constructor(vueInstance, field){
        super(vueInstance, field);
    }

    createImage(e) {

        this.errorsBag = [];

        let file = FileHandler.getFilesFirst(e);

        if(!file) return;

        let isValidType = this.isMimeTypeValid(file,'.jpg, .jpeg,.png, .bmp');

        let isValidSize = this.isSizeValid(file,1);

        if(!isValidType || !isValidSize) return;

        let reader = super.getReader(file);

        reader.readAsDataURL(file);

        return file;
    }

    removeImage(){
        super.removeFile();
    }

    static validateImageDimensions(file, { width=1200, height=1200 }={}){
        let _URL = window.URL || window.webkitURL;

        let image = new Image();

        image.onload = function() {
            alert("The image width is " +this.width + " and image height is " + this.height);
        };

        image.src = _URL.createObjectURL(file);

    }

    getErrorMessages() {

        let errorMessages = super.getErrorMessages();

        errorMessages['fileDimensions'] = 'ابعاد فایل انتخابی اشتباه است!';

        return errorMessages;
    }
}

export default ImageHandler;