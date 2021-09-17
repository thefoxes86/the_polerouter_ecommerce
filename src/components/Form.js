import React from "react";
import { useForm } from "react-hook-form";

export default function Form() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="form__contact" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="name" className="input__1">
        <span>Name</span>
        <input {...register("name", { required: true })} />
      </label>
      <label htmlFor="mail" className="input__2">
        <span>Email</span>
        <input {...register("mail", { required: true })} />
      </label>
      <label htmlFor="country" className="input__3">
        <span>Photo</span>
        <input type="file" {...register("photo", { required: true })} />
      </label>
      <label htmlFor="messagge" className="textarea">
        <span>Message</span>
        <textarea {...register("messagge")} />
      </label>

      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" className="button__black submit" />
    </form>
  );
}
