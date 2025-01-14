import {
  FieldsErrors,
  ValidatorFieldsInterface,
} from './validator-fields.interface';
import { validateSync } from 'class-validator';

export abstract class ClassValidatorFields<PropsValidated>
  implements ValidatorFieldsInterface<PropsValidated>
{
  errors: FieldsErrors;
  validatedData: PropsValidated;

  validate(data: any): boolean {
    const errors = validateSync(data);
    console.log('validateSync.errors', errors);
    if (errors.length > 0) {
      this.errors = {};
      for (const error of errors) {
        const field = error.property;
        this.errors[field] = Object.values(error.constraints);
      }
      return false;
    } else {
      this.validatedData = data;
    }
    return !errors.length;
  }
}
