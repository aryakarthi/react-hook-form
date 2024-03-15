import { FieldErrors, useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useEffect } from "react";

type FormValues = {
  name: string;
  email: string;
  city: string;
  social: {
    github: string;
    linkedin: string;
  };
  mobile: string[];
  age: number;
  dob: Date;
};

const SimpleForm = () => {
  // type can be omitted if we added default values.
  // otherwise it throws typescript error
  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      city: "",
      social: {
        github: "",
        linkedin: "",
      },
      mobile: ["", ""],
      age: 0,
      dob: new Date(),
    },
    // mode: "onBlur",
  });
  const { register, control, handleSubmit, formState, watch, reset, trigger } =
    form;
  const {
    errors,
    touchedFields,
    dirtyFields,
    isDirty,
    isValid,
    isSubmitting,
    isSubmitted,
    isSubmitSuccessful,
    submitCount,
  } = formState;

  console.log({ touchedFields, dirtyFields, isDirty, isValid });
  console.log({ isSubmitting, isSubmitted, isSubmitSuccessful, submitCount });

  const getName = watch("name");
  console.log(getName);
  const getNameEmail = watch(["name", "email"]);
  console.log(getNameEmail);
  const getForm = watch();
  console.log(getForm);

  const onSubmit = (data: FormValues) => {
    console.log("Form submitted!", data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Form errors!", errors);
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        noValidate
        className="flex flex-col max-w-3xl gap-2 mx-auto"
      >
        <label htmlFor="name" className="text-xl text-white">
          Name
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="name"
          {...register("name", {
            required: {
              value: true,
              message: "Name is required!",
            },
          })}
        />
        {errors.name && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.name?.message}
          </p>
        )}

        <label htmlFor="age" className="text-xl text-white">
          Age
        </label>
        <input
          type="number"
          className="rounded-md text-xl p-2"
          id="age"
          {...register("age", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "Age is required!",
            },
          })}
        />
        {errors.age && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.age?.message}
          </p>
        )}

        <label htmlFor="dob" className="text-xl text-white">
          DOB
        </label>
        <input
          type="date"
          className="rounded-md text-xl p-2"
          id="dob"
          {...register("dob", {
            valueAsDate: true,
            required: {
              value: true,
              message: "DOB is required!",
            },
          })}
        />
        {errors.dob && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.dob?.message}
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
                return !value.endsWith("in") || "This domain is restricted!";
              },
              emailAvailable: async (fieldValue) => {
                const response = await fetch(
                  `https://jsonplaceholder.typicode.com/users?email=${fieldValue}`
                );
                const data = await response.json();
                return data.length === 0 || "Email already exists";
              },
            },
          })}
        />
        {errors.email && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.email?.message}
          </p>
        )}
        <label htmlFor="city" className="text-xl text-white">
          City
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="city"
          {...register("city", {
            required: {
              value: true,
              message: "City is required!",
            },
          })}
        />
        {errors.city && (
          <p className="bg-yellow-100 text-red-500 italic px-2 py-1 rounded-md self-start">
            {errors.city?.message}
          </p>
        )}

        <label htmlFor="github" className="text-xl text-white">
          Github
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="github"
          {...register("social.github")}
        />

        <label htmlFor="linkedin" className="text-xl text-white">
          Linkedin
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="linkedin"
          {...register("social.linkedin", {
            // disabled: true,
            disabled: watch("name") === "",
          })}
        />

        <label htmlFor="primary" className="text-xl text-white">
          Primary Mobile No:
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="primary"
          {...register("mobile.0")}
        />

        <label htmlFor="secondary" className="text-xl text-white">
          Secondary Mobile No:
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="secondary"
          {...register("mobile.1")}
        />

        <button
          disabled={isSubmitting}
          className="w-full mt-10 text-xl font-semibold bg-gray-300 p-2 rounded-md"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="w-full mt-10 text-xl font-semibold bg-gray-300 p-2 rounded-md"
        >
          Reset
        </button>
        <button
          type="button"
          onClick={() => trigger()}
          className="w-full mt-10 text-xl font-semibold bg-gray-300 p-2 rounded-md"
        >
          Validate
        </button>
      </form>
      <DevTool control={control} />
    </div>
  );
};

export default SimpleForm;
