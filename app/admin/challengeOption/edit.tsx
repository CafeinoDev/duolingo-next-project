import { SimpleForm, Create, TextInput, required, ReferenceInput, NumberInput, Edit, SelectInput, BooleanInput } from "react-admin";

export const ChallengeOptionEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput
                source="text"
                validate={[required()]}
                label="Text"
            />
            <BooleanInput
                source="correct"
                validate={[required()]}
                defaultValue={false}
            />
            <ReferenceInput
                source="challengeId"
                reference="challenges"
            />
            <TextInput
                source="imageSrc"
            />
            <TextInput
                source="audioSrc"
            />
        </SimpleForm>
    </Edit>
);