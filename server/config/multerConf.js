import multer from 'multer';
import { v4 } from 'uuid';

const storage = multer.diskStorage({
  destination: (
    _,
    __,
    callback,
  ) => {
    callback(null, 'uploads');
  },
  filename: (_, file, callback) => {
    const extArray = file.mimetype.split('/');
    const extension = extArray[extArray.length - 1];
    callback(null, `${v4()}.${extension}`);
  },
});

const fileFilter = (
  _,
  file,
  callback,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|pdf)$/))
    return callback(
      new Error('Only image files are allowed'),
      false,
    );
  callback(null, true);
};

export const configurationStorage = () => multer({ storage, fileFilter });