import { Validator } from 'fluentvalidation-ts';
import { withMiddleware } from "inversify-express-utils";

export enum ParameterSource {
  FromQuery = 1,
  FromBody = 2,
  FromRoute = 3
}

export const ParameterValidate = <TModel,T extends Validator<TModel>>(
    validatorType: new() => T,
    source?: ParameterSource
) => {
    return withMiddleware(
       (req, res, next) => {
            try {
                // Instantiate the validator
                const validator = new validatorType();

                // Judge the data source and get the correct one
                let data: any = null; 
                if(source){
                  switch(source){
                    case ParameterSource.FromQuery:
                      data = req.query;
                      break;
                    case ParameterSource.FromBody:
                      data = req.body;
                      break;                    
                    case ParameterSource.FromRoute:
                      data = req.params;
                      break;
                    default:
                      data = req.query;
                      break;
                  }
                } else {
                  data = (req.method === 'GET' ? req.query : req.body);
                }

                // Execute validation
                const errors = validator.validate(data);
                if (Object.keys(errors).length > 0) {
                    const errorJson = formatErrors(errors);
                    res.status(400).json(errorJson);
                    //Stop middleware chains
                    //next(new Error(`Parameter validation error!\n${JSON.stringify(errorJson, null, 2)}`));                    
                    return;
                }
                next();
            }catch(err){
                next(err);
            }
        }
    )
}

// Normalize the error message json structure
const formatErrors = (errors: Record<string, any>) => ({
  errors: Object.entries(errors).map(([field, message]) => ({
    field,
    message
  }))
});