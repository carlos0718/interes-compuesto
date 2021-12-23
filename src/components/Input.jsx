import { useField } from 'formik';
import React from 'react';
import styled from 'styled-components';

const Control = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.label`
    color: #000;
    display: block;
    margin-bottom: 5px;
`;

const MyInput = styled.input`
    outline: none;
    padding: 5px;
    border: 1px solid #b1b3b3;
    border-radius: 3px;
    width: 100%;
    margin-bottom: 5px;
`;

const ErroMessage = styled.div`
    color: #f00;
`;


const Input = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <Control>
            <Label> { label } </Label>
            <MyInput { ...field } { ...props } />
            { meta.touched && meta.error ? <ErroMessage> { meta.error } </ErroMessage> : null }
        </Control>
    );
};

export default Input;