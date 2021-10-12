import React, { useContext } from 'react';

import Button from '../../shared/components/FormElements/Button';
import { UserContext } from '../../shared/context/user-context';
import Input from '../../shared/components/FormElements/Input';
import Card from '../../shared/components/UIElements/Card';
import { useForm } from '../../shared/hooks/form-hook';
import {
    VALIDATOR_MINLENGTH,
    VALIDATOR_EMAIL
} from '../../shared/util/validators';

import './UserForm.css';

const UpdateUserForm = props => {
    const userContext = useContext(UserContext);
    const identifiedPlace = props.ip;

    const [formState, inputHandler] = useForm(
        {
            title: {
                value: identifiedPlace.name.title,
                isValid: true
            },
            first: {
                value: identifiedPlace.name.first,
                isValid: true
            },
            last: {
                value: identifiedPlace.name.last,
                isValid: true
            },
            email: {
                value: identifiedPlace.email,
                isValid: true
            },
            country: {
                value: identifiedPlace.location.country,
                isValid: true
            },
            city: {
                value: identifiedPlace.location.city,
                isValid: true
            },
            street: {
                value: identifiedPlace.location.street,
                isValid: true
            }
        },
        true
    );

    const userUpdateSubmitHandler = event => {
        event.preventDefault();
        console.log(formState.inputs);
        const updatedUser = {
            id: identifiedPlace.id,
            name: {
                title: formState.inputs.title.value,
                first: formState.inputs.first.value,
                last: formState.inputs.last.value
            },
            email: formState.inputs.email.value,
            location: {
                country: formState.inputs.country.value,
                city: formState.inputs.city.value,
                street: formState.inputs.street.value
            },
            image: identifiedPlace.image
        }
        userContext.update(updatedUser);
        props.closeModal();
    };

    if (!identifiedPlace) {
        return (
            <div className="center">
                <Card>
                    <h2>Could not find user!</h2>
                </Card>
            </div>
        );
    }

    return (
        <form className="user-form">
            <Input
                id="title"
                element="input"
                type="text"
                label="Title"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a valid title (min. 3 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.title.value}
                initialValid={formState.inputs.title.isValid}
            />
            <Input
                id="first"
                element="input"
                label="First Name"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a valid First Name (min. 3 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.first.value}
                initialValid={formState.inputs.first.isValid}
            />
            <Input
                id="last"
                element="input"
                type="text"
                label="Last Name"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a valid Last Name (min. 3 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.last.value}
                initialValid={formState.inputs.last.isValid}
            />
            <Input
                id="email"
                element="input"
                type="email"
                label="Email"
                validators={[VALIDATOR_EMAIL()]}
                errorText="Please enter a valid email."
                onInput={inputHandler}
                initialValue={formState.inputs.email.value}
                initialValid={formState.inputs.email.isValid}
            />
            <Input
                id="country"
                element="input"
                type="text"
                label="Country"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a valid counrty (min. 3 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.country.value}
                initialValid={formState.inputs.country.isValid}
            />
            <Input
                id="city"
                element="input"
                label="City"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a valid city (min. 3 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.city.value}
                initialValid={formState.inputs.city.isValid}
            />
            <Input
                id="street"
                element="input"
                type="text"
                label="Street"
                validators={[VALIDATOR_MINLENGTH(3)]}
                errorText="Please enter a valid street (min. 3 characters)."
                onInput={inputHandler}
                initialValue={formState.inputs.street.value}
                initialValid={formState.inputs.street.isValid}
            />
            <Button danger onClick={userUpdateSubmitHandler} disabled={!formState.isValid}>
                UPDATE USER
            </Button>
            <Button onClick={props.cancel} >
                CANCEL
            </Button>
        </form>
    );
};

export default UpdateUserForm;
