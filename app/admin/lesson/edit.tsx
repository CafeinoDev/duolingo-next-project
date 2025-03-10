import { SimpleForm, Create, TextInput, required, ReferenceInput, NumberInput, Edit } from "react-admin";

export const LessonEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput
                source="title"
                validate={[required()]}
                label="Title"
            />
            <ReferenceInput
                source="unitId"
                reference="units"
            />
            <NumberInput
                source="order"
                validate={[required()]}
                label="Order"
            />
        </SimpleForm>
    </Edit>
);