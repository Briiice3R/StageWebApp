import { FormEvent, useState } from 'react';
import { FormDataErrors } from '@inertiajs/core';
import {ValidationRules} from '@/types';

export function useValidation<FieldName extends string, DataFormStruct>(
    errors: FormDataErrors<DataFormStruct>,
    rules: Partial<Record<FieldName, ValidationRules[]>>,
    data: DataFormStruct,
){
    const [frontErrors, setFrontErrors] = useState<Partial<Record<FieldName, string>>>({});
    const [, setHasTouched] = useState<Partial<Record<FieldName, boolean>>>({});
    const getError = (fieldName: FieldName): string | undefined => {
        // as unknown because TypeScript don't know FieldName is a key of FormDataErrors<DataFormStruct>
        return frontErrors[fieldName] || errors[fieldName as unknown as keyof FormDataErrors<DataFormStruct>];
    };

    const handleBlurField = (fieldName: FieldName, value: string) => {
        setHasTouched((prev) => ({ ...prev, [fieldName]: true }));

        const error = validationFields(fieldName, value);

        setFrontErrors((prev) => {
            const newErrors = { ...prev };
            if (error) {
                newErrors[fieldName] = error;
            } else {
                delete newErrors[fieldName];
            }
            return newErrors;
        });
    };

    const validationFields = (fieldName: FieldName, value: string):string | undefined => {

        const fieldRules = rules[fieldName];
        if(!fieldRules) return undefined;
        for(const rule of fieldRules){
            if(rule.condition(value)) return rule.errorMessage;
        }
        return undefined;
    };

    const validate = (e: FormEvent<Element>): boolean=>{
        e.preventDefault();
        const validationErrors: Partial<Record<FieldName, string>> = {};

        for(const fieldName in rules){
            validationErrors[fieldName] = validationFields(fieldName, getNestedValue(fieldName, data));
        }
        for(const fieldName in validationErrors){
            if(!validationErrors[fieldName]) delete validationErrors[fieldName];
        }

        if(Object.keys(validationErrors).length > 0){
            setFrontErrors(validationErrors);

            const defaultTouched: Partial<Record<FieldName, boolean>> = {};
            for(const fieldName in rules){
                defaultTouched[fieldName] = true;
            }
            setHasTouched(defaultTouched);
            return false;
        }

        return true;

    };
    const getNestedValue = (fieldName:FieldName, data: DataFormStruct):string =>{
        const keys = fieldName.split(".");
        let value:any = data;


        for(const key of keys){
            if(value === undefined || value === null) return "";
            value = value[key];
        }

        return value || "";
    }
    return {
        getError,
        validate,
        handleBlurField,
        setFrontErrors,
        setHasTouched
    }
}

