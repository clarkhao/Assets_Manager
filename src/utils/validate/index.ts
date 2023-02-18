/** 
  * validate file about size, mimetype, name
  */
import formidable from 'formidable';
type Validation<T> = (value: T) => { pass: boolean, reason: string[] };

const isSizeOK: Validation<formidable.File> = (file: formidable.File) => file.size < 2 * 1024 * 1024 ? { pass: true, reason: [] } : { pass: false, reason: [`file size too big`] };
const isMimeTypeOK: Validation<formidable.File> = (file: formidable.File) => (file.mimetype !== null ? ['image/jpeg', 'image/png', 'image/x-icon', 'application/json', 'image/svg+xml'].indexOf(file.mimetype) > -1 : false) ? { pass: true, reason: [] } : { pass: false, reason: ['not supported mimetype'] };

const validateFiles = (validated: Validation<formidable.File>[]) => {
  return (value: formidable.File) => validated.reduce((result: { pass: boolean, reason: string[] }, v) => {
    return { ...result, pass: result.pass && v(value).pass, reason: [...result.reason, ...v(value).reason] }
  }, { pass: true, reason: [] })
}

export { isSizeOK, isMimeTypeOK, validateFiles };