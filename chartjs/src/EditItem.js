import React from 'react'
import { useForm, Controller } from "react-hook-form";
import { Input as AntdInput } from "antd";
import "./EditItem.css";

function EditItem({ items, selectedItemforEdit, setItemsHandler, isModifiable }) {
    const {
        control,
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        if (isModifiable){
            for(let i = 0; i < items.length; i++){
                if (selectedItemforEdit.id === items[i].id){
                    items[i].expense = parseInt(data.balance, 10);
                }
            }
            console.log("From the edititem", items);
            setItemsHandler(items)
        }
    };

    return (
        <div className="EditItem">
            <br></br>
            <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <Controller
                    name="balance"
                    control={control}
                    defaultValue=""
                    rules={{ required: true }}
                    render={({ field }) => <AntdInput type="number" placeholder="New Balance Deduction" {...field} />}
                />
                {errors.balance && <span className="text-danger">This field is required</span>}
                <input type="submit" value="Update" />
            </form>
        </div>
    )
}

export default EditItem

