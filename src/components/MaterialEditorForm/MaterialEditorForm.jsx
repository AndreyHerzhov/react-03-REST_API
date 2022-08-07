import { Formik, Form, Field } from "formik"

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
                                <Field name="title"/>
                            </label>
                            <label>
                                Ссылка
                                <Field name="link" type="text"/>
                            </label>
                            <button type="submit" disabled={isSubmitting}>Добавить материал</button> 
                    </Form>
                )
            }}
        </Formik>
    )
}