import { Form, FormLayout, Grid, Modal, TextField } from '@shopify/polaris'
import React from 'react'
import DropImages from './DropImages'

const ModalContainer = ({ handleSubmit, product, values, setValues }) => {
    return (
        <Modal.Section>
            <Form onSubmit={handleSubmit}>
                <FormLayout>
                    <Grid>
                        <Grid.Cell
                            columnSpan={{
                                lg: 9,
                                xl: 9,
                                md: 5,
                                sm: 5,
                                xs: 4,
                            }}
                        >
                            <TextField
                                placeholder="Name"
                                value={values.name}
                                onChange={(value) => setValues({ ...values, name: value })}
                            />
                        </Grid.Cell>
                        <Grid.Cell
                            columnSpan={{
                                lg: 3,
                                xl: 3,
                                md: 1,
                                sm: 1,
                                xs: 2,
                            }}
                        >
                            <TextField
                                placeholder="Price"
                                type="number"
                                value={values.price}
                                onChange={(value) => setValues({ ...values, price: value })}
                            />
                        </Grid.Cell>

                        <Grid.Cell
                            columnSpan={{
                                lg: 12,
                                xl: 12,
                                md: 6,
                                sm: 6,
                                xs: 6,
                            }}
                        >
                            <DropImages
                                setImages={(images) => setValues({ ...values, images })}
                                image={product?.image}
                            />
                        </Grid.Cell>

                        <Grid.Cell
                            columnSpan={{
                                lg: 12,
                                xl: 12,
                                md: 6,
                                sm: 6,
                                xs: 6,
                            }}
                        >
                            <TextField
                                placeholder="Description"
                                multiline={3}
                                value={values.description}
                                onChange={(value) => setValues({ ...values, description: value })}
                            />
                        </Grid.Cell>
                    </Grid>
                </FormLayout>
            </Form>
        </Modal.Section>
    )
}

export default ModalContainer
