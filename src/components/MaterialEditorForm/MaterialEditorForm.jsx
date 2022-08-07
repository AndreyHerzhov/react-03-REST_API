import { Formik, Form, Field } from "formik"
import styled from "styled-components"

const Input = styled(Field)`
    font-size: 40px;
`

export const MaterialEditorForm = ({onSubmit }) => {
    const handleSubmit = async (values, actions) => {
        await onSubmit(values)
        actions.setSubmitting(false)
        actions.resetForm()
    }
    return (
        <Formik initialValues={{ title: '', link: ''}}onSubmit={handleSubmit}>
            {({isSubmitting}) => {
                // console.log(isSubmitting)
                return (
                    <Form>
                            <label>
                                Описание
                                <Input name="title"/>
                            </label>
                            <label>
                                Ссылка
                                <Input name="link" type="text"/>
                            </label>
                            <button type="submit" disabled={isSubmitting}>Добавить материал</button> 
                    </Form>
                )
            }}
        </Formik>
    )
}