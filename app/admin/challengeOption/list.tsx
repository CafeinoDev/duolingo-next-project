import { BooleanField, Datagrid, List, NumberField, ReferenceField, SelectField, TextField } from "react-admin";

export const ChallengeOptionList = () => (
    <List>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="text" />
            <TextField source="imageSrc" />
            <TextField source="audioSrc" />
            <BooleanField source="correct"/>
            <ReferenceField source="challengeId" reference="challenges" />
        </Datagrid>
    </List>
);