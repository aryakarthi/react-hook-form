import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";

type FormValues = {
  username: string;
  email: string;
  course: string;
};

const SimpleForm = () => {
  const form = useForm<FormValues>();
  const { register, control, handleSubmit, formState } = form;
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    console.log("submitted!", data);
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        noValidate
        className="flex flex-col max-w-3xl gap-2 mx-auto"
      >
        <label htmlFor="username" className="text-xl text-white">
          Username
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="username"
          {...register("username", {
            required: {
              value: true,
              message: "Username is required!",
            },
          })}
        />
        {errors.username && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.username?.message}
          </p>
        )}

        <label htmlFor="email" className="text-xl text-white">
          Email
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="email"
          {...register("email", {
            required: {
              value: true,
              message: "Email is required!",
            },

            pattern: {
              value:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              message: "Invalid email address!",
            },
            validate: {
              notAdmin: (value: string) => {
                return (
                  value !== "admin@ak.com" ||
                  "Please enter different email address!"
                );
              },
              notBlackListed: (value: string) => {
                return (
                  !value.endsWith("in") ||
                  "This domain is restricted!"
                );
              },
            },
          })}
        />
        {errors.email && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.email?.message}
          </p>
        )}
        <label htmlFor="course" className="text-xl text-white">
          Course
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="course"
          {...register("course", {
            required: {
              value: true,
              message: "Course is required!",
            },
          })}
        />
        {errors.course && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.course?.message}
          </p>
        )}
        <button className="w-full my-10 text-xl font-semibold bg-gray-300 p-2 rounded-md">
          Submit
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default SimpleForm;
