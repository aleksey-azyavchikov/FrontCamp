export const ValidationConditions = { 
    apiKeyField: [
        { action: (value) => value.length == 31, errorMessage: "The api field should has more 31 symbols" },
        { action: (value) => value.length != 32, errorMessage: "The api field should has 32 symbols" }
    ],
    otherField: null
}

export class ValidationFactory {

    static getInstance() {
        if (this.validationFactory === undefined || this.validationFactory === null) {
            this.validationFactory = new ValidationFactory();
        }  
        return this.validationFactory;
    }

    getProxy(conditions) {
         return new Proxy({}, this.getValidator(conditions));
     }

    getValidator(conditions) {
         let validator = {
             set: (obj, prop, value) => {
                if(value === undefined || value === null) throw new Error("Validator: value undefined or null");
                if(conditions !== null || conditions.length !== 0) {
                     for(let condition of conditions) {
                         this.validate(value, condition.action, condition.errorMessage)
                     }
                }
                obj[prop] = value;
                return true;
             }
         }
         return validator;
     }

     validate(value, condition, message) {
          if(condition(value)) throw new Error(message);
     }
}