import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";

const INVALID_NAMES = ['lovelace', 'turing', 'lamarr', 'babbage', 'hopper', 'curie', 'franklin', 'meitner', 'goodall', 'hypatia',
            'knuth', 'ritchie', 'hamilton'];

export const heroNameValidator: AsyncValidatorFn = async (control: AbstractControl): Promise<ValidationErrors | null> => {
    const forbidden = INVALID_NAMES.includes(control.value?.toLowerCase());
    return forbidden ? { heroNameValid: { value: control.value } } : null;
}