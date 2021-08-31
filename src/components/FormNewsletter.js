import React from "react";
import { useForm } from "react-hook-form";

export default function FormNewsletter() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form className="form__newsletter" onSubmit={handleSubmit(onSubmit)}>
      {/* register your input into the hook by invoking the "register" function */}
      <label htmlFor="mail" className="input__1">
        <input
          {...register("mail", { required: true })}
          placeholder="enter your email"
        />
      </label>

      {/* errors will return when field validation fails  */}
      {errors.exampleRequired && <span>This field is required</span>}

      <input type="submit" className="button__black submit" value="subscribe" />
    </form>
  );
}
