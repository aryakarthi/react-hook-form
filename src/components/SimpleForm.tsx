const SimpleForm = () => {
  return (
    <div>
      <form className="flex flex-col max-w-3xl gap-2 mx-auto">
        <label htmlFor="username" className="text-xl text-white">
          Username
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="username"
          name="username"
        />
        <label htmlFor="email" className="text-xl text-white">
          Email
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="email"
          name="email"
        />
        <label htmlFor="course" className="text-xl text-white">
          Course
        </label>
        <input
          type="text"
          className="rounded-md text-xl p-2"
          id="course"
          name="course"
        />
        <button className="w-full my-10 text-3xl bg-gray-300 p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default SimpleForm;
